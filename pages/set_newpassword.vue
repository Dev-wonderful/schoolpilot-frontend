<script lang="ts" setup>
    definePageMeta({
        layout: 'login'
    })

    import type { CustomError } from '~/types'

    type ActivatiioResponseData = {
        email: string,
        message: string,
        xToken: string
    }
    const { email, role } = storeToRefs(useDashboardUpdateStore())

    const password = ref('');
    const confirmPassword = ref('');
    const token = ref('')
    const isConfirmedPassword = ref(true)
    const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"

    // delay the evaluation of the password
    const validatePassword = useDebounceFn(() => {
        isConfirmedPassword.value = (password.value === confirmPassword.value)
    }, 300, { maxWait: 1000 })

    function onSubmit(){
        if (!isConfirmedPassword.value) {
            alert("Please enter a valid password")
            return
        }
        const userCredentials = `${email.value}:${password.value}`
        // convert to Base64
        const authToken = btoa(userCredentials)
        console.log('auth:', authToken)
        const BasicAuthHeader = {
            'Authorization': `Basic ${authToken}`
        }
        // compile form input data
        const formData = {
            token: token.value,
        };
        console.log(formData)
        
        
        const requestEndpoint = `/${role.value}portal/newpassword`;
        useMakeRequest(requestEndpoint, 'POST', JSON.stringify(formData), true, BasicAuthHeader).then((response) => {
            // console.log('Data:', response.data.value)
            // console.log('Error:', (response.error.value as CustomError)?.statusCode)
            const status = response.status.value
            // console.log(status)
            if (status === 'success') {
                // console.log('successful')
                return response.data.value
            } else if (status === 'error') {
                const statusCode = (response.error.value as CustomError)?.statusCode
                if (statusCode === 401) {
                    // console.log('throw error')
                    throw new Error('Sorry invalid credentials')
                } else throw new Error('There was an error processing your request');
            }
        })
        .then((response) => {
            console.log('validation response:', response)
            document.cookie = `xToken=${(response as ActivatiioResponseData)?.xToken}`
            navigateTo(`/dashboard`)
        })
        .catch((error: Error) => {
            alert(error.message)
            navigateTo('/reset_password');
        })
    }
</script>
<template>
    <div class="flex bg-primary flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center w-96 h-[550px] bg-white rounded-xl shadow-md">
            <div class="flex flex-col items-center mb-8 gap-y-1 justify-center">
                <img src="/assets/images/GraduationCap.png" class="bg-primary w-16">
                <p class="font-bold text-primary">SchoolPilot</p>
            </div>
            <NuxtLoadingIndicator />
            <div class="flex flex-col items-center justify-center">
                <form @submit.prevent="onSubmit" class="flex flex-col items-center gap-y-4 justify-center">

                    <input type="text" v-model="token" placeholder="Enter Token" minlength="6" maxlength="6"
                           class="border valid:border-green-400 invalid:border-red-400 focus:outline-none border-primary focus:border-[#3c005a] rounded-xl w-72 h-12 px-4" required/>

                    <input type="password" name="password" v-model="password" placeholder="Password" :pattern="passwordPattern" required 
                           class="focus:outline-none focus:border-[#3c005a] valid:border-green-400 invalid:border-red-400 border border-primary rounded-xl w-72 h-12 px-4">
                    <!-- {{ password }} -->
                    <div class="flex flex-col justify-center gap-0">
                        <input type="password" name="confirmPassword" id="password" v-model="confirmPassword" :pattern="passwordPattern" @input="validatePassword" placeholder="Confirm Password" required 
                               class="focus:outline-none focus:border-[#3c005a] valid:border-green-400 invalid:border-red-400 border border-primary rounded-xl w-72 h-12 px-4">

                        <p v-if="!isConfirmedPassword" class=" text-xs text-red-500">passwords do not match</p>
                    </div>

                    <div class="w-full text-xs text-gray-400 px-2">
                        <p>Minimum length of 8</p>
                        <p>Upper case letters</p>
                        <p>Lower case etters</p>
                        <p>Special Characters (@$!%*#?&)</p>
                    </div>


                    <button :disabled="!isConfirmedPassword" type="submit" class="bg-primary rounded-xl disabled:opacity-50 text-white py-4 font-bold  text-2xl mb-4 w-72 text-center">Create Password</button>
                </form>
            </div>
        </div>
    </div>
</template>