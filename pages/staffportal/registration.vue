<script setup>
    const { studentDetails } = storeToRefs(useStudentPortalStore());
    const courseData = [
        {
            "_id": "858d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "958d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        
        {
            "_id": "658d87ba4bedb05e8a76a7a6",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 1,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a7",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 1,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a8",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 1,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 1,
            "units": 2
        }
    ]
    const firstSemester = []
    const secondSemester = []

    courseData.forEach(course => {
        if (course.semester === 1) {
            firstSemester.push(course)
        } else {
            secondSemester.push(course)
        }
    })

    // console.log(firstSemester);
    const checkedCourses = ref([]);

    const onSubmitCourses = () => {
        checkedCourses.value = [];
    }

</script>


<template>
    <section>
        <div class="p-2 text-white bg-primary text-center rounded-lg mx-2">
        <p class="font-bold text-xl">Fist Semester</p>
        </div>
        <div class="rounded-lg shadow-md bg-white p-4 my-2 mx-2">
            <table class="w-full text-center">
                <thead>
                    <tr>
                        <th class="py-4">Select</th>
                        <th >Course Code</th>
                        <th class="">Course Title</th>
                        <th>Course Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="details in firstSemester">
                        <td class="py-4"><input type="checkbox" v-model="checkedCourses" :value="details"></td>
                            <td  class="py-2">{{ details.courseCode }}</td>
                            <td >{{ details.name }}</td>
                            <td >{{ details.units }}</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- second semester -->
        <div class="p-2 text-white bg-primary text-center rounded-lg my-4 mx-2">
        <p class="font-bold text-xl">Second Semester</p>
        </div>
        <div class="rounded-lg shadow-md bg-white p-4 my-2 mx-2">
            <table class="w-full text-center">
                <thead>
                    <tr>
                        <th class="py-4">Select</th>
                        <th >Course Code</th>
                        <th class="">Course Title</th>
                        <th>Course Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="details in secondSemester">
                        <td class="py-4"><input type="checkbox" v-model="checkedCourses" :value="details"></td>
                            <td  class="py-2">{{ details.courseCode }}</td>
                            <td >{{ details.name }}</td>
                            <td >{{ details.units }}</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="onSubmitCourses" class="bg-primary
        hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3 mt-3">
        Submit
        </button>
    </section>
</template>