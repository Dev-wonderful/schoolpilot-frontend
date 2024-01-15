<script lang="ts" setup>
import type { ScheduleObjType } from '~/types';

    const route = useRoute()
    const monthParams = route.params.month as string
    const dayParams = route.params.date as string
    const dateParams = `${dayParams}-${monthParams}`
    const { scheduleDataSortedByDay, presentMonth } = storeToRefs(useScheduleStore())

    // get the schedule for a particular day in the month as read-only data
    if (monthParams in scheduleDataSortedByDay.value === false) presentMonth.value = monthParams.split('-').join(' ');
    const SCHEDULE = computed(() => {
        const processedDateSchedule: Array<ScheduleObjType> = []
        if (monthParams in scheduleDataSortedByDay.value) {
            if(dayParams in scheduleDataSortedByDay.value[monthParams]) {
                return scheduleDataSortedByDay.value[monthParams][dayParams]
            }
        }
        return processedDateSchedule
    })
    const scheduleExists: boolean = SCHEDULE.value.length > 0 ? true : false;
    
    const breakpoints = useBreakpoints({
        mobile: 300,
        sm:	640,
        md:	768,	
        lg:	1024,	
        xl:	1280,
        xxl: 1536,
    });
    // assign the breakpoints to a variable to prevent the error that comes from
    // using a vueuse composable inside of template
    const largeWidth = breakpoints.lg;
    const mediumWidth = breakpoints.md;
    // const smallWidth = breakpoints.sm;
    // const mobileWidth = breakpoints.mobile;

    // Use the breakpoint checker to determine how many extra days to show
    // besides the actual day been checked
    const OFFSET = computed(() => {
        if(largeWidth.value) return 3
        else if(mediumWidth.value) return 2
        // else if(mobileWidth) return 1
        else return 1
    });
    const FUTURE = computed(() => {
        if(largeWidth.value) return 3
        else if(mediumWidth.value) return 2
        // else if(mobileWidth) return 1
        else return 1
    });

    const previousDay = (offset: number = 1) => {
        const date = new Date(dateParams)
        let dateDay = date.getDate();
        date.setDate(dateDay - offset);
        return useDateFormat(date, 'D MMMM YYYY').value
    }
    const nextDay = (future: number = 1) => {
        const date = new Date(dateParams);
        const dateDay = date.getDate();
        date.setDate(dateDay + future);
        return useDateFormat(date, 'D MMMM YYYY').value;
    }
    // Generate the days based on the OFFSET and FUTURE values, in 
    // addition to the current day
    function* generateDate() {
        let i = 0;
        let offset = OFFSET.value;
        let future = 1;
        let actualDate = true
        while(i <= (OFFSET.value + FUTURE.value)) {
            if (offset) {
                yield previousDay(offset--)
            } else if (actualDate) {
                actualDate = false
                yield dateParams.split('-').join(' ')
            } else if (future <= FUTURE.value) {
                yield nextDay(future++)
            }
            i++
        }
    }
    // A hack for the day string to be responsive based on breakpoint
    const splitDayValues = (dateString: string) => {
        return dateString.split(' ')
    };

    const navigate = (dateString: string) => {
        // process and navigate to a route
        const dateArr = dateString.split(' ');
        const monthAndYear = dateArr.splice(1, 2).join('-');
        navigateTo(`/studentportal/schedules/${monthAndYear}/${dateArr[0]}`)
    }
    const formatTime = (dateString: string) => {
        return useDateFormat(dateString, 'h:mma').value
    }
    // Process the query to be added to the navigation request.
    // This is because description might not always exist
    const getQueryArgs = (schedule: ScheduleObjType) => {
        let query = `?time=${schedule.time}`;
        if (schedule.description) query += `&description=${schedule.description}`
        return query;
    }
</script>
<template>
    <section @change="console.log('loaded', dateParams)" class="md:container mx-auto flex flex-col bg-prple-200 justify-center h-fit gap-10 my-6">
        <button class="bg-primary text-white m-0 w-fit rounded-md shadow-md p-2" @click="navigateTo('/studentportal/schedules')">
            back to schedule
        </button>
        <section class="seven-days bg-red200 grid grid-rows-1 text-[14px] md:text-[13px] w-[90%]
                     bg-blue50 min-h-[17vw] sm:min-h-[70px] gap-2 mx-auto justify-center items-center"
                 :class="largeWidth ? 'grid-cols-9' : mediumWidth ? 'grid-cols-7' : 'grid-cols-5' ">
            <i class="fa fa-chevron-left fa-2x bg-red50 text-center text-primary cursor-pointer" 
               @click="navigate(previousDay())"></i>
            <div class="month_days w-[100%] h-[100%] flex flex-col px-1 cursor-pointer justify-around shadow-md rounded-md" 
                 v-for="day of generateDate()" :class="dateParams.split('-').join(' ') === day ? 'bg-primary text-white' : '' "
                 @click="navigate(day)">
                <div class="w-[100%] text-center">
                    {{ splitDayValues(day)[0] }}
                </div>
                <div class="w-[100%] text-center">
                <!-- {{ splitDayValues(day).splice(1, 2).join(' ') }} -->
                {{ largeWidth ? splitDayValues(day)[1] : splitDayValues(day)[1].slice(0,3) }}
                {{ splitDayValues(day)[2] }}
                </div>
            </div>
            <i class="fa fa-chevron-right fa-2x bg-red50 text-center text-primary cursor-pointer" 
               @click="navigate(nextDay())"></i>
        </section>
        <section class="date_schedule_content grid grid-cols-1 gap-3 bg-prple-50  w-[90%] leading-[50px]  mx-auto justify-center items-center"
                 :class=" scheduleExists ? 'relative' : 'static' ">
            <div class="schedule_content grid h-14 bg-[whitesmoke] grid-cols-6 px-4 rounded-md shadow-md cursor-pointer"
                 @click="navigateTo(`${dayParams}/${schedule.title}${getQueryArgs(schedule)}`)" v-for="schedule of SCHEDULE"
                 :title="schedule?.description">
                <div class="time grid col-span-2 sm:col-span-1 w-full h-full">{{ formatTime(schedule.time) }}</div>
                <div class="description col-span-4 sm:col-span-5 truncate w-full h-full bg-slte-300">{{ schedule.title }}</div>
            </div>
            <AddScheduleButton />
        </section>
    </section>
</template>
