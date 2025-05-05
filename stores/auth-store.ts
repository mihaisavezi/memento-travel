import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<authClient.useSession>> | null>(null);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const user = computed(() => session.value.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn(provider: "google" | "github") {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signIn.social({
      provider,
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo("/");
  }

  return {
    init,
    loading,
    signIn,
    signOut,
    user,
  };
});
