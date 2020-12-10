import { useState, useEffect, useRef } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { Link } from "react-router-dom"

import logo from "./images/air_line_full.png"
import { Component, Head, Form, Button, Content, BackButton } from "./addStyle"
import FlightCard from "./components/flightCard"
import { Airports, GetAirports, SearchFlights, SearchVar, Flights } from "./src/interfaces"
import MapModal from "./components/mapModal"

import { GET_AIRPORTS, GET_FLIGHTS } from "./src/gqlQueries"

const Main: React.FC = () => {
  const [airports, setAirports] = useState<Airports[]>([])

  const origin = useRef<string>("")
  const destination = useRef<string>("")
  const date = useRef<string>("")
  const [flights, setFlights] = useState<Flights[]>([])

  const { loading, error, data: airportList } = useQuery<GetAirports>(GET_AIRPORTS)

  

  const [
    searchFlight,
    { loading: flightLoading, error: flightError, data: flightList, called },
  ] = useLazyQuery<SearchFlights>(GET_FLIGHTS)

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let variables: SearchVar = { variables: {} }

    if (origin.current !== "") variables.variables.origin = origin.current
    if (destination.current !== "") variables.variables.destination = destination.current
    if (date.current !== "") variables.variables.date = date.current

    searchFlight(variables)
  }

  useEffect(() => {
    if (flightList && called) {
      setFlights(flightList.getFlights)
    }
  }, [flightList , called])

  if (loading) {
    
  } else {
    if (error) console.log(error)
    if (airportList) {
      if (airports.length === 0) {
        setAirports(airportList.getAirports)
      }
    }
  }

  if (flightLoading) {
    
  } else {
    if (flightError)<div>Oh no! We gotta a error: {flightError}</div>
  }

  return (
    <Component>
      <Head>
        <div style={{ paddingTop: "5px" }}>
          <img src={logo} alt="logo" />
        </div>
        <Form>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <label htmlFor="origin">Origin:</label>
            <select name="Origin" id="origin" onChange={(e) => origin.current = (e.target.value)}>
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
            <select name="Origin" id="destination" onChange={(e) => destination.current = (e.target.value)}>
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
            <input type="date" name="date" id="date" onChange={(e) => date.current = (e.target.value)} />
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
                origin_name={flight.origin_name}
                destination={flight.destination}
                destination_city={flight.destination_city}
                destination_name={flight.destination_name}
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
      <MapModal origin="t" destination="e"/>
    </Component>
  )
}

export default Main
