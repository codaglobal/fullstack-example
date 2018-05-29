var gulp = require('gulp');
var mocha = require("gulp-mocha");
// const MongoDb = require("./test/mocks/mongoDb").MongoDb;
// const MongoUnit = require("./test/mocks/mongoDb").MongoUnit;
const exit = require('gulp-exit');


gulp.task("test", function() {
    // let mongoDB = new MongoDb();
    // mongoDB.startMockDb(() => {
        return gulp.src([
            "./test/server-test.js",
        ], {read: false})
            .pipe(mocha({timeout: 10000, exit: true}))
            .pipe(exit());
    // });
});
