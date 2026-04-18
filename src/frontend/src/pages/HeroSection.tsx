import { Button } from "@/components/ui/button";
import { Environment, Float, MeshWobbleMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRouter } from "@tanstack/react-router";
import { ChevronDown, Phone, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import type * as THREE from "three";

function FloatingShape({
  position,
  rotation,
  scale,
  color,
  shape,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  shape: "box" | "sphere" | "cylinder" | "cone" | "torus";
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      rotation[0] + state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y =
      rotation[1] + state.clock.elapsedTime * speed * 0.5;
    meshRef.current.rotation.z =
      rotation[2] + state.clock.elapsedTime * speed * 0.2;
  });

  const geometry = () => {
    switch (shape) {
      case "box":
        return <boxGeometry args={[1, 1, 1]} />;
      case "sphere":
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case "cylinder":
        return <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />;
      case "cone":
        return <coneGeometry args={[0.5, 1.2, 32]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 100]} />;
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry()}
        <MeshWobbleMaterial
          color={color}
          factor={0.15}
          speed={0.8}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </Float>
  );
}

const SHAPES = [
  {
    position: [-3.5, 1.2, -2] as [number, number, number],
    rotation: [0.5, 0.3, 0.2] as [number, number, number],
    scale: 1.1,
    color: "#c0392b",
    shape: "box" as const,
    speed: 0.8,
  },
  {
    position: [3.2, -0.8, -1.5] as [number, number, number],
    rotation: [0.2, 0.8, 0.4] as [number, number, number],
    scale: 0.9,
    color: "#e67e22",
    shape: "sphere" as const,
    speed: 1.1,
  },
  {
    position: [-2, -1.5, -3] as [number, number, number],
    rotation: [1, 0.2, 0.6] as [number, number, number],
    scale: 0.8,
    color: "#f39c12",
    shape: "torus" as const,
    speed: 0.7,
  },
  {
    position: [2.5, 1.8, -2.5] as [number, number, number],
    rotation: [0.3, 1.2, 0.1] as [number, number, number],
    scale: 0.7,
    color: "#d35400",
    shape: "cylinder" as const,
    speed: 1.3,
  },
  {
    position: [-4, -0.2, -1] as [number, number, number],
    rotation: [0.8, 0.5, 0.9] as [number, number, number],
    scale: 0.6,
    color: "#e74c3c",
    shape: "cone" as const,
    speed: 0.9,
  },
  {
    position: [4.5, 0.5, -3] as [number, number, number],
    rotation: [0.1, 0.7, 0.3] as [number, number, number],
    scale: 1.0,
    color: "#ca6f1e",
    shape: "box" as const,
    speed: 0.6,
  },
  {
    position: [0.5, 2.5, -4] as [number, number, number],
    rotation: [0.6, 0.2, 0.8] as [number, number, number],
    scale: 0.75,
    color: "#f0b27a",
    shape: "sphere" as const,
    speed: 1.0,
  },
  {
    position: [-1, -2.5, -2.5] as [number, number, number],
    rotation: [0.9, 0.4, 0.1] as [number, number, number],
    scale: 0.85,
    color: "#b7770d",
    shape: "torus" as const,
    speed: 1.2,
  },
];

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ff6b35" />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#ffa500" />
      <pointLight position={[0, 8, -5]} intensity={1} color="#ffcc44" />
      <Environment preset="night" />
      {SHAPES.map((props, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static array with no reordering
        <FloatingShape key={i} {...props} />
      ))}
    </>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/70 via-background/40 to-background/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm mb-6"
        >
          <div className="flex gap-0.5">
            {["s1", "s2", "s3", "s4", "s5"].map((k) => (
              <Star key={k} className="w-3.5 h-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span className="text-sm font-body text-accent font-medium">
            4.9 · Open 24 Hours · Lahore
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight text-foreground mb-6"
        >
          Savor the{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-glow">
            Flavors
          </span>
          <br />
          of Pakistan
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Experience authentic taste reimagined in a sophisticated setting. A
          modern culinary journey through the heart of Lahori cuisine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={() => router.navigate({ to: "/order" })}
            className="gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold text-base px-8 py-6 rounded-xl transition-smooth hover:scale-105"
            data-ocid="hero.order_button"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Order Now
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent/50 text-accent hover:text-accent hover:bg-accent/10 hover:border-accent font-semibold text-base px-8 py-6 rounded-xl backdrop-blur-sm transition-smooth hover:scale-105"
            data-ocid="hero.call_button"
          >
            <a href="tel:+923084000364">
              <Phone className="w-5 h-5 mr-2" />
              +92 308 4000364
            </a>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToMenu}
            className="text-muted-foreground hover:text-foreground font-medium text-base px-8 py-6 rounded-xl transition-smooth"
            data-ocid="hero.explore_menu_button"
          >
            Explore Menu
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-foreground transition-fast animate-float"
        data-ocid="hero.scroll_indicator"
        aria-label="Scroll to menu"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}
