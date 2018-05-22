var expect  = require("chai").expect;
var request = require("request");
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');
const _ = require('lodash');
const MongoDb = require('./mocks/mongoDb').MongoDb;
const MongoUnit = require('./mocks/mongoDb').MongoUnit;

const mockData = require('./mocks/sample-data');
const dbConfig = require('../config/database.config');
const MovieController = require('../app/controllers/movie.controller');
const Movie = require('../app/models/movie.model');
const errorMsgs = require('../app/constants/errormsg.constants');
const uuidv1 = require('uuid');

var srv_url = "http://localhost:3000/api"

describe("Movie Library API", () => {
    before((done) => {
        console.log('creating db');
        let mongoDb = new MongoDb();
        mongoDb.startMockDb(() => {
            console.log('started and loaded data');
            mongoose.connect(dbConfig.url);
            console.log('setup done');
            done();
        });
    });

    after(() => {
        console.log('destroying db');
       MongoUnit.drop();
    });
  // describe("movie health endpoint", () => {
  //   var test_url = srv_url + "healthz";
  //
  //   it(test_url + " returns status 200", () => {
  //       request(test_url, (error, response, body) => {
  //           expect(response.statusCode).to.equal(200);
  //       });
  //   });
  //
  //   it(test_url + "replies with 'OK'", () => {
  //       request(test_url, (error, response, body) => {
  //           expect(body).to.equal("OK");
  //       });
  //   });
  // });

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
              expect(data).to.be.an('array');
              done();
      });
  });


  describe('create movie test.', () => {
      let request, response,
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

      it('should return 200 on success.', function (done) {
              expect(response.statusCode).to.equal(200);
              done();
      });

      it('should be equal to inserted object.', function (done) {
              let result = response._getData();
              expect(result.title).to.be.equal(body.title);
              done();
      });
  });

  describe('create movie with no description.', () => {
      let request, response, body = {
          "title": "13 hours test",
          "genre":"adventure, action"
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
          response.on('end', () => done());
          MovieController.create(request, response);
      });

      it('should return 400 status code.', function (done) {
          expect(response.statusCode).to.be.equal(400);
          done();
      });

      it('should return description error message.', function (done) {
          let result = response._getData();
          expect(result.message).to.be.equal(errorMsgs.MOVIE_CREATE.NO_DESCRIPTION);
          done();
      });
  });


    describe('create movie with dirty description.', () => {
        let request, response, body = {
            "title": "13 hours test",
            "genre":"adventure, action",
            "description": {"k1": "v1", "k2":{"k2v1": "k2v2"}}
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
            response.on('end', () => done());
            MovieController.create(request, response);
        });

        it('should return 500 status code.', function (done) {
            expect(response.statusCode).to.be.equal(500);
            done();
        });

        it('should return description error message.', function (done) {
            let result = response._getData();
            expect(result.message).to.be.not.undefined;
            done();
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
             body = allMovies[2];
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
              expect(result.title).to.be.equal(body.title);
              done();
      });
  });

    describe('update movie without description test.', () => {
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
                body.description = undefined;
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
                response.on('end', () => {done();});
                MovieController.update(request, response);
            })
        });

        it('should return 400 on successful update.', function (done) {
            expect(response.statusCode).to.be.equal(400);
            done();
        });
        it('should be equal to request body', function (done) {
            let result = response._getData();
            expect(result.message).to.be.equal(errorMsgs.MOVIE_CREATE.NO_DESCRIPTION);
            done();
        });
    });

    describe('update not existing movie test.', () => {
        let request, response, id = uuidv1(), body = mockData.movies[0];
        body._id = id;
        before((done) => {
                request = httpMocks.createRequest({
                    method: 'PUT',
                    url: '/movies/' + id,
                    body: body,
                    params: {
                        movieId: id
                    }
                });
                response = httpMocks.createResponse({
                    eventEmitter: require('events').EventEmitter
                });
                response.on('end', () => {done();});
            MovieController.update(request, response);
        });

        it('should return 404 on successful update.', function (done) {
            expect(response.statusCode).to.be.equal(404);
            done();
        });
        it('should be equal to request body', function (done) {
            let result = response._getData();
            expect(result.message).to.be.equal(errorMsgs.NOT_FOUND(id));
            done();
        });
    });

  // describe('get movie test.', () => {
  //     let request, response, body;
  //     before((done) => {
  //         request = httpMocks.createRequest({
  //             method: 'GET',
  //             url: '/movies'
  //         });
  //         response = httpMocks.createResponse({
  //             eventEmitter: require('events').EventEmitter
  //         });
  //         MovieController.findAll(request, response);
  //         response.on('end', () => {
  //             let allMovies = response._getData();
  //             body = allMovies[4];
  //             let id = mongoose.Types.ObjectId(body._id);
  //             console.log(id)
  //             body.title = 'new title';
  //             request = httpMocks.createRequest({
  //                 method: 'GET',
  //                 url: '/movies/' + id,
  //                 params: {
  //                     movieId: id
  //                 }
  //             });
  //             response = httpMocks.createResponse({
  //                 eventEmitter: require('events').EventEmitter
  //             });
  //             MovieController.findOne(request, response);
  //             response.on('end', () => {done();});
  //         })
  //     });
  //
  //     it('should return request obeject successfully with 200 status.', function (done) {
  //         expect(response.statusCode).to.be.equal(200);
  //         done();
  //     });
  //
  //     it('should return requested Object.', function (done) {
  //         let result = response._getData();
  //         expect(result._id.toString()).to.be.equal(body._id.toString());
  //         done();
  //     });
  // });

    // describe('get mummy movie test.', () => {
    //     let request, response, body;
    //     before((done) => {
    //         request = httpMocks.createRequest({
    //             method: 'GET',
    //             url: '/movies'
    //         });
    //         response = httpMocks.createResponse({
    //             eventEmitter: require('events').EventEmitter
    //         });
    //         MovieController.findAll(request, response);
    //         response.on('end', () => {
    //             let allMovies = response._getData();
    //             body = _.find(allMovies, {title: "Mummy"});
    //             body.title = 'new title';
    //             request = httpMocks.createRequest({
    //                 method: 'GET',
    //                 url: '/movies/' + body._id,
    //                 params: {
    //                     movieId: body._id
    //                 }
    //             });
    //             response = httpMocks.createResponse({
    //                 eventEmitter: require('events').EventEmitter
    //             });
    //             MovieController.findOne(request, response);
    //             response.on('end', () => {done();});
    //         })
    //     });
    //
    //     it('should return request obeject successfully with 404 status.', function (done) {
    //         expect(response.statusCode).to.be.equal(404);
    //         done();
    //     });
    //
    //     it('should return requested Object.', function (done) {
    //         let result = response._getData();
    //         expect(result.message).to.be.equal(errorMsgs.NOT_FOUND(body._id));
    //         done();
    //     });
    // });

  describe('get not existing movie.', () => {
      let request, response, id = uuidv1();
      before((done) => {
          response = httpMocks.createResponse({
              eventEmitter: require('events').EventEmitter
          });
          request = httpMocks.createRequest({
              method: 'GET',
              url: '/movies/' + id,
              params: {
                  movieId: id
              }
          });
          response.on('end', () => done());
          MovieController.findOne(request, response);
      });

      it('should return 404 status code.', function (done) {
          expect(response.statusCode).to.be.equal(404);
          done();
      });

      it('should contain error msg', function (done) {
          let result = response._getData();
          let errorMsg = errorMsgs.NOT_FOUND(id);
          expect(result.message).to.be.equal(errorMsg);
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
              body = allMovies[3];
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

    describe('delete non existing movie test.', () => {
        let request, response, id = uuidv1();
        before((done) => {
                request = httpMocks.createRequest({
                    method: 'DELETE',
                    url: '/movies/' + id,
                    params: {
                        movieId: id
                    }
                });
                response = httpMocks.createResponse({
                    eventEmitter: require('events').EventEmitter
                });
                response.on('end', () => done());
                MovieController.delete(request, response);
        });

        it('should return 404 on successful deletion.', function (done) {
            expect(response.statusCode).to.be.equal(404);
            done();
        });

        it('should get error msg.', function (done) {
            let result = response._getData();
            expect(result.message).to.be.equal(errorMsgs.NOT_FOUND(id));
            done();
        });
    });

    describe('delete exiting video with preloaded object Id', () => {
        let request, response, id = mockData.movies[6]._id;
        before((done) => {
            request = httpMocks.createRequest({
                method: 'DELETE',
                url: '/movies/' + id,
                params: {
                    movieId: id
                }
            });
            response = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });
            response.on('end', () => done());
            MovieController.delete(request, response);
        });
        it('should return 404 status code.', function (done) {
            expect(response.statusCode).to.be.equal(404);
            done();
        });

        it('should get not found error message.', function (done) {
            let result = response._getData();
            expect(result.message).to.be.equal(errorMsgs.NOT_FOUND(id));
            done();
        });
    });
});
