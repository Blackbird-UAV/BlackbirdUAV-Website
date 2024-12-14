import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };

  // constants (play around with these values)
  const modelScale = 40000;
  let uniformScale;
  const mouseSpeed = 0.05;

  const rotationMagnitude = 0.015;
  const mouseDisplacement = 0.4;

  const hoverXOffset = 0.6;
  const hoverYOffset = 0.4;
  const hoverXAmplitude = 0.1;
  const hoverYAmplitude = 0.07;

  const rotationXBase = Math.PI / 7;
  const rotationYBase = Math.PI / 4;

  const scrollSpeed = 0.005;
  const scroll = { x: 0, y: 0 };
  const targetScroll = { x: 0, y: 0 };
  const scrollLerpSpeed = 0.1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    const loader = new GLTFLoader();
    let model;
    loader.load(
      "/assets/model/Final.gltf", // replace with path to apogee
      (gltf) => {
        model = gltf.scene;

        modelRef.current = model;

        // calibrate the model origin
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        // model.position.x -= center.x;
        // model.position.y -= center.y;
        // model.position.z -= center.z;

        model.position.x += 0.8;
        model.position.y += 2;

        uniformScale = window.outerWidth / modelScale;

        model.scale.set(uniformScale, uniformScale, uniformScale);


        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading model: ", error);
      }
    );

    const light = new THREE.PointLight(0xfdffd3, 100, 50);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const handleMouseMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (modelRef.current) {
        uniformScale = window.outerWidth / modelScale;
        modelRef.current.scale.set(uniformScale, uniformScale, uniformScale);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x += (targetMouse.x - mouse.x) * mouseSpeed;
      mouse.y += (targetMouse.y - mouse.y) * mouseSpeed;

      const time = Date.now() * 0.002;
      const hoverX = Math.sin(time * hoverXOffset) * hoverXAmplitude;
      const hoverY = Math.cos(time * hoverYOffset) * hoverYAmplitude;

      const rotationX = rotationXBase + mouse.y * Math.PI * -rotationMagnitude;
      const rotationY = rotationYBase + mouse.x * Math.PI * rotationMagnitude;

      targetScroll.x = window.scrollY * scrollSpeed;
      targetScroll.y = window.scrollY * scrollSpeed * -0.25;

      scroll.x += (targetScroll.x - scroll.x) * scrollLerpSpeed;
      scroll.y += (targetScroll.y - scroll.y) * scrollLerpSpeed;

      scene.traverse((model) => {
        if (model.isMesh) {
          model.rotation.x = rotationX;
          model.rotation.y = rotationY;

          model.position.x =
            (-mouse.x * mouseDisplacement + hoverX + scroll.x) / uniformScale;
          model.position.y =
            (-mouse.y * mouseDisplacement + hoverY + scroll.y) / uniformScale;
        }
      });

      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeScene;
