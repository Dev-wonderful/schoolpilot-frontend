<script lang="ts" setup>
definePageMeta({
  middleware: 'fetch-month'
})
import type { 
  DashboardUpdate, 
  ResponseType, 
  StaffDashboard, 
  SortedResponseByDayType, 
  SortedProjectByDay, 
} from "~/types";

  const { staffDetails, infoUpdates, avatar } = storeToRefs(useStaffPortalStore())
  const scheduleStore = useScheduleStore()
  const STAFF = computed(() => staffDetails.value as StaffDashboard)

  /**
   * Sort and include the ones close to the current time
   * @param nestedObj 
   */
  const sortNestedScheduleObjectToArrayByClosestTime = (nestedObj: SortedResponseByDayType) => {
    // terminate if undefined
    if (nestedObj === undefined) return []

    const currentTime = new Date().toISOString()
    const currentTimeCmp = Date.parse(currentTime)
    const finalArray = [];
    // combine all arrays within the nested objects
    for (let keyOne in nestedObj) {
      for (let keyTwo in nestedObj[keyOne]) {
        finalArray.push(...nestedObj[keyOne][keyTwo])
      }
    }
    return finalArray.filter((obj) => Date.parse(obj.time) > currentTimeCmp).sort((a,b) => Date.parse(a.time) - Date.parse(b.time));
  }

  /**
   * sort and include the ones close to the current time
   * @param nestedObj The deeply nested object
   */
  const sortNestedProjectObjectToArrayByClosestTime = (nestedObj: SortedProjectByDay) => {
    // terminate if undefined
    if (nestedObj === undefined) return []

    const currentTime = new Date().toISOString()
    const currentTimeCmp = Date.parse(currentTime)
    const finalArray = [];
    // combine all arrays within the nested objects
    for (let keyOne in nestedObj) {
      for (let keyTwo in nestedObj[keyOne]) {
        finalArray.push(...nestedObj[keyOne][keyTwo])
      }
    }
    return finalArray.filter((obj) => Date.parse(obj.deadline) > currentTimeCmp).sort((a,b) => Date.parse(a.deadline) - Date.parse(b.deadline));
  }

  // Get only the top 5
  infoUpdates.value['Upcoming Schedules'] = sortNestedScheduleObjectToArrayByClosestTime(
    staffDetails.value?.schedules as SortedResponseByDayType
  ).splice(0, 5)
  infoUpdates.value['Pending Assignments'] = sortNestedProjectObjectToArrayByClosestTime(
    staffDetails.value?.projects as SortedProjectByDay
  ).splice(0, 5)
  // watch for changes to schedule store
  watch(scheduleStore.scheduleDataSortedByDay, (update) => {
    infoUpdates.value['Upcoming Schedules'] = sortNestedScheduleObjectToArrayByClosestTime(
      update as SortedResponseByDayType
    ).splice(0, 5)
  })

  // fetch if this conditions are met
  if (STAFF.value.staffId && (infoUpdates.value['Pending Assignments'].length === 0 && infoUpdates.value['Upcoming Schedules'].length === 0)) {
    const requestEndpoint = `/api/v1/staffportal/dashboard`
    const { data, error } = await useMakeRequest(requestEndpoint, 'GET', undefined, true) as ResponseType<DashboardUpdate>
    if (error.value) console.error(error);
  }

  /**
   * Convert the ISOString time format to a readable format
   * @param datetimeString ISOString datetime format
   */
  const convertDatetimeString = (datetimeString: string) => {
    const date = new Date(datetimeString)
    const formatted = useDateFormat(date, 'h:mma on Do of MMMM YYYY')
    return formatted.value
  }

  /**
   * Constructs the url and navigates to the page
   * @param dateString The ISOString datetime format
   * @param title The items title
   * @param description The items description
   */
  const navigate = (dateString: string, title: string = '', description: string = '') => {
    const formattedDateArr = useDateFormat(dateString, 'D-MMMM-YYYY').value.split('-')
    const monthAndYear = formattedDateArr.splice(1, 2).join('-')
    navigateTo(`/studentportal/schedules/${monthAndYear}/${formattedDateArr[0]}/${title}?time=${dateString}&description=${description}`)
  }
  // ==========================================STYLES===================================================================================
  const dashboardinfoStyles = {
    infoBox: 'mx-auto max-w[350px] w-[400px] h-[350px] rounded-2xl shadow-md grid grid-rows-5 grid-cols-1 justify-center items-center',
    infoHeading: 'text-center md:text-[1.5rem] text-[1.2rem] shadow-sm h-[100%] w-[90%] sm:w-[100%] mx-auto leading-[60px] text-[whitesmoke] bg-primary rounded-2xl',
    infoContent: 'grid grid-cols-2 grid-rows-1 text-center text-[1rem] shadow-sm h-[100%] w-[90%] mx-auto leading-[60px] rounded-2xl'
  }
</script>

<template>
  <ClientOnly>
    <section class="md:container mx-auto">
      <section class="dashboard flex flex-col justify-around items-center w-[100%] min-h-[750px] gap-5 bg-prple-300 mx-auto my-[50px]">
        <div class="welcome shadow-md rounded-[20px] bg-primary text-white w-[90%] sm:w-[95%] h-[200px] flex flex-row justify-around items-center bg-blu-200">
          <h1 class="welcome_text w-[60%] h-[50%] text-left flex flex-row justify-start gap-2 items-start bg-rd-100 sm:text-[1.2rem]">
            <strong>Hello,</strong> {{ STAFF?.firstName }} {{ STAFF?.lastName }}
          </h1>
          <div class="image-container flex flex-col justify-center items-center w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] bg-white bggray-300 rounded-[20px]">
            <img class="h-full w-full object-contain rounded-[20px] bg-center bg-cover" :src="avatar" alt="">
          </div>
        </div>
        <section class="urgent_info w-[100%] min-h-[500px] flex flex-row justify-around items-center flex-wrap gap-5">
          <div class="update" :class="dashboardinfoStyles.infoBox">
            <h2 class="update_heading_text" :class="dashboardinfoStyles.infoHeading">
              Pending Assignments
            </h2>
            <div class="update_content cursor-pointer" :class="dashboardinfoStyles.infoContent" 
                 v-if="infoUpdates['Pending Assignments'].length"
                 v-for="datum of infoUpdates['Pending Assignments']" @click="navigate(datum.deadline, datum.name, datum.info)">
              <span class="w-[95%] bg-ble-200 px-1 truncate text-left mx-auto">{{ datum.name }}</span>
              <span class="w-[95%] bg-rd-200 px-1 truncate mx-auto" :title="convertDatetimeString(datum.deadline)">
                {{ convertDatetimeString(datum.deadline) }}
              </span>
            </div>
            <div v-else class="text-center text-xl">No new assignment available</div>
          </div>
          <div class="update" :class="dashboardinfoStyles.infoBox">
            <h2 class="update_heading_text" :class="dashboardinfoStyles.infoHeading">
              Upcoming Schedules
            </h2>
            <div class="update_content cursor-pointer" :class="dashboardinfoStyles.infoContent" 
                 v-if="infoUpdates['Upcoming Schedules'].length"
                 v-for="datum of infoUpdates['Upcoming Schedules']" @click="navigate(datum.time, datum.title, datum.description)">
              <span class="w-[95%] bg-ble-200 px-1 truncate text-left mx-auto">{{ datum.title }}</span>
              <span class="w-[95%] bg-rd-200 px-1 truncate mx-auto" :title="convertDatetimeString(datum.time)">
                {{ convertDatetimeString(datum.time) }}
              </span>
            </div>
            <div v-else class="text-center text-blue-400 text-xl"><NuxtLink to="/studentportal/schedules/new_schedule">click to create</NuxtLink></div>
          </div>
        </section>
      </section>
    </section>
  </ClientOnly>
</template>