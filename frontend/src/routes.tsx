import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { Redirect } from "react-router-dom"

import AddFlight from "./pages/addFlight"
import Main from "./pages/Main"

const Routes: React.FC  = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/add" component={AddFlight} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes