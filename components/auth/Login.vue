<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRuntimeConfig, useRouter, useNuxtApp } from '#app';
import type { Form } from "#ui/types";
import type { AuthProviders } from "~/index";
import { useAuthStore } from '~/stores/auth';
import { useToast } from '#imports';
import { useHttp } from '~/composables/useHttp';

interface LoginResponse {
  ok: boolean;
  token: string;
  errors?: Record<string, string[]>;
}

const config = useRuntimeConfig();
const router = useRouter();
const auth = useAuthStore();
const form = ref<Form<any> | null>(null);
const toast = useToast();
const nuxtApp = useNuxtApp();

const state = reactive({
  email: "",
  password: "",
  remember: false,
});

const { refresh: onSubmit, status: loginStatus } = useHttp<LoginResponse>("login", {
  method: "POST",
  body: state,
  immediate: false,
  watch: false,
  async onFetchResponse({ response }) {
    if (response?.status === 422) {
      form.value?.setErrors(response._data?.errors || {});
    } else if (response?._data?.ok) {
      nuxtApp.$token.value = response._data.token;

      await auth.fetchUser();
      await router.push("/");
    }
  }
});

const providers = ref<AuthProviders>(config.public.providers);

async function handleMessage(event: { data: any }): Promise<void> {
  const provider = event.data.provider as string;

  if (Object.keys(providers.value).includes(provider) && event.data.token) {
    providers.value[provider].loading = false;
    nuxtApp.$token.value = event.data.token;

    await auth.fetchUser();
    await router.push("/");
  } else if (event.data.message) {
    toast.add({
      icon: "i-heroicons-exclamation-circle-solid",
      color: "error",
      title: event.data.message,
    });
  }
}

function loginVia(provider: string): void {
  if (providers.value[provider]) {
    providers.value[provider].loading = true;

    const width = 640;
    const height = 660;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      `${config.public.apiBase}${config.public.apiPrefix}/login/${provider}/redirect`,
      "Sign In",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scollbars=no, resizable=no, copyhistory=no, width=${width},height=${height},top=${top},left=${left}`
    );

    const interval = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(interval);
        if (providers.value[provider]) {
          providers.value[provider].loading = false;
        }
      }
    }, 500);
  }
}

onMounted(() => window.addEventListener("message", handleMessage));
onBeforeUnmount(() => window.removeEventListener("message", handleMessage));
</script>

<template>
  <div class="space-y-4">

    <UForm ref="form" :state="state" @submit="onSubmit" class="space-y-4">
      <UFormField label="Email" name="email" required>
        <UInput
          v-model="state.email"
          class="w-full"
          placeholder="you@example.com"
          icon="i-heroicons-envelope"
          trailing
          type="email"
          autofocus
        />
      </UFormField>

      <UFormField label="Password" name="password" required>
        <UInput v-model="state.password" type="password" class="w-full" placeholder="••••••••" />
      </UFormField>

      <UTooltip :delay-duration="0" text="for 1 month" :content="{ side: 'right', align: 'center' }">
        <div class="inline-flex">
          <UCheckbox v-model="state.remember" label="Remember me" class="inline-flex" />
        </div>
      </UTooltip>

      <div class="flex items-center justify-end space-x-4">
        <UButton type="submit" label="Login" :loading="loginStatus === 'pending'" />
      </div>
    </UForm>

    <div class="text-sm">
      Don't have an account yet?
      <NuxtLink class="text-sm" to="/auth/register">Sign up now</NuxtLink>
    </div>
  </div>
</template>
