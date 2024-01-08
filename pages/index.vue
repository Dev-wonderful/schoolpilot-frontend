<script setup>
definePageMeta({
    layout: 'home'
})
</script>

<template>
    <section class="bg-slate-100 h-[90vh] pt-16">
        <div class="flex gap-3  py-10">
            <div class="flex ml-20 flex-col">
                <div class="bg-primary rounded-lg p-2  font-bold w-fit text-2xl mb-4"><p class="text-white">ALL-In-One</p></div>
                <h2 class="text-6xl font-bold mb-4">School <br/> <span class="">Management System</span></h2>
                <p class="text-2xl mb-4 w-2/3">Easy-to-use software to help your school save time, improve enrollment and fulfill it's mission</p>
                <div class="mt-10">
                    <NuxtLink class="mx-auto bg-primary rounded-xl text-white py-4 px-8 font-bold w-48 text-2xl" to="/loginPage">Request Demo</NuxtLink>
                </div>

            </div>
            <div class="p-2 bg-[#3c005a] mr-12 rounded-xl lg:w-[990px] lg:h-fit">
                <video autoplay loop muted plays-inline class="rounded-lg">
                <source src="/assets/videos/schoolPilotVid.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>