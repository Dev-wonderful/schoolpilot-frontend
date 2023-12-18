<template>
  <div class="grid-container ">
    <!-- Navbar -->
    <div class="header"><Navbar /></div>
    <!-- Aside -->
    <Asidebar class="sidebar"></Asidebar>
    <!-- Main -->
    <main class="main"><slot /></main>
    </div>
</template>

<style scoped>
.grid-container{
  display: grid;
  grid-template-columns: 260px 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 3fr;
  grid-template-areas:
  "sidebar header header header"
  "sidebar main main main";
  height: 100vh;
}

.header{
  grid-area: header;
  height: 70px;
}
.sidebar {
  grid-area: sidebar;
  height: 100%;
  overflow-y: auto;
}
.main {
  grid-area: main;
}
</style>

<script lang="ts" setup>

</script>