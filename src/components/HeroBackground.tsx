"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.cjs";

function ParticleField() {
  const ref = useRef(null);
  const sphere = useMemo(() => {
    const arr = random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });
    return new Float32Array(arr.buffer);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      (ref.current as any).rotation.x -= delta / 10;
      (ref.current as any).rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a64b5b"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function FloatingShape({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      (meshRef.current as any).rotation.x += delta * 0.2;
      (meshRef.current as any).rotation.y += delta * 0.3;
      (meshRef.current as any).position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
    </mesh>
  );
}

export function HeroBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
        <FloatingShape position={[-2, 1, -0.5]} scale={0.3} color="#a64b5b" />
        <FloatingShape position={[2, -1, -0.5]} scale={0.2} color="#c06073" />
        <FloatingShape position={[-1, -2, -0.3]} scale={0.25} color="#a64b5b" />
      </Canvas>
    </div>
  );
}
