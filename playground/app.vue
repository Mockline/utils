<template>
  <div class="size-full">
    <h1 class="text-center text-2xl">
      Mockline Utils Playground
    </h1>
    <button @click="() => toast.info('Hello There!')">
      Render a toast
    </button>
    <MToasts />
  </div>
</template>
