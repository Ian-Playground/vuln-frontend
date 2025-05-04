<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Create Vulnerability</h1>
    <Suspense>
      <VulnerabilityForm />
      <template #fallback>
        <div class="flex justify-center">
          <ULoadingIcon />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import VulnerabilityForm from '~/components/vulnerabilities/VulnerabilityForm.vue'

definePageMeta({
  middleware: ['auth']
})

onMounted(() => {
  console.log('Create page mounted')
})
</script> 