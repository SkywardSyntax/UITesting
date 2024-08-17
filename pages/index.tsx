import { useCallback, useEffect, useState, FC } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import GlassChip from '../components/GlassChip'
import styles from '../styles/home.module.css'
import * as THREE from 'three';

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

const Home: FC = () => {
  const [count, setCount] = useState<number>(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  const [ivoryBalls, setIvoryBalls] = useState<any[]>([]);

  const createIvoryBall = () => {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xfffff0 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(Math.random() * 20 - 10, 15, Math.random() * 20 - 10);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.userData = { velocity: 0 };
    return sphere;
  };

  const updateIvoryBalls = (spheres: any[], scene: any) => {
    spheres.forEach(sphere => {
      sphere.userData.velocity += 0.01;
      sphere.position.y -= sphere.userData.velocity;
      if (sphere.position.y < -15) {
        scene.remove(sphere);
      }
    });
    return spheres.filter(sphere => sphere.position.y >= -15);
  };

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    light.castShadow = true;
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    camera.position.z = 15;

    function animate() {
      requestAnimationFrame(animate);

      if (Math.random() < 0.1) {
        const newIvoryBall = createIvoryBall();
        scene.add(newIvoryBall);
        setIvoryBalls(prev => [...prev, newIvoryBall]);
      }

      setIvoryBalls(prev => updateIvoryBalls(prev, scene));

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <main className={styles.main}>
      <h1>Fast Refresh Demo</h1>
      <p>
        Fast Refresh is a Next.js feature that gives you instantaneous feedback
        on edits made to your React components, without ever losing component
        state.
      </p>
      <hr className={styles.hr} />
      <GlassChip>
        <div>
          <p>
            Auto incrementing value. The counter won't reset after edits or if
            there are errors.
          </p>
          <p>Current value: {count}</p>
        </div>
      </GlassChip>
      <hr className={styles.hr} />
      <GlassChip>
        <div>
          <p>Component with state.</p>
          <ClickCount />
        </div>
      </GlassChip>
      <hr className={styles.hr} />
      <GlassChip>
        <div>
          <p>
            The button below will throw 2 errors. You'll see the error overlay to
            let you know about the errors but it won't break the page or reset
            your state.
          </p>
          <Button
            onClick={(e) => {
              setTimeout(() => document.parentNode(), 0)
              throwError()
            }}
          >
            Throw an Error
          </Button>
        </div>
      </GlassChip>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home
