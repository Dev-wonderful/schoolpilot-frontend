<script lang="ts" setup>
    const setPortal = (role: string) => {
        document.cookie = `portal=${role}portal`
    }
</script>

<template>
    <nav class="text-white border-none flex gap-x-3 bg-primary justify-between w-screen items-center shadow-md mx-auto h-18 py-1 px-16">
        <NuxtLink to="/" class=" flex flex-col items-center cursor-pointer">
            <img src="/assets/images/GraduationCap.png" class="w-8">
            <p class="font-bold">SchoolPilot</p>
        </NuxtLink>
        <!-- The parents would be display a dropdown -->
        <!-- TODO: create dropdown -->
        <div class="studentportal-dropdown ml-auto space-x-6">
            <NuxtLink class="font-medium" to="/login?role=student">Login</NuxtLink>
            <NuxtLink class="font-medium" to="/signup?role=student">Signup</NuxtLink>
        </div>
        <div class="staffportal-dropdown space-x-6">
            <NuxtLink class="font-medium" to="/login?role=staff">Login</NuxtLink>
            <NuxtLink class="font-medium" to="/signup?role=staff">Signup</NuxtLink>
        </div>
    </nav>

</template>