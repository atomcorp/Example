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

CORS - React dev
_____
To get CORS requests working with Drupal dev (eg Xampp), React can proxy the request to the api-serving server
Look for "proxy" in package.json. 
Src - https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development

Drupal - Rest services
_____
- https://www.drupal.org/docs/8/core/modules/rest/javascript-and-drupal-8-restful-web-services
- http://www.darrylnorris.com/blog/how-to-request-a-node-via-rest-using-web-services-drupal-8
- https://github.com/signalpoint/jDrupal

- User endpoints (user status, logout etc) https://www.drupal.org/node/2720655

React - Subdomains
_____
Domain build is deployed to must be specified in package.json: 
```
{
  "homepage": "http://example/learn"
}
```

Firebase
_____
export data (ie emails): https://firebase.google.com/docs/cli/auth

