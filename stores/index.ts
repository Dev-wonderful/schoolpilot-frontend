import { type UpdateType, type StudentData } from "~/types";

export const useDashboardUpdateStore = defineStore('dashboardUpdate', () => {
    // The first 3 state would be gotten from login endpoint
    // const studentPersonalDetails = ref<Partial<StudentData>>({})
    const name = ref('')
    const email = ref('')
    // const idNumber = ref('12345')
    const role = ref('student');
    // const avatar = ref(null)
    // const portal = ref()
    // const infoUpdates: globalThis.Ref<UpdateType[] | []> = ref([
    //     {title: 'Pending Assignments', data: []},
    //     {title: 'Upcoming Schedules', data: []},
    
    // ])

    return { name, email, role }
})