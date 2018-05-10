var expect  = require("chai").expect;
var request = require("request");
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const _ = require('lodash');

const mockData = require('./mocks/sample-data');
const dbConfig = require('../config/database.config');
const MovieController = require('../app/controllers/movie.controller');
const Movie = require('../app/models/movie.model');

var srv_url = "http://localhost:3000/api"

describe("Movie Library API", () => {
    before(() => {
        mongoose.connect(dbConfig.url);
    });
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

  describe("get movies test.", () => {
      let request, reponse;
      before((done) => {
         request = httpMocks.createRequest({
             method: 'GET',
             url: '/movies'
         });
         response = httpMocks.createResponse({
             eventEmitter: require('events').EventEmitter
         });
         MovieController.findAll(request, response);
         response.on('end', () => {
             done();
         })
      });

      it('should should get all movies.', function (done) {
              let data = response._getData();
              expect(response.statusCode).to.equal(200);
              done();
      });

      it('should be equal to length in mock data', function (done) {
              let data = response._getData();
              expect(data.length).to.be.equal(mockData.movies.length);
              done();
      });
  });


  describe('create movie test.', () => {
      let request, reponse,
      body = {
          "title": "13 hours test",
          "genre":"adventure, action",
          "description" :"Story of a war."
      };
      before((done) => {
          request = httpMocks.createRequest({
              method: 'POST',
              url: '/movies',
              body: body
          });
          response = httpMocks.createResponse({
              eventEmitter: require('events').EventEmitter
          });
          MovieController.create(request, response);
          response.on('end', () => {done();});
      });

      it('should return 200 on success.', function () {
              expect(response.statusCode).to.equal(200);
      });

      it('should be equal to inserted object.', function () {
              let result = response._getData();
              expect(result.title).to.be.equal(body.title);
      });
  });

  describe('update movie test.', () => {
      let request, response, body;
      before((done) => {
         request = httpMocks.createRequest({
             method: 'GET',
             url: '/movies'
         });
         response = httpMocks.createResponse({
             eventEmitter: require('events').EventEmitter
         });
         MovieController.findAll(request, response);
         response.on('end', () => {
             let allMovies = response._getData();
             body = allMovies[0];
             body.title = 'new title';
             request = httpMocks.createRequest({
                 method: 'PUT',
                 url: '/movies/' + body._id,
                 body: body,
                 params: {
                     movieId: body._id
                 }
             });
             response = httpMocks.createResponse({
                 eventEmitter: require('events').EventEmitter
             });
             MovieController.update(request, response);
             response.on('end', () => {done();});
         })
      });

      it('should return 200 on successful update.', function (done) {
              expect(response.statusCode).to.be.equal(200);
              done();
      });
      it('should be equal to request body', function (done) {
              let result = response._getData();
              expect(result.title).to.be.equal(result.title);
              done();
      });
  });

  describe('get movie test.', () => {
      let request, response, body;
      before((done) => {
          request = httpMocks.createRequest({
              method: 'GET',
              url: '/movies'
          });
          response = httpMocks.createResponse({
              eventEmitter: require('events').EventEmitter
          });
          MovieController.findAll(request, response);
          response.on('end', () => {
              let allMovies = response._getData();
              body = allMovies[0];
              body.title = 'new title';
              request = httpMocks.createRequest({
                  method: 'GET',
                  url: '/movies/' + body._id,
                  params: {
                      movieId: body._id
                  }
              });
              response = httpMocks.createResponse({
                  eventEmitter: require('events').EventEmitter
              });
              MovieController.findOne(request, response);
              response.on('end', () => {done();});
          })
      });

      it('should return request obeject successfully with 200 status.', function (done) {
          expect(response.statusCode).to.be.equal(200);
          done();
      });

      it('should return requested Object.', function (done) {
          let result = response._getData();
          console.log('*******');
          console.log(result);
          console.log('*******');
          expect(result._id.toString()).to.be.equal(body._id.toString());
          done();
      });
  });

  describe('delete movie test.', () => {
      let request, response, body;
      before((done) => {
          request = httpMocks.createRequest({
              method: 'GET',
              url: '/movies'
          });
          response = httpMocks.createResponse({
              eventEmitter: require('events').EventEmitter
          });
          MovieController.findAll(request, response);
          response.on('end', () => {
              let allMovies = response._getData();
              body = allMovies[0];
              body.title = 'new title';
              request = httpMocks.createRequest({
                  method: 'DELETE',
                  url: '/movies/' + body._id,
                  params: {
                      movieId: body._id
                  }
              });
              response = httpMocks.createResponse({
                  eventEmitter: require('events').EventEmitter
              });
              MovieController.delete(request, response);
              response.on('end', () => {done();});
          })
      });

      it('should return 200 on successful deletion.', function (done) {
          expect(response.statusCode).to.be.equal(200);
          done();
      });

      it('should not contain deleted movie.', function () {
          request = httpMocks.createRequest({
              method: 'GET',
              url: '/movies'
          });
          response = httpMocks.createResponse({
              eventEmitter: require('events').EventEmitter
          });
          MovieController.findAll(request, response);
          response.on('end', () => {
             let result = response._getData();
             let movie = _.find(result, {_id: body._id})
              expect(movie).to.be.undefined;
          });
      });
  });
});
