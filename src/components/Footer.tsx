export function Footer() {
  return (
    <footer className="bg-brand-gray py-16 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Column: Brand Info */}
        <div className="text-center md:text-left flex items-center flex-col md:flex-row gap-4 justify-self-start">
          <img src="/logoatier.png" alt="A-Tier Exotics Logo" className="h-16 w-auto object-contain" />
          <div>
            <span className="text-3xl font-bold tracking-tighter text-white mb-2 block">
              A-Tier <span className="text-brand-accent">Exotics.</span>
            </span>
            <p className="text-gray-400 text-sm font-light">The pinnacle of luxury chauffeur services.</p>
          </div>
        </div>

        {/* Center Column: Noor AI Call to Action */}
        <div className="flex flex-col items-center justify-center text-center">
          <a 
            href="https://noor-ai.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-brand-accent/20 transition-all duration-500 max-w-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-light tracking-wider uppercase group-hover:text-white transition-colors duration-300">
                Communication by
              </span>
              <img 
                src="/noor.png" 
                alt="Noor AI" 
                className="h-5 w-auto object-contain brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <p className="text-[11px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed font-light">
              Your AI receptionist answers every call 24/7 — nights, weekends, holidays. Speaks English & Spanish. Books appointments, qualifies leads, and transfers calls seamlessly. No missed calls. No missed sales.
            </p>

            <span className="inline-flex items-center gap-1 text-[11px] text-brand-accent font-semibold tracking-wider uppercase mt-1 group-hover:text-brand-accent transition-colors duration-300">
              Deploy Your Receptionist
              <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
        
        {/* Right Column: Social Links */}
        <div className="flex justify-center md:justify-end gap-8 text-sm text-gray-300 font-light justify-self-end">
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
