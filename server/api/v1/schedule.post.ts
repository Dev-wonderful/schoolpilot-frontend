import type { ScheduleType, NewScheduleType } from "~/types"
import fs from 'fs'

export default defineEventHandler(async (event) => {
    // created to test store and state management and also to mock a network call
    const body: NewScheduleType = await readBody(event);
    // console.log('incoming:', body)
    const { scheduleMonth, ...newSchedule } = body
    
    const response = fs.readFileSync('data.json', { encoding: 'utf-8' });
    // console.log('sync file', JSON.parse(response));
    const existingSchedules: ScheduleType = JSON.parse(response);
    if (scheduleMonth in existingSchedules === false) existingSchedules[scheduleMonth] = []
    existingSchedules[scheduleMonth].push(newSchedule);
    fs.writeFileSync('data.json', JSON.stringify(existingSchedules))
    // console.log('return empty')
    setResponseStatus(event, 201)
    return {
        data: 'successful'
    }
  })