<script lang="ts" setup>
  const name: string = 'Wonderful Adeyemo';
  const dashboardinfoStyles = {
    infoBox: 'mx-auto max-w-[350px] min-w-[250px] h-[350px] rounded-2xl shadow-md grid grid-rows-5 grid-cols-1 justify-center items-center',
    infoHeading: 'text-center text-[1.5rem] shadow-sm h-[100%] leading-[60px] text-[whitesmoke] bg-purple-500 rounded-2xl',
    infoContent: 'grid grid-cols-2 grid-rows-1 text-center text-[1rem] shadow-sm h-[100%] leading-[60px] rounded-2xl'
  }
  const infoUpdates = [
    {
      title: 'Pending Assignments',
      data: [
        {title: 'C++ Enums', scheduledTime: '2023-12-16T16:35:10.789'},
        {title: 'C++ Functions', scheduledTime: '2023-12-16T13:27:10.789'},
        {title: 'C++ Classes', scheduledTime: '2023-12-16T13:27:10.789'},
        {title: 'C++ Structs', scheduledTime: '2023-12-16T13:27:10.789'},
        {title: 'C++ Datatypes', scheduledTime: '2023-12-16T13:27:10.789'},
      ]
    },
    {
      title: 'Upcoming Schedules',
      data: [
        {title: 'Read Biology', scheduledTime: '2023-12-16T16:35:10.789'},
        {title: 'Study reaction concepts', scheduledTime: '2023-12-16T13:27:10.789'},
        {title: 'endocrine systems', scheduledTime: '2023-12-16T13:27:10.789'},
        {title: 'Daily reading', scheduledTime: '2023-12-16T13:27:10.789'},
        {title: 'Practice questions', scheduledTime: '2023-12-16T13:27:10.789'},
      ]
    }
  ]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const convertDatetimeString = (datetimeString: string) => {
    const date = new Date(datetimeString)
    const dayOfMonth: number =  date.getDate()
    const month: string = months[date.getMonth()]
    const year: number = date.getFullYear()
    const hour: number = date.getHours()
    const minute: number = date.getMinutes()
    return `${hour}:${minute} on ${dayOfMonth}th of ${month}, ${year}`
  }
</script>

<template>
  <section class="sm:container">
    <section class="dashboard flex flex-col justify-around items-center w-[80%] min-h-[750px] gap-5 bg-prple-300 mx-auto my-[50px]">
      <div class="welcome shadow-md rounded-[20px] w-[80%] h-[200px] flex flex-row justify-around items-center bg-blu-200">
        <h1 class="welcome_text w-[60%] h-[50%] text-left leading-[100px] bg-re-100 text-[1.5rem]">Hello {{ name }}</h1>
        <div class="image-container w-[150px] h-[150px] bg-gray-300 rounded-[20px]"></div>
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