<script setup>
    definePageMeta({
        layout: 'login'
    })

    const email = ref('');
    const firstname = ref('');
    const isValidEmail =ref('')

   function validateEmail() {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValidEmail.value = emailRegex.test(email.value);
    }
//    function onSubmit(){
//       if (isValidEmail.value) {
//         const formData = {
//           email: email.value,
//           firstname: firstname.value,
//         };
//         console.log(formData)
//         }
//         else
//         {
//           alert("Please enter a valid email address")
//         }}
    async function onSubmit() {
        if (isValidEmail.value) {
            const formData = {
           email: email.value,
          firstName: firstname.value,
        };
            console.log(formData);

            try {
            const { data } = await useFetch('https://schoolpilot.onrender.com/api/v1/studentportal/signin', {
                method: 'POST',
                body: formData,
            });

            // Handle the response data
            console.log('Response:', data);
            } catch (error) {
            // Handle errors
            console.error('Error:', error);
            }
        } else {
            alert('Please enter a valid email address');
        }
    }
</script>

<template>
    <div class="flex bg-primary flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-xl shadow-md">
            <div class="flex flex-col items-center mb-10 gap-y-1 justify-center">
                <img src="/assets/images/GraduationCap.png" class="bg-primary w-16">
                <p class="font-bold text-primary">SchoolPilot</p>
            </div>
            <div class="flex flex-col items-center justify-center">
                <form @submit.prevent="onSubmit" class="flex flex-col items-center justify-center">
                    <input type="text" v-model="firstname" placeholder="FirstName" required class="border focus:outline-none border-primary focus:border-[#3c005a] rounded-xl w-72 h-12 mb-4 px-4" />
                    <input type="email" v-model="email" @input="validateEmail" placeholder="Email" required class="focus:outline-none focus:border-[#3c005a] border border-primary rounded-xl w-72 h-12 mb-4 px-4">
                    <button type="submit" class="bg-primary rounded-xl text-white py-4 font-bold  text-2xl mb-4 w-72 text-center" to="/loginPage">Activate Account</button>
                </form>
            </div>
        </div>
    </div>

</template>

