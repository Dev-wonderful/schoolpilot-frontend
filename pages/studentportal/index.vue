<script lang="ts" setup>
    definePageMeta({
        layout: 'home'
    })
    
    import { toast } from 'vue3-toastify';
    import type { CustomError, StudentResponseData } from '~/types'

    const route = useRoute();
    const role = 'student';
    const { studentDetails } = storeToRefs(useStudentPortalStore())
    console.log('role:', role)
    const roleState = ref(role as string)
    const matricNo = ref('');
    const password = ref('');
    const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
    let numberOfTries = 0
    const MAX_RETRIES = 3
    
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
        
        const toastId = toast.loading('Please wait...', { autoClose: 2000 })
        const requestEndpoint = `/studentportal/login`;
        useMakeRequest(requestEndpoint, 'POST', undefined, true, BasicAuthHeader)
        .then((response) => {
            const status = response.status.value
            numberOfTries++
            if (status === 'success') {
                return response.data.value
            } else if (status === 'error') {
                const statusCode = (response.error.value as CustomError)?.statusCode
                if (statusCode === 401) {
                    throw new Error('Sorry invalid credentials')
                } else {
                    throw new Error('Forbidden')
                }
            }
        })
        .then((responseData) => {
            const response = responseData as StudentResponseData
            toast.update(toastId, {
                render: 'Login Successful',
                autoClose: true,
                closeOnClick: true,
                closeButton: true,
                type: 'success',
                isLoading: false,
            })
            console.log('loggedin response:', response)
            document.cookie = `xToken=${response?.xToken}`
            document.cookie = `userData=${JSON.stringify(response)}`
            studentDetails.value = response
            useDelayNavigationBriefly('studentportal/dashboard');
        })
        .catch((error: Error) => {
            toast.update(toastId, {
                render: 'Login Failed',
                autoClose: true,
                closeOnClick: true,
                closeButton: true,
                type: "error",
                isLoading: false,
            })
            toast.done(toastId)
            if (numberOfTries >= MAX_RETRIES) {
                setTimeout(() => toast.error("You've been redirected to activate your account\nIf you feel this is a mistake, contact your Admin", {autoClose: 2000}), 1000);
                navigateTo(`/signup?role=${role as string}`)
            } else toast.error(`${error.message}`, {autoClose: 2000})
            // clear input
            password.value = '';
        })
    }
</script>

<template>
    <div class="flex bg-primary flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center w-96 h-[450px] py-6 bg-white rounded-xl shadow-md">
            <div class="flex flex-col items-center mb-10 gap-y-1 justify-center">
                <img src="/assets/images/GraduationCap.png" class="bg-primary w-16">
                <p class="font-bold text-primary">SchoolPilot</p>
            </div>
            <div class="flex flex-col items-center justify-center">
                <form @submit.prevent="onSubmit" class="flex flex-col gap-y-4 items-center justify-center">
                    <input type="text" id="matric-no" v-model="matricNo" :placeholder="roleState === 'student' ? 'Matric Number': 'Staff ID'" required 
                           class="focus:outline-none focus:border-[#3c005a] valid:border-green-400 invalid:border-red-400 border border-primary rounded-xl w-72 h-12 px-4">
                    <input type="password" v-model="password" placeholder="Password" :pattern="passwordPattern" required autocomplete="current-password"
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

