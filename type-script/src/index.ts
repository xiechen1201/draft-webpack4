import * as _ from "loadsh";

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return _.join(["Hello", this.greeting], "~")
    }
}

let greeter = new Greeter("World");

let button = document.createElement("button");
button.textContent = "Say Hello";
button.onclick = function () {
    alert(greeter.greet());
}
document.body.appendChild(button);
