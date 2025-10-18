import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function PirateShipScene() {
  const { scene } = useGLTF('/assets/pirateShip.glb');
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return <primitive object={scene} ref={ref} scale={0.5} position={[0, -1, 0]} />;
}
