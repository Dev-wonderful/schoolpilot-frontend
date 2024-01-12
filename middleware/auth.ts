export default defineNuxtRouteMiddleware((to) => {
    const { studentPersonalDetails } = storeToRefs(useStudentPortalStore())
    console.log('I ran')
    if (process.server) {
        if (studentPersonalDetails.value?.matricNo) return
        else return navigateTo('/studentportal');
    }
    if (process.client) {
        const token: string | null = useCookie('xToken', {default: () => null}).value
        console.log('token:', token)
        if (studentPersonalDetails.value?.matricNo && token) return
        else return navigateTo('/studentportal');
    }
})