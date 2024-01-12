<script lang="ts" setup>
  import type { UpdateType, ResponseType, StudentData } from "~/types";

  const { studentPersonalDetails, infoUpdates } = storeToRefs(useStudentPortalStore())
  const STUDENT = computed(() => studentPersonalDetails.value as StudentData)
  if (STUDENT.value.matricNo && infoUpdates.value[0].data.length === 0 && infoUpdates.value[1].data.length === 0) {
    const requestEndpoint = `/api/v1/dashboard?role=${STUDENT.value.role.toLocaleLowerCase()}&id=${STUDENT.value.matricNo}`
    const { data, error } = await useMakeRequest(requestEndpoint) as ResponseType<UpdateType[]>
    if (error.value) infoUpdates.value = [];
    else infoUpdates.value = data.value
  }
  
  const convertDatetimeString = (datetimeString: string) => {
    const date = new Date(datetimeString)
    const formatted = useDateFormat(date, 'h:mma on Do of MMMM YYYY')
    return formatted.value
  }
  const navigate = (dateString: string, title: string = '') => {
    const formattedDateArr = useDateFormat(dateString, 'D-MMMM-YYYY').value.split('-')
    const monthAndYear = formattedDateArr.splice(1, 2).join('-')
    navigateTo(`/schedules/${monthAndYear}/${formattedDateArr[0]}/${title}?time=${dateString}`)
  }
  // ==========================================STYLES===================================================================================
  const dashboardinfoStyles = {
    infoBox: 'mx-auto max-w[350px] w-[400px] h-[350px] rounded-2xl shadow-md grid grid-rows-5 grid-cols-1 justify-center items-center',
    infoHeading: 'text-center md:text-[1.5rem] text-[1.2rem] shadow-sm h-[100%] w-[90%] sm:w-[100%] mx-auto leading-[60px] text-[whitesmoke] bg-primary rounded-2xl',
    infoContent: 'grid grid-cols-2 grid-rows-1 text-center text-[1rem] shadow-sm h-[100%] w-[90%] mx-auto leading-[60px] rounded-2xl'
  }
</script>

<template>
  <section class="md:container mx-auto">
    <section class="dashboard flex flex-col justify-around items-center w-[100%] min-h-[750px] gap-5 bg-prple-300 mx-auto my-[50px]">
      <div class="welcome shadow-md rounded-[20px] bg-primary text-white w-[90%] sm:w-[95%] h-[200px] flex flex-row justify-around items-center bg-blu-200">
        <h1 class="welcome_text w-[60%] h-[50%] text-left flex flex-col justify-center items-start bg-rd-100 sm:text-[1.2rem]">
          Hello {{ STUDENT.firstName }} {{ STUDENT.lastName }}
        </h1>
        <div class="image-container w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] bg-gray-300 rounded-[20px]"></div>
      </div>
      <section class="urgent_info w-[100%] min-h-[500px] flex flex-row justify-around items-center flex-wrap gap-5">
        <div class="update" :class="dashboardinfoStyles.infoBox" v-for="update of infoUpdates">
          <h2 class="update_heading_text" :class="dashboardinfoStyles.infoHeading">
            {{ update.title }}
          </h2>
          <div class="update_content cursor-pointer" :class="dashboardinfoStyles.infoContent" 
               v-if="update.data.length"
               v-for="datum of update.data" @click="navigate(datum.scheduledTime, datum.title)">
            <span class="w-[95%] bg-ble-200 px-1 truncate text-left mx-auto">{{ datum.title }}</span>
            <span class="w-[95%] bg-rd-200 px-1 truncate mx-auto" :title="convertDatetimeString(datum.scheduledTime)">
              {{ convertDatetimeString(datum.scheduledTime) }}
            </span>
          </div>
          <div v-else class="text-center text-xl">Nothing to show</div>
        </div>
      </section>
    </section>
  </section>
</template>