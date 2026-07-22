<template>
  <div class="flex min-h-[184px] flex-col items-center justify-center gap-3">
    <template v-if="loading">
      <div class="h-40 w-40 animate-pulse rounded-lg bg-gray-700" />
      <div class="h-4 w-24 animate-pulse rounded bg-gray-700" />
    </template>

    <template v-else-if="badgeUrl">
      <img
        :src="badgeUrl"
        :alt="season?.strSeason ? `Season badge for ${season.strSeason}` : 'Season badge'"
        class="h-40 w-auto object-contain"
      />
      <p v-if="season?.strSeason" class="text-sm font-medium text-gray-300">
        {{ season.strSeason }}
      </p>
    </template>

    <template v-else>
      <div
        class="flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-600 text-gray-500"
      >
        <ImageOff :size="32" />
        <span class="text-xs">No badge available</span>
      </div>
      <p v-if="season?.strSeason" class="text-sm font-medium text-gray-300">
        {{ season.strSeason }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ImageOff } from '@lucide/vue'
import type { Season } from '@/types/sports'

const props = withDefaults(
  defineProps<{
    season?: Season | null
    loading?: boolean
  }>(),
  { season: null, loading: false },
)

const badgeUrl = computed(() => props.season?.strBadge ?? null)
</script>
