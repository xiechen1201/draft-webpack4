function getComponent() {
    /* webpackChunkName:"loadsh" */
    return import("lodash").then(({
        default: _
    }) => {
        console.log(_.join(["a", "b", "c"], "--"));
    })
}
getComponent();