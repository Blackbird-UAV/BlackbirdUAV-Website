import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const lerp = (s, e, t) => s + (e - s) * t;

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const modelRef = useRef(null);
  const uniformScaleRef = useRef(null);
  const mouseDisplacementRef = useRef(null);
  const hoverXAmplitudeRef = useRef(null);
  const hoverYAmplitudeRef = useRef(null);
  const droneYRef = useRef(0);

  const modelXOffset = 1;
  const modelYOffset = 0;
  const modelScale = 0.0003;
  const minScale = 0.3;
  const mouseSpeed = 0.05;
  const rotationMagnitude = 0.02;
  const hoverXOffset = 0.6;
  const hoverYOffset = 0.4;
  const rotationXBase = Math.PI / 7;
  const rotationYBase = Math.PI / 4;
  const scrollLerpSpeed = 0.1;
  const droneLerpSpeed = 0.1;

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const scroll = { x: 0, y: 0 };
    const targetScroll = { x: 0, y: 0 };

    mouseDisplacementRef.current = 1000 * modelScale;
    hoverXAmplitudeRef.current = 350 * modelScale * (window.innerWidth / 1920);
    hoverYAmplitudeRef.current = 200 * modelScale * (window.innerHeight / 1080);

    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/assets/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load("/assets/model/final_export.glb", (gltf) => {
      const model = gltf.scene;
      modelRef.current = model;

      model.traverse((child) => {
        if (child.isMesh) {
          child.material = child.material.clone();
        }
      });

      model.position.x += modelXOffset;
      model.position.y += modelYOffset;

      uniformScaleRef.current = Math.max(minScale, window.innerWidth * modelScale);
      model.scale.set(uniformScaleRef.current, uniformScaleRef.current, uniformScaleRef.current);

      scene.add(model);
      animate();
    }, undefined, (error) => {
      console.error("Error loading model: ", error);
    });

    // const light1 = new THREE.DirectionalLight(0xfdffd3, 3);
    // light1.position.set(10, 10, 10);
    // scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xfdffd3, 1);
    light2.position.set(-10, 10, -10);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xe7f5fb, 3);
    scene.add(ambientLight);

    const handleMouseMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);

      if (modelRef.current) {
        uniformScaleRef.current = Math.max(minScale, window.innerWidth * modelScale);
        modelRef.current.scale.set(uniformScaleRef.current, uniformScaleRef.current, uniformScaleRef.current);
      }

      mouseDisplacementRef.current = 1000 * modelScale * Math.max(0.7, Math.min(1.1, window.innerWidth / 1080));
      hoverXAmplitudeRef.current = 350 * modelScale * (window.innerWidth / 1920);
      hoverYAmplitudeRef.current = 200 * modelScale * (window.innerHeight / 1080);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x = lerp(mouse.x, targetMouse.x, mouseSpeed);

      const time = performance.now() * 0.002;
      const hoverX = Math.sin(time * hoverXOffset) * hoverXAmplitudeRef.current;
      const hoverY = Math.cos(time * hoverYOffset) * hoverYAmplitudeRef.current;

      const rotationX = rotationXBase;
      const rotationY = rotationYBase + mouse.x * Math.PI * rotationMagnitude;

      targetScroll.x = window.scrollY * modelScale * 100;
      targetScroll.y = window.scrollY * modelScale * 100 * -0.25;

      scroll.x = lerp(scroll.x, targetScroll.x, scrollLerpSpeed);
      scroll.y = lerp(scroll.y, targetScroll.y, scrollLerpSpeed);

      let droneTargetY = 0;
      if (window.innerWidth <= 600) {
        droneTargetY = modelScale * 7000;
      } else if (window.innerWidth <= 1100) {
        droneTargetY = modelScale * 5000;
      }
      droneYRef.current = lerp(droneYRef.current, droneTargetY, droneLerpSpeed);

      scene.traverse((model) => {
        if (model.isMesh) {
          model.rotation.x = rotationX;
          model.rotation.y = rotationY;

          model.position.x = (-mouse.x * mouseDisplacementRef.current + hoverX + scroll.x) / uniformScaleRef.current;
          model.position.y = (mouseDisplacementRef.current + hoverY + scroll.y + droneYRef.current) / uniformScaleRef.current;
        }
      });

      renderer.render(scene, camera);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

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
        left: 0,
        transform: "translate(0, 0)",
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeScene;