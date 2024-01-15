import type { DashboardUpdate, StaffDashboard, StaffResponseData } from "~/types";
import { useStorage } from '@vueuse/core';

export const useStaffPortalStore = defineStore('staffportal', () => {
    // The first 3 state would be gotten from login endpoint
    const staffDetails = ref(useStorage<Partial<StaffResponseData>>('userData', {}).value?.Dashboard)
    const avatar = computed(() => staffDetails.value?.picture)
    const infoUpdates = ref<DashboardUpdate>({
        'Pending Assignments': [],
        'Upcoming Schedules': []
    })

    return { infoUpdates, staffDetails, avatar }
})