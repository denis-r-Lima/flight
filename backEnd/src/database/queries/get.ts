import SELECT from "../classes/SELECT"

export async function GetFlights(database: string, args: any): Promise<Array<string>> {
  let query: string = `
        SELECT flights.id flight_id,
        origin.code origin,
        origin.name origin_name,
        origin.city origin_city,
        destination.code destination,
        destination.name destination_name,
        destination.city destination_city,
        duration,
        date(date_time) date,
        time(date_time) time
        FROM flights
        INNER JOIN origin
        ON origin.id = flights.origin_id
        INNER JOIN destination
        ON destination.id = flights.destination_id
        WHERE date_time > julianday('now')
         `

  let keys: Array<string> = Object.keys(args)

  if (keys.length > 0) {
    for (let key = 0; key < keys.length; key++) {
      query += ` AND ${keys[key]} = "${args[keys[key]]}"`
    }
  }

  query += ` ORDER BY date, time; `

  let response: Promise<Array<string>>

  let getFlights: SELECT = new SELECT(database)

  try {
    response = getFlights.Query(query)
    return response
  } catch (err: any) {
    console.log(err)
    return [err]
  }
}

export async function GetAirports(database: string): Promise<string[]> {
  let query: string = `
    SELECT * 
    FROM origin
    ORDER BY id
  `
  let response: Promise<Array<string>>

  let getAirports: SELECT = new SELECT(database)

  try {
    response = getAirports.Query(query)
    return response
  } catch (err: any) {
    console.log(err)
    return [err]
  }
}
