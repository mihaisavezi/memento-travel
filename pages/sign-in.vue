<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { z } from "zod";

const { backgroundColorClasses } = useUIColors();

const authStore = useAuthStore();

const schema = toTypedSchema(
  z.object({
    email: z.string().nonempty().email(),
  }),
);

const { errors, handleSubmit, setErrors, defineField } = useForm({
  validationSchema: schema,
});
const submitError = ref("");
const [email, emailAttrs] = defineField("email");
const submitted = ref(false);

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await authStore.signInWithMagicLink(values);
    actions.resetForm();
    submitted.value = true;
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data)
      setErrors(error.data?.data);
    submitError.value = error.statusMessage || "An unknown error occurred";
  }
});
</script>

<template>
  <ColorScheme>
    <div v-if="submitted" class="toast">
      <div class="alert alert-success">
        <span>Check your email address.</span>
      </div>
    </div>
    <div
      class="hero flex flex-col justify-center align-center mx-auto flex-1 bg-radial-[at_50%_75%] from-sky-300 via-base-500 to-indigo-950 to-90%"
    >
      <div class="card card-border border-base-300 card-sm overflow-hidden" :class="backgroundColorClasses">
        <div class="border-base-300 border-b border-dashed">
          <div class="flex items-center gap-2 p-4">
            <div class="grow">
              <div class="flex items-center gap-2 text-sm font-medium">
                <Icon name="tabler:user" size="24" />
                Sign in to your account
              </div>
            </div>
          </div>
        </div>
        <div class="card-body pt-12">
          <AuthButton provider="github" />
          <div class="divider px-4" />
          <AuthButton provider="google" />
          <div class="divider px-4">
            OR
          </div>
          <form novalidate @submit="onSubmit">
            <AppFormField
              v-model="email"
              name="email"
              type="email"
              label="Email"
              :error="errors.email"
              v-bind="emailAttrs"
            />
            <button class="btn" :disabled="submitted">
              Sign in with magic link
              <Icon name="tabler:mail-fast" size="24" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </ColorScheme>
</template>
