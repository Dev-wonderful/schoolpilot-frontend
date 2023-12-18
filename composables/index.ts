type requestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const useErrorHandler = (error: globalThis.Ref<Error | null>) => {
    // This would be responsible for displaying an alert
    // for now just console log the error
    console.error(error.value)
}

export const useMakeRequest = async (request: string, method: requestMethod = 'GET') => {
    // console.log("called")
    const baseUrl = ''
    // request = toValue(request)
    // method = toValue(method)
    const { data, error } = await useAsyncData(
        request, 
        () => $fetch(`${baseUrl + request}`, {
            method: method
        })
    )
    return { data, error };
}