<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui'
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHandle,
} from 'vaul-vue'
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {},
)

const open = defineModel<boolean>('open', { default: false })

// ponytail: matchMedia over a media-query lib; matches Tailwind's `md` breakpoint
const isDesktop = ref(false)
let mql: MediaQueryList | undefined
const sync = () => (isDesktop.value = mql!.matches)

onMounted(() => {
  mql = window.matchMedia('(min-width: 768px)')
  sync()
  mql.addEventListener('change', sync)
})
onUnmounted(() => mql?.removeEventListener('change', sync))
</script>

<template>
  <!-- Desktop: centered dialog -->
  <DialogRoot v-if="isDesktop" v-model:open="open">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/60" />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-800 p-6 text-white shadow-xl focus:outline-none"
      >
        <DialogTitle v-if="title" class="text-lg font-bold">{{ title }}</DialogTitle>
        <DialogDescription v-if="description" class="mt-1 text-sm text-gray-400">
          {{ description }}
        </DialogDescription>
        <div class="mt-4">
          <slot :close="() => (open = false)" />
        </div>
        <DialogClose
          class="absolute right-4 top-4 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Close"
        >
          &times;
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <!-- Mobile: bottom drawer -->
  <DrawerRoot v-else v-model:open="open" swipe-direction="down">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay class="fixed inset-0 z-50 bg-black/60" />
      <DrawerContent
        class="fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[90vh] flex-col rounded-t-lg bg-gray-800 p-6 text-white focus:outline-none"
      >
        <DrawerHandle class="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-600" />
        <DrawerTitle v-if="title" class="text-lg font-bold">{{ title }}</DrawerTitle>
        <DrawerDescription v-if="description" class="mt-1 text-sm text-gray-400">
          {{ description }}
        </DrawerDescription>
        <div class="mt-4 overflow-y-auto">
          <slot :close="() => (open = false)" />
        </div>
        <DrawerClose class="sr-only" aria-label="Close" />
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
