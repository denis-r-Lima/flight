function parseDate(date: string, time: string): Date {
  return new Date(`${date} ${time}`)
}

export function correctDateFormat(date: string, time: string): string {
  let depDate: Date = parseDate(date, time)

  return `${depDate.toDateString()} - ${depDate.toLocaleTimeString()}`
}

export function correctDurationFormat(duration: number): string {
  let correctFormat: string = (duration / 60).toFixed(1)

  let [hours, minutes] = correctFormat.split(".")

  if (parseInt(minutes) === 0) {
    return `${hours} h`
  } else {
    minutes = (parseInt(minutes) * 6).toFixed(0)
    return `${hours} h ${minutes} min`
  }
}

export function generateArriveDate(date: string, time: string, duration: number): string {
  let depTime = parseDate(date, time).getTime()

  let arrDate: Date = new Date(depTime + duration * 60000)

  return `${arrDate.toDateString()} - ${arrDate.toLocaleTimeString()}`
}
