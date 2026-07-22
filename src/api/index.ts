import type { League, LeaguesResponse, Season, SeasonsResponse } from '../types/sports'

const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3'

const requestCache = new Map<string, Promise<unknown>>()

async function cachedGet<T>(path: string): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const cached = requestCache.get(url)

  if (cached) {
    return cached as Promise<T>
  }

  const request = fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      return response.json() as Promise<T>
    })
    .catch((error) => {
      // Do not permanently cache failed requests.
      requestCache.delete(url)
      throw error
    })

  requestCache.set(url, request)

  return request
}

export async function fetchLeagues(): Promise<League[]> {
  const response = await cachedGet<LeaguesResponse>('/all_leagues.php')
  return response.leagues ?? []
}

export async function fetchSeasonBadge(leagueId: string): Promise<Season | null> {
  const response = await cachedGet<SeasonsResponse>(
    `/search_all_seasons.php?badge=1&id=${encodeURIComponent(leagueId)}`,
  )

  return response.seasons?.find((season) => season.strBadge) ?? null
}
