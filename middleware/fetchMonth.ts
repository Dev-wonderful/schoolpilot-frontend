import type { ScheduleObjType, ResponseType, SortedResponseByDayType } from '~/types';
export default defineNuxtRouteMiddleware( (to) => {
    // skip middleware on server
    if (process.server) return

    // Import stores
    const { studentDetails } = storeToRefs(useStudentPortalStore());
    const { scheduleData, scheduleDataSortedByDay, presentMonth, reloadData } = storeToRefs(useScheduleStore())

    // =============================================================
    // Update schedule store with data from endpoint, but set reload
    // to true to enable it fetch schedules saved on disk too
    // =============================================================
    // clone with spread operator to prevent update by reference from the copy (i've removed the spread, I want it to update by reference for now)
    scheduleDataSortedByDay.value = {...studentDetails.value?.schedules as SortedResponseByDayType}
    reloadData.value = true

    // =============================================================
    // Below is the logic to fetch schedule by month, which should
    // have been inside of the [month]/index.vue file
    // =============================================================
    // trigger reactivity for month changes by using computed
    const monthParams = computed(() => presentMonth.value.split(' ').join('-'))
    
    /**
     * 
     * @param month 
     * @param dateData 
     * @returns The modified data
     */
    const sortScheduleByDay = (month: string, dateData: ScheduleObjType[]) => {
        const modifiedMonthData: SortedResponseByDayType = {};
        // This approach of spreading the old into the new, is to enable the combining of data from 2 different 
        // sources without the new one overwriting the old
        // first source is our backend api, second one is from our file in NUXT server
        modifiedMonthData[month] = {...scheduleDataSortedByDay.value[month]};
        if (dateData.length > 0) {
            dateData.forEach((element: ScheduleObjType) => {
                const day = useDateFormat(element.time, 'D').value
                if (day in modifiedMonthData[month] === false) modifiedMonthData[month][day] = [];
                // This approach also helps to reduce the number of times sort is called
                // We would only sort when an actual new data has been added
                if (!modifiedMonthData[month][day].includes(element)) {
                    modifiedMonthData[month][day].push(element);
                    modifiedMonthData[month][day].sort((a,b) => Date.parse(a.time) - Date.parse(b.time))
                }
            });
        }
        return modifiedMonthData
    }

    // by putting the logic to fetch schedule into a function, it can now react
    // to changes in the reactive input, which would be monthParams
    const fetchSchedule = async (month: string) => {
        // Only fetch if the state doesn't have schedule for that month or
        // the state has become stale (maxAged)
        if (month in scheduleDataSortedByDay.value === false || reloadData.value) {
            const requestEndpoint = `/api/v1/schedule?month=${month}`
            const { data, error } = await useMakeRequest(requestEndpoint) as ResponseType<ScheduleObjType[]>
            const responseData = data.value
            const sortedResponseData = sortScheduleByDay(month, responseData);
            if (error.value) return false;
            else {
                if (responseData?.length > 0) {
                    scheduleData.value[month] = responseData;
                    scheduleDataSortedByDay.value[month] = sortedResponseData[month]
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
    Promise.resolve(fetchSchedule(monthParams.value)).then()
    watch(monthParams, async (monthParams) => {
        document.cookie=`presentMonth=${presentMonth.value}`;
        await fetchSchedule(monthParams)
    })
    return
})