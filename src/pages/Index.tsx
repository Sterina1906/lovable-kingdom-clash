import { Button } from "@/components/ui/button";
import castleBackground from "@/assets/castle-background.jpg";
import { Zap, Target, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const floatingEmojis = [
    { emoji: "💀", style: "top-[10%] left-[8%]", animation: "animate-float" },
    { emoji: "🧙", style: "top-[15%] right-[15%]", animation: "animate-float-slow" },
    { emoji: "🐉", style: "top-[45%] left-[5%]", animation: "animate-float" },
    { emoji: "⚔️", style: "top-[60%] right-[10%]", animation: "animate-float-slow" },
    { emoji: "🔥", style: "bottom-[15%] right-[8%]", animation: "animate-float" },
    { emoji: "⚔️", style: "top-[30%] left-[15%]", animation: "animate-float-slow" },
    { emoji: "👑", style: "top-[25%] right-[25%]", animation: "animate-float" },
    { emoji: "🛡️", style: "top-[35%] right-[5%]", animation: "animate-float-slow" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${castleBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Floating Emojis */}
      {floatingEmojis.map((item, index) => (
        <div
          key={index}
          className={`absolute text-5xl md:text-6xl ${item.style} ${item.animation} opacity-80 hover:scale-125 transition-transform cursor-pointer`}
          style={{ animationDelay: `${index * 0.3}s` }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Kingdom Headers */}
      <div className="absolute top-8 left-0 right-0 z-10 flex justify-between px-8 md:px-16">
        <div className="backdrop-blur-md bg-blue-kingdom/20 border-2 border-blue-kingdom rounded-2xl px-6 py-3 text-center">
          <div className="text-3xl mb-1">🏰</div>
          <h3 className="text-sm md:text-lg font-bold text-foreground">BLUE KINGDOM</h3>
          <p className="text-xs md:text-sm text-foreground/80">Defenders of the Queue</p>
        </div>
        
        <div className="backdrop-blur-md bg-red-kingdom/20 border-2 border-red-kingdom rounded-2xl px-6 py-3 text-center">
          <div className="text-3xl mb-1">🏰</div>
          <h3 className="text-sm md:text-lg font-bold text-foreground">RED KINGDOM</h3>
          <p className="text-xs md:text-sm text-foreground/80">Masters of Deployment</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-gold drop-shadow-[0_0_30px_rgba(255,215,0,0.5)] animate-pulse-glow">
            CLASH ROYALE
          </h1>

          {/* Subtitle */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 drop-shadow-lg">
            Queue Commander
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/90 mb-8 drop-shadow-md">
            Master the art of <span className="text-red-kingdom font-bold">First In, First Out</span> warfare
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="backdrop-blur-md bg-secondary/90 border border-secondary rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Real-time Visualization</span>
            </div>
            <div className="backdrop-blur-md bg-secondary/90 border border-secondary rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Interactive Learning</span>
            </div>
            <div className="backdrop-blur-md bg-secondary/90 border border-secondary rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
              <span className="font-semibold">DSA Mastery</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-2">
            <Button 
              size="lg"
              onClick={() => navigate("/arena")}
              className="bg-battle-gradient text-foreground font-black text-xl px-12 py-8 rounded-2xl hover:scale-105 transition-all shadow-2xl border-2 border-accent animate-pulse-glow"
            >
              ⚔️ READY FOR BATTLE ⚔️
            </Button>
            <p className="text-sm text-foreground/70">Click to enter the arena...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
