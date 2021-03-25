import axios from "axios";
import React, {
    Component
}
from "react"; 
import ReactDom from "react-dom";
import { BrowserRouter,Route } from "react-router-dom";
import Home from './home.js'
import List from './list.js'

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/list" component={List}></Route>
                </BrowserRouter>
            </div>
        )
    }
}

ReactDom.render(<App />,document.getElementById("root"));