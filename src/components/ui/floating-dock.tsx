import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
import { cn } from "../../lib/utils";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2 relative top-12 left-0"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(item.href.replace("#", ""))
                      ?.scrollIntoView({ behavior: "smooth" });
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-brand-gray/90 backdrop-blur-md flex items-center shadow-lg border border-white/5 text-white text-sm"
                >
                  {item.title}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 border border-white/5 shadow-sm rounded-full bg-brand-gray/80 backdrop-blur-md flex items-center justify-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-14 items-center gap-1 rounded-[32px] bg-white/5 backdrop-blur-md border border-white/10 px-4",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  href: string;
  key?: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let scaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
  let scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById(href.replace("#", ""))
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <motion.div
        ref={ref}
        style={{ scale }}
        className="px-4 py-2 hover:text-brand-accent transition-colors flex items-center justify-center relative text-white font-medium text-sm origin-bottom whitespace-nowrap z-10"
      >
        {title}
      </motion.div>
    </a>
  );
}
