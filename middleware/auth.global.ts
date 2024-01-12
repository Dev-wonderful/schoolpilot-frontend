export default defineNuxtRouteMiddleware((to) => {
    const { studentDetails } = storeToRefs(useStudentPortalStore())
    const path = to.path.split('/')
    if (path.includes('studentportal')) {
        if (to.path === '/studentportal') return
        console.log('I ran')
        if (process.server) {
            if (studentDetails.value?.matricNo) return
            else return navigateTo('/studentportal');
        }
        if (process.client) {
            const token: string | null = useCookie('xToken', {default: () => null}).value
            console.log('token:', token)
            if (studentDetails.value?.matricNo && token) return
            else return navigateTo('/studentportal');
        }
    }
})