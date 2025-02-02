import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const lerp = (s, e, t) => {
  return s + (e - s) * t;
};

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef(null);

  // constants (play around with these values)
  const modelXOffset = 1;
  const modelYOffset = 0;

  const modelScale = 0.0003;
  // let uniformScale = null;
  const uniformScaleRef = useRef(null);
  const minScale = 0.3;

  const mouseSpeed = 0.05;

  const rotationMagnitude = 0.02;

  // let mouseDisplacement = 1000 * modelScale;
  const mouseDisplacementRef = useRef(null);

  const hoverXOffset = 0.6;
  const hoverYOffset = 0.4;
  // let hoverXAmplitude = 350 * modelScale;
  // let hoverYAmplitude = 200 * modelScale;
  const hoverXAmplitudeRef = useRef(null);
  const hoverYAmplitudeRef = useRef(null);

  const rotationXBase = Math.PI / 7;
  const rotationYBase = Math.PI / 4;

  const scrollLerpSpeed = 0.1;

  // let droneY = 0;
  const droneYRef = useRef(0);
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
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(
      // fixes scrollbar issue
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/assets/draco/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/assets/model/final_export.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        model.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone();
          }
        });

        // calibrate the model origin
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // model.position.sub(center);
        // model.position.x -= center.x;
        // model.position.y -= center.y;
        // model.position.z -= center.z;

        // have the model above the blackbird text
        model.position.x += modelXOffset;
        model.position.y += modelYOffset;

        uniformScaleRef.current = Math.max(minScale, window.innerWidth * modelScale);

        model.scale.set(uniformScaleRef.current, uniformScaleRef.current, uniformScaleRef.current);

        scene.add(model);
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading model: ", error);
      }
    );

    const light1 = new THREE.PointLight(0xfdffd3, 1000, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xfdffd3, 300, 30);
    light2.position.set(-10, 10, -10);
    scene.add(light2);

    // const light3 = new THREE.PointLight(0xfdffd3, 120, 12);
    // light3.position.set(3, 10, -5);
    // scene.add(light3);

    const ambientLight = new THREE.AmbientLight(0xe7f5fb, 5);
    scene.add(ambientLight);

    const handleMouseMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerWidth) * 2 + 1;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // renderer.setSize(width, height);
      renderer.setSize(
        // fixes scrollbar issue
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      );

      if (modelRef.current) {
        uniformScaleRef.current = Math.max(minScale, window.innerWidth * modelScale);
        modelRef.current.scale.set(uniformScaleRef.current, uniformScaleRef.current, uniformScaleRef.current);
      }

      mouseDisplacementRef.current =
        1000 *
        modelScale *
        Math.max(0.7, Math.min(1.1, window.innerWidth / 1080));
      hoverXAmplitudeRef.current = 350 * modelScale * (window.innerWidth / 1920);
      hoverYAmplitudeRef.current = 200 * modelScale * (window.innerHeight / 1080);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x = lerp(mouse.x, targetMouse.x, mouseSpeed);
      mouse.y = lerp(mouse.y, targetMouse.y, mouseSpeed);

      const time = Date.now() * 0.002;
      const hoverX = Math.sin(time * hoverXOffset) * hoverXAmplitudeRef.current;
      const hoverY = Math.cos(time * hoverYOffset) * hoverYAmplitudeRef.current;

      const rotationX = rotationXBase + mouse.y * Math.PI * -rotationMagnitude;
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

          model.position.x =
            (-mouse.x * mouseDisplacementRef.current + hoverX + scroll.x) / uniformScaleRef.current;
          model.position.y =
            (-mouse.y * mouseDisplacementRef.current + hoverY + scroll.y + droneYRef.current) /
            uniformScaleRef.current;
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
  }, [rotationXBase, rotationYBase]);

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
