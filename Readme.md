Chat Page

## How to start the server

* yarn or npm install to install dependency
* node server.js // to run the server

Same app is deployed on https://serene-savannah-52188.herokuapp.com/ for reference

Code will be running at localhost:3000, Please check the same in the browser


## Implementation
* A simple express server is present in `server.js` to run a server and provide static js/css files
* client side code resides in `public`
* Vanila JS is used to create the app
* flux/redux based state management is used, which is built from scratch.
    - public/js/lib/createStore.js
    - public/js/state/reducer.js
* A simple browser router is used to provide client side spa routing
    - public/js/lib/router.js

* Api calls and other utils are kept in
    - public/js/lib/utils.js
* View components are kept as components and templates
    - public/js/view/components.js
    - public/js/view/templates.js
* index.html contains and bare skeleton and all js code is included as script tags here


## Code flow
* Code starts at public/js/app.js
    - App class is initiated and attached to a root element in the html
    - Inside the apps constructor
        - store is intitalised and attached
        - router is intitalised and attached
        - api calls are dispactched
        - renderAndAddEventListeners() is called
            - render is called
            - addEventListeners is called

As name suggests render renders the html and addEventListeners attaches all the event listners and does other post rendering dom manipulation

## Functionality present
    * Msges can be typed and sent locally 
    * Search can be done on the home screen based on that text
    * Clicking on persons avtar and first name takes user to his/her chat page
    * auto expanding chat input box
    * throttle added for the search box on home screen


Since the msges are hardcoded, send some msg locally and search using that string on the home screen to filter out msges
No data manipulation on the client side for time etc is done, we are expecting it to come from the server



Pruthvi P
