import type { ScheduleType } from "~/types"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'process'

export default defineEventHandler(async (event) => {
    // created to test store and state management and also to mock a network call
    const query = getQuery(event)
    
    const month = typeof query.month === 'string' ? query.month : null

    const fileExists = fs.existsSync('/data.json');
    console.log('exists:',fileExists);
    console.log('import.meta.url:', import.meta.url)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.join(path.dirname(__filename));
    const __dirname_2 = path.join(path.dirname(__filename), '../..');
    console.log('dirname', __dirname)
    console.log('dirname_2:',__dirname_2)
    console.log('cwd', process.cwd())
    console.log('check:', fs.existsSync(path.join(process.cwd(), 'data.json')))
    // if (!fileExists) fs.writeFileSync('/data.json', JSON.stringify({}))
    
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