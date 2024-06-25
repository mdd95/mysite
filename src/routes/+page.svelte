<script lang="ts">
  import { useEventListener } from 'runed';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
  import RAPIER from '@dimforge/rapier3d-compat';
  import Dice3dModel from '$lib/assets/3dmodels/dice-transformed.glb?url';

  let canvasContainer: HTMLElement;

  $effect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    canvasContainer.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 10);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(2.5, 1.0, -2.5);
    camera.lookAt(0, 0, 0);

    useEventListener(window, 'resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0, 1.2, -1.0);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    const backlight = new THREE.DirectionalLight(0xffffff, 2);
    backlight.position.set(0, 1.2, 1.0);
    backlight.castShadow = true;
    backlight.shadow.mapSize.width = 2048;
    backlight.shadow.mapSize.height = 2048;
    scene.add(backlight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100).rotateX(-Math.PI / 2),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.5,
        metalness: 1
      })
    );
    ground.receiveShadow = true;
    scene.add(ground);

    let dice: THREE.Group | undefined = undefined;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    dracoLoader.preload();

    const loader = new GLTFLoader();

    loader.setDRACOLoader(dracoLoader);
    loader.load(Dice3dModel, (glb) => {
      dice = glb.scene;
      dice.scale.set(0.1, 0.1, 0.1);
      dice.position.set(0, 10, 0);
      dice.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
      });
      scene.add(dice);
    });

    RAPIER.init().then(() => {
      const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

      const groundColliderDesc = RAPIER.ColliderDesc.cuboid(10, 0.5, 10)
        .setTranslation(0, -0.5, 0)
        .setFriction(0.5)
        .setRestitution(0.75);
      world.createCollider(groundColliderDesc);

      const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(0, 1, 0)
        .setLinvel(1 + Math.random(), 0, 0)
        .setAngvel({
          x: Math.random() * 2,
          y: Math.random() * 2,
          z: Math.random() * 2
        });
      const rigidBody = world.createRigidBody(rigidBodyDesc);
      const colliderDesc = RAPIER.ColliderDesc.cuboid(0.1, 0.1, 0.1).setMass(0.1);
      world.createCollider(colliderDesc, rigidBody);

      function loop() {
        world.step();
        if (dice) {
          dice.position.copy(rigidBody.translation());
          dice.quaternion.copy(rigidBody.rotation());
        }
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    });

    function animate() {
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
    return () => {
      renderer.dispose();
    };
  });
</script>

<svelte:head>
  <title>mjayar</title>
</svelte:head>

<div bind:this={canvasContainer} class="relative h-screen w-full overflow-hidden"></div>
