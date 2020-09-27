/***************************************************
 SOAP Service Example
 2020-09 @mamund
 ***************************************************/

var http = require('http');
var soap = require('soap');
var wsdl = require('fs').readFileSync('hello-wsdl.xml', 'utf8');
var port = 8000;
var url = '/hello';

// define the service
var soapServices = {
  Hello_Service: {
    Hello_Port: {
      sayHello: function (args) {
        return {
          greeting: 'Hello, ' + args.firstName
        };
      }
    }
  }
}

// set up the http listener
var server = http.createServer(function(request,response) {
  response.end('404: Not Found: ' + request.url);
});
server.listen(port);

// route soap requests to local service
soap.listen(server, url, soapServices, wsdl, function(){
  console.log('server initialized');
});
