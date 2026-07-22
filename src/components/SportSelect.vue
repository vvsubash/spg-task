<template>
  <SelectRoot v-model="model">
    <SelectTrigger
      aria-label="Filter by sport"
      class="flex items-center justify-between gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/40 sm:w-56"
    >
      <SelectValue placeholder="All sports" />
      <ChevronDown class="h-4 w-4 text-gray-400" />
    </SelectTrigger>
    <SelectPortal>
      <SelectContent
        position="popper"
        :side-offset="4"
        class="z-50 max-h-60 min-w-[--reka-select-trigger-width] overflow-hidden rounded-lg border border-gray-700 bg-gray-800 text-white shadow-xl"
      >
        <SelectViewport class="p-1">
          <SelectItem
            value="all"
            class="flex cursor-pointer items-center rounded px-3 py-2 text-sm outline-none data-[highlighted]:bg-gray-700"
          >
            <SelectItemText>All sports</SelectItemText>
          </SelectItem>
          <SelectItem
            v-for="sport in sports"
            :key="sport"
            :value="sport"
            class="flex cursor-pointer items-center rounded px-3 py-2 text-sm outline-none data-[highlighted]:bg-gray-700"
          >
            <SelectItemText>{{ sport }}</SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
} from 'reka-ui'
import { ChevronDown } from '@lucide/vue'

defineProps<{ sports: string[] }>()
const model = defineModel<string>({ required: true })
</script>
