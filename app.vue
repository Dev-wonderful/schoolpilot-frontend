<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'School Pilot',
  meta: [
    { name: 'description', content: 'Shool Management WebApp.' },
    {name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {charset: 'utf-8' },
    {'http-equiv': 'X-UA-Compatible', content: 'IE-edge'}
  ],

  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp' },
    { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' },
  ],
})
</script>