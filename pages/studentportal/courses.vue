<script setup>
// const { studentDetails } = storeToRefs(useStudentPortalStore());
// const courseData = studentDetails.value.courseData



const requestCourses = `/studentportal/getregisteredcourses`;

let registeredCourses = ref([]);

useMakeRequest(requestCourses, 'GET', undefined, true)
    .then((response) => {
        const status = response.status.value
        if (status === 'success') {
            return response.data.value
        } else if (status === 'error') {
            const statusCode = (response.error.value)?.statusCode
            if (statusCode === 401) {
                throw new Error('Sorry invalid credentials')
            } else {
                throw new Error('Forbidden')
            }
        }
    })
    .then((responseData) => {
        registeredCourses.value = [...responseData.registeredCourses]
        console.log('loggedin response:', registeredCourses.value)
    })
    // Function to filter courses based on semester
        const getRegisteredCoursesBySemester = (semester) => {
        return registeredCourses.value
        .filter(semesterData => semesterData.semester === semester)
        .flatMap(semesterData => semesterData.courses);
};

</script>

<template>
    <ClientOnly>
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
                    <tr v-for="(course, index) in getRegisteredCoursesBySemester(1)" :key="index">
                        <!-- <template v-if="details.semester === 1"> -->
                            <td  class="py-2">{{ course.courseCode }}</td>
                            <td >{{ course.name }}</td>
                            <td >{{ course.units }}</td>
                        <!-- </template> -->
                        
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
                    <tr v-for="(course, index) in getRegisteredCoursesBySemester(2)" :key="index">
                        <!-- <template v-if="course.semester === 2"> -->
                            <td class="py-2">{{ course.courseCode }}</td>
                            <td>{{ course.name }}</td>
                            <td>{{ course.units }}</td>
                        <!-- </template> -->
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    </ClientOnly>
</template>
