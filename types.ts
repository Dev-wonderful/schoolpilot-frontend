// common types would be in this file
export interface DashboardUpdate {
    'Pending Assignments': Array<Project>,
    'Upcoming Schedules': Array<ScheduleObjType>
}
export type daysNum = {
    [month: string]: number
}
export interface ScheduleObjType {
    _id: string,
    title: string,
    time: string,
    description?: string,
    color?: string,
    createdAt: string
}
// @deprecated
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
export interface NewScheduleType extends Omit<ScheduleObjType, '_id' | 'createdAt'>{
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
type Status = 'active' | 'init' | 'deactivated'
type Gender = 'Female' | 'Male'
type Role = 'Student' | 'Lecturer' | 'HOD' | 'Dean' | 'Admin' | 'SuperAdmin'
type Level = 100 | 200 | 300 | 400 | 500 | 600
type DegreeLevel = 'UG' | 'PG'
type Semester = 1 | 2
type CourseUnit = 1 | 2 | 3 | 4
type EntryMode = 'DE'
type Standing = 'good'
type Title = 'Ms' | 'Mr'

interface UserData {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    status: Status,
    gender: Gender,
    DOB: string,
    role: Role,
    type: DegreeLevel,
    entryYear: number,
    createdAt: string,
    picture: string,
}
export interface CreatedBy {
    _id: string,
    department: string,
    email: string,
    firstName: string,
    lastName: string,
    staffId: string,
    title: Title,
    createdAt: string,
    entryYear: number
}
export interface Submission {
    student: string,
    answer: string,
    comment: string,
    score: number
}
interface BasicID {
    _id: string,
    name: string
}
export interface CourseData extends BasicID {
    courseCode: string,
    department: string
    level: Level,
    semester: Semester,
    units: CourseUnit,
    createdAt: string
}
export interface Project extends BasicID {
    info: string,
    course: CourseData,
    year: number,
    deadline: string,
    createdBy: CreatedBy,
    submissions: Array<Submission>
}
export interface StudentData extends UserData {
    matricNo: string,
    level: Level,
    major: string,
    entryMode: EntryMode,
    standing: Standing,
}
export interface StaffData extends UserData {
    staffId: string,
}
interface DepartmentData extends BasicID {
}
interface FacultyData extends BasicID {
}

export interface SortedProjectByDay {
    [month: string]: {
        [day: string]: Array<Project>
    }
}

export interface StudentDashboard extends StudentData {
    readonly department: DepartmentData,
    readonly faculty: FacultyData,
    readonly schedules: SortedResponseByDayType
    readonly projects: SortedProjectByDay
}

export interface StaffDashboard extends StaffData {
    readonly department: DepartmentData,
    readonly faculty: FacultyData,
    readonly schedules: SortedResponseByDayType
    readonly projects: SortedProjectByDay
}

export interface StudentResponseData extends Readonly<LoginData> {
    readonly DashBoard: StudentDashboard
    readonly Dashboard?: StudentDashboard
}
export interface StaffResponseData extends Readonly<LoginData> {
    readonly Dashboard: StaffDashboard
}
