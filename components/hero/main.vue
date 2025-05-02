<script setup lang="ts">
import { OrbitControls } from "@tresjs/cientos";
import { PCFSoftShadowMap, SRGBColorSpace } from "three";
import { shallowRef } from "vue";

import HeroPlanet from "./planet.vue";

const gl = {
  shadows: true,
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  shadowMapType: PCFSoftShadowMap,
  windowSize: false,
};

const yRotation = shallowRef(0);
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta;
});
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 1, 4]"
      :fov="75"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls :enable-zoom="false" />

    <TresAmbientLight color="#484068" :intensity="1" />
    <Suspense>
      <HeroPlanet />
    </Suspense>
    <Stars
      :rotation="[0, yRotation, 0]"
      :radius="50"
      :depth="100"
      :count="600"
      :size="0.75"
      :size-attenuation="true"
    />
    <TresPointLight
      color="#1BFFEF"
      :position="[0, 0, -8]"
      :intensity="80"
      cast-shadow
    />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="3"
      cast-shadow
    />
  </TresCanvas>
</template>
