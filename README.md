# Sports League Explorer

I built this responsive Vue application to browse sports leagues and view an available season badge. The data comes from [TheSportsDB](https://www.thesportsdb.com/).

## Features

- Search leagues by name, alternate name, or sport
- Filter leagues by sport
- View season badges in a desktop dialog or mobile bottom drawer
- Loading, empty, missing-badge, and request-error states
- Responsive design decisions such as opening dialog on desktop and drawer on mobile

## Tech stack

- Vue 3, TypeScript, and Vite
- Tailwind CSS
- Reka UI and Vaul Vue
- Lucide icons

## Run locally

Requires Node.js `^22.18.0` or `>=24.12.0` and pnpm.

```sh
pnpm install
pnpm dev
```

The development server prints the local URL. No environment variables are required; the app uses TheSportsDB's public API endpoint.

## My technical decisions

I kept the solution intentionally small and focused on clear ownership of data, reusable UI, and predictable user feedback.

- **Vue 3 Composition API with TypeScript:** I used `<script setup>` for concise components and TypeScript interfaces at the API boundary so unexpected response shapes are easier to identify during development.
- **Local state instead of a global store:** all shared behavior belongs to one page, so introducing Pinia would add unnecessary indirection. I kept request, search, filter, and overlay state in `HomePage.vue` and passed only the required data to child components.
- **Small component boundaries:** I separated the league card, sport selector, badge content, and responsive overlay. Each component has one main responsibility and can be changed or tested independently.
- **Computed client-side filtering:** the leagues endpoint returns the complete dataset, so I fetch it once and derive both the sport list and visible leagues with computed values. This avoids duplicate state and a network request for every search change.
- **A thin API layer:** I isolated HTTP and response-mapping logic in `src/api`. Components work with typed domain data and do not need to know endpoint details.
- **Promise-based request caching:** I cache the request promise rather than only the final response. This deduplicates concurrent requests as well as later repeated requests. Failed requests are removed from the cache so the user can retry.
- **Responsive interaction pattern:** I show a centered dialog on desktop and a swipeable bottom drawer on mobile. Reka UI and Vaul Vue provide focus management, keyboard behavior, and accessible semantics that would be easy to miss in a custom implementation.
- **Explicit UI states:** I designed loading, empty, no-match, missing-badge, and error states instead of treating the successful response as the only flow.

## Trade-offs and next steps

For the scope of this task, an in-memory cache and client-side filtering keep the implementation simple. With a larger dataset or a production backend, I would add pagination or server-side search, cache expiry, request cancellation, automated component/API tests, and more granular retry feedback. also would have used pinia and async library as well if the scope has dictated

## AI tools

I used Claude Code as a collaborative development tool to review the implementation, generate portions of the code, and help prepare the documentation. Approximately 40% of the code was written directly by me, while Claude assisted with the remaining 60%. However, I independently reviewed and validated its output against the codebase, made all final technical and architectural decisions, and retained full responsibility for the completed implementation.

## Time spent

I lost track of time and exceeded the 90-minute limit, spending approximately 120 minutes in total. Most of the additional time was spent refining animations and handling miscellaneous implementation details.
