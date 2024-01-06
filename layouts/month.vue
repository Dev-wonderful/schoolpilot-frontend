<script lang="ts" setup>
    const scheduleStore = useScheduleStore()
    const { presentMonth, reloadData } = storeToRefs(scheduleStore)
    // =============================================================
    // Below is the logic to fetch schedule by month, which should
    // have been inside of the [month]/index.vue file
    // =============================================================
    import type { ScheduleObjType, ResponseType, SortedResponseByDayType } from '~/types';
    // trigger reactivity for month changes by using computed
    const monthParams = computed(() => presentMonth.value.split(' ').join('-'))
    console.log(presentMonth.value)

     
    const sortScheduleByDay = (month: string, dateData: ScheduleObjType[]) => {
        const modifiedMonthData: SortedResponseByDayType = {};
        modifiedMonthData[month] = {};
        if (dateData.length > 0) {
            dateData.forEach((element: ScheduleObjType) => {
                const day = useDateFormat(element.scheduledTime, 'D').value
                if (day in modifiedMonthData[month] === false) modifiedMonthData[month][day] = [];
                modifiedMonthData[month][day].push(element);
                modifiedMonthData[month][day].sort((a,b) => Date.parse(a.scheduledTime) - Date.parse(b.scheduledTime))
            });
        }
        return modifiedMonthData
    }

    const { scheduleData, scheduleDataSortedByDay } = storeToRefs(scheduleStore)
    // by putting the logic to fetch schedule into a function, it can now react
    // to changes in the reactive input, which would be monthParams
    const fetchSchedule = async (month: string) => {
        // Only fetch if the state doesn't have schedule for that month or
        // the state has become stale (maxAged)
        if (month in scheduleData.value === false || reloadData.value) {
            console.log('called')
            console.log('reload', reloadData.value)
            const requestEndpoint = `/api/v1/schedule?month=${month}`
            const { data, error } = await useMakeRequest(requestEndpoint) as ResponseType<ScheduleObjType[]>
            const responseData = data.value
            // console.log('response', responseData)
            console.log(sortScheduleByDay(month, responseData))
            const sortedResponseData = sortScheduleByDay(month, responseData)
            if (error.value) return false;
            else {
                if (responseData?.length > 0) {
                    scheduleData.value[month] = responseData;
                    scheduleDataSortedByDay.value[month] = sortedResponseData[month]
                    console.log('updated')
                }
            }
            document.cookie = `scheduleData=${JSON.stringify(scheduleData.value)}; Max-Age=30`
            document.cookie = `scheduleDataSortedByDay=${JSON.stringify(scheduleDataSortedByDay.value)}; Max-Age=30`
            // reset reload value
            reloadData.value = false;
            return true
        }
        return false
    }
    await fetchSchedule(monthParams.value)
    watch(monthParams, async (monthParams) => {
        await fetchSchedule(monthParams)
        // console.log('changed:', monthParams)
        // if (reloadData.value) reloadData.value = false;
    })
    // scheduleStore.$persist()
    // watch(reloadData, async (reloadData) => {
    //     if (reloadData) await fetchSchedule(monthParams.value);
    // })
</script>
<template>
    <!-- <h1>hello from month layout</h1> -->
    <NuxtLayout name="default">
        <slot></slot>
    </NuxtLayout>
</template>