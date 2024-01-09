<template>
  <section class="bg-primary h-full">
    <aside class="flex  flex-col items-center text-white p-4 ">
      <div class="top pb-10">
        <div class=" hidden md:block ">
          <img class="" src="/assets/images/GraduationCap.png"/>
          <h2 class="text-lg font-bold">SchoolPilot</h2>
        </div>

      </div>
        <div class="text-gray-300 inline-flex flex-col justify-center items-start gap-4 space-y-8">
          <NuxtLink @click="closeMenu" to="/dashboard" class="dashboardlink flex hover:text-white items-center gap-2 justify-center">
            <span class="material-icons-sharp">dashboard</span>
            <!-- <i class="fa-solid guage"></i> -->
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/registration" class="registrationlink hover:text-white flex items-center gap-2 justify-center">
            <!-- <img src="/assets/images/contacts-alt.png" alt="Registration" /> -->
            <i class="fa fa-edit fa-lg"></i>
            <span>Registration</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/courses" class="courseslink hover:text-white flex items-center gap-2 justify-center">
            <!-- <img src="/assets/images/notebook.png" alt="Courses" /> -->
            <i class="fa fa-book fa-lg"></i>
            <span>Courses</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/assignments" class="assignmentslink hover:text-white flex items-center gap-2 justify-center">
            <!-- <img src="/assets/images/notebook.png" alt="Assignments" /> -->
            <i class="fa fa-briefcase fa-lg"></i>
            <span>Assignments</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/schedules" class="scheduleslink hover:text-white flex items-center gap-2 justify-center">
            <!-- <img src="/assets/images/contacts-alt.png" alt="Schedules" /> -->
            <i class="fa fa-calendar fa-lg"></i>
            <span>Schedules</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/settings" class="settingslink hover:text-white flex items-center gap-2 justify-center">
            <i class="fa fa-cog fa-lg"></i>
            <span>Settings</span>
          </NuxtLink>
        </div>
    </aside>
  </section> 
</template>

<style scoped>
/* Add any additional styling as needed */
/* .dashboardlink img {
  max-width: 40px;
  max-height: 40px;
  margin-bottom: 8px;
} */

</style>

<script setup>
const emit = defineEmits(['close-menu'])
const closeMenu = () => {
  emit('close-menu');
};
</script>
