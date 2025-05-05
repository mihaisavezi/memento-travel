<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

const auth = useAuthStore();
if (auth.user) {
  navigateTo("/dashboard");
}
const schema = toTypedSchema(z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
}));

const { handleSubmit, errors, values: form } = useForm({
  validationSchema: schema,
  initialValues: {
    username: "",
    email: "",
    password: "",
  },
});

const error = ref("");
const isLoading = ref(false);

const handleFormSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    error.value = "";

    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await $fetch("/api/auth/register", {
      method: "POST",
      body: values,
      headers,
    });

    // After successful registration, sign in
    await auth.signIn();

    navigateTo("/dashboard");
  }
  catch (err: any) {
    error.value = err.data?.message || "Registration failed. Please try again.";
  }
  finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">
          Register
        </h2>
        <form class="space-y-4" @submit.prevent="handleFormSubmit">
          <AppFormField
            name="username"
            :error="errors.username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            required
          />

          <AppFormField
            :error="errors.email"
            label="Email"
            placeholder="Enter your email"
            required
            name="email"
          />

          <AppFormField
            :error="errors.password"
            label="Password"
            placeholder="Enter your password"
            required
            name="password"
          />

          <div class="flex flex-col justify-between items-center">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>
            <div class="divider" />
            <p class="text-sm">
              Already have an account?
              <NuxtLink to="/login" class="text-primary hover:underline">
                Sign in
              </NuxtLink>
            </p>
          </div>

          <div v-if="error" class="text-error text-sm mt-2">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
