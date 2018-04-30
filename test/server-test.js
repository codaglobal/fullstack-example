var expect  = require("chai").expect;
var request = require("request");

var srv_url = "http://localhost:3000/"

describe("Movie Library API", () => {
  describe("movie health endpoint", () => {
    var test_url = srv_url + "healthz";

    it(test_url + " returns status 200", () => {
        request(test_url, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
        });
    });

    it(test_url + "replies with 'OK'", () => {
        request(test_url, (error, response, body) => {
            expect(body).to.equal("OK");
        });
    });
  });
});
