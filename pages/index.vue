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
    const { data, error } = await useMakeRequest(requestEndpoint) as Response
    if (error.value) infoUpdates.value = [];
    else infoUpdates.value = data.value
  }
  const dashboardinfoStyles = {
    infoBox: 'mx-auto max-w[350px] w-[400px] h-[350px] rounded-2xl shadow-md grid grid-rows-5 grid-cols-1 justify-center items-center',
    infoHeading: 'text-center md:text-[1.5rem] text-[1.2rem] shadow-sm h-[100%] w-[100%] mx-auto leading-[60px] text-[whitesmoke] bg-primary rounded-2xl',
    infoContent: 'grid grid-cols-2 grid-rows-1 text-center text-[1rem] shadow-sm h-[100%] w-[90%] mx-auto leading-[60px] rounded-2xl'
  }
  // console.log(dashboardStore)
  
  
  const convertDatetimeString = (datetimeString: string) => {
    const formatted = useDateFormat(datetimeString, 'h:mma on Mo of MMMM YYYY')
    return formatted.value
  }
  const navigate = (dateString: string, title: string = '') => {
    const formattedDate = useDateFormat(dateString, 'D-MMMM-YYYY')
    navigateTo(`/schedules/${formattedDate.value}/${title}`)
  }
</script>

<template>
  <section class="md:container">
    <section class="dashboard flex flex-col justify-around items-center w-[100%] min-h-[750px] gap-5 bg-prple-300 mx-auto my-[50px]">
      <div class="welcome shadow-md rounded-[20px] bg-primary text-white w-[90%] sm:w-[95%] h-[200px] flex flex-row justify-around items-center bg-blu-200">
        <h1 class="welcome_text w-[60%] h-[50%] text-left leading-[20px] md:leading-[100px] bg-rd-100 sm:text-[1.2rem]">
          Hello {{ name }}
        </h1>
        <div class="image-container w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] bg-gray-300 rounded-[20px]"></div>
      </div>
      <section class="urgent_info w-[100%] min-h-[500px] flex flex-row justify-around items-center flex-wrap gap-5">
        <div class="update" :class="dashboardinfoStyles.infoBox" v-for="update of infoUpdates">
          <h2 class="update_heading_text" :class="dashboardinfoStyles.infoHeading">
            {{ update.title }}
          </h2>
          <div class="update_content cursor-pointer" :class="dashboardinfoStyles.infoContent" 
               v-for="datum of update.data" @click="navigate(datum.scheduledTime, datum.title)">
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