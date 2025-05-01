<script lang="ts" setup>
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

async function signIn() {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
}
</script>

<template>
  <a
    href=""
    class="btn btn-accent"
    @click="signIn"
  >
    Sign In With Github
    <Icon name="tabler:brand-github" />
  </a>
</template>;
