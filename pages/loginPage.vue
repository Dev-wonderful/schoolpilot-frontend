<script setup>
    definePageMeta({
        layout: 'login'
    })
</script>

<template>
    <div class="flex bg-primary flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-xl shadow-md">
            <div class="flex flex-col items-center mb-10 gap-y-1 justify-center">
                <img src="/assets/images/GraduationCap.png" class="bg-primary w-16">
                <p class="font-bold text-primary">SchoolPilot</p>
            </div>
            <div class="flex flex-col items-center justify-center">
                <form class="flex flex-col items-center justify-center">
                    <input type="text" placeholder="Email" required class="border focus:outline-none border-primary focus:border-[#3c005a] rounded-xl w-72 h-12 mb-4 px-4">
                    <input type="password" placeholder="Password" required class="focus:outline-none focus:border-[#3c005a] border border-primary rounded-xl w-72 h-12 mb-4 px-4">
                    <NuxtLink class="bg-primary rounded-xl text-white py-4 px-6 font-bold  text-2xl mb-4 w-72 text-center" to="/dashboard">Login</NuxtLink>
                </form>
            </div>
        </div>
    </div>

</template>

