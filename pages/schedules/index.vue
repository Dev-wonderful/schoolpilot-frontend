<script lang="ts" setup>
    definePageMeta({
        layout: 'month'
    })
    const scheduleStore = useScheduleStore()
    const { presentMonth, days, daysInMonth, scheduleDataSortedByDay } = storeToRefs(scheduleStore)
    const LEAPNUMBER = 4;
    const offsetMonth = ref(presentMonth.value)
    const DAYS = days.value;
    const scheduleByDay = computed(() => {
        console.log('data:', presentMonth.value, scheduleDataSortedByDay.value)
        const month = presentMonth.value.split(' ').join('-')
        if(month in scheduleDataSortedByDay.value) {
            return scheduleDataSortedByDay.value[month]
        }
        return {}
    })
    
    // Get the number of days in present month 
    const calculateDays = computed(() => {
        const [ month, year ] = presentMonth.value.split(' ');
        let numOfDays = daysInMonth.value[month];
        if ((+year) % LEAPNUMBER === 0 && month === 'February') numOfDays++
        return numOfDays
    })
    
    // Get the number of days in the previous month
    // this is to prevent clashes in the input for the calculateDays function
    const calculateOffsetDays = computed(() => {
        const [ month, year ] = offsetMonth.value.split(' ');
        let numOfDays: any = daysInMonth.value[month];
        if ((+year) % LEAPNUMBER === 0 && month === 'February') numOfDays++
        return numOfDays
    })

    // create an iterable to yield each days data, instead of 
    // precompiling an array and looping over the array
    function* dateRange(numberOfDaysInMonth: number) {
        // get the first day of the month, to determine the day to start from
        const [ month, year ] = presentMonth.value.split(' ');
        const firstDayOfMonth = `1-${month}-${year}`;
        const firstDayString = useDateFormat(firstDayOfMonth, 'dddd')
        // use the index to determine how many days to offset
        let offset = DAYS.indexOf(firstDayString.value);
        const OFFSET = offset
        // get previous month details as filler for the offset days
        let [ prevMonth, prevMonthYear ] = previousMonth(firstDayOfMonth).split(' ')
        offsetMonth.value = `${prevMonth} ${prevMonthYear}`
        const prevMonthDays = calculateOffsetDays.value

        let i = 0 - OFFSET;
        while (i < numberOfDaysInMonth) {
            i++
            if (offset) {
                --offset;
                
                const pastDay = prevMonthDays - offset
                const pastDate = `${pastDay}-${prevMonth}-${prevMonthYear}`
                yield {day: String(pastDay), date: pastDate}
            } else {
                const date = `${i}-${month}-${year}`;
                yield {day: String(i), date: date}
            }
        };
    }

    const showPreviousMonth = (date: string) => {
        // the date string would be the month and year only, so I need to add day
        // pick first day because all months have a first day
        presentMonth.value = previousMonth(`1 ${date}`)
    }

    const showNextMonth = (date: string) => {
        // the date string would be the month and year only, so I need to add day
        // pick first day because all months have a first day
        presentMonth.value = nextMonth(`1 ${date}`)
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

    // assign the breakpoint to a variable to prevent the error that comes from
    // using a vueuse composable inside of template
    const breakpointsDynamics = breakpoints.lg

    const blurDateForPrevMonth = (date: string) => {
        // blur the date for the previous month occuring in the calendar
        const month = date.split('-')[1]
        const thisMonth = presentMonth.value.split(' ')[0]
        if (thisMonth === month) {
            return 'bg-[whitesmoke]'
        } else {
            return 'bg-gray-400 opacity-20'
        }
    }
    // check if 'see more' is necessary
    const seeMore = (day: string) => {
        if (day in scheduleByDay.value && scheduleByDay.value[day]?.length > 2) return true
        else false
    }

    const navigate = (dateString: string) => {
        // process and navigate to a route
        const dateArr = dateString.split('-');
        const monthAndYear = dateArr.splice(1, 2).join('-');
        navigateTo(`/schedules/${monthAndYear}/${dateArr[0]}`)
    }
    console.log('schedule', scheduleByDay.value)
</script>
<template>
    <div class="current_month w-[95%] lg:w-[87%] h-8 text-lg bg-primary rounded-md text-white mt-3 mx-auto text-center flex flex-row justify-around items-center px-auto">
        <span class="left_arrow cursor-pointer w-10 bg-red50" @click="showPreviousMonth(presentMonth)"><i class="fa fa-chevron-left"></i></span>
        {{ presentMonth }}
        <span class="right_arrow cursor-pointer w-10 bg-red50" @click="showNextMonth(presentMonth)"><i class="fa fa-chevron-right"></i></span>
    </div>
    <section class="schedule_calendar text-black bg-white grid grid-cols-7 grid-rows-7 w-[100%] h-[600px] 
                    sm:w-[95%] lg:w-[90%] sm:h[70vw] md:h-[100vw] lg:h-[50vw] px-2 lg:px-6 py-6 gap-[2px] lg:gap-2 mx-auto mb-7 justify-center items-center"
             :class=" breakpointsDynamics ? 'static' : 'relative' ">
        <div class="days text-center leading-normal bg-primary text-white rounded-md" v-for="dayName of DAYS">{{ breakpointsDynamics ? dayName : dayName.slice(0, 3) }}</div>
        <div class="month_days w-[100%] h-[100%] lg:min-h[100px] flex flex-col cursor-pointer justify-between text-left pb-3 px-1 lg:px-2 shadow-md rounded-md" 
             v-for="day of dateRange(calculateDays)"
             @click="navigate(day.date)" :class="blurDateForPrevMonth(day.date)">
             
            {{ day.day }}
            <div class="activity bg-rd-50 h-[30px] sm:h-[50px] w-[100%] overflow-x-hidden overflow-y-clip flex flex-col gap-1 justify-start items-center">
                <div class="activity_dot text-[10px] min-h-[12px] bg[#ff0000] px-1 w-full lg:w-[80%] mx-auto rounded-md leading-[10px] text-center text-white invert bgprimary roundedfull truncate"
                     :class="schedule.scheduleColor ? 'bg-['+ schedule.scheduleColor + ']' : 'bg-primary'"
                     :style="{ 'background-color': schedule.scheduleColor ? schedule.scheduleColor : '#925FE2' }"
                     v-for="schedule of scheduleByDay[day.day]?.slice(0, 3)" :title="schedule.title">
                     {{ schedule.title }}
                </div>
                     <!-- <div class="activity_dot h-1 w-1 bg-blue-950 rounded-full"></div> -->
                </div>
                <div v-if="seeMore(day.day)" class="text-[10px] text-center hover:text-primary">See more</div>
        </div>
        <AddScheduleButton />
    </section>
</template>
<style scoped>
.activity_dot {
    mix-blend-mode: difference;
}
</style>