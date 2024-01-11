<script lang="ts" setup>
    definePageMeta({
        layout: 'login'
    })

    import type { CustomError, ActivationData, StudentResponseData } from '~/types'
    import { toast } from 'vue3-toastify';

    const { email, role } = storeToRefs(useDashboardUpdateStore())
    const { studentDetails } = storeToRefs(useStudentPortalStore())

    const password = ref('');
    const confirmPassword = ref('');
    const token = ref('')
    const isConfirmedPassword = ref(true)
    const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
    let numberOfTries = 0
    const MAX_RETRIES = 2

    // delay the evaluation of the password
    const validatePassword = useDebounceFn(() => {
        isConfirmedPassword.value = (password.value === confirmPassword.value)
    }, 300, { maxWait: 1000 })

    function onSubmit(){
        if (!isConfirmedPassword.value) {
            toast.warning("Your passwords do not match, please check properly", {
                autoClose: 3000
            });

            // clear the password inputs
            password.value = '';
            confirmPassword.value = '';
            
            return
        }
        const userCredentials = `${email.value}:${password.value}`
        // convert to Base64
        const authToken = btoa(userCredentials)
        const BasicAuthHeader = {
            'Authorization': `Basic ${authToken}`
        }
        // compile form input data
        const formData = {
            token: token.value,
        };
        const toastId = toast.loading('Please wait...', { autoClose: 2000 })
        const requestEndpoint = `/${role.value}portal/activateprofile`;
        useMakeRequest(requestEndpoint, 'POST', JSON.stringify(formData), true, BasicAuthHeader)
        .then((response) => {
            numberOfTries++;
            const status = response.status.value;
            if (status === 'success') {
                return response.data.value
            } else if (status === 'error') {
                const statusCode = (response.error.value as CustomError)?.statusCode
                if (statusCode === 400) {
                    throw new Error('Invalid Token');
                } else throw new Error('Server Error, Try again later');
            }
        })
        .then((responseData) => {
            const response = responseData as StudentResponseData
            toast.update(toastId, {
                render: 'Activation successful, you have been logged into your account',
                autoClose: true,
                closeOnClick: true,
                closeButton: true,
                type: 'success',
                isLoading: false,
            })
            console.log('validation response:', response)
            document.cookie = `xToken=${response.xToken}`
            document.cookie = `userData=${JSON.stringify(response)}`
            studentDetails.value = response
            useDelayNavigationBriefly(`/dashboard`)
        })
        .catch((error: Error) => {
            toast.update(toastId, {
                render: `${error.message}`,
                autoClose: true,
                closeOnClick: true,
                closeButton: true,
                type: "error",
                isLoading: false,
            })
            toast.done(toastId)
            if (numberOfTries >= MAX_RETRIES) {
                toast.info('Redirecting you...', { autoClose: 1000})
                useDelayNavigationBriefly('/');
            }

            // clear the all inputs
            password.value = '';
            confirmPassword.value = '';
            token.value = '';
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