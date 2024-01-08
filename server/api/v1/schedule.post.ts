import type { ScheduleType, NewScheduleType } from "~/types"
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    // created to test store and state management and also to mock a network call
    const body: NewScheduleType = await readBody(event);
    // console.log('incoming:', body)
    const { scheduleMonth, ...newSchedule } = body
    // check file presence
    let file: string = 'data.json'
    const fileExists = fs.existsSync(path.join(process.cwd(), 'data.json'));
    const fileExistsSecondLocation = fs.existsSync('/tmp/data.json');
    if (!fileExists) {
        if(!fileExistsSecondLocation) {
            fs.writeFileSync('/tmp/data.json', JSON.stringify({}))
        }
        file = '/tmp/data.json'
    }
    
    
    const response = fs.readFileSync(file, { encoding: 'utf-8' });
    // console.log('sync file', JSON.parse(response));
    const existingSchedules: ScheduleType = JSON.parse(response);
    if (scheduleMonth in existingSchedules === false) existingSchedules[scheduleMonth] = []
    existingSchedules[scheduleMonth].push(newSchedule);
    fs.writeFileSync(file, JSON.stringify(existingSchedules))
    // console.log('return empty')
    setResponseStatus(event, 201)
    return {
        data: 'successful'
    }
  })