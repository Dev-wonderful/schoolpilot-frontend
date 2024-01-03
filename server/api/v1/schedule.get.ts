import type { ScheduleType } from "~/types"
import fs from 'fs'

export default defineEventHandler(async (event) => {
    // created to test store and state management and also to mock a network call
    const query = getQuery(event)
    
    const month = typeof query.month === 'string' ? query.month : null
    
    const response = fs.readFileSync('data.json', { encoding: 'utf-8' })
    // console.log('sync file', JSON.parse(response))
    const data: ScheduleType = JSON.parse(response)
    // console.log(data)
    if (data[month as string]) {
        return data[month as string]
    }
    // console.log('return empty')
    return []
  })