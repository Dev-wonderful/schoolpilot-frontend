<script lang="ts" setup>
    definePageMeta({
        layout: 'home'
    })

    import type { CustomError } from '~/types'

    const { email, role } = storeToRefs(useDashboardUpdateStore())

    type ActivationData = {
        email: string,
        message: string,
        token: string
    }

    const route = useRoute()
    const { role: userRole } = route.query
    const userEmail = ref('');
    const firstname = ref('');
    const isValidEmail = ref(false)
    
    function validateEmail() {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValidEmail.value = emailRegex.test(userEmail.value);
    }
    function onSubmit(){
        if (!isValidEmail.value) {
            alert("Please enter a valid email address")
        }
        const formData = {
            email: userEmail.value,
            firstName: firstname.value,
        };
        console.log(formData)
        
        const requestEndpoint = `/${userRole}portal/signin`;
        useMakeRequest(requestEndpoint, 'POST', JSON.stringify(formData), true).then((response) => {
            // console.log('Data:', response.data.value)
            // console.log('Error:', (response.error.value as CustomError)?.statusCode)
            const status = response.status.value
            console.log(status)
            if (status === 'success') {
                // console.log('successful')
                return response.data.value
            } else if (status === 'error') {
                const statusCode = (response.error.value as CustomError)?.statusCode
                if (statusCode === 400) {
                    // console.log('throw error')
                    throw new Error('Sorry your request was not successful,\nTry again later or reach out to your admin if this persists\nThis may be due to invalid credentials')
                } else navigateTo('/');
            }
        })
        .then((response) => {
            console.log('activation response:', response)
            email.value = (response as ActivationData).email;
            role.value = userRole as string
            navigateTo('/account_activation')
        })
        .catch((error: Error) => alert(error.message))
        
        // console.log('nothing')
    }
</script>

<template>
    <div class="flex bg-primary flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-xl shadow-md">
            <div class="flex flex-col items-center mb-10 gap-y-1 justify-center">
                <img src="/assets/images/GraduationCap.png" class="bg-primary w-16">
                <p class="font-bold text-primary">SchoolPilot</p>
            </div>
            <NuxtLoadingIndicator />
            <div class="flex flex-col items-center justify-center">
                <form @submit.prevent="onSubmit" @keypress.enter="onSubmit" class="flex flex-col items-center justify-center">
                    <input type="text" v-model="firstname" placeholder="FirstName" required 
                           class="border valid:border-green-400 invalid:brder-red-400 focus:outline-none border-primary focus:border-[#3c005a] rounded-xl w-72 h-12 mb-4 px-4" />
                    <input type="email" id="email" v-model="userEmail" @input="validateEmail" placeholder="Email" required 
                           class="focus:outline-none focus:border-[#3c005a] valid:border-green-400 invalid:brder-red-400 border border-primary rounded-xl w-72 h-12 mb-4 px-4">
                    <button type="submit" class="bg-primary rounded-xl text-white py-4 font-bold  text-2xl mb-4 w-72 text-center" to="/loginPage">Activate Account</button>
                </form>
            </div>
        </div>
    </div>
</template>

