// common types would be in this file
export interface UpdateType {
    title: string,
    data: {title: string, scheduledTime: string}[]
}
export type daysNum = {
    [month: string]: number
}
export interface ScheduleObjType {
    title: string,
    scheduledTime: string,
    description?: string
}
export interface ScheduleType {
    [month: string]: ScheduleObjType[]
}
export interface ResponseType<T> {
    data: globalThis.Ref<T>,
    error: globalThis.Ref<Error | null>
}
export interface SortedResponseByDayType {
    [month: string]: {
        [day: string]: ScheduleObjType[]
    }
}