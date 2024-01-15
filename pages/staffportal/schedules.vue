<script lang="ts" setup>
    definePageMeta({
        middleware: ['fetch-month']
    })
</script>
<template>
    <ClientOnly>
        <NuxtPage :page-key="route => route.fullPath"/>
    </ClientOnly>
</template>