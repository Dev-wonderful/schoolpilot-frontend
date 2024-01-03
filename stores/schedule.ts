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
    const scheduleData: globalThis.Ref<ScheduleType> = ref({})
    const scheduleDataSortedByDay: globalThis.Ref<SortedResponseByDayType> = ref({})

    return { presentMonth, days, daysInMonth, scheduleData, scheduleDataSortedByDay }
}, { persist: {
    storage: persistedState.cookiesWithOptions({
        maxAge: 30
    })
} })