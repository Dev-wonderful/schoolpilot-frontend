<script setup>
const courseData = [
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
            "courseCode": "GST-300",
            "name": "English Language: Lexis and Structure",
            "level": 300,
            "semester": 2,
            "units": 2
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
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
        },
        {
            "_id": "658d87ba4bedb05e8a76a7a9",
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
                        <th >Course Code</th>
                        <th class="">Course Title</th>
                        <th>Course Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="details in courseData">
                        <template v-if="details.semester === 2">
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
                        <template v-if="details.semester === 1">
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
