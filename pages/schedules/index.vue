<script lang="ts" setup>
    const scheduleStore = useScheduleStore()
    const { presentMonth, days, daysInMonth } = storeToRefs(scheduleStore)
    const LEAPNUMBER = 4;
    const offsetMonth = ref(presentMonth.value)
    const DAYS = days.value;
    // =============================================================
    import type { ScheduleObjType, ResponseType } from '~/types';
    const monthParams = computed(() => presentMonth.value.split(' ').join('-'))
    // console.log('hello from month:', presentMonth.value)
    // console.log('month:', monthParams.value)

    const { scheduleData } = storeToRefs(scheduleStore)
    // console.log(scheduleData.value)
    const fetchSchedule = async (month: string) => {
        // console.log('check2:', month)
        if (month in scheduleData.value === false) {
            // console.log('request')
            const requestEndpoint = `/api/v1/schedule?month=${month}`
            const { data, error } = await useMakeRequest(requestEndpoint) as ResponseType<ScheduleObjType[]>
            const responseData = data.value
            // console.log('response:', responseData)
            if (error.value) return false;
            else {
                if (responseData?.length > 0) {
                    scheduleData.value[month] = responseData
                }
            }
    
            // console.log(scheduleData.value)
            return true
        }
        return false
    }
    // TODO: explain the state issue concerning this
    await fetchSchedule(monthParams.value);
    // =============================================================
    
    
    const calculateDays = computed(() => {
        // console.log("called calculate")
        const [ month, year ] = presentMonth.value.split(' ');
        // console.log('hello from:', presentMonth.value)
        // console.log(scheduleData.value)
        let numOfDays = daysInMonth.value[month];
        if ((+year) % LEAPNUMBER === 0 && month === 'February') numOfDays++
        return numOfDays
    })
    
    const calculateOffsetDays = computed(() => {
        const [ month, year ] = offsetMonth.value.split(' ');
        let numOfDays: any = daysInMonth.value[month];
        if ((+year) % LEAPNUMBER === 0 && month === 'February') numOfDays++
        return numOfDays
    })

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
        presentMonth.value = previousMonth(`1 ${date}`)
        const promise = new Promise((resolve, _) => {
            resolve(fetchSchedule(monthParams.value))
        })
        promise.then()
    }

    const showNextMonth = (date: string) => {
        // the date string would be the month and year only, so I need to add day
        // pick first day because all months have a first day
        presentMonth.value = nextMonth(`1 ${date}`)
        const promise = new Promise((resolve, _) => {
            resolve(fetchSchedule(monthParams.value))
        })
        promise.then()
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

    const navigate = (dateString: string) => {
        // process and navigate to a route
        const dateArr = dateString.split('-');
        const monthAndYear = dateArr.splice(1, 2).join('-');
        navigateTo(`/schedules/${monthAndYear}/${dateArr[0]}`)
    }
</script>
<template>
    <div class="current_month w-[87%] h-8 text-lg bg-primary rounded-md text-white mt-3 mx-auto text-center flex flex-row justify-around items-center px-auto">
        <span class="left_arrow cursor-pointer w-10 bg-red50" @click="showPreviousMonth(presentMonth)"><i class="fa fa-chevron-left"></i></span>
        {{ presentMonth }}
        <span class="right_arrow cursor-pointer w-10 bg-red50" @click="showNextMonth(presentMonth)"><i class="fa fa-chevron-right"></i></span>
    </div>
    <section class="schedule_calendar text-black bg-white grid grid-cols-7 grid-rows-7 w-[100%] h-[400px] sm:w-[90%] sm:h-[60vw] md:h[50vw] px-6 py-6 gap-2 mx-auto mb-7 justify-center items-center">
        <div class="days text-center leading-normal bg-primary text-white rounded-md" v-for="day of DAYS">{{ breakpointsDynamics ? day : day.slice(0, 3) }}</div>
        <div class="month_days w-[100%] h-[100%] flex flex-col cursor-pointer justify-between text-left pb-3 pl-2 shadow-md rounded-md" 
             v-for="day of dateRange(calculateDays)"
             @click="navigate(day.date)" :class="blurDateForPrevMonth(day.date)">
             
            {{ day.day }}
            <div class="activity bg-rd-50 h-[90%] w-[100%] flex flex-row gap-1 justify-start items-end">
                <div class="activity_dot h-1 w-1 bg-blue-950 rounded-full"></div>
                <div class="activity_dot h-1 w-1 bg-blue-950 rounded-full"></div>
            </div>
        </div>
    </section>
</template>
<style>

</style>