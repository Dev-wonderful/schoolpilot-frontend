export default defineEventHandler((event) => {
    // created to test store and state management and also to mock a network call
    interface UpdateType {
        title: string,
        data: {title: string, scheduledTime: string}[]
    }
    const query = getQuery(event)
    const data: UpdateType[] = [
        {
          title: 'Pending Assignments',
          data: [
            {title: 'C++ Enums', scheduledTime: '2023-12-16T00:00:10.789'},
            {title: 'C++ Functions', scheduledTime: '2023-11-12T13:27:10.789'},
            {title: 'C++ Classes', scheduledTime: '2023-12-26T13:27:10.789'},
            {title: 'C++ Structs', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'C++ Datatypes', scheduledTime: '2023-12-16T13:27:10.789'},
          ]
        },
        {
          title: 'Upcoming Schedules',
          data: [
            {title: 'Read Biology', scheduledTime: '2023-12-16T16:35:10.789'},
            {title: 'Study reaction concepts', scheduledTime: '2023-12-16T13:07:10.789'},
            {title: 'endocrine systems', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'Daily reading', scheduledTime: '2023-12-16T13:27:10.789'},
            {title: 'Practice questions', scheduledTime: '2023-12-16T13:27:10.789'},
          ]
        }
      ]
      console.log('role', query.role)
    if (query.role === 'student' && query.id) return data;

    return []
  })