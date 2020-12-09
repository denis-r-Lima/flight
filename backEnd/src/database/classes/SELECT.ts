import { Database } from "sqlite3"
import SQL from "sqlite3"

const sql = SQL.verbose()

import DatabaseBasics from "./DATABASE"

export default class SELECT extends DatabaseBasics {
  private dataBaseAdd: string

  constructor(database: string) {
    super()
    this.dataBaseAdd = database
  }

  private sendQuery(query: string, database: Database): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      let res: Array<string> = []
      database.all(query, (err: Error | null, rows: any) => {
        if (err) {
          this.disconnect(database)
          reject(err)
        } else {
          rows.forEach((row: any) => {
            res.push(row)
          })
          resolve(res)
        }
      })
    })
  }

  async Query(query: string) {
    let db: any = await this.connect(this.dataBaseAdd, sql.OPEN_READONLY)
    let response: Array<string> = await this.sendQuery(query, db)
    this.disconnect(db)

    return response
  }
}
