<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err instanceof Error ? err : new Error(String(err))
  return false // stop propagation
})
</script>

<template>
  <div v-if="error" role="alert">
    <p>Something went wrong: {{ error.message }}</p>
    <button @click="error = null">Try again</button>
  </div>
  <slot v-else />
</template>
