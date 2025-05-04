<script setup lang="ts">
const router = useRouter();
const auth = useAuthStore();

const open = ref(false);

useSeoMeta({
  title: 'Home',
})
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-12">
      <UCard>
        <template v-if="auth.logged">
          <div class="font-bold text-lg leading-tight tracking-tighter mb-4">
            User Object
          </div>
          <pre>{{ auth.user }}</pre>
        </template>
        <template v-else>
          <div class="font-bold text-lg leading-tight tracking-tighter mb-4 text-red-500">
            No session found
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
