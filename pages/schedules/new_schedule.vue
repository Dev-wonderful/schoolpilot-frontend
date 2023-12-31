<template>
    <section class="md:container">
        <section class="max-w-[90%] h-[750px] mx-auto my-7 grid grid-cols-1 grid-rows-6 bg-bue-50 rounded-md shadow-md">
            <h1 class="schedule_title row-span-1 text-2xl text-center py-2 bg-primary text-white flex flex-col justify-center items-center">
                New Schedule
            </h1>
            <form class="more_details caret-primary row-span-5 text-lg flex flex-col justify-start items-center gap-5 pt-5 px-5 h-full bg-puple-100">
                <label for="title" class="date w-full">Title <span class=" text-red-600">*</span>
                    <input type="text" id="title" name="title" class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="date" class="date w-full">Date <span class=" text-red-600">*</span>
                    <input type="date" id="date" name="date" class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="time" class="time w-full">Time <span class=" text-red-600">*</span>
                    <input type="time" id="time" name="time" class="px-4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="color" class="time w-full">Schedule Colour <span class=" text-red-600">*</span>
                    <input type="color"  id="color" name="color" class="px4 w-full shadow-inner h-10 leading-10 text-sm rounded-md" required>
                </label>
                <label for="description" class="time w-full">Description
                    <textarea id="description" name="description" class="p-4 w-full leading-normal shadow-inner h-28 text-sm rounded-md">
                        {{  }}
                    </textarea>
                </label>
                <input type="submit" value="Create Schedule" class=" cursor-pointer p-2 rounded-md shadow-md bg-primary text-white w-[300px]">
            </form>
        </section>
    </section>
</template>