import type { DashboardUpdate, Dashboard, StudentResponseData } from "~/types";

export const useStudentPortalStore = defineStore('studentportal', () => {
    // The first 3 state would be gotten from login endpoint
    const studentDetails = ref(useCookie<Partial<StudentResponseData>>('userData', {default: () => ref({})}).value.Dashboard)
    console.log('store student',studentDetails.value)
    // const studentPersonalDetails = computed(() => studentDetails.value.)
    // const name = ref('<firstname lastname>');
    // const email = ref('')
    // const idNumber = ref('12345')
    // const role = ref('student');
    const avatar = computed(() => studentDetails.value?.picture)
    // const portal = ref()
    const infoUpdates = ref<DashboardUpdate>({
        'Pending Assignments': [],
        'Upcoming Schedules': []
    })

    return { infoUpdates, studentDetails, avatar }
})