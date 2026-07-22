<script setup lang="ts">
import ErrorBoundary from '@/components/ErrorBoundary.vue'
</script>

<template>
  <main class="min-h-screen bg-gray-900">
    <div class="mx-auto max-w-5xl px-4 py-8">
      <ErrorBoundary>
        <RouterView />
      </ErrorBoundary>
    </div>
  </main>
</template>

<style scoped></style>
