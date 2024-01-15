export default defineNuxtRouteMiddleware((to) => {
    const { studentDetails } = storeToRefs(useStudentPortalStore())
    const path = to.path.split('/')
    if (path.includes('studentportal')) {
        if (to.path === '/studentportal') return
        if (process.server) return
        if (process.client) {
            const token: string | null = useCookie('xToken', {default: () => null}).value
            if (studentDetails.value?.matricNo && token) return
            else return navigateTo('/studentportal');
        }
    }
})