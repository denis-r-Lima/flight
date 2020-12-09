import MODIFY from "../classes/MODIFY"

export default async function Delete(database: string, args: any): Promise<string> {
  let query: string
  if (args.id) {
    query = `
    DELETE FROM flights
    WHERE id = ${args.id}
    `
  } else {
    query = `
    DELETE FROM flights
    WHERE date_time < julianday('now')
    `
  }

  let deleteFlight: MODIFY = new MODIFY(database)
  let response: Promise<string>
  try {
    response = deleteFlight.Query(query)
    return response
  } catch (err) {
    return err
  }
}
