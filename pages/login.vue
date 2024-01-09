<script lang="ts" setup>
    definePageMeta({
        layout: 'home'
    })

    import type { CustomError } from '~/types'

    type loginData = {
        email: string,
        message: string,
        xToken: string
    }

    const route = useRoute();
    const { role } = route.query;
    const roleState = ref(role as string)
    const matricNo = ref('');
    const password = ref('');
    // const isValidEmail = ref(false);
    const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
    
    // function validateEmail() {
    //     const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     isValidEmail.value = emailRegex.test(userEmail.value);
    // }
    function onSubmit(){
        const userCredentials = `${matricNo.value}:${password.value}`
        // convert to Base64
        const authToken = btoa(userCredentials)
        console.log('auth:', authToken)
        const BasicAuthHeader = {
            'Authorization': `Basic ${authToken}`
        }
        const formData = {
            matricNo: matricNo.value,
            password: password.value,
        };
        console.log(formData)
        
        const requestEndpoint = `/${role as string}portal/login`;
        useMakeRequest(requestEndpoint, 'POST', undefined, true, BasicAuthHeader)
        .then((response) => {
            // console.log('Data:', response.data.value)
            // console.log('Error:', (response.error.value as CustomError)?.statusCode)
            const status = response.status.value
            // console.log(status)
            if (status === 'success') {
                // console.log('successful')
                return response.data.value
            } else if (status === 'error') {
                const statusCode = (response.error.value as CustomError)?.statusCode
                console.log('error')
                if (statusCode === 401) {
                    // console.log('throw error')
                    throw new Error('Sorry invalid credentials')
                } else {
                    throw new Error('Forbidden')
                }
            }
        })
        .then((response) => {
            console.log('loggedin response:', response)
            // email.value = (response as ActivationData).email
            document.cookie = `xToken=${(response as loginData)?.xToken}`
            navigateTo('/dashboard')
        })
        .catch((error: Error) => {
            alert(error.message);
            navigateTo(`/signup?role=${role as string}`)
        })
        
        // console.log('nothing')
        // func(name=value)
    }
    console.log('student:', role === 'student' ? 'Matric Number': 'Staff ID')
    watch(roleState, (newRole) => {
        console.log('new role', newRole)
        location.reload()
    })
</script>

<template>
    <div class="flex bg-primary flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center w-96 h-[450px] py-6 bg-white rounded-xl shadow-md">
            <div class="flex flex-col items-center mb-10 gap-y-1 justify-center">
                <img src="/assets/images/GraduationCap.png" class="bg-primary w-16">
                <p class="font-bold text-primary">SchoolPilot</p>
            </div>
            <div class="flex flex-col items-center justify-center">
                <form @submit.prevent="onSubmit" @keypress.enter="onSubmit" class="flex flex-col gap-y-4 items-center justify-center">
                    <input type="text" id="matric-no" v-model="matricNo" :placeholder="roleState === 'student' ? 'Matric Number': 'Staff ID'" required 
                           class="focus:outline-none focus:border-[#3c005a] valid:border-green-400 invalid:border-red-400 border border-primary rounded-xl w-72 h-12 px-4">
                    <input type="password" v-model="password" placeholder="Password" :pattern="passwordPattern" required 
                           class="border valid:border-green-400 invalid:border-red-400 focus:outline-none border-primary focus:border-[#3c005a] rounded-xl w-72 h-12 px-4" />
                    <div class="clickables flex flex-col gap-1">
                        <button type="submit" class="bg-primary rounded-xl text-white py-4 font-bold  text-2xl mb-4 w-72 text-center">Login</button>
                        <NuxtLink :to="`reset_password?role=${role as string}`" class="text-red-400 h10 text-xs hover:text-red-300">forgot password?</NuxtLink>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

