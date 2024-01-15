import type { ScheduleObjType, ResponseType, SortedResponseByDayType, SortedDayType } from '~/types';
// import type { deleteThisCookie } from '~/utils';
export default defineNuxtRouteMiddleware( (to) => {
    // skip middleware on server
    if (process.server) return

    // Import stores
    const { studentDetails } = storeToRefs(useStudentPortalStore());
    const { scheduleDataSortedByDay, presentMonth, reloadData } = storeToRefs(useScheduleStore())

    // =============================================================
    // Update schedule store with data from endpoint, 
    // clone with spread operator to prevent update by reference from the copy
    // =============================================================
    if (!Object.keys(scheduleDataSortedByDay.value).length) {
        scheduleDataSortedByDay.value = {...studentDetails.value?.schedules as SortedResponseByDayType}
    }
    // reloadData.value = true

    // =============================================================
    // Below is the logic to fetch schedule by month, which should
    // have been inside of the [month]/index.vue file
    // =============================================================
    // trigger reactivity for month changes by using computed
    const monthParams = computed(() => presentMonth.value.split(' ').join('-'))
    
    /**
     * @deprecated No longer needed since backend now sorts it for us
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
            const requestEndpoint = `/studentportal/getParsedSchedules`
            const { data, error } = await useMakeRequest(requestEndpoint, 'GET', undefined, true) as ResponseType<any>
            // const responseData = data.value
            const sortedResponseData = data.value;
            if (error.value) return false;
            else {
                // completely overwrites previous data for all available months
                scheduleDataSortedByDay.value = (sortedResponseData.parsedSchedules) as SortedResponseByDayType
            };
            // updateThisCookie('scheduleData', JSON.stringify(scheduleData.value));
            // localStorage.setItem('scheduleDataSortedByDay')
            localStorage.setItem('scheduleDataSortedByDay', JSON.stringify(scheduleDataSortedByDay.value));
            // reset reload value
            reloadData.value = false;
            return true
        }
        return false
    }

    Promise.resolve(fetchSchedule(monthParams.value)).then()
    watch(monthParams, async (monthParams) => {
        updateThisCookie('presentMonth', presentMonth.value)
        await fetchSchedule(monthParams)
    })
    return
})