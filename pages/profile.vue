<template>
  <div class="flex flex-col items-center bg-gray-100 p-4">
    <div class="text-3xl font-bold mb-4">{{ student.name }}</div>
    <div class="text-lg text-gray-600">{{ student.major }}</div>
    <ul class="mt-4 space-y-2">
      <li><span class="font-semibold">Coursework:</span> {{ student.courses.join(', ') }}</li>
      <li><span class="font-semibold">Interests:</span> {{ student.interests.join(', ') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        name: 'Jane Doe',
        major: 'Computer Science',
        courses: ['Programming 101', 'Software Design', 'Artificial Intelligence'],
        interests: ['Travel', 'Music', 'Photography'],
      },
    };
  },
};
</script>