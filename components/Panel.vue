<!-- components/Panel.vue -->
<template>
  <div style="border: 1px solid #ccc; border-radius: 12px; padding: 20px; max-width: 400px; margin: 40px auto;">
    <header style="font-weight: bold; margin-bottom: 12px;">
      <slot name="header" />
    </header>
    <div>
      <slot />
    </div>
  </div>
</template>