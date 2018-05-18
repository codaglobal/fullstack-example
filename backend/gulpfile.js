var gulp = require('gulp');
var mocha = require("gulp-mocha");
const MongoDb = require("./test/mocks/mongoDb").MongoDb;
const MongoUnit = require("./test/mocks/mongoDb").MongoUnit;
const exit = require('gulp-exit');
const run = require('gulp-run');


gulp.task("test", function() {
    // let mongoDB = new MongoDb();
    // mongoDB.startMockDb(() => {
    run('npm start').exec()    // prints "Hello World\n".
        .pipe(gulp.dest('output'));
    return gulp.src([
            "./test/server-test.js",
            // "./test/dao.js"
        ], {read: false})
        .pipe(mocha({timeout: 10000, exit: true}))
        .pipe(exit());
    // });
});
