function getComponent() {
    return import("lodash").then(({
        default: _
    }) => {
        console.log(_.join(["a", "b", "c"], "--"));
    })
}

document.addEventListener("click", () => {
    console.log(1)
    getComponent();
})