export interface Airports {
  id: number
  code: string
  city: string
}

export interface GetAirports {
  getAirports: Airports[]
}

export interface Flights {
  flight_id: number
  origin: string
  origin_name?: strings
  origin_city: string
  destination: string
  destination_name?: string
  destination_city: string
  duration: number
  date: string
  time: string
}

export interface SearchFlights {
  getFlights: Flights[]
}

export interface SearchFlightVariables {
  origin?: string
  destination?: string
  date?: string
}

export interface SearchVar {
  variables: SearchFlightVariables
}

export interface FlightCardProps {
  flight_id: number
  origin: string
  origin_city: string
  destination: string
  destination_city: string
  duration: number
  date: string
  time: string
}
