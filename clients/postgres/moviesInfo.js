const { query } = require("express");
const BasePG = require("./basePGClient");
const { db } = require('./db.provider');

class MovieDetails extends BasePG {
    async addMovie(movieName, rating, cast, genre, releaseDate) {
        const  castArray = cast.split(',');
//         //const [movieName, rating, cast1, genre, releaseDate] = [movieName, rating, castArray, genre, releaseDate];
//         const movieName = 'The Shawshank Redemption';
// const rating = 9.3;
// const cast = ['Tim Robbins', 'Morgan Freeman'];
// const genre = 'Drama';
// const releaseDate = new Date('1994-09-23');
        const res = await db.sequelize.query('INSERT INTO movies (movie_name, rating, "cast", genre, release_date) VALUES (?,?,ARRAY[?],?,?)', {replacements:[movieName, rating, castArray, genre, releaseDate]});
        //`insert into movies (movie_name, rating, "cast", genre, release_date) VALUES ('${movieName}', '${rating}', string_to_array(${castArray},','), '${genre}', '${releaseDate}');`);
        console.log(res)
        return res;
    }
    async editMovie(movieName, rating, cast, genre, releaseDate) {
        const res = await db.sequelize.query(`insert into movie (movie_name, rating, cast, genre, release_date) VALUES ('${movieName}', '${rating}', '${cast}', '${genre}', '${releaseDate}');`);
        console.log(res)
        return res;
    }
    async deleteMovies(movieName) {
        const res = await db.sequelize.query(`delete from movies where movie_name = '${movieName}';`);
        console.log(res)
        return res;
    }
    async fetchAllMovies() {
        const res = await db.sequelize.query(`select * from movies;`);
        console.log(res)
        return res[0];
    }
}


module.exports = new MovieDetails();