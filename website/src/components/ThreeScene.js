import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const mouse = { x: 0, y: 0 };

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

    // test cube
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshStandardMaterial({ color: 0xff00ff });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    const loader = new GLTFLoader();
    let uniformScale;
    let model;
    loader.load(
      "/assets/model/Final.gltf", // replace with path to apogee
      (gltf) => {
        model = gltf.scene;

        // calibrate the model origin
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log("center:", center);
        // model.position.x -= center.x;
        // model.position.y -= center.y;
        // model.position.z -= center.z;

        model.position.x += 0.8;
        model.position.y += 2;

        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 10; // size is good at 9
        uniformScale = desiredSize / maxDim;

        console.log("scale:", uniformScale);
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
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.002;
      const hoverX = Math.sin(time * 0.6) * 0.1;
      const hoverY = Math.cos(time * 0.4) * 0.07;

      const rotationX = Math.PI / 12 + mouse.y * Math.PI * -0.1;
      const rotationY = mouse.x * Math.PI * 0.1;
      const mouseDisplacement = 1.5;

      //   cube.rotation.x = Math.PI / 8 + rotationX;
      //   cube.rotation.y = Math.PI / 4 + rotationY;
      //   cube.position.x = -mouse.x * mouseDisplacement + hoverX;
      //   cube.position.y = -mouse.y * mouseDisplacement + hoverY;

      scene.traverse((model) => {
        if (model.isMesh) {
          model.rotation.x = Math.PI / 8 + rotationX;
          model.rotation.y = Math.PI / 4 + rotationY;

          model.position.x =
            (-mouse.x * mouseDisplacement + hoverX) / uniformScale;
          model.position.y =
            (-mouse.y * mouseDisplacement + hoverY) / uniformScale;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeScene;
