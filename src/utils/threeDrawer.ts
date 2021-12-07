import {
  Cache,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  ACESFilmicToneMapping,
  sRGBEncoding,
} from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GridHelper } from "three/src/helpers/GridHelper";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

type Screen = {
  width: number;
  height: number;
};

type Camera = {
  angle: number;
  ratio: number;
  near: number;
  far: number;
};

type Position = [number, number, number];

export default class threeDrawer {
  private innerWidth: number;
  private innerHeight: number;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;

  constructor(screen: Screen, camera: Camera) {
    this.innerWidth = screen.width;
    this.innerHeight = screen.height;

    this.scene = new Scene();
    this.scene.translateY(0.05);
    this.camera = new PerspectiveCamera(
      camera.angle,
      camera.ratio,
      camera.near,
      camera.far
    );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.innerWidth, this.innerHeight);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  enableControl(): void {
    const controller = new OrbitControls(this.camera, this.renderer.domElement);
    controller.enabled = false;
  }

  enableTransform(gltf: GLTF, size: number): void {
    const transform = new TransformControls(
      this.camera,
      this.renderer.domElement
    );

    transform.addEventListener(
      "change",
      ((t) => () => {
        t.render();
      })(this)
    );
    transform.attach(gltf.scene);
    transform.setMode("rotate");
    transform.setSize(size);
    this.scene.add(transform);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  getRenderDom(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  setBackgroundColor(color: number): void {
    this.scene.background = new Color(color);
  }

  setRenderSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }

  setCameraPosition(position: Position): void {
    [this.camera.position.x, this.camera.position.y, this.camera.position.z] =
      position;
  }

  setCameraAspect(ratio: number): void {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  setGridHelper(length: number, division: number): void {
    const gridHelper = new GridHelper(length, division);
    this.scene.add(gridHelper);
  }

  setGLTFPosition(gltf: GLTF, position: Position): void {
    const [x, y, z] = position;
    gltf.scene.translateX(x);
    gltf.scene.translateY(y);
    gltf.scene.translateZ(z);
  }

  loadGltf(path: string): Promise<GLTF> {
    return new Promise<GLTF>((resolve, reject) => {
      Cache.enabled = true;
      const loader = new GLTFLoader();
      loader.load(
        path,
        (gltf) => {
          this.scene.add(gltf.scene);
          resolve(gltf);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log("An error happened", error);
          reject();
        }
      );
    });
  }
}
