import { gql } from "@apollo/client"

export const GET_AIRPORTS = gql`
  query {
    getAirports {
      id
      code
      city
    }
  }
`

export const SAVE_FLIGHTS = gql`
  mutation addFlight(
    $origin_id: Int!
    $destination_id: Int!
    $duration: Int!
    $date_time: String!
  ) {
    addFlight(
      origin_id: $origin_id
      destination_id: $destination_id
      duration: $duration
      date_time: $date_time
    )
  }
`
export const GET_FLIGHTS = gql`
  query getFlights($origin: String, $destination: String, $date: String) {
    getFlights(origin: $origin, destination: $destination, date: $date) {
      flight_id
      origin
      origin_city
      origin_name
      destination
      destination_city
      destination_name
      duration
      date
      time
    }
  }
`
