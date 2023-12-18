type requestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const errorHandler = (error: globalThis.Ref<Error | null>) => {
    // This would be responsible for displaying an alert
    // for now just console log the error
    console.error(error.value)
}

export const makeRequest = async (request: string, method: requestMethod = 'GET') => {
    const baseUrl = ''
    console.log('request:', request)
    const { data, error } = await useAsyncData(
        request, 
        () => $fetch(`${baseUrl + request}`, {
            method: method
        })
    )
    return { data, error };
}