import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {Link} from "react-router-dom"

import { Airports, GetAirports } from "./src/interfaces"
import { NewFlight } from "./src/constructor"
import { SAVE_FLIGHTS, GET_AIRPORTS } from "./src/gqlQueries"
import logo from "./images/air_line_full.png"

import { Component, Head, Form, Button, Content, BackButton } from "./addStyle"
import "./addFlight.css"

const AddFlightPage: React.FC = () => {
  const [flightList, setFlightList] = useState<NewFlight[]>([])

  const [origin, setOrigin] = useState<number>(NaN)
  const [destination, setDestination] = useState<number>(NaN)
  const [duration, setDuration] = useState<number>(NaN)
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")

  const [airports, setAirports] = useState<Airports[]>([])

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isNaN(origin) || isNaN(destination) || date === "" || time === "" || isNaN(duration)) {
      alert("Please fill all fields!")
      return
    }
    setFlightList([
      ...flightList,
      new NewFlight(
        origin,
        airports[origin - 1].code,
        destination,
        airports[destination - 1].code,
        duration,
        `${date} ${time}`
      ),
    ])
    let form = e.target as HTMLFormElement
    form.reset()

  }

  const [save, { data: response }] = useMutation(SAVE_FLIGHTS)

  const saveHandle = () => {
    if(flightList.length === 0){
      alert("Add flights before saving")
      return
    }
    flightList.map((flight) => {
      let flightData = flight.getData()

      save({
        variables: {
          origin_id: flightData.origin_id,
          destination_id: flightData.destination_id,
          duration: flightData.duration,
          date_time: flightData.date_time,
        },
      })

      return response
    })
    setFlightList([])
  }

  return (
    <div>
      <Component>
        <Head>
          <div style={{ paddingTop: "5px" }}>
            <img src={logo} alt="logo" />
          </div>
          <Form>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} id="Form">
              <label htmlFor="origin">Origin:</label>
              <select
                name="Origin"
                id="origin"
                onChange={(e) => setOrigin(parseInt(e.target.value))}
              >
                <option value="zero"> </option>
                {airports.length > 0 ? (
                  airports.map((airport) => {
                    return (
                      <option value={airport.id} key={airport.id}>
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
              <select
                name="Origin"
                id="destination"
                onChange={(e) => setDestination(parseInt(e.target.value))}
              >
                <option value="zero"> </option>
                {airports.length > 0 ? (
                  airports.map((airport) => {
                    return (
                      <option value={airport.id} key={airport.id}>
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
              <label htmlFor="time">Time:</label>
              <input type="time" name="time" id="time" onChange={(e) => setTime(e.target.value)} />
              <label htmlFor="duration">Duration:</label>
              <input
                type="number"
                name="duration"
                id="duration"
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
              <Button type="submit" primary>Add Flight</Button>
            </form>
          </Form>
        </Head>
        <Content>
          <table>
            <tbody>
              <tr id="header">
                <td>Origin</td>
                <td>Destination</td>
                <td>Flight Duration</td>
                <td>Flight Date-Time</td>
              </tr>
              {flightList.map((flight) => {
                let flightData = flight.showData()
                return (
                  <tr key={flightData.origin + flightData.destination + flightData.date_time}>
                    <td>{flightData.origin}</td>
                    <td>{flightData.destination}</td>
                    <td>{flightData.duration}</td>
                    <td>{flightData.date_time}</td>
                    <td style={{minWidth: "0"}}>X</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Button onClick={saveHandle}>Save</Button>
        </Content>
        <Link to="/">
          <BackButton>
            &#10094; Back
          </BackButton>
        </Link>
      </Component>
    </div>
  )
}

export default AddFlightPage
