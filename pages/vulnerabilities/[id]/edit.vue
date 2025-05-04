<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Edit Vulnerability</h1>
    <div v-if="pending" class="flex justify-center">
      <ULoadingIcon />
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else-if="!vulnerability" class="text-red-500">
      Vulnerability not found
    </div>
    <VulnerabilityForm
      v-else
      :vulnerability="vulnerability"
      :is-edit="true"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import type { Vulnerability } from '~/types/vulnerability'
import { useHttp } from '~/composables/useHttp'
import { useRouter, useRoute } from '#app'
import VulnerabilityForm from '~/components/vulnerabilities/VulnerabilityForm.vue'

definePageMeta({
  middleware: ['auth']
})

const router = useRouter()
const route = useRoute()

const { data: vulnerability, pending, error } = await useHttp<Vulnerability>(`vulnerabilities/${route.params.id}`, {
  immediate: true,
  watch: false
})

const handleSubmit = () => {
  router.push('/vulnerabilities')
}

const handleCancel = () => {
  router.push('/vulnerabilities')
}
</script> 