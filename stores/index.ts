import { type UpdateType } from "~/types";

export const useDashboardUpdateStore = defineStore('dashboardUpdate', () => {
    // The first 3 state would be gotten from login endpoint
    const name: globalThis.Ref<null | string> = ref('<firstname lastname>');
    const idNumber: globalThis.Ref<null | string> = ref('12345')
    const role: globalThis.Ref<null | string> = ref('student');
    const avatar: globalThis.Ref<null | string> = ref(null)
    const infoUpdates: globalThis.Ref<UpdateType[] | []> = ref([])

    return { name, role, idNumber, infoUpdates, avatar }
})