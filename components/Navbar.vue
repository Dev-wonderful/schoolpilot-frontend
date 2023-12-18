<script setup>
// You can add any script logic or data setup here if needed
  const { name, avatar } = storeToRefs(useDashboardUpdateStore())
  const imageSrc = avatar.value ? avatar.value : '/images/Frame.png'
</script>

<template>
  <nav class="bg-white border-none shadow-md rounded-lg mx-auto">
    <div class="flex items-center justify-between px-4 py-2">
      <div class="flex items-center relative">
        <input type="text" class="rounded-lg shadow-md w-32 md:w-52 lg:w-72 h-10 placeholder:text-start placeholder:pr-6 placeholder:text-xl focus:outline-none p-2" placeholder="search">
        <span class="fas fa-search absolute right-0 pl-2s text-gray-400 text-xl ml-2"></span>
      </div>

      <NuxtLink to="/settings" class="flex items-center justify-between w-fit gap-3 h-[3rem] ml-auto mr-14">
        <img  :src="imageSrc" alt="User Avatar" class="rounded-full">
        <span class="text-sm font-bold">{{ name }}</span>
      </NuxtLink>

      <div class="pr-4">
        <span class="fas fa-bell relative w-6">
          <span class="notification_dot absolute top-0 right-2 bg-red-500 text-[10px] w-3 h-3 text-center text-white leading-3 rounded-full">
            10
          </span>
        </span>
      </div>

          
    </div>
  </nav>
</template>
