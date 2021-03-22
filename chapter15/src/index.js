document.addEventListener("click", () => {
    import( /* webpackPreload: true */ "./click.js").then(({
        default: func
    }) => {
        func();
    })
})