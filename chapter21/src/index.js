import axios from "axios";
import React, {
    Component
}
from "react"; 
import ReactDom from "react-dom";

class App extends Component {
    componentDidMount(){
        axios.get("/react/api/header.json").then(res=>{
            console.log(res)
        })
    }
    render() {
        return <div>Hello Word!</div>
    }
}

ReactDom.render(<App />,document.getElementById("root"));