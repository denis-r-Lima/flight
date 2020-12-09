import React from "react"
import { ApolloProvider } from "@apollo/client"

import apolloClient from "./server/index"

import Routes from "./routes"


const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="App">
        <Routes />
      </div>
    </ApolloProvider>
  )
}

export default App
