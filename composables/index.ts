type requestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type Header = {
    [key: string]: string
}
// type requestPayload<T> = T
// const payloadValue = undefined

export const useErrorHandler = (error: globalThis.Ref<Error | null>) => {
    // This would be responsible for displaying an alert
    // for now just console log the error
    console.error(error.value)
}

export const useMakeRequest = (request: string, method: requestMethod = 'GET', body: string | undefined = undefined, staging = false, header: Header = {}) => {
    // console.log("called")
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = staging ? runtimeConfig.public.PROD_BASE_URL : '';
    let headers = new Headers({
        ...header,
        'Content-Type': 'application/json',
        'Accept': '*/*'
    });
    // 
    request = toValue(request)
    method = toValue(method)

    return useAsyncData(
        request, 
        () => $fetch(`${baseUrl + request}`, {
            method: method,
            body: body,
            headers: headers,
        })
    )
}