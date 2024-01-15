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

/**
 * Calls the endpoint for you
 * @param {string} request The endpoint url to call
 * @param {requestMethod} method The HTTP method
 * @param {string} body The request payload
 * @param {boolean} staging The environment to target
 * @param {Header} header Any additional headers for the request
 * @returns A Promise object of the request
 */
export const useMakeRequest = (request: string, method: requestMethod = 'GET', body: string | undefined = undefined, staging = false, header: Header = {}) => {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = staging ? runtimeConfig.public.PROD_BASE_URL : '';
    const token = useCookie('xToken').value

    let headers = new Headers({
        ...header,
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'X-Token': token as string,
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
/**
 * Delay the navigation to a page briefly for any reason
 * @param {string} navPath The navigation link
 */
export const useDelayNavigationBriefly = useDebounceFn((navPath: string) => {
    navigateTo(navPath);
}, 2000)