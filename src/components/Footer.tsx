export function Footer() {
  return (
    <footer className="bg-brand-gray py-16 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Column: Brand Info */}
        <div className="text-center md:text-left flex items-center flex-col md:flex-row gap-4">
          <img src="/logoatier.png" alt="A-Tier Exotics Logo" className="h-16 w-auto object-contain" />
          <div>
            <span className="text-3xl font-bold tracking-tighter text-white mb-2 block">
              A-Tier <span className="text-brand-accent">Exotics.</span>
            </span>
            <p className="text-gray-400 text-sm font-light">The pinnacle of luxury chauffeur services.</p>
          </div>
        </div>
        
        {/* Right Column: Social Links */}
        <div className="flex gap-8 text-sm text-gray-300 font-light">
          <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-accent transition-colors">TikTok</a>
          <a href="#booking" className="hover:text-brand-accent transition-colors">Booking</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} A Tier Exotics. All Rights Reserved.
        </div>
        <div className="flex justify-center md:justify-end">
          <a 
            href="https://noor-ai.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.01] hover:bg-brand-accent/[0.02] border border-white/5 hover:border-brand-accent/20 transition-all duration-300"
          >
            <img 
              src="/noor.png" 
              alt="Noor AI" 
              className="h-3.5 w-auto object-contain brightness-90 group-hover:scale-105 transition-all duration-300"
            />
            <span className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light leading-none">
              Made by{"\u00A0"}<span className="font-semibold text-white group-hover:text-brand-accent transition-colors duration-300">Noor AI</span> <span className="text-white/10 mx-1">|</span> AI Consultant Agency
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
