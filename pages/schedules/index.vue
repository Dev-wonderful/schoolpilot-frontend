<script lang="ts" setup>
    const currentDate = new Date().toDateString()
    const currentMonth = ref(useDateFormat(currentDate, 'MMMM YYYY').value)
    const LEAPNUMBER = 4;
    type daysNum = {
        [month: string]: number
    }
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    
    
    const calculateDays = computed(() => {
        // console.log("called calculate")
        const [ month, year ] = currentMonth.value.split(' ');
        let numOfDays: number = daysInMonth[month];
        if ((+year) % LEAPNUMBER === 0 && month === 'February') numOfDays++
        return numOfDays
    })
    const previousMonth = (currentDate: string) => {
        const date = new Date(currentDate)
        let dateMonth = date.getMonth()
        let dateYear = date.getFullYear()
        // change month to previous month
        if (dateMonth === 0) {
            date.setMonth(11);
            date.setFullYear(dateYear - 1);
        } else date.setMonth(dateMonth - 1);
        return useDateFormat(date, 'MMMM YYYY').value
    }
    const nextMonth = (currentDate: string) => {
        const date = new Date(currentDate)
        let dateMonth = date.getMonth()
        let dateYear = date.getFullYear()
        // change month to previous month
        if (dateMonth === 11) {
            date.setMonth(0);
            date.setFullYear(dateYear + 1);
        } else date.setMonth(dateMonth + 1);
        return useDateFormat(date, 'MMMM YYYY').value
    }
    function* dateRange(numberOfDaysInMonth: number) {
        // get the first day of the month, to determine the day to start from
        const [ month, year ] = currentMonth.value.split(' ');
        const firstDayOfMonth = `1-${month}-${year}`;
        const firstDayString = useDateFormat(firstDayOfMonth, 'dddd')
        // use the index to determine how many days to offset
        let offset = DAYS.indexOf(firstDayString.value);
        const OFFSET = offset
        // get previous month as filler for the offset days
        let [ prevMonth, prevMonthYear ] = previousMonth(firstDayOfMonth).split(' ')

        let i = 0 - OFFSET;
        while (i < numberOfDaysInMonth) {
            i++
            if (offset) {
                --offset;
                const prevMonthDays = daysInMonth[prevMonth]
                const pastDay = prevMonthDays - offset
                const pastDate = `${pastDay}-${prevMonth}-${prevMonthYear}`
                yield {day: pastDay, date: pastDate}
            } else {
                const date = `${i}-${month}-${year}`;
                yield {day: i, date: date}
            }
        };
    }
    const showPreviousMonth = (date: string) => {
        // the date string would be the month and year only, so I need to add day
        // pick first day because all months have a first day
        currentMonth.value = previousMonth(`1 ${date}`)
    }
    const showNextMonth = (date: string) => {
        // the date string would be the month and year only, so I need to add day
        // pick first day because all months have a first day
        currentMonth.value = nextMonth(`1 ${date}`)
    }
    // ================================= conditional styling ======================================================
    const breakpoints = useBreakpoints({
        mobile: 300,
        sm:	640,
        md:	768,	
        lg:	1024,	
        xl:	1280,
        xxl: 1536,
    })
    const breakpointsDynamics = breakpoints.lg
    console.log(breakpointsDynamics.value)
    const dateBox = (date: string) => {
        const month = date.split('-')[1]
        const thisMonth = currentMonth.value.split(' ')[0]
        if (thisMonth === month) {
            return 'bg-[whitesmoke]'
        } else {
            return 'bg-gray-400 opacity-20'
        }
    }
</script>
<template>
    <div class="current_month w-[87%] h-8 text-lg bg-primary rounded-md text-white mt-3 mx-auto text-center flex flex-row justify-around items-center px-auto">
        <span class="left_arrow cursor-pointer w-10 bg-red50" @click="showPreviousMonth(currentMonth)"><i class="fa fa-chevron-left"></i></span>
        {{ currentMonth }}
        <span class="right_arrow cursor-pointer w-10 bg-red50" @click="showNextMonth(currentMonth)"><i class="fa fa-chevron-right"></i></span>
    </div>
    <section class="schedule_calendar text-black bg-white grid grid-cols-7 grid-rows-7 w-[100%] h-[400px] sm:w-[90%] sm:h-[60vw] md:h[50vw] px-6 py-6 gap-2 mx-auto mb-7 justify-center items-center">
        <div class="days text-center leading-normal bg-primary text-white rounded-md" v-for="day of DAYS">{{ breakpointsDynamics ? day : day.slice(0, 3) }}</div>
        <div class="month_days w-[100%] h-[100%] flex flex-col cursor-pointer justify-between text-left pb-3 pl-2 shadow-md rounded-md" 
             v-for="day of dateRange(calculateDays)"
             @click="navigateTo(`schedules/${day?.date}`)" :class="dateBox(day.date)">
             
            {{ day?.day }}
            <div class="activity bg-rd-50 h-[90%] w-[100%] flex flex-row gap-1 justify-start items-end">
                <div class="activity_dot h-1 w-1 bg-blue-950 rounded-full"></div>
                <div class="activity_dot h-1 w-1 bg-blue-950 rounded-full"></div>
            </div>
        </div>
    </section>
</template>
<style>

</style>