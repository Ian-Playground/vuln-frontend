<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    title="Delete Vulnerability"
  >
    <!-- <template #content>
        <div class="flex items-center gap-3 mb-4">
        <UIcon
            name="i-heroicons-exclamation-triangle"
            class="text-red-500 w-6 h-6"
        />
        <h3 class="text-lg font-medium">Delete Vulnerability</h3>
        </div>
        
        <p class="text-gray-500 dark:text-gray-400 mb-4">
        Are you sure you want to delete this vulnerability? This action cannot be undone.
        </p>
    </template> -->
    

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton
          label="Cancel"
          color="gray"
          variant="ghost"
          @click="emit('close', false)"
        />
        <UButton
          label="Delete"
          color="red"
          :loading="loading"
          @click="handleDelete"
        />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Vulnerability } from '~/types/vulnerability'

defineProps<{
  vulnerability: Vulnerability
}>()

const emit = defineEmits<{
  close: [boolean]
}>()

const loading = ref(false)

const handleDelete = async () => {
  loading.value = true
  try {
    await emit('close', true)
  } finally {
    loading.value = false
  }
}
</script> 