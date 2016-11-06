var gulp = require('gulp');
var browserSync = require('browser-sync').create();




gulp.task('browser-sync', function() {
    browserSync.init({

        server: {
            baseDir: "./",
            cors: true
        }
    });

gulp.watch(["./*.html","./css/*.css","./js/**/*.js"]).on('change', browserSync.reload);
});
