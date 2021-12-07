<template><div ref="root"></div></template>

<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import threeDrawer from "../../utils/threeDrawer";

export default defineComponent({
  // eslint-disable-next-line
  setup() {
    let root = ref({} as HTMLDivElement);

    const init = async () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      const shoeDrawer = new threeDrawer(
        { width, height },
        { angle: 45, ratio: width / height, near: 0.0001, far: 100 }
      );
      shoeDrawer.setBackgroundColor(0xffffff);
      shoeDrawer.setCameraPosition([0.2, 0.1, 0.3]);
      shoeDrawer.setGridHelper(1, 10);

      const gltf = await shoeDrawer.loadGltf("/sneaker/scene.gltf");

      shoeDrawer.setGLTFPosition(gltf, [-0.15, -0.1, 0.05]);
      shoeDrawer.enableControl();
      shoeDrawer.enableTransform(gltf, 2);
      shoeDrawer.render();

      const resize = (sd: threeDrawer) => () => {
        sd.setCameraAspect(window.innerWidth / window.innerHeight);
        sd.setRenderSize(window.innerWidth, window.innerHeight);
        sd.render();
      };
      window.addEventListener("resize", resize(shoeDrawer));

      root.value.appendChild(shoeDrawer.getRenderDom());
    };

    onMounted(init);

    return {
      root,
    };
  },
});
</script>
