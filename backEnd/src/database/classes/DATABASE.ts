import { Database } from "sqlite3"
import SQL from "sqlite3"

let sql = SQL.verbose()

export default class DatabaseBasics {
  protected connect(database: string, mode: any) {
    return new Promise((resolve, reject) => {
      let db: Database = new sql.Database(database, mode, (err: Error | null) => {
        if (err) {
          reject(err.message)
        } else {
          console.log("Database connected")
          resolve(db)
        }
      })
    })
  }

  protected disconnect(database: Database) {
    database.close((err: Error | null) => {
      err ? console.log(new Error(err.message)) : console.log("Database disconnected")
    })
  }
}
