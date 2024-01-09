export const previousMonth = (currentDate: string) => {
    const date = new Date(currentDate)
    let dateMonth = date.getMonth()
    let dateYear = date.getFullYear()
    // change month to previous month
    if (dateMonth === 0) {
        date.setMonth(11);
        date.setFullYear(dateYear - 1);
    } else date.setMonth(dateMonth - 1);
    return useDateFormat(date, 'MMMM YYYY').value
}
export const nextMonth = (currentDate: string) => {
    const date = new Date(currentDate)
    let dateMonth = date.getMonth()
    let dateYear = date.getFullYear()
    // change month to next month
    if (dateMonth === 11) {
        date.setMonth(0);
        date.setFullYear(dateYear + 1);
    } else date.setMonth(dateMonth + 1);
    return useDateFormat(date, 'MMMM YYYY').value
}