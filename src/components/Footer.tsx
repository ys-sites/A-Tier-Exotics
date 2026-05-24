export function Footer() {
  return (
    <footer className="bg-brand-gray py-16 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left flex items-center flex-col md:flex-row gap-4">
          <img src="/logoatier.png" alt="A-Tier Exotics Logo" className="h-16 w-auto object-contain" />
          <div>
            <span className="text-3xl font-bold tracking-tighter text-white mb-2 block">
              A-Tier <span className="text-brand-accent">Exotics.</span>
            </span>
            <p className="text-gray-400 text-sm font-light">The pinnacle of luxury chauffeur services.</p>
          </div>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-300 font-light">
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
