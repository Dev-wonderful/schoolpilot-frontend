import type { ScheduleType } from "~/types"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'process'

export default defineEventHandler(async (event) => {
    // created to test store and state management and also to mock a network call
    const query = getQuery(event)
    
    const month = typeof query.month === 'string' ? query.month : null

    let file: string = 'data.json'
    const fileExists = fs.existsSync(path.join(process.cwd(), 'data.json'));
    const fileExistsSecondLocation = fs.existsSync('/tmp/data.json');
    
    // if (!fileExists) if(!fileExistsSecondLocation) fs.writeFileSync('/tmp/data.json', JSON.stringify({}))
    if (!fileExists) {
        if(!fileExistsSecondLocation) {
            fs.writeFileSync('/tmp/data.json', JSON.stringify({}))
        }
        file = '/tmp/data.json'
    }
    
    const response = fs.readFileSync(file, { encoding: 'utf-8' })
    // console.log('sync file', JSON.parse(response))
    const data: ScheduleType = JSON.parse(response)
    // console.log(data)
    if (data[month as string]) {
        return data[month as string]
    }
    // console.log('return empty')
    return []
  })