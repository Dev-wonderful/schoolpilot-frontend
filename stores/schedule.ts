import type { daysNum, ScheduleType, SortedResponseByDayType } from "~/types";

export const useScheduleStore = defineStore("scheduleStore", () => {
    const currentDate = new Date().toDateString()
    const presentMonth = ref(useDateFormat(currentDate, 'MMMM YYYY').value)
    const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    const daysInMonth: globalThis.Ref<daysNum> = ref({
        'January': 31,
        'February': 28,
        'March': 31,
        'April': 30,
        'May': 31,
        'June': 30,
        'July': 31,
        'August': 31,
        'September': 30,
        'October': 31,
        'November': 30,
        'December': 31,
    })
    const scheduleData = ref(useCookie<ScheduleType>('scheduleData', {maxAge: 30, default: () => ref({})}).value)
    // const scheduleData: globalThis.Ref<ScheduleType> = ref({})
    const scheduleDataSortedByDay = ref(useCookie<SortedResponseByDayType>('scheduleDataSortedByDay', {maxAge: 30, default: () => ref({})}).value)
    // const scheduleDataSortedByDay: globalThis.Ref<SortedResponseByDayType> = ref({})
    const reloadData = ref(false)

    return { presentMonth, days, daysInMonth, scheduleData, scheduleDataSortedByDay, reloadData }
}, {persist: [
        {
            paths: ['presentMonth'],
            storage: persistedState.cookiesWithOptions({
                maxAge: 30
            })
        } 
    ]
})