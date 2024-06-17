<template>
  <div class="size-full">
    <h1 class="text-center text-2xl">
      <span class="font-newsreader italic">Mockline</span> Utils Playground
    </h1>
    <button @click="() => toast.info('Hello There!')">
      Render a toast
    </button>
    <MToasts />
  </div>
</template>
