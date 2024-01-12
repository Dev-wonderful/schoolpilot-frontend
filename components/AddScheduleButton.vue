<template>
    <div class="add_schedule bg-primary w-14 h-14 hover:w-36 rounded-full shadow-md flex flex-row justify-center gap-1 items-center 
            cursor-pointer absolute bottom-[3%] right-[10%] group sm:bottom-[20px] lg:right-[15%] lg:bottom-[10%] transition-all"
            @click="navigateTo('/studentportal/schedules/new_schedule')">
        <i class="fa fa-plus fa-xl text-white"></i>
        <span class="add_schedule_text transition ease-in-out text-transparent gropu-hover:delay-1000 bg-red300 hidden group-hover:block group-hover:text-white">Add Schedule</span>
    </div>
</template>