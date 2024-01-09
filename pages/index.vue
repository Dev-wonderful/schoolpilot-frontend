<script setup>
definePageMeta({
    layout: 'home'
})
</script>

<template>
    <section class="bg-slate-100 md:h-[100vh] pt-10 md:pt-16">
        <div class="flex  flex-col md:flex-row gap-3 md:py-10">
            <div class="flex ml-4 md:ml-16 flex-col">
                <div class="bg-primary rounded-lg p-2  font-bold w-fit text-2xl mb-4"><p class="text-white">ALL-In-One</p></div>
                <h2 class="text-5xl md:text-6xl font-bold mb-4">School <br/> <span class="">Management System</span></h2>
                <p class="text-2xl md:mb-4 w-2/3">Easy-to-use software to help your school save time, improve enrollment and fulfill it's mission</p>
                <div class="my-10">
                    <NuxtLink class="mx-auto bg-primary rounded-xl text-white py-4 px-8 font-bold w-48 text-2xl" to="/contact">Request Demo</NuxtLink>
                </div>

            </div>
            <div class="p-2 bg-[#3c005a] lg:mr-12 rounded-xl  lg:w-[990px] h-fit">
                <video autoplay loop muted plays-inline class="rounded-lg">
                <source src="/assets/videos/schoolPilotVid.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>