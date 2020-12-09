import { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { Link } from "react-router-dom"

import logo from "./images/air_line_full.png"
import { Component, Head, Form, Button, Content, BackButton } from "./addStyle"
import FlightCard from "./components/flightCard"
import { Airports, GetAirports, SearchFlights, SearchVar, Flights } from "./src/interfaces"

import { GET_AIRPORTS, GET_FLIGHTS } from "./src/gqlQueries"

const Main: React.FC = () => {
  const [airports, setAirports] = useState<Airports[]>([])

  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [flights, setFlights] = useState<Flights[]>([])

  const { loading, error, data: airportList } = useQuery<GetAirports>(GET_AIRPORTS)

  if (loading) {
  } else {
    if (error) console.log(error)
    if (airportList) {
      if (airports.length === 0) {
        setAirports(airportList.getAirports)
      }
    }
  }

  const [
    searchFlight,
    { loading: flightLoading, error: flightError, data: flightList, called },
  ] = useLazyQuery<SearchFlights>(GET_FLIGHTS)

  if (flightLoading) {
    console.log("loading")
  } else {
    if (flightError) console.log(flightError)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let variables: SearchVar = { variables: {} }

    if (origin !== "") variables.variables.origin = origin
    if (destination !== "") variables.variables.destination = destination
    if (date !== "") variables.variables.date = date

    searchFlight(variables)
  }

  useEffect(() => {
    if (flightList && called) {
      setFlights(flightList.getFlights)
    }
  }, [flightList , called])

  return (
    <Component>
      <Head>
        <div style={{ paddingTop: "5px" }}>
          <img src={logo} alt="logo" />
        </div>
        <Form>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <label htmlFor="origin">Origin:</label>
            <select name="Origin" id="origin" onChange={(e) => setOrigin(e.target.value)}>
              <option value=""> </option>
              {airports.length > 0 ? (
                airports.map((airport) => {
                  return (
                    <option value={airport.code} key={airport.id}>
                      {" "}
                      {airport.code} - {airport.city}{" "}
                    </option>
                  )
                })
              ) : (
                <option value="0"> </option>
              )}
            </select>
            <label htmlFor="destination">Destination:</label>
            <select name="Origin" id="destination" onChange={(e) => setDestination(e.target.value)}>
              <option value=""> </option>
              {airports.length > 0 ? (
                airports.map((airport) => {
                  return (
                    <option value={airport.code} key={airport.id}>
                      {" "}
                      {airport.code} - {airport.city}{" "}
                    </option>
                  )
                })
              ) : (
                <option value="0"> </option>
              )}
            </select>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)} />
            <Button primary type="submit">
              Search
            </Button>
          </form>
        </Form>
      </Head>
      <Content>
        {flights.length > 0 ? (
          flights.map((flight) => {
            return (
              <FlightCard
                flight_id={flight.flight_id}
                date={flight.date}
                time={flight.time}
                duration={flight.duration}
                origin={flight.origin}
                origin_city={flight.origin_city}
                destination={flight.destination}
                destination_city={flight.destination_city}
                key={flight.flight_id}
              />
            )
          })
        ) : (
          <div>Sorry, appear that we don´t have any flight for the selected date!</div>
        )}
      </Content>
      <Link to="/add">
        <BackButton>Add Flights &#10095;</BackButton>
      </Link>
    </Component>
  )
}

export default Main
