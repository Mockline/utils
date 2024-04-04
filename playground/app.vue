<script setup lang="ts">
</script>

<template>
  <div>
    Test
    <Icon name="uil:github" color="black" size="50" />
    <button @click="() => toast.info('Hello There!')">
      Render a toast
    </button>
    <Toaster />
  </div>
</template>

<style scoped>

</style>
