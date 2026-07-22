<template>
  <main class="mx-auto max-w-5xl px-4 py-8">
    <header class="mb-6 flex flex-col gap-3 sm:flex-row">
      <label for="league-search" class="sr-only">Search leagues</label>
      <input
        id="league-search"
        v-model="searchTerm"
        type="text"
        placeholder="Search leagues…"
        class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/40"
      />
      <SportSelect v-model="sportFilter" :sports="sports" />
    </header>

    <p
      v-if="errorMessage"
      role="alert"
      class="mb-6 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400"
    >
      {{ errorMessage }}
    </p>

    <p v-if="isLoading" class="text-center text-gray-400">Loading leagues…</p>

    <p v-else-if="filteredLeagues.length === 0" class="text-center text-gray-400">
      {{ searchTerm ? `No leagues match “${searchTerm}”.` : 'No leagues found.' }}
    </p>

    <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      <BaseLeague
        v-for="league in filteredLeagues"
        :key="league.idLeague"
        v-bind="league"
        @fetch-season-badge="openSeasonBadge"
      />
    </div>

    <DrawerDialog v-model:open="isBadgeOpen" title="Season badge">
      <SeasonBadge :season="selectedSeason" :loading="isSeasonLoading" />
    </DrawerDialog>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { fetchLeagues, fetchSeasonBadge } from '@/api'
import type { League, Season } from '@/types/sports'
import BaseLeague from '@/components/BaseLeague.vue'
import DrawerDialog from '@/components/DrawerDialog.vue'
import SeasonBadge from '@/components/SeasonBadge.vue'
import SportSelect from '@/components/SportSelect.vue'

const leagues = ref<League[]>([])
const selectedSeason = ref<Season | null>(null)
const errorMessage = ref<string | null>(null)
const searchTerm = ref('')
const sportFilter = ref('all')
const isLoading = ref(true)
const isBadgeOpen = ref(false)
const isSeasonLoading = ref(false)

const sports = computed(() =>
  [...new Set(leagues.value.map((l) => l.strSport))].filter(Boolean).sort(),
)

const filteredLeagues = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  return leagues.value.filter((league) => {
    if (sportFilter.value !== 'all' && league.strSport !== sportFilter.value) return false
    if (!query) return true
    return [league.strLeague, league.strLeagueAlternate, league.strSport].some((field) =>
      field?.toLowerCase().includes(query),
    )
  })
})

onMounted(async () => {
  try {
    leagues.value = await fetchLeagues()
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to load leagues'
  } finally {
    isLoading.value = false
  }
})

const openSeasonBadge = async (leagueId: string) => {
  errorMessage.value = null
  selectedSeason.value = null
  isSeasonLoading.value = true
  isBadgeOpen.value = true
  try {
    selectedSeason.value = await fetchSeasonBadge(leagueId)
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : 'Failed to load season'
    isBadgeOpen.value = false
  } finally {
    isSeasonLoading.value = false
  }
}
</script>
