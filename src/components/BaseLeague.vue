<template>
  <article
    class="group w-full rounded-lg border-t-4 border-t-green-400 bg-gray-800 transition-colors hover:bg-gray-700 focus-within:ring-2 focus-within:ring-green-400/60"
  >
    <button
      type="button"
      class="flex w-full cursor-pointer flex-col items-start gap-1 p-4 text-left focus:outline-none"
      :aria-label="`View season badge for ${strLeague}`"
    >
      <span class="text-[10px] font-bold uppercase tracking-widest text-green-400">
        {{ strSport }}
      </span>

      <h3 class="text-lg font-bold leading-tight tracking-tight text-white">
        {{ strLeague }}
      </h3>

      <span v-if="strLeagueAlternate" class="text-sm text-gray-400">
        {{ strLeagueAlternate }}
      </span>

      <span
        @click="emit('fetchSeasonBadge', idLeague)"
        class="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400 transition-colors group-hover:text-green-400"
      >
        View season badge
        <ArrowRight :size="14" class="transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  </article>
</template>

<script setup lang="ts">
import type { League } from '@/types/sports'
import { ArrowRight } from '@lucide/vue'

defineProps<League>()

const emit = defineEmits<{
  fetchSeasonBadge: [idLeague: League['idLeague']]
}>()
</script>
