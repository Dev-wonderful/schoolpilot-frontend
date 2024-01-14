<script setup>
const { studentDetails } = storeToRefs(useStudentPortalStore());
const courseData = studentDetails.value.courseData
</script>

<template>
    <section>
        <div class="p-2 text-white bg-primary text-center rounded-lg mx-2">
        <p class="font-bold text-xl">First Semester</p>
        </div>
        <div class="rounded-lg shadow-md bg-white p-4 my-2 mx-2">
            <table class="w-full text-center">
                <thead>
                    <tr>
                        <th >Course Code</th>
                        <th class="">Course Title</th>
                        <th>Course Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="details in courseData">
                        <template v-if="details.semester === 1">
                            <td  class="py-2">{{ details.courseCode }}</td>
                            <td >{{ details.name }}</td>
                            <td >{{ details.units }}</td>
                        </template>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="p-2 text-white bg-primary text-center rounded-lg mx-2">
        <p class="font-bold text-xl">Second Semester</p>
        </div>
        <div class="rounded-lg shadow-md bg-white p-4 my-2 mx-2">
            <table class="w-[100%] text-center">
                <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Title</th>
                        <th>Course Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="details in courseData">
                        <template v-if="details.semester === 2">
                            <td class="py-2">{{ details.courseCode }}</td>
                            <td>{{ details.name }}</td>
                            <td>{{ details.units }}</td>
                        </template>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        
    </section>
</template>
