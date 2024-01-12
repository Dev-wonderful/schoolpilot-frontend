<script lang="ts" setup>
    // import type { ScheduleType, ResponseType } from '~/types';
    // const monthParams = useRoute().params.month as string
    // console.log('hello from month')

    // const scheduleStore = useScheduleStore()
    // const { scheduleData } = storeToRefs(scheduleStore)
    // console.log(scheduleData.value)
    // if (scheduleData.value.length === 0) {
    //     console.log('request')
    //     const requestEndpoint = `/api/v1/schedule?month=${monthParams}`
    //     const { data, error } = await useMakeRequest(requestEndpoint) as ResponseType<ScheduleType>
    //     if (error.value) scheduleData.value = [];
    //     else scheduleData.value = data.value
    // }
    definePageMeta({
        middleware: (to, from) => {
            const monthParams = to.params.month as string
            
            console.log('hello month:', monthParams);
            const { presentMonth } = storeToRefs(useScheduleStore());
            if(process.server) return
            if (process.client) {
                console.log("middle in client")
                presentMonth.value = monthParams.split('-').join(' ')
                document.cookie=`presentMonth=${monthParams}; Max-Age=30`;
                return navigateTo(`/studentportal/schedules`)
            }
        }
    })
    const monthParams = useRoute().params.month as string
    const { presentMonth } = storeToRefs(useScheduleStore());
    presentMonth.value = monthParams.split('-').join(' ')
    navigateTo(`/studentportal/schedules`)
</script>

<template>
    <!-- <h1>Hello from main</h1>
    <section class="container">
        <NuxtPage/>
    </section> -->
</template>