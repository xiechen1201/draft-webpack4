import React, {
    Component
} from "react";
import ReactDom from "react-dom";
import _ from "loadsh";

class App extends Component{
    Super(){}
    render(){
        return(
            <div>
                <div>{ _.join(["this","is","app"],"~") }</div>
            </div>
        )
    }
}
ReactDom.render(<App />,document.getElementById("root"));