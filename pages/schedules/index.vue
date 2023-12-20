<script lang="ts" setup>
    const LEAPNUMBER = 4;
    type daysNum = {
        [month: string]: number
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysInMonth: daysNum = {
        'January': 31,
        'February': 28,
        'March': 31,
        'April': 30,
        'May': 31,
        'June': 30,
        'July': 31,
        'August': 31,
        'September': 30,
        'October': 31,
        'November': 30,
        'December': 31,
    }
    function* range(n: number) {
        for (let i = 1; i <= n; i++ ) yield i;
    }
    
    const date = new Date().toDateString()
    const current_month = useDateFormat(date, 'MMMM YYYY')
    const calculateDays = computed(() => {
        // console.log("called calculate")
        const [ month, year ] = current_month.value.split(' ');
        let numOfDays: number = daysInMonth[month];
        if ((+year) % LEAPNUMBER === 0 && month === 'February') numOfDays++
        return numOfDays
    })
    function* dateRange(n: number) {
        let date: string
        const [ month, year ] = current_month.value.split(' ');
        for (let i = 1; i <= n; i++ ) {
            date = `${i}-${month}-${year}`;
            yield {day: i, date: date}
        };
    }
</script>
<template>
    <div class="current_month w-[87%] h-8 text-lg bg-primary rounded-md text-white mt-3 mx-auto text-center flex flex-row justify-around items-center px-auto">
        <span class="left_arrow"><i class="fa fa-chevron-left"></i></span>
        {{ current_month }}
        <span class="right_arrow"><i class="fa fa-chevron-right"></i></span>
    </div>
    <section class="schedule_calendar text-black bg-white grid grid-cols-7 grid-rows-6 w-[90%] h-[700px] px-6 py-6 gap-2 mx-auto mb-7 justify-center items-center">
        <div class="days text-center leading-normal bg-primary text-white rounded-md" v-for="day of days">{{ day }}</div>
        <div class="month_days w-[100%] h-[100%] flex flex-col cursor-pointer justify-between text-left pb-3 pl-2 shadow-md rounded-md bg-[whitesmoke]" 
             v-for="day of dateRange(calculateDays)"
             @click="navigateTo(`schedules/${day.date}`)">
            {{ day.day }}
            <div class="activity bg-rd-50 h-[90%] w-[100%] flex flex-row gap-1 justify-start items-end">
                <div class="activity_dot h-3 w-3 bg-blue-950 rounded-full"></div>
                <div class="activity_dot h-3 w-3 bg-blue-950 rounded-full"></div>
            </div>
        </div>
    </section>
</template>
<style>

</style>