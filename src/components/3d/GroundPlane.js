import React from 'react';
import * as THREE from 'three';

/**
 * Ground plane component for 3D scene
 * Provides visual grounding for the campus model
 */
export default function GroundPlane({ size = 1000, opacity = 0.3 }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        color="#8fbc8f"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}