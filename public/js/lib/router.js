class Router {
    constructor(renderFunctionToCall) {
        this.navigateToUrl = this.navigateToUrl.bind(this);
        this.callRender = this.callRender.bind(this);
        this.registerToBrowser();
        this.renderFunctionToCall = renderFunctionToCall;
    }

    getCurrentUrl() {
        return location.pathname
    }

    registerToBrowser() {
        window.onpopstate = this.callRender;
    }

    callRender() {
        this.renderFunctionToCall();
    }

    navigateToUrl(path) {
        console.log('navigate called')
        history.pushState(
            {},
            path,
            location.origin + path
        );

        this.callRender();
    }
}