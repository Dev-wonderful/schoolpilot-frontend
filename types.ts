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
    description?: string,
    scheduleColor?: string
}
export interface ScheduleType {
    [month: string]: ScheduleObjType[]
}
export interface ResponseType<T> {
    data: globalThis.Ref<T>,
    error: globalThis.Ref<Error | null>
}
export interface SortedDayType {
    [day: string]: ScheduleObjType[]
}
export interface SortedResponseByDayType {
    [month: string]: SortedDayType
}
export interface NewScheduleType extends ScheduleObjType{
    scheduleMonth: string
}
export interface CustomError extends Error {
    statusCode: number
}
export interface LoginData {
    email: string,
    message: string,
    xToken: string,
}
export interface ActivationData extends LoginData {
}
export interface AccountActivationData {
    email: string,
    message: string,
    token: string
}
export type Status = 'active' | 'init' | 'deactivated'
export type Gender = 'Female' | 'Male'
export type Role = 'Student' | 'Lecturer' | 'HOD' | 'Dean' | 'Admin' | 'SuperAdmin'
export type Level = 100 | 200 | 300 | 400 | 500 | 600
export type DegreeLevel = 'UG' | 'PG'
export type Semester = 1 | 2
export type CourseUnit = 1 | 2 | 3 | 4
export interface Project {
    lecturer: string,
    courseCode: string,
    topic: string,
    link: string,
    deadline: string
}
export interface UserData {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    status: Status,
    gender: Gender,
    DOB: string,
    role: Role,
    type: DegreeLevel,
    standing: string,
}
export interface BasicID {
    _id: string,
    name: string
}
export interface StudentData extends UserData {
    matricNo: string,
    level: Level,
    major: string,
    projects: Array<Project>
}
export interface DepartmentData extends BasicID {
}
export interface FacultyData extends BasicID {
}
export interface CourseData extends BasicID {
    courseCode: string,
    level: Level,
    semester: Semester,
    units: CourseUnit
}

export interface StudentResponseData extends LoginData {
    readonly studenData: StudentData,
    readonly deptData: DepartmentData | BasicID,
    readonly factultyData: FacultyData | BasicID,
    readonly courseData: CourseData
}