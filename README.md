# express-health-route

Minimal express route that check some remote services status periodically based on ip + port and return their status as JSON

## Usage

```js

var express = require('express');

var getHealthRoute = require('./getHealthRoute');

var services = require('./services.json');

var app = express();

app.get('/', getHealthRoute(services));

var port = 6789;

app.listen(port, function() {
    console.log('Listening on port %d', port);
});
```

Sample services list

```json
[{
    "id": "some website",
    "ip": "212.27.48.10",
    "port": 80
},{
    "id": "google DNS",
    "ip": "8.8.8.8",
    "port": 53
},{
    "id": "invalid service",
    "ip": "1.2.3",
    "port": 9999
}]
```

Sample API output :

 > Notice the "up" key

```json
[{
    "id": "some website",
    "ip": "212.27.48.10",
    "port": 80,
    "up": true
},{
    "id": "google DNS",
    "ip": "8.8.8.8",
    "port": 53,
    "up": true
},{
    "id": "invalid service",
    "ip": "1.2.3",
    "port": 9999,
    "up": false
}]
```