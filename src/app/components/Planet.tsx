import React, { useRef, useMemo, useEffect } from "react";
import type { JSX } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
    Sphere2: THREE.Mesh;
    Ring: THREE.Mesh;
  };
  materials: Record<string, THREE.Material>;
};

type PlanetProps = JSX.IntrinsicElements["group"] & {
  ringColor?: string;
  ballColor?: string;
  tintStrength?: number;
  metalness?: number;
  roughness?: number;
  envMapIntensity?: number;
};

export function Planet({
  ringColor = "#d4af37",
  ballColor = "#ffd700",
  tintStrength = 0.35,
  metalness = 0.9,
  roughness = 0.25,
  envMapIntensity = 1.0,
  ...props
}: PlanetProps) {
  const shapeContainer = useRef<THREE.Group | null>(null);
  const shperesContainer = useRef<THREE.Group | null>(null);
  const ringContainer = useRef<THREE.Mesh | THREE.Group | null>(null);

  const { nodes, materials } = useGLTF("/models/Planet.glb") as unknown as GLTFResult;

  // returns a THREE.Color used for emissive tinting
  const makeEmissive = (hex: string, strength: number): THREE.Color => {
    const c = new THREE.Color(hex);
    return c.multiplyScalar(strength);
  };

  // small helper to set envMapIntensity without using `any` or an incompatible interface
  const setEnvMapIntensity = (mat: THREE.Material, intensity: number) => {
    // cast to unknown then to a small shape that may contain envMapIntensity
    (mat as unknown as { envMapIntensity?: number }).envMapIntensity = intensity;
  };

  const ringMaterial = useMemo(() => {
    const src = materials["Material.001"] as THREE.MeshStandardMaterial | undefined;
    const mat = src ? (src.clone() as THREE.MeshStandardMaterial) : new THREE.MeshStandardMaterial();

    mat.color = new THREE.Color(ringColor);
    mat.emissive = makeEmissive(ringColor, Math.max(0.02, tintStrength * 0.6));
    mat.metalness = metalness;
    mat.roughness = roughness;

    setEnvMapIntensity(mat, envMapIntensity);

    return mat;
  }, [materials, ringColor, tintStrength, metalness, roughness, envMapIntensity]);

  const ballMaterial = useMemo(() => {
    const src = materials["Material.001"] as THREE.MeshStandardMaterial | undefined;
    const mat = src ? (src.clone() as THREE.MeshStandardMaterial) : new THREE.MeshStandardMaterial();

    mat.color = new THREE.Color(ballColor);
    mat.emissive = makeEmissive(ballColor, Math.max(0.04, tintStrength * 0.8));
    mat.metalness = metalness;
    mat.roughness = Math.max(0.08, roughness - 0.05);

    setEnvMapIntensity(mat, envMapIntensity * 1.1);

    return mat;
  }, [materials, ballColor, tintStrength, metalness, roughness, envMapIntensity]);

  useEffect(() => {
    return () => {
      if (ringMaterial && "dispose" in ringMaterial) ringMaterial.dispose();
      if (ballMaterial && "dispose" in ballMaterial) ballMaterial.dispose();
    };
  }, [ringMaterial, ballMaterial]);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (shapeContainer.current) {
      tl.from(shapeContainer.current.position, {
        y: 5,
        duration: 3,
        ease: "circ.out",
      });
    }

    if (shperesContainer.current) {
      tl.from(
        shperesContainer.current.rotation,
        {
          x: 0,
          y: Math.PI,
          z: -Math.PI,
          duration: 10,
          ease: "power1.inOut",
        },
        "-=25%"
      );
    }

    if (ringContainer.current) {
      tl.from(
        (ringContainer.current as THREE.Object3D).rotation,
        {
          x: 0.8,
          y: 0,
          z: 0,
          duration: 10,
          ease: "power1.inOut",
        },
        "<"
      );
    }
  }, []);

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={shperesContainer}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere2.geometry}
          material={ballMaterial}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        />
      </group>

      <mesh
        ref={ringContainer as React.Ref<THREE.Mesh>}
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry}
        material={ringMaterial}
        rotation={[-0.124, 0.123, -0.778]}
        scale={2}
      />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
export default Planet;
