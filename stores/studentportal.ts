import type { DashboardUpdate, StudentDashboard, StudentResponseData } from "~/types";
import { useStorage } from '@vueuse/core'

export const useStudentPortalStore = defineStore('studentportal', () => {
    // The first 3 state would be gotten from login endpoint
    const studentDetails = ref(useStorage<Partial<StudentDashboard>>('userData', {}).value)
    
    const avatar = computed(() => studentDetails.value?.picture)
    const infoUpdates = ref<DashboardUpdate>({
        'Pending Assignments': [],
        'Upcoming Schedules': []
    })

    return { infoUpdates, studentDetails, avatar }
})