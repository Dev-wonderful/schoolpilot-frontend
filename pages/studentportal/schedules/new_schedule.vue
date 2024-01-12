<script lang="ts" setup>
    import type { ScheduleObjType, ResponseType, NewScheduleType } from '~/types';

    const { reloadData } = storeToRefs(useScheduleStore())

    const defaultColor = ref("#925FE2");
    const currentDay = () => {
        const date = new Date()
        return useDateFormat(date, 'YYYY-MM-DD').value
    }
    const currentTime = () => {
        const date = new Date()
        const minute = date.getMinutes()
        date.setMinutes(minute + 2)
        return useDateFormat(date, 'HH:mm').value
    }
    const cancelInvalidEventForValidTime = (event: Event) => {
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const today = new Date().valueOf()
        const selectedDay = new Date(date).valueOf()
        // console.log('it waS TRIGGERED', date, selectedDay - today);
        const targetElement = event.target as HTMLInputElement
        if ((selectedDay - today) > 0) {
            event.preventDefault();
            event.stopPropagation();
            targetElement.dataset.valid = 'true';
        } else delete targetElement.dataset?.valid
    }
    const handleNewSchedulePosting = (event: Event) => {
        event.preventDefault();
        const form = (document.getElementById('new-schedule') as HTMLFormElement)
        const inputs = document.querySelectorAll('input')
        // console.log('inputs',inputs)
        // if validation fails cancel processing
        if (!form.reportValidity()) {
            const invalidity = [];
            for (let input of inputs) {
                if(!input.checkValidity()) {
                    if(!Boolean(input.dataset.valid)) invalidity.push(true)
                }
            }
            console.log(invalidity)
            if (invalidity.includes(true)) return
        }

        // runs after validation has passed
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const date = (document.getElementById('date') as HTMLInputElement).value;
        const time = (document.getElementById('time') as HTMLInputElement).value;
        const scheduleColor = (document.getElementById('color') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        console.log('data:', title, date, time, scheduleColor, description);
        const monthAndYear = useDateFormat(date, 'MMMM-YYYY').value;
        console.log('month and year:', monthAndYear);
        const scheduledTime = `${date}T${time}:00.000`;
        console.log('scheduled time:', scheduledTime)
        const body: NewScheduleType = {
            title: title,
            scheduledTime: scheduledTime,
            scheduleColor: scheduleColor,
            scheduleMonth: monthAndYear,
        }
        if (description !== '') body.description = description.trim()
        console.log('json:', JSON.stringify(body))
        const promise = new Promise((resolve, _) => {
            resolve(useMakeRequest('/api/v1/schedule', 'POST', JSON.stringify(body)))
        })
        promise.then((response) => {
            if ((response as ResponseType<unknown>).error.value) {
                alert('There was an error creating your schedule, Please try again')
                // navigateTo('/schedules/new_schedule')
                location.reload()
            } else {
                reloadData.value = true
                navigateTo(`/studentportal/schedules?month=${monthAndYear.split('-').join(' ')}`);
            }
        })
    }
</script>

<template>
    <section class="md:container">
        <section class="max-w-[90%] h-[750px] mx-auto my-7 grid grid-cols-1 grid-rows-7 bg-bue-50 rounded-md shadow-md">
            <h1 class="schedule_title row-span-1 text-2xl text-center py-2 bg-primary text-white flex flex-col justify-center items-center">
                New Schedule
            </h1>
            <form id="new-schedule" class="more_details caret-primary row-span-6 text-lg flex flex-col justify-start items-center gap-5 pt-5 px-5 h-full bg-puple-100">
                <label for="title" class="date w-full">Title <span class=" text-red-600">*</span>
                    <input type="text" id="title" name="title" class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="date" class="date w-full">Date <span class=" text-red-600">*</span>
                    <input type="date" id="date" :min="currentDay()" name="date" class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="time" class="time w-full">Time <span class=" text-red-600">*</span>
                    <input type="time" id="time" :min="currentTime()" name="time" 
                           @invalid="(e) => cancelInvalidEventForValidTime(e)"
                           class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="color" class="time w-full">Schedule Colour <span class=" text-red-600">*</span>
                    <input type="color" v-model="defaultColor" id="color" name="color" class="px4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="preview" class="preview w-full">
                    <input type="text" :style="{'background-color': defaultColor}" class="px-4 bg[#440d9b] w-full shadow-inner placeholder:text-white h-10 leading-10 text-sm rounded-md" placeholder="This is a schedule text preview with the colour" disabled>
                </label>
                <label for="description" class="time w-full">Description
                    <textarea id="description" name="description" class="p-4 w-full leading-normal shadow-inner h-28 text-sm rounded-md">
                        {{  }}
                    </textarea>
                </label>
                <input type="submit" @click="(event) => handleNewSchedulePosting(event)" value="Create Schedule" 
                       class="cursor-pointer p-2 rounded-md shadow-md bg-primary text-white w-[300px]">
            </form>
        </section>
    </section>
</template>