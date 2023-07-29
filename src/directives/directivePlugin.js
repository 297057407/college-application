
export const directivePlugin = {
    install(app) {
        app.directive('focus',{
            mounted(el) {
                el.focus()
            }
        })
    }
}