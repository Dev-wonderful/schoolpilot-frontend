<script lang="ts" setup>
    const setPortal = (role: string) => {
        document.cookie = `portal=${role}portal`
    }
    const dropdownsignup = ref(false);
    const toggledropdownsignup = () => { 
        dropdownlogin.value = false
        dropdownsignup.value = !dropdownsignup.value
    }
    const dropdownlogin = ref(false);
    const toggledropdownlogin = () => {
        dropdownsignup.value = false
        dropdownlogin.value = !dropdownlogin.value
    }
    watch([dropdownlogin, dropdownsignup], (dropdown) => {
        if (dropdown[0]) setTimeout(() => dropdownlogin.value = false, 5000)
        if (dropdown[1]) setTimeout(() => dropdownsignup.value = false, 5000)
    })
</script>

<template>
    <nav class="text-white border-none flex gap-x-3 bg-primary justify-between w-screen items-center shadow-md mx-auto h-18 py-1 px-6 md:px-16">
        <NuxtLink to="/" class=" flex hover:text-slate-200 flex-col items-center cursor-pointer">
            <img src="/assets/images/GraduationCap.png" class="w-8">
            <p class="font-bold">SchoolPilot</p>
        </NuxtLink>
        <!-- The parents would be display a dropdown -->
        <!-- TODO: create dropdown -->
        <div class=" text-center flex">
            <div class="relative inline-block w-28">
                <button type="button" @click="toggledropdownlogin" class="h-12 font-medium bg-blue400 hover:text-slate-200">Login</button>
                <div v-if="dropdownlogin" class="absolute top-12 -lef-2">
                    <div class="flex flex-col py-4 gap-3 w-32 rounded-lg px2 bg-primary">
                        <!-- <div></div> -->
                        <a @click="toggledropdownlogin" class="font-medium hover:text-slate-200 text-white" href="/login?role=staff">Staff Login</a>
                        <a @click="toggledropdownlogin" class="font-medium hover:text-slate-200 text-white" href="/studentportal">Student Login</a>
                    </div>
                </div>
            </div>
            <div class="relative inline-block w-28 bgyellow-400">
                <button type="button" @click="toggledropdownsignup" class=" font-medium h-12 hover:text-slate-200">Signup</button>
                <div v-if="dropdownsignup" class="absolute top-12 -lef-2">
                    <div class="flex flex-col py-4 gap-3 w-32 rounded-lg px2 bg-primary">
                        <a @click="toggledropdownsignup" class="font-medium text-white hover:text-slate-200" href="/signup?role=staff">Staff Signup</a>
                        <a @click="toggledropdownsignup" class="font-medium text-white hover:text-slate-200" href="/signup?role=student">Student Signup</a>
                    </div>
                </div>
            </div>
        </div>

    </nav>

</template>