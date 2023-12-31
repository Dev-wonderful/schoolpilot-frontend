import type { ScheduleType } from "~/types"

export default defineEventHandler((event) => {
    // created to test store and state management and also to mock a network call
    const query = getQuery(event)
    
    const month = typeof query.month === 'string' ? query.month : null
    const data: ScheduleType = {
        'December-2023': [
            {title: 'C++ Enums', scheduledTime: '2023-12-16T00:00:10.789'},
            {title: 'C++ Functions', scheduledTime: '2023-12-12T13:27:10.789'},
            {title: 'C++ Classes', scheduledTime: '2023-12-26T13:27:10.789'},
            {title: 'C++ Structs', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'C++ Datatypes', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'Read Biology', scheduledTime: '2023-12-16T16:35:10.789'},
            {title: 'Study reaction concepts', scheduledTime: '2023-12-16T13:07:10.789'},
            {title: 'endocrine systems', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'Daily reading', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'Practice questions', scheduledTime: '2023-12-16T13:27:10.789'},
        ],
        'November-2023': [
            {title: 'C++ Enums', scheduledTime: '2023-11-16T00:00:10.789'},
            {title: 'C++ Functions', scheduledTime: '2023-11-12T13:27:10.789'},
            {title: 'C++ Inheritance', scheduledTime: '2023-11-26T13:27:10.789'},
            {title: 'C++ Structs', scheduledTime: '2023-11-16T13:27:10.789'},
            {title: 'C++ Datatypes', scheduledTime: '2023-11-16T13:27:10.789'},
            {title: 'Read Biology', scheduledTime: '2023-11-16T16:35:10.789'},
            {title: 'Study reaction concepts', scheduledTime: '2023-11-16T13:07:10.789'},
            {title: 'endocrine systems', scheduledTime: '2023-11-16T13:27:10.789'},
            {title: 'Daily reading', scheduledTime: '2023-11-16T13:27:10.789'},
            {title: 'Practice questions', scheduledTime: '2023-11-16T13:27:10.789'},
        ]
    }
    // const returnData: ScheduleType = {};
    if (data[month as string]) {
        // returnData[month] = data[month];
        return data[month as string]
    }
    console.log('return empty')
    return []
  })