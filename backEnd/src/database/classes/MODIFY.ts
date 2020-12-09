import { Database } from "sqlite3"
import SQL from "sqlite3"

const sql = SQL.verbose()

import DatabaseBasics from "./DATABASE"

export default class MODIFY extends DatabaseBasics {
  private dataBaseAdd: string

  constructor(database: string) {
    super()
    this.dataBaseAdd = database
  }

  private sendQuery(query: string, database: Database): Promise<string> {
    return new Promise((resolve, reject) => {
      database.run(query, (err: Error | null) => {
        if (err) {
          this.disconnect(database)
          reject(err.message)
        } else {
          resolve("Success")
        }
      })
    })
  }

  async Query(query: string): Promise<string> {
    let db: any = await this.connect(this.dataBaseAdd, sql.OPEN_READWRITE)
    let response = await this.sendQuery(query, db)
    this.disconnect(db)
    return response
  }
}
