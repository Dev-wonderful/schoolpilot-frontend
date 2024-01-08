import { type UpdateType } from "~/types";

export const useDashboardUpdateStore = defineStore('dashboardUpdate', () => {
    // The first 3 state would be gotten from login endpoint
    const name = ref('<firstname lastname>');
    const email = ref('')
    const idNumber = ref('12345')
    const role = ref('student');
    const avatar = ref(null)
    const portal = ref()
    const infoUpdates: globalThis.Ref<UpdateType[] | []> = ref([])

    return { name, email, role, idNumber, infoUpdates, avatar }
})