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

// This is not relevant, no reason am
export function uniqueId() {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
      // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
      var ascicode = Math.floor((Math.random() * 42) + 48);
      if (ascicode < 58 || ascicode > 64) {
        // exclude all chars between : (58) and @ (64)
        idstr += String.fromCharCode(ascicode);
      }
    } while (idstr.length < 32);
  
    return (idstr);
}