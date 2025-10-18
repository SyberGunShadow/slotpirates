import { useGLTF } from '@react-three/drei';

export default function TreasureMapScene() {
  const { scene } = useGLTF('/assets/treasureMap.glb');
  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
}
