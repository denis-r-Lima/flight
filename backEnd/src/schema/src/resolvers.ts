import { GetFlights, GetAirports } from "../../database/queries/get"
import Insert from "../../database/queries/insert"
import Delete from "../../database/queries/delete"
import path from "path"

let database: string = path.join(__dirname, "../../database/AereaDB.db")

export const resolvers = {
  Query: {
    getFlights: async (parent: any, args: any, context: any, info: any): Promise<Array<string>> => {
      return GetFlights(database, args)
    },
    getAirports: async (args: any): Promise<Array<string>> => {
      return GetAirports(database)
    },
  },
  Mutation: {
    addFlight: (parent: any, args: any, context: any, info: any): Promise<string> => {
      return Insert(database, args)
    },
    deleteFlight: (parent: any, args: any, context: any, info: any): Promise<string> => {
      return Delete(database, args)
    },
  },
}
