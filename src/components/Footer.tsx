export function Footer() {
  return (
    <footer className="bg-brand-gray py-16 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Column: Brand Info */}
        <div className="text-center md:text-left flex items-center flex-col md:flex-row gap-4 justify-self-center md:justify-self-start">
          <img src="/logoatier.png" alt="A-Tier Exotics Logo" className="h-16 w-auto object-contain" />
          <div>
            <span className="text-3xl font-bold tracking-tighter text-white mb-2 block">
              A-Tier <span className="text-brand-accent">Exotics.</span>
            </span>
            <p className="text-gray-400 text-sm font-light">The pinnacle of luxury chauffeur services.</p>
          </div>
        </div>

        {/* Center Column: Noor AI Call to Action */}
        <div className="flex items-center justify-center">
          <a 
            href="https://noor-ai.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-brand-dark/50 hover:bg-brand-accent/[0.02] border border-white/5 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(224,205,173,0.05)] transition-all duration-500"
          >
            <img 
              src="/noor.png" 
              alt="Noor AI" 
              className="h-5 w-auto object-contain brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col items-start text-left leading-none">
              <span className="text-xs font-semibold text-white tracking-wider group-hover:text-brand-accent transition-colors duration-300">
                Noor AI
              </span>
              <span className="text-[9px] text-gray-400 font-light uppercase tracking-wider mt-0.5">
                Consultant Agency
              </span>
            </div>
          </a>
        </div>
        
        {/* Right Column: Social Links */}
        <div className="flex justify-center md:justify-end gap-8 text-sm text-gray-300 font-light justify-self-center md:justify-self-end">
          <a href="#" className="hover:text-brand-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-accent transition-colors">TikTok</a>
          <a href="#booking" className="hover:text-brand-accent transition-colors">Booking</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center text-xs text-gray-500 font-light">
        &copy; {new Date().getFullYear()} A Tier Exotics. All Rights Reserved. Booking powered by AutoFlow.
      </div>
    </footer>
  );
}
