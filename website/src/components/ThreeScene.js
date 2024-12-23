import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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
  let uniformScale;
  const minScale = 0.3;

  const mouse = { x: 0, y: 0 };
  const targetMouse = { x: 0, y: 0 };
  const mouseSpeed = 0.05;

  const rotationMagnitude = 0.02;

  let mouseDisplacement = 1000 * modelScale;

  const hoverXOffset = 0.6;
  const hoverYOffset = 0.4;
  let hoverXAmplitude = 350 * modelScale;
  let hoverYAmplitude = 200 * modelScale;

  const rotationXBase = Math.PI / 7;
  const rotationYBase = Math.PI / 4;

  const scroll = { x: 0, y: 0 };
  const targetScroll = { x: 0, y: 0 };
  const scrollLerpSpeed = 0.1;

  let droneY = 0;
  let droneTargetY = 0;
  let droneLerpSpeed = 0.1;

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
    dracoLoader.setDecoderPath('/assets/draco/')

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    let model;
    loader.load(
      "/assets/model/final.glb",
      (gltf) => {
        model = gltf.scene;
        modelRef.current = model;

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

        uniformScale = Math.max(minScale, window.innerWidth * modelScale);

        model.scale.set(uniformScale, uniformScale, uniformScale);

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Error loading model: ", error);
      }
    );

    const light1 = new THREE.PointLight(0xfdffd3, 1000, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    cube1.position.set(10, 10, 10);
    // scene.add(cube1);

    const light2 = new THREE.PointLight(0xfdffd3, 500, 50);
    light2.position.set(-10, 10, -10);
    scene.add(light2);

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    cube2.position.set(-10, 10, -10);
    // scene.add(cube2);

    const light3 = new THREE.PointLight(0xfdffd3, 500, 50);
    light3.position.set(-10, 0, 10);
    scene.add(light3);

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    cube3.position.set(-10, 0, 10);
    // scene.add(cube3);

    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    const ambientLight = new THREE.AmbientLight(0x404040, 20);
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
        uniformScale = Math.max(minScale, window.innerWidth * modelScale);
        modelRef.current.scale.set(uniformScale, uniformScale, uniformScale);
      }

      mouseDisplacement =
        20000 *
        modelScale *
        Math.max(0.7, Math.min(1.1, window.innerWidth / 1080));
      hoverXAmplitude = 6000 * modelScale * (window.innerWidth / 1920);
      hoverYAmplitude = 4000 * modelScale * (window.innerHeight / 1080);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      mouse.x = lerp(mouse.x, targetMouse.x, mouseSpeed);
      mouse.y = lerp(mouse.y, targetMouse.y, mouseSpeed);

      const time = Date.now() * 0.002;
      const hoverX = Math.sin(time * hoverXOffset) * hoverXAmplitude;
      const hoverY = Math.cos(time * hoverYOffset) * hoverYAmplitude;

      const rotationX = rotationXBase + mouse.y * Math.PI * -rotationMagnitude;
      const rotationY = rotationYBase + mouse.x * Math.PI * rotationMagnitude;

      targetScroll.x = window.scrollY * modelScale * 100;
      targetScroll.y = window.scrollY * modelScale * 100 * -0.25;

      scroll.x = lerp(scroll.x, targetScroll.x, scrollLerpSpeed);
      scroll.y = lerp(scroll.y, targetScroll.y, scrollLerpSpeed);

      if (window.innerWidth <= 600) {
        droneTargetY = modelScale * 42000;
      } else if (window.innerWidth <= 1100) {
        droneTargetY = modelScale * 36000;
      } else {
        droneTargetY = 0;
      }
      droneY = lerp(droneY, droneTargetY, droneLerpSpeed);

      scene.traverse((model) => {
        if (model.isMesh) {
          model.rotation.x = rotationX;
          model.rotation.y = rotationY;

          model.position.x =
            (-mouse.x * mouseDisplacement + hoverX + scroll.x) / uniformScale;
          model.position.y =
            (-mouse.y * mouseDisplacement + hoverY + scroll.y + droneY) /
            uniformScale;
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
