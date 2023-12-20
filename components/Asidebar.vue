<template>
  <section class="bg-primary h-full">
    <aside class="flex  flex-col items-center text-white p-4 ">
      <div class="top pb-10">
        <div class=" hidden md:block ">
          <img class="" src="/assets/images/GraduationCap.png"/>
          <h2 class="text-lg font-bold">SchoolPilot</h2>
        </div>

      </div>
        <div class="text-white inline-flex flex-col justify-center items-start gap-4 space-y-8">
          <NuxtLink @click="closeMenu" to="/" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/dashboard.png" alt="Dashboard" />
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/registration" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/contacts-alt.png" alt="Registration" />
            <span>Registration</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/courses" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/notebook.png" alt="Courses" />
            <span>Courses</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/assignments" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/notebook.png" alt="Assignments" />
            <span>Assignments</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/schedules" class="dashboardlink flex items-center gap-2 justify-center">
            <img src="/assets/images/contacts-alt.png" alt="Schedules" />
            <span>Schedules</span>
          </NuxtLink>
          <NuxtLink @click="closeMenu" to="/settings" class="dashboardlink flex items-center gap-2 justify-center">
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

<script>
export default {
  methods: {
    closeMenu() {
      this.$emit('close-menu');
    },
  },
};
</script>
