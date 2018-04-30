var expect  = require("chai").expect;
var request = require("request");

var srv_url = "http://localhost:3000/"

describe("Movie Library API", () => {
  describe("movie health endpoint", () => {
    it("returns stats 200", () => {
        test_url = srv_url + "/healthz"

        request(test_url, (error, response, body) => {
            expect(response.statusCode).to.equal(200);
        });
    });
    it("replies with OK", () => {

    });
  });
  
  describe("list of movies", () => {

  });
});
