<script lang="ts" setup>
  import { type UpdateType } from "~/types";
  
  interface Response {
    data: globalThis.Ref<UpdateType[]>,
    error: globalThis.Ref<Error | null>
  }

  let dashboardStore = useDashboardUpdateStore()
  const { name, role, idNumber, infoUpdates } = storeToRefs(dashboardStore)
  if (role.value && idNumber.value && infoUpdates.value.length === 0) {
    const requestEndpoint = `/api/v1/dashboard?role=${role.value}&id=${idNumber.value}`
    const { data, error } = await makeRequest(requestEndpoint) as Response
    if (error.value) infoUpdates.value = [];
    else infoUpdates.value = data.value
  }
  const dashboardinfoStyles = {
    infoBox: 'mx-auto max-w-[350px] w-[320px] h-[350px] rounded-2xl shadow-md grid grid-rows-5 grid-cols-1 justify-center items-center',
    infoHeading: 'text-center md:text-[1.5rem] text-[1.2rem] shadow-sm h-[100%] w-[100%] mx-auto leading-[60px] text-[whitesmoke] bg-purple-500 rounded-2xl',
    infoContent: 'grid grid-cols-2 grid-rows-1 text-center text-[1rem] shadow-sm h-[100%] w-[90%] mx-auto leading-[60px] rounded-2xl'
  }
  // console.log(dashboardStore)
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const time_postfix = ["am", "pm"];
  const convertDatetimeString = (datetimeString: string) => {
    const date = new Date(datetimeString)
    const dayOfMonth: number =  date.getDate()
    const month: string = months[date.getMonth()]
    const year: number = date.getFullYear()
    let hours: number = date.getHours()
    // return 0 for AM or 1 for PM
    const postfix = Math.floor(hours / 12);
    hours = hours % 12;
    if (hours === 0) hours = 12;
    // process the minutes to add 0 to the minutes less than 10
    // minutes less than 10 would be missing a second digit,
    // thereby displaying 3:2AM instead of 3:02AM
    const minutes: number = date.getMinutes()
    let minutes_str: string = String(minutes);
    if (minutes < 10) minutes_str = "0" + String(minutes);
    return `${hours}:${minutes_str + time_postfix[postfix]} on ${dayOfMonth}th of ${month}, ${year}`
  }
</script>

<template>
  <section class="md:container">
    <section class="dashboard flex flex-col justify-around items-center w-[100%] min-h-[750px] gap-5 bg-prple-300 mx-auto my-[50px]">
      <div class="welcome shadow-md rounded-[20px] w-[90%] sm:w-[100%] h-[200px] flex flex-row justify-around items-center bg-blu-200">
        <h1 class="welcome_text w-[60%] h-[50%] text-left leading-[20px] md:leading-[100px] bg-rd-100 sm:text-[1.5rem]">
          Hello {{ name }}
        </h1>
        <div class="image-container w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] bg-gray-300 rounded-[20px]"></div>
      </div>
      <section class="urgent_info w-[100%] min-h-[500px] flex flex-row justify-around items-center flex-wrap gap-5">
        <div class="update" :class="dashboardinfoStyles.infoBox" v-for="update of infoUpdates">
          <h2 class="update_heading_text" :class="dashboardinfoStyles.infoHeading">
            {{ update.title }}
          </h2>
          <div class="update_content" :class="dashboardinfoStyles.infoContent" v-for="datum of update.data">
            <span class="w-[95%] bg-ble-200 px-1 truncate text-left mx-auto">{{ datum.title }}</span>
            <span class="w-[95%] bg-rd-200 px-1 truncate mx-auto" :title="convertDatetimeString(datum.scheduledTime)">
              {{ convertDatetimeString(datum.scheduledTime) }}
            </span>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>