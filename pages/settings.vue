<template>
  <div class=" mx-auto px-4">
    <h1 class="text-3xl font-bold mb-4">My Profile</h1>

    <div v-if="student">
      <div class="rounded-lg shadow-md bg-white p-4">
        <div class="flex items-center mb-4">
          <div class="rounded-full w-48 h-48 overflow-hidden mr-4">
            <img :src="imageSrc" class="w-full h-full object-cover" />
          </div>
          <div>
            <h2 class="text-2xl font-bold">{{ student.name }}</h2>
            <p class="text-gray-600 mb-2">{{ student.email }}</p>
            <p class="text-gray-600">{{ student.major }}</p>
          </div>
        </div>
        <p class="mb-4">{{ student.bio }}</p>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Loading profile...</p>
    </div>
  </div>
</template>


<script setup>
const { name, avatar } = storeToRefs(useDashboardUpdateStore());
const imageSrc = avatar.value ? avatar.value : '/images/Frame.png';
const student = ref({name: 'Nathan', email: 'onwuka@gmail.com', major: 'Computer Sci', bio:"Travel, Music, Photography"});

// const fetchStudentData = async () => {
//   try {
//     const response = await fetch('/api/student'); 
//     const data = await response.json();
//     student.value = data;
//   } catch (error) {
//     console.error('Error fetching student data:', error);
//   }
// };

// fetchStudentData();
</script>

