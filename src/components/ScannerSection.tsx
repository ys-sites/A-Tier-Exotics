import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import "./ScannerSection.css";
import ShinyText from "./ui/ShinyText";
import { FlipWords } from "./ui/flip-words";

const cardImages = [
  "/img1.jpg",
  "/img 2.jpg",
  "/img 3.jpg",
  "/img 4.webp",
  "/img 5.jpg",
];

const generateCode = (width: number, height: number) => {
  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr: any[]) => arr[randInt(0, arr.length - 1)];

  const header = [
    "// A-Tier Exotics • Protocol Scanner",
    "/* verification active */",
    "const SCAN_WIDTH = 8;",
    "const VIP_ACCESS = 1;",
  ];

  const helpers = [
    "function verify(id) { return true; }",
    "const activate = () => performance.now();",
  ];

  const particleBlock = (idx: number) => [
    `class Session${idx} {`,
    "  constructor(x, y, vx, vy, r, a) {",
    "    this.x = x; this.y = y;",
    "  }",
    "  step(dt) { this.x += this.vx * dt; }",
    "}",
  ];

  const loopBlock = [
    "function tick(t) {",
    "  const dt = 0.016;",
    "  // update & render",
    "}",
  ];

  const misc = [
    "const state = { active: true };",
    "const fleet = { cullinan: 1 };",
  ];

  const library: string[] = [];
  header.forEach((l) => library.push(l));
  helpers.forEach((l) => library.push(l));
  for (let b = 0; b < 3; b++) particleBlock(b).forEach((l) => library.push(l));
  loopBlock.forEach((l) => library.push(l));
  misc.forEach((l) => library.push(l));

  for (let i = 0; i < 20; i++) {
    const n1 = randInt(1, 9);
    const n2 = randInt(10, 99);
    library.push(`const v${i} = (${n1} + ${n2});`);
  }

  let flow = library.join(" ");
  flow = flow.replace(/\s+/g, " ").trim();
  const totalChars = width * height;
  while (flow.length < totalChars + width) {
    const extra = pick(library).replace(/\s+/g, " ").trim();
    flow += " " + extra;
  }

  let out = "";
  let offset = 0;
  for (let row = 0; row < height; row++) {
    let line = flow.slice(offset, offset + width);
    if (line.length < width) line = line + " ".repeat(width - line.length);
    out += line + (row < height - 1 ? "\n" : "");
    offset += width;
  }
  return out;
};

const calculateCodeDimensions = (cardWidth: number, cardHeight: number) => {
  const fontSize = 11;
  const lineHeight = 13;
  const charWidth = 6;
  const width = Math.floor(cardWidth / charWidth);
  const height = Math.floor(cardHeight / lineHeight);
  return { width, height, fontSize, lineHeight };
};

export function ScannerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    // Generate initial cards
    const initialCards: string[] = [];
    for (let i = 0; i < 30; i++) {
      const { width, height } = calculateCodeDimensions(480, 360);
      initialCards.push(generateCode(width, height));
    }
    setCards(initialCards);
  }, []);

  // --- Particle System (Three.js) ---
  useEffect(() => {
    if (!particleCanvasRef.current) return;
    const canvas = particleCanvasRef.current;

    // Use an IIFE locally so it acts within the effect
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;
    let particles: THREE.Points;
    let velocities: Float32Array;
    let alphas: Float32Array;
    let particleCount = 400;
    let animationId: number;

    const initParticles = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(
        -window.innerWidth / 2,
        window.innerWidth / 2,
        125,
        -125,
        1,
        1000,
      );
      camera.position.z = 100;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, 250);
      renderer.setClearColor(0x000000, 0);

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      velocities = new Float32Array(particleCount);

      const tCanvas = document.createElement("canvas");
      tCanvas.width = 100;
      tCanvas.height = 100;
      const tCtx = tCanvas.getContext("2d");
      if (tCtx) {
        const half = tCanvas.width / 2;
        const hue = 40; // align with brand gold
        const gradient = tCtx.createRadialGradient(
          half,
          half,
          0,
          half,
          half,
          half,
        );
        gradient.addColorStop(0.025, "#fff");
        gradient.addColorStop(0.1, `hsl(${hue}, 61%, 50%)`);
        gradient.addColorStop(0.25, `hsl(${hue}, 64%, 20%)`);
        gradient.addColorStop(1, "transparent");

        tCtx.fillStyle = gradient;
        tCtx.beginPath();
        tCtx.arc(half, half, half, 0, Math.PI * 2);
        tCtx.fill();
      }
      const texture = new THREE.CanvasTexture(tCanvas);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
        positions[i * 3 + 2] = 0;

        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;

        const orbitRadius = Math.random() * 200 + 100;
        sizes[i] = (Math.random() * (orbitRadius - 60) + 60) / 8;
        velocities[i] = Math.random() * 60 + 30;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      alphas = new Float32Array(particleCount);
      for (let i = 0; i < particleCount; i++) {
        alphas[i] = (Math.random() * 8 + 2) / 10;
      }
      geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          pointTexture: { value: texture },
          size: { value: 15.0 },
        },
        vertexShader: `
          attribute float alpha;
          varying float vAlpha;
          varying vec3 vColor;
          uniform float size;
          void main() {
            vAlpha = alpha;
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying float vAlpha;
          varying vec3 vColor;
          void main() {
            gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
    };

    const animateParticles = () => {
      animationId = requestAnimationFrame(animateParticles);
      if (particles) {
        const positions = particles.geometry.attributes.position
          .array as Float32Array;
        const alphaArr = particles.geometry.attributes.alpha
          .array as Float32Array;
        const time = Date.now() * 0.001;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += velocities[i] * 0.016;

          if (positions[i * 3] > window.innerWidth / 2 + 100) {
            positions[i * 3] = -window.innerWidth / 2 - 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
          }

          positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;

          const twinkle = Math.floor(Math.random() * 10);
          if (twinkle === 1 && alphaArr[i] > 0) {
            alphaArr[i] -= 0.05;
          } else if (twinkle === 2 && alphaArr[i] < 1) {
            alphaArr[i] += 0.05;
          }
          alphaArr[i] = Math.max(0, Math.min(1, alphaArr[i]));
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.alpha.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.left = -window.innerWidth / 2;
      camera.right = window.innerWidth / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 250);
    };

    initParticles();
    animateParticles();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (particles) {
        scene.remove(particles);
        particles.geometry.dispose();
        (particles.material as THREE.Material).dispose();
      }
    };
  }, []);

  // --- Scroll Stream ---
  useEffect(() => {
    if (!cardLineRef.current || !containerRef.current) return;
    const cardLine = cardLineRef.current;

    let position = 0;
    let velocity = 120;
    let direction = 1;
    let isAnimating = true;
    let isDragging = false;
    let lastTime = performance.now();
    let animationId: number;

    const friction = 0.95;
    const minVelocity = 60; // Increased from 30 for faster but smooth animation
    let containerWidth = containerRef.current.offsetWidth;
    const cardWidth = 480;
    const cardGap = 60;
    const cardCount = cardLine.children.length || 30;
    let cardLineWidth = (cardWidth + cardGap) * cardCount;

    const updateCardPosition = () => {
      // Create seamless loop
      if (position < -cardLineWidth / 2) {
        position += cardLineWidth / 2;
      } else if (position > 0) {
        position -= cardLineWidth / 2;
      }
      cardLine.style.transform = `translateX(${position}px)`;

      // Handle clipping logic inline
      const scannerX = window.innerWidth / 2;
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyScanningActive = false;

      const wrappers = cardLine.children;
      for (let i = 0; i < wrappers.length; i++) {
        const wrapper = wrappers[i] as HTMLElement;
        const rect = wrapper.getBoundingClientRect();
        const cardLeft = rect.left;
        const cardRight = rect.right;
        const cardW = rect.width;

        const normalCard = wrapper.children[0] as HTMLElement;
        const asciiCard = wrapper.children[1] as HTMLElement;

        if (normalCard && asciiCard) {
          if (cardLeft < scannerRight && cardRight > scannerLeft) {
            anyScanningActive = true;
            const scannerIntersect = Math.min(Math.max(scannerLeft - cardLeft, 0), cardW);
            const percentage = (scannerIntersect / cardW) * 100;

            normalCard.style.setProperty("--clip-right", `${percentage}%`);
            asciiCard.style.setProperty("--clip-left", `${percentage}%`);

            if (
              !wrapper.hasAttribute("data-scanned") &&
              scannerIntersect > 0
            ) {
              wrapper.setAttribute("data-scanned", "true");
              const scanEffect = document.createElement("div");
              scanEffect.className = "scan-effect";
              wrapper.appendChild(scanEffect);
              setTimeout(() => {
                if (scanEffect.parentNode) {
                  scanEffect.parentNode.removeChild(scanEffect);
                }
              }, 600);
            }
          } else {
            if (cardRight < scannerLeft) {
              // Completely on the left side (ASCII)
              normalCard.style.setProperty("--clip-right", "100%");
              asciiCard.style.setProperty("--clip-left", "100%");
            } else if (cardLeft > scannerRight) {
              // Completely on the right side (Image)
              normalCard.style.setProperty("--clip-right", "0%");
              asciiCard.style.setProperty("--clip-left", "0%");
            }
            wrapper.removeAttribute("data-scanned");
          }
        }
      }

      (window as any).__scanningActive = anyScanningActive;
    };

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (isAnimating && !isDragging) {
        if (velocity > minVelocity) {
          velocity *= friction;
        } else {
          velocity = Math.max(minVelocity, Math.abs(velocity));
        }
        position += velocity * direction * deltaTime;
        updateCardPosition();
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (containerRef.current) {
        containerWidth = containerRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [cards]);

  // --- Scanner Canvas (Purple Effects) ---
  useEffect(() => {
    if (!scannerCanvasRef.current) return;
    const canvas = scannerCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = 400; // Match container height
    canvas.width = w;
    canvas.height = h;

    let lightBarX = w / 2;
    const lightBarWidth = 3;
    let fadeZone = 60;

    let maxParticles = 800;
    let count = 0;
    let particles: any[] = [];
    let animationId: number;

    const baseIntensity = 0.8;
    const baseMaxParticles = 800;
    const baseFadeZone = 60;

    let currentIntensity = baseIntensity;
    let currentMaxParticles = baseMaxParticles;
    let currentFadeZone = baseFadeZone;
    const transitionSpeed = 0.05;

    let currentGlowIntensity = 1;

    const gradientCanvas = document.createElement("canvas");
    const gradientCtx = gradientCanvas.getContext("2d");
    gradientCanvas.width = 16;
    gradientCanvas.height = 16;
    if (gradientCtx) {
      const half = 8;
      const gradient = gradientCtx.createRadialGradient(
        half,
        half,
        0,
        half,
        half,
        half,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(224, 205, 173, 0.8)"); // Brand lighter
      gradient.addColorStop(0.7, "rgba(197, 176, 138, 0.4)"); // Brand secondary
      gradient.addColorStop(1, "transparent");
      gradientCtx.fillStyle = gradient;
      gradientCtx.beginPath();
      gradientCtx.arc(half, half, half, 0, Math.PI * 2);
      gradientCtx.fill();
    }

    const randomFloat = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const createParticle = () => {
      const intensityRatio = currentIntensity / baseIntensity;
      const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
      const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

      return {
        x: lightBarX + randomFloat(-lightBarWidth / 2, lightBarWidth / 2),
        y: randomFloat(0, h),
        vx: randomFloat(0.2, 1.0) * speedMultiplier,
        vy: randomFloat(-0.15, 0.15) * speedMultiplier,
        radius: randomFloat(0.4, 1) * sizeMultiplier,
        alpha: randomFloat(0.6, 1),
        decay: randomFloat(0.005, 0.025) * (2 - intensityRatio * 0.5),
        originalAlpha: 0,
        life: 1.0,
        time: 0,
        twinkleSpeed: randomFloat(0.02, 0.08) * speedMultiplier,
        twinkleAmount: randomFloat(0.1, 0.25),
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.originalAlpha = p.alpha;
      count++;
      particles[count] = p;
    }

    const drawLightBar = (scanningActive: boolean) => {
      const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
      verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      verticalGradient.addColorStop(fadeZone / h, "rgba(255, 255, 255, 1)");
      verticalGradient.addColorStop(1 - fadeZone / h, "rgba(255, 255, 255, 1)");
      verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalCompositeOperation = "lighter";

      const targetGlowIntensity = scanningActive ? 3.5 : 1;
      currentGlowIntensity +=
        (targetGlowIntensity - currentGlowIntensity) * transitionSpeed;

      const glowIntensity = currentGlowIntensity;
      const glow1Alpha = scanningActive ? 1.0 : 0.8;
      const glow2Alpha = scanningActive ? 0.8 : 0.6;
      const glow3Alpha = scanningActive ? 0.6 : 0.4;

      const coreGradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth / 2,
        0,
        lightBarX + lightBarWidth / 2,
        0,
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGradient.addColorStop(
        0.3,
        `rgba(255, 255, 255, ${0.9 * glowIntensity})`,
      );
      coreGradient.addColorStop(
        0.5,
        `rgba(255, 255, 255, ${1 * glowIntensity})`,
      );
      coreGradient.addColorStop(
        0.7,
        `rgba(255, 255, 255, ${0.9 * glowIntensity})`,
      );
      coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.globalAlpha = 1;
      ctx.fillStyle = coreGradient;

      ctx.beginPath();
      ctx.roundRect(lightBarX - lightBarWidth / 2, 0, lightBarWidth, h, 15);
      ctx.fill();

      // Glow 1
      const glow1Gradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth * 2,
        0,
        lightBarX + lightBarWidth * 2,
        0,
      );
      glow1Gradient.addColorStop(0, "rgba(197, 176, 138, 0)");
      glow1Gradient.addColorStop(
        0.5,
        `rgba(224, 205, 173, ${0.8 * glowIntensity})`,
      );
      glow1Gradient.addColorStop(1, "rgba(197, 176, 138, 0)");

      ctx.globalAlpha = glow1Alpha;
      ctx.fillStyle = glow1Gradient;
      ctx.beginPath();
      ctx.roundRect(lightBarX - lightBarWidth * 2, 0, lightBarWidth * 4, h, 25);
      ctx.fill();

      // Glow 2
      const glow2Gradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth * 4,
        0,
        lightBarX + lightBarWidth * 4,
        0,
      );
      glow2Gradient.addColorStop(0, "rgba(197, 176, 138, 0)");
      glow2Gradient.addColorStop(
        0.5,
        `rgba(197, 176, 138, ${0.4 * glowIntensity})`,
      );
      glow2Gradient.addColorStop(1, "rgba(197, 176, 138, 0)");

      ctx.globalAlpha = glow2Alpha;
      ctx.fillStyle = glow2Gradient;
      ctx.beginPath();
      ctx.roundRect(lightBarX - lightBarWidth * 4, 0, lightBarWidth * 8, h, 35);
      ctx.fill();

      if (scanningActive) {
        const glow3Gradient = ctx.createLinearGradient(
          lightBarX - lightBarWidth * 8,
          0,
          lightBarX + lightBarWidth * 8,
          0,
        );
        glow3Gradient.addColorStop(0, "rgba(197, 176, 138, 0)");
        glow3Gradient.addColorStop(0.5, "rgba(197, 176, 138, 0.2)");
        glow3Gradient.addColorStop(1, "rgba(197, 176, 138, 0)");

        ctx.globalAlpha = glow3Alpha;
        ctx.fillStyle = glow3Gradient;
        ctx.beginPath();
        ctx.roundRect(
          lightBarX - lightBarWidth * 8,
          0,
          lightBarWidth * 16,
          h,
          45,
        );
        ctx.fill();
      }

      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.fillStyle = verticalGradient;
      ctx.fillRect(0, 0, w, h);
    };

    const animate = () => {
      const scanningActive = !!(window as any).__scanningActive;

      const targetIntensity = scanningActive ? 1.8 : baseIntensity;
      const targetMaxParticles = scanningActive ? 2500 : baseMaxParticles;
      const targetFadeZone = scanningActive ? 35 : baseFadeZone;

      currentIntensity +=
        (targetIntensity - currentIntensity) * transitionSpeed;
      currentMaxParticles +=
        (targetMaxParticles - currentMaxParticles) * transitionSpeed;
      currentFadeZone += (targetFadeZone - currentFadeZone) * transitionSpeed;

      maxParticles = Math.floor(currentMaxParticles);
      fadeZone = currentFadeZone;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      drawLightBar(scanningActive);

      ctx.globalCompositeOperation = "lighter";
      for (let i = 1; i <= count; i++) {
        if (particles[i]) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.time++;
          p.alpha =
            p.originalAlpha * p.life +
            Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
          p.life -= p.decay;

          if (p.x > w + 10 || p.life <= 0) {
            p.x =
              lightBarX + randomFloat(-lightBarWidth / 2, lightBarWidth / 2);
            p.y = randomFloat(0, h);
            p.vx = randomFloat(0.2, 1.0);
            p.vy = randomFloat(-0.15, 0.15);
            p.alpha = randomFloat(0.6, 1);
            p.originalAlpha = p.alpha;
            p.life = 1.0;
            p.time = 0;
          }

          if (p.life > 0) {
            let fadeAlpha = 1;
            if (p.y < fadeZone) {
              fadeAlpha = p.y / fadeZone;
            } else if (p.y > h - fadeZone) {
              fadeAlpha = (h - p.y) / fadeZone;
            }
            fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

            ctx.globalAlpha = p.alpha * fadeAlpha;
            ctx.drawImage(
              gradientCanvas,
              p.x - p.radius,
              p.y - p.radius,
              p.radius * 2,
              p.radius * 2,
            );
          }
        }
      }

      const intensityRatio = currentIntensity / baseIntensity;
      if (Math.random() < currentIntensity && count < maxParticles) {
        const p = createParticle();
        p.originalAlpha = p.alpha;
        count++;
        particles[count] = p;
      }
      if (
        intensityRatio > 1.1 &&
        Math.random() < (intensityRatio - 1.0) * 1.2
      ) {
        const p = createParticle();
        p.originalAlpha = p.alpha;
        count++;
        particles[count] = p;
      }

      if (count > maxParticles + 200) {
        const excess = Math.min(15, count - maxParticles);
        for (let i = 0; i < excess; i++) {
          delete particles[count - i];
        }
        count -= excess;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = window.innerWidth;
      canvas.width = w;
      lightBarX = w / 2;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="scanner-section-container pt-12 pb-32">
      <div className="scanner-header text-center w-full px-4 mb-8 pointer-events-none relative z-20 flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight">
          Stop Settling For <br />
          <FlipWords 
            words={["Ordinary Journeys.", "Average Travel.", "Basic Rides.", "Simple Transfers."]} 
            className="text-brand-accent transform-none relative z-20"
          />
        </h2>
        <a href="#booking" className="pointer-events-auto inline-flex h-14 items-center justify-center rounded-full bg-brand-accent px-10 text-brand-dark font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-[0_0_30px_rgba(224,205,173,0.3)]">
          Reserve Priority Fleet
        </a>
      </div>

      <div className="w-full relative h-[400px]" ref={containerRef}>
        <canvas className="particleCanvas absolute inset-0 z-0" ref={particleCanvasRef}></canvas>
        <canvas className="absolute inset-0 z-30 pointer-events-none" ref={scannerCanvasRef} style={{ mixBlendMode: 'screen' }}></canvas>

        <div className="card-stream" id="cardStream">
          <div className="card-line" ref={cardLineRef} id="cardLine">
            {cards.map((asciiText, index) => (
              <div className="card-wrapper" key={index}>
                <div className="sc-card card-normal">
                  <img
                    className="card-image bg-brand-dark object-cover w-full h-full absolute inset-0"
                    src={cardImages[index % cardImages.length]}
                    alt="Luxury Fleet"
                    loading="lazy"
                  />
                  <div className="w-full h-full border border-black/10 rounded-[15px] relative overflow-hidden">
                  </div>
                </div>
                <div className="sc-card card-ascii">
                  <div
                    className="ascii-content"
                    style={{ fontSize: "11px", lineHeight: "13px" }}
                  >
                    {asciiText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="scanner" style={{ display: "block" }}></div>
      </div>
    </section>
  );
}
