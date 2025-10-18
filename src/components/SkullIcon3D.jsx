import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function SkullIcon3D({ position = [0, 0, 0], scale = 0.3 }) {
  const { scene } = useGLTF('/assets/skull.glb');
  const ref = useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return <primitive object={scene} ref={ref} position={position} scale={scale} />;
}
