<template>
  <section class="bg-primary m-4 rounded-lg">
    <aside class="flex  flex-col items-center text-white p-4 ">
      <div class="top pb-10">
        <div class="logo ">
          <img class="" src="/assets/images/GraduationCap.png"/>
          <h2 class="text-lg font-bold">SchoolPilot</h2>
        </div>
        <!-- <div class="close" id="close-btn">
          <span class="material-icons-sharp">close</span>
        </div> -->
      </div>
        <div class="text-white inline-flex flex-col justify-center items-start gap-4 space-y-8">
          <NuxtLink to="/registration" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/contacts-alt.png" alt="Registration" />
            <span>Registration</span>
          </NuxtLink>
          <NuxtLink to="/courses" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/notebook.png" alt="Courses" />
            <span>Courses</span>
          </NuxtLink>
          <NuxtLink to="/dashboard" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/dashboard.png" alt="Dashboard" />
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink to="/assignments" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/notebook.png" alt="Assignments" />
            <span>Assignments</span>
          </NuxtLink>
          <NuxtLink to="/schedules" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/contacts-alt.png" alt="Schedules" />
            <span>Schedules</span>
          </NuxtLink>
          <NuxtLink to="/settings" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/dashboard.png" alt="Settings" />
            <span>Settings</span>
          </NuxtLink>
        </div>
    </aside>
  </section> 
</template>

<style scoped>
/* Add any additional styling as needed */
.dashboardlink img {
  max-width: 40px;
  max-height: 40px;
  margin-bottom: 8px;
}
</style>