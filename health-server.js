var net = require('net');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function HealthServer(options) {

    var self = this;

    this.services = JSON.parse(JSON.stringify(options.services));

    function getServiceEntry(serviceId) {
        return self.services.find(function(s) { return s.id === service.id });
    }

    function pingServices() {
        function checkSingleService(service) {
            pingService(service, function(result) {
                var currentStatus = service.up;
                service.up = result;
                if (currentStatus !== result) {
                    self.emit('change', service, result);
                    if (result===true) {
                        self.emit('up', service.id);
                    } else {
                        self.emit('down', service.id);
                    }
                }
            });
        }
        for (var service in self.services) {
            checkSingleService(self.services[service]);
        }
        setTimeout(pingServices, options.interval || 10000);
    }

    function pingService(service, callback) {
        //var config = getServiceEntry(service.id);
        var sock = new net.Socket();

        sock.setTimeout(options.timeout || 2500);
        sock.on('connect', function(error) {
            //console.log('connect', error, service);
            callback(true);
            sock.destroy();
        }).on('error', function(e) {
            //console.log('error', service, arguments);
            callback(false);
        }).on('timeout', function(e) {
           // console.log('timeout', service);
            callback(false);
        }).connect(service.port, service.ip);
    }

    pingServices();

}

util.inherits(HealthServer, EventEmitter);


module.exports = HealthServer;

