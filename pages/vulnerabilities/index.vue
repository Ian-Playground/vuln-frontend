<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Vulnerabilities</h1>
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-arrow-path"
          label="Refresh"
          color="gray"
          :loading="pending"
          @click="refresh"
        />
        <UButton
          icon="i-heroicons-plus"
          label="New Vulnerability"
          @click="navigateTo('/vulnerabilities/create')"
        />
      </div>
    </div>

    <div v-if="pending" class="flex justify-center">
      <ULoadingIcon />
    </div>

    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else>
      <UTable
        :data="data?.data || []"
        :columns="columns"
        :loading="pending"
      />

      <div class="mt-4 flex justify-center">
        <UPagination
          v-model="page"
          :total="data?.total"
          :page-count="data?.per_page"
          :total-pages="data?.last_page"
        />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed, watch, h, resolveComponent } from 'vue'
import { format } from 'date-fns'
import type { Vulnerability, TableColumn, PaginatedResponse } from '~/types/vulnerability'
import { useHttp } from '~/composables/useHttp'
import { navigateTo } from '#app'
import DeleteConfirmation from '~/components/vulnerabilities/DeleteConfirmation.vue'
import { useOverlay } from '#imports'

definePageMeta({
  middleware: ['auth']
})

const page = ref(1)
const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const vulnerabilityToDelete = ref<Vulnerability | null>(null)
const deleteTrigger = ref<HTMLElement | null>(null)
const overlay = useOverlay()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UPopover = resolveComponent('UPopover')
const UIcon = resolveComponent('UIcon')

const columns: TableColumn<Vulnerability>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'severity',
    header: 'Severity',
    cell: ({ row }) => {
      const severity = row.getValue('severity') as Vulnerability['severity']
      const color = getSeverityColor(severity)
      return h(UBadge, { color, variant: 'subtle' }, () => severity)
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as Vulnerability['status']
      const color = getStatusColor(status)
      return h(UBadge, { color, variant: 'subtle' }, () => status)
    }
  },
  {
    accessorKey: 'reported_by_name',
    header: 'Reported By'
  },
  {
    accessorKey: 'assigned_to_name',
    header: 'Assigned To'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const date = row.getValue('created_at') as string
      return new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return h('div', { class: 'flex gap-2' }, [
        h(UButton, {
          icon: 'i-heroicons-pencil-square',
          color: 'gray',
          variant: 'ghost',
          onClick: () => navigateTo(`/vulnerabilities/${row.original.id}/edit`)
        }),
        h(UButton, {
          icon: 'i-heroicons-trash',
          color: 'red',
          variant: 'ghost',
          onClick: () => openDeleteModal(row.original)
        })
      ])
    }
  }
]

const { data, pending, error, refresh } = await useHttp<PaginatedResponse<Vulnerability>>('vulnerabilities', {
  query: computed(() => ({
    page: page.value
  })),
  transform: (response: any) => {
    console.log('Raw response:', response)
    const transformed = {
      data: response.data || [],
      total: response.total || 0,
      per_page: response.per_page || 10,
      current_page: response.current_page || 1,
      last_page: response.last_page || 1
    }
    console.log('Transformed data:', transformed)
    return transformed
  }
})


const getSeverityColor = (severity: Vulnerability['severity']): string => {
  const colors: Record<Vulnerability['severity'], string> = {
    'Critical': 'red',
    'High': 'orange',
    'Medium': 'yellow',
    'Low': 'blue',
    'Info': 'gray'
  }
  return colors[severity] || 'gray'
}

const getStatusColor = (status: Vulnerability['status']): string => {
  const colors: Record<Vulnerability['status'], string> = {
    'Open': 'red',
    'In Progress': 'yellow',
    'Fixed': 'green',
    'False Positive': 'gray'
  }
  return colors[status] || 'gray'
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  return format(new Date(dateString), 'MMM d, yyyy HH:mm')
}

const openDeleteModal = async (vulnerability: Vulnerability) => {
  const modal = overlay.create(DeleteConfirmation, {
    props: {
      vulnerability
    }
  })

  const instance = modal.open()
  const shouldDelete = await instance.result

  if (shouldDelete) {
    await handleDelete(vulnerability)
  }
}

const handleDelete = async (vulnerability: Vulnerability): Promise<void> => {
  isDeleting.value = true
  try {
    await useHttp(`vulnerabilities/${vulnerability.id}`, {
      method: 'DELETE'
    })
    await refresh()
  } catch (error) {
    console.error('Error deleting vulnerability:', error)
  } finally {
    isDeleting.value = false
  }
}
</script> 