var HealthServer = require('./health-server');

var getHealthRoute = function(services) {

    var srv = new HealthServer({
        services: services,
        interval: 3000
    });

    srv.on('up', function(service) {
        console.log('health-server:UP:' + service );
    });

    srv.on('down', function(service) {
        console.log('health-server:DOWN:' + service );
    });

    return function(req, res) {
      res.send(srv.services);
    };

}

module.exports = getHealthRoute;
