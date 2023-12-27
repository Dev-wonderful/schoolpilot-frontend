<script lang="ts" setup>
    import type { ScheduleType, ResponseType } from '~/types';
    const monthParams = useRoute().params.month as string
    console.log('hello from month')

    const scheduleStore = useScheduleStore()
    const { scheduleData } = storeToRefs(scheduleStore)
    console.log(scheduleData.value)
    if (scheduleData.value.length === 0) {
        console.log('request')
        const requestEndpoint = `/api/v1/schedule?month=${monthParams}`
        const { data, error } = await useMakeRequest(requestEndpoint) as ResponseType<ScheduleType>
        if (error.value) scheduleData.value = [];
        else scheduleData.value = data.value
    }
</script>

<template>
    <h1>Hello from main</h1>
    <section class="container">
        <NuxtPage/>
    </section>
</template>