<script lang="ts" setup>
    const route = useRoute()
    const pathParams = route.params
    const { month, date, title } = pathParams
    const { time, description } = route.query
    const formattedDate = useDateFormat(`${date}-${month}` as string, 'Do of MMMM YYYY')
    const formattedTime = useDateFormat(time as string, 'h:mma')
    const status = useTimeAgo(time as string)
</script>

<template>
    <section class="md:container">
        <section class="max-w-[90%] h-[600px] mx-auto mt-7 grid grid-cols-1 grid-rows-6 bg-bue-50 rounded-md shadow-md">
            <h1 class="schedule_title row-span-1 text-2xl text-center py-2 bg-primary text-white flex flex-col justify-center items-center">{{ title }}</h1>
            <section class="more_details row-span-5 text-lg flex flex-col justify-start gap-5 pt-5 px-5 h-full bg-puple-100">
                <div class="date w-full"><span>Date</span> 
                    <p class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md">{{ formattedDate }}</p>
                </div>
                <div class="time w-full"><span>Time</span> 
                    <p class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md">{{ formattedTime }}</p>
                </div>
                <div class="time w-full"><span>Status</span> 
                    <p class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md">{{ status }}</p>
                </div>
                <div class="time w-full"><span>Description</span> 
                    <textarea class="px-4 w-full shadow-inner h-24 leading-10 text-sm rounded-md" disabled>{{ description }}</textarea>
                </div>
                
            </section>
        </section>
    </section>
</template>