import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Flights {
    flight_id: Int!
    origin: String!
    origin_name: String!
    origin_city: String!
    destination: String!
    destination_name: String!
    destination_city: String!
    duration: Int!
    date: String!
    time: String!
  }
  type Airports {
    id: Int!
    code: String!
    name: String!
    city: String!
  }
  type Query {
    getFlights(origin: String, destination: String, date: String): [Flights]!
    getAirports: [Airports]!
  }
  type Mutation {
    addFlight(origin_id: Int!, destination_id: Int!, duration: Int!, date_time: String!): String
    deleteFlight(id: ID): String
  }
`
