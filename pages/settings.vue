<template>
  <div class=" mx-auto px-4">
    <h1 class="text-3xl font-bold mb-4">My Profile</h1>

    <div v-if="student">
      <div class="rounded-lg shadow-md bg-white p-4">
        
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center">
            <div class="rounded-full w-48 h-48 overflow-hidden mr-4">
              <img :src="imageSrc" class="w-full h-full object-cover" />
            </div>
            <div>
              <h2 class="text-2xl font-bold">{{ student.firstName }}</h2>
              <p class="font-medium text-lg">ID: {{ student.matricNo }}</p>
              <p class="font-medium text-lg">Dept: {{ student.department }}</p>
            </div>
          </div>
          <div>
            <button class="p-3 text-white font-medium bg-primary rounded-lg justify-self-end">Change password</button>
          </div>
        </div>
        
        <div :class="divperson">
          <span class="text-lg font-bold">Full Name: </span><span class="font-medium">{{ student.lastName }} {{ student.firstName  }} {{ student.middleName  }} </span>
        </div>
        <div :class="divperson">
          <span class="text-lg font-bold">Gender: </span><span class="font-medium">{{ student.gender }} </span>
        </div>
        <div :class="divperson">
          <span class="text-lg font-bold">Date of Birth: </span><span class="font-medium">{{ student.DOB }} </span>
        </div>
        <div :class="divperson">
          <span class="text-lg font-bold">Nationality: </span><span class="font-medium">{{ student.nationality }} </span>
        </div>
        <div :class="divperson">
          <span class="text-lg font-bold">State of Origin: </span><span class="font-medium">{{ student.stateOfOrigin }} </span>
        </div>
        <div :class="divperson">
          <span class="text-lg font-bold">Phone number: </span><span class="font-medium">{{ student.phone }} </span>
        </div>

        <div :class="divperson">
          <span class="text-lg font-bold">Next of Kin: </span><span class="font-medium">{{ student.NextOfKin }} </span>
        </div>
        <div :class="divperson">
          <span class="text-lg font-bold">contact of Next of Kin: </span><span class="font-medium">{{ student.NextOfKincontact }} </span>
        </div>
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
const student = ref({firstName: 'Nathan',matricNo: '1246465', NextOfKin: 'Wonderful', NextOfKincontact:'0807353788', lastName:'John', middleName: 'Ebuka', department:'computer sci',gender: 'male', DOB: '01/22/2022', nationality: 'Nigeria', stateOfOrigin:'Lagos', LGA: 'Lekki', phone: '09033338339', email: 'onwuka@gmail.com', bio:"Travel, Music, Photography"});

const divperson ="p-4 mx-auto shadow-lg rounded-sm w-full mb-3"

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

