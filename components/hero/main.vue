<script setup lang="ts">
import { OrbitControls } from "@tresjs/cientos";
import { PCFSoftShadowMap, SRGBColorSpace } from "three";

import HeroPlanet from "./planet.vue";

const gl = {
  clearColor: "#1d232a",
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  shadowMapType: PCFSoftShadowMap,
  windowSize: false,
};
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
