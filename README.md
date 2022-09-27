# basic-auth

Authentication is a middleware responsible for verifying people on the web and securing their potentially sensitive data. Basic authentication uses a Base64 protocol, and bcrypt (which is slower) if  more security is required.

This app is a demo of accepting and encoding a users password in a database.Thunderclient can be used to test the functionality of the auth procedure. The following features will be implemented on the routes as middleware:

* POST request to signup with a username and password
* return a 201 status code upon success
* trigger a 401 (unauthorized)
* signin via POST request
* send basic authentication header with code 200 upon login
* trigger "invalid login" upon error
* manually test routes with HTTP REST client
