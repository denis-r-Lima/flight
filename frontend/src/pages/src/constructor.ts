export class NewFlight {
  private origin: number
  private origin_name: string
  private destination: number
  private destination_name: string
  private duration: number
  private date_time: string

  constructor(
    origin: number,
    origin_name: string,
    destination: number,
    destination_name: string,
    duration: number,
    date_time: string
  ) {
    this.origin = origin
    this.origin_name = origin_name
    this.destination = destination
    this.destination_name = destination_name
    this.duration = duration
    this.date_time = date_time
  }

  public getData() {
    return {
      origin_id: this.origin,
      destination_id: this.destination,
      duration: this.duration,
      date_time: this.date_time,
    }
  }

  public showData() {
    return {
      origin: this.origin_name,
      destination: this.destination_name,
      duration: this.duration,
      date_time: this.date_time,
    }
  }
}
