# Readme

This project is built using [Create-React-App](https://github.com/facebook/create-react-app).

Development
_____
Run: `npm start`

Build
_____
Run: `npm run build`

CORS
_____
Set services.yml file: https://www.drupal.org/node/2715637
Set server https://stackoverflow.com/a/41742063/2368141 (this is for Apache/Xampp, obvs different for Nginx)
More CORS .htaccess info https://awesometoast.com/cors/

Drupal - Rest services
_____
- https://www.drupal.org/docs/8/core/modules/rest/javascript-and-drupal-8-restful-web-services
- http://www.darrylnorris.com/blog/how-to-request-a-node-via-rest-using-web-services-drupal-8
- https://github.com/signalpoint/jDrupal

React - Subdomains
_____
Domain build is deployed to must be specified in package.json: 
```
{
  "homepage": "http://example/learn"
}
```



