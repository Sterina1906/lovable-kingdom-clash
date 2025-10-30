import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Troop {
  id: string;
  emoji: string;
  name: string;
  kingdom: "blue" | "red";
}

interface AttackAnimation {
  id: string;
  type: "fire" | "sword";
  position: number;
}

const troops: Troop[] = [
  { id: "1", emoji: "⚔️", name: "Knight", kingdom: "blue" },
  { id: "2", emoji: "🏹", name: "Archer", kingdom: "blue" },
  { id: "3", emoji: "🧙", name: "Wizard", kingdom: "blue" },
  { id: "4", emoji: "🐉", name: "Dragon", kingdom: "blue" },
  { id: "5", emoji: "💀", name: "Skeleton", kingdom: "blue" },
];

const Arena = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState<(Troop & { queueId: string })[]>([]);
  const [deployedTroops, setDeployedTroops] = useState<(Troop & { queueId: string; position: number })[]>([]);
  const [counter, setCounter] = useState(0);
  const [attacks, setAttacks] = useState<AttackAnimation[]>([]);
  const [castleHealth, setCastleHealth] = useState(100);

  const enqueue = (troop: Troop) => {
    const queueId = `${troop.id}-${Date.now()}-${counter}`;
    setQueue((prev) => [...prev, { ...troop, queueId }]);
    setCounter((prev) => prev + 1);
    toast.success(`${troop.emoji} ${troop.name} added to queue!`, {
      description: "FIFO: First In, First Out",
    });
  };

  const dequeue = () => {
    if (queue.length === 0) {
      toast.error("Queue is empty!", {
        description: "Add troops to the queue first",
      });
      return;
    }

    const [firstTroop, ...rest] = queue;
    setQueue(rest);
    const position = deployedTroops.length;
    setDeployedTroops((prev) => [...prev, { ...firstTroop, position }]);
    
    // Trigger attack animation
    const attackType = firstTroop.name === "Dragon" ? "fire" : "sword";
    const attackId = `attack-${Date.now()}`;
    setAttacks((prev) => [...prev, { id: attackId, type: attackType, position }]);
    
    // Damage castle
    setCastleHealth((prev) => Math.max(0, prev - 10));
    
    // Remove attack animation after 2 seconds
    setTimeout(() => {
      setAttacks((prev) => prev.filter((a) => a.id !== attackId));
    }, 2000);
    
    toast.success(`${firstTroop.emoji} ${firstTroop.name} deployed!`, {
      description: "Attacking the castle!",
    });
  };

  const clearQueue = () => {
    setQueue([]);
    toast.info("Queue cleared!");
  };

  const clearDeployed = () => {
    setDeployedTroops([]);
    setAttacks([]);
    toast.info("Battlefield cleared!");
  };

  const resetAll = () => {
    setQueue([]);
    setDeployedTroops([]);
    setCounter(0);
    setAttacks([]);
    setCastleHealth(100);
    toast.info("Arena reset!");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-kingdom/20 via-background to-red-kingdom/20" />
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-gold rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-gold rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold rounded-br-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="backdrop-blur-md bg-card/80 border-gold/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl md:text-5xl font-black text-gold drop-shadow-lg">
            ⚔️ BATTLE ARENA ⚔️
          </h1>
          <Button
            onClick={resetAll}
            variant="outline"
            className="backdrop-blur-md bg-card/80 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Reset All
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Troop Selection */}
          <Card className="backdrop-blur-md bg-card/90 border-2 border-gold/30 p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-gold">
              🏰 Select Your Army
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-kingdom flex items-center">
                  <span className="mr-2">🛡️</span> Your Troops
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {troops.map((troop) => (
                    <Button
                      key={troop.id}
                      onClick={() => enqueue(troop)}
                      className="h-20 text-2xl bg-blue-kingdom/80 hover:bg-blue-kingdom border-2 border-blue-kingdom/50"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-1">{troop.emoji}</span>
                        <span className="text-xs">{troop.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Queue Visualization */}
          <Card className="backdrop-blur-md bg-card/90 border-2 border-accent/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-accent">
                📋 Queue (FIFO)
              </h2>
              <Button
                onClick={clearQueue}
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive"
              >
                Clear
              </Button>
            </div>

            <div className="space-y-3 mb-6 min-h-[400px]">
              {queue.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                  <p className="text-lg">Queue is empty</p>
                  <p className="text-sm">Select troops to add</p>
                </div>
              ) : (
                <>
                  {queue.map((troop, index) => (
                    <div
                      key={troop.queueId}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        index === 0
                          ? "bg-primary/20 border-primary animate-pulse-glow"
                          : "bg-muted/20 border-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{troop.emoji}</span>
                          <div>
                            <p className="font-semibold">{troop.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Position: {index + 1}
                              {index === 0 && " (Next to deploy)"}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            troop.kingdom === "blue"
                              ? "bg-blue-kingdom/30 text-blue-kingdom"
                              : "bg-red-kingdom/30 text-red-kingdom"
                          }`}
                        >
                          {troop.kingdom.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <Button
              onClick={dequeue}
              disabled={queue.length === 0}
              className="w-full bg-battle-gradient text-foreground font-bold text-lg py-6"
            >
              ⚔️ DEPLOY NEXT TROOP ⚔️
            </Button>

            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                <strong>Queue Size:</strong> {queue.length} troops waiting
              </p>
            </div>
          </Card>

          {/* Battlefield with Castle */}
          <Card className="backdrop-blur-md bg-card/90 border-2 border-gold/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gold">
                🏰 Battlefield
              </h2>
              <Button
                onClick={clearDeployed}
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-destructive"
              >
                Clear
              </Button>
            </div>

            {/* Castle */}
            <div className="relative mb-6 h-48 rounded-lg overflow-hidden border-2 border-gold/50">
              <img 
                src={new URL('../assets/battlefield-castle.png', import.meta.url).href}
                alt="Enemy Castle"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 right-2">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">Castle Health</span>
                    <span className="text-xs font-bold">{castleHealth}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                      style={{ width: `${castleHealth}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Attack Animations */}
              {attacks.map((attack) => (
                <div
                  key={attack.id}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-slide-up"
                >
                  {attack.type === "fire" ? (
                    <span className="text-6xl animate-pulse-glow">🔥</span>
                  ) : (
                    <span className="text-6xl animate-bounce">⚔️</span>
                  )}
                </div>
              ))}
              
              {castleHealth === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-4xl font-black text-gold mb-2">🏆 VICTORY! 🏆</p>
                    <p className="text-sm text-muted-foreground">Castle Destroyed!</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 min-h-[200px]">
              {deployedTroops.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                  <p className="text-lg">No troops deployed</p>
                  <p className="text-sm">Deploy from queue to attack!</p>
                </div>
              ) : (
                <>
                  {deployedTroops.map((troop, index) => (
                    <div
                      key={troop.queueId}
                      className="p-4 rounded-lg border-2 bg-card/50 border-gold/30 animate-scale-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl animate-float">{troop.emoji}</span>
                          <div>
                            <p className="font-semibold">{troop.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {troop.name === "Dragon" ? "🔥 Fire Attack" : "⚔️ Sword Attack"}
                            </p>
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full text-xs font-bold bg-blue-kingdom/30 text-blue-kingdom">
                          ATTACKING
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-center text-muted-foreground">
                <strong>Attacking:</strong> {deployedTroops.length} troops • <strong>Damage:</strong> {100 - castleHealth}%
              </p>
            </div>
          </Card>
        </div>

        {/* Learning Section */}
        <Card className="mt-6 backdrop-blur-md bg-card/90 border-2 border-primary/30 p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary text-center">
            📚 Queue Operations (FIFO)
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/20 border border-muted">
              <h3 className="font-bold text-lg mb-2">1️⃣ Enqueue</h3>
              <p className="text-sm text-muted-foreground">
                Add troops to the <strong>back</strong> of the queue. New troops wait their turn.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/20 border border-muted">
              <h3 className="font-bold text-lg mb-2">2️⃣ Dequeue</h3>
              <p className="text-sm text-muted-foreground">
                Remove and deploy troops from the <strong>front</strong> of the queue. First In, First Out!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/20 border border-muted">
              <h3 className="font-bold text-lg mb-2">3️⃣ Visualize</h3>
              <p className="text-sm text-muted-foreground">
                Watch the queue in action. The troop at the front is always deployed next.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Arena;
