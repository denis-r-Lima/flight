import MODIFY from "../classes/MODIFY"

export default async function Insert(database: string, args: any): Promise<string> {
  let query: string = `
    INSERT INTO flights(origin_id, destination_id, duration, date_time)
    VALUES (${args.origin_id},${args.destination_id},${args.duration},julianday('${args.date_time}'))
    `

  let insertFlights: MODIFY = new MODIFY(database)

  let response: Promise<string>

  try {
    response = insertFlights.Query(query)
    return response
  } catch (err) {
    console.log(err)
    return err
  }
}
