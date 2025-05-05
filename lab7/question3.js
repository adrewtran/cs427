//Complete the following class and test it with dummy data:
class Exercise3 {
    #movies = new Map();
    //key is the genre: string, value is array of movies
    // example: { thriller: [{ id: '1', title: 'The American'}, { id: '2', title: 'Arcadian'}] }
    add_genre(genre) {
        // add genre if genre does not exist
        // return true if the genre is added successfully, false otherwise
        if (this.#movies.has(genre)) {
            return false;
        }
        this.#movies.set(genre, []); 
        return true;
    }
    add_movie_in_genre(genre, new_movie) {
        // add movie if movie id does not exist
        // return true if the movie is added successfully, false otherwise
        if (!this.#movies.has(genre)) {
            return false;
        }
        const movies = this.#movies.get(genre);
        const existingMovie = movies.find(movie => movie.id === new_movie.id);
        if (existingMovie) {
            return false;
        }
        movies.push(new_movie);
        this.#movies.set(genre, movies);
        return true;
    }
    update_movie_title_by_genre_and_movie_id(genre, movie_id, new_title) {
        // update a movie within a certain genre
        // return true if the movie's title is updated successfully, false otherwise
        if (!this.#movies.has(genre)) {
            return false;
        }
        const movies = this.#movies.get(genre);
        const movie = movies.find(movie => movie.id === movie_id);
        if (!movie) {
            return false;
        }
        movie.title = new_title; 
        this.#movies.set(genre, movies);
        return true;
    }
    delete_movie_by_genre_and_movie_id(genre, movie_id) {
        // delete movie
        // return true if the movie is delete successfully, false otherwise
        if (!this.#movies.has(genre)) {
            return false;
        }
        const movies = this.#movies.get(genre);
        const movieIndex = movies.findIndex(movie => movie.id === movie_id);
        if (movieIndex === -1) {
            return false;
        }
        movies.splice(movieIndex, 1);
        this.#movies.set(genre, movies);
        return true;
    }
    get_movie_title_by_id(genre, movie_id) {
        // return the movie title
        if (!this.#movies.has(genre)) {
            return '';
        }
        const movies = this.#movies.get(genre);
        const movie = movies.find(movie => movie.id === movie_id);
        if (movie) {
            return movie.title;
        }
        return '';
    }
}

// Test the class with dummy data for all functions above
const exercise3 = new Exercise3();
exercise3.add_genre('thriller');
exercise3.add_genre('action');

// Adding movies to the genres
exercise3.add_movie_in_genre('thriller', { id: '1', title: 'The American' });
exercise3.add_movie_in_genre('thriller', { id: '2', title: 'Arcadian' });

exercise3.add_movie_in_genre('action', { id: '3', title: 'Inception' });
exercise3.add_movie_in_genre('action', { id: '4', title: 'Mad Max' });
// add console.log to check if the movie is added successfully
console.log(exercise3.add_movie_in_genre('action', { id: '4', title: 'Mad Max' })); // Should return false (duplicate ID)

// Updating movie title
exercise3.update_movie_title_by_genre_and_movie_id('thriller', '1', 'The American (Updated)');
exercise3.update_movie_title_by_genre_and_movie_id('action', '3', 'Inception (Updated)');
console.log(exercise3.update_movie_title_by_genre_and_movie_id('action', '5', 'Inception (Updated)')); // Should return false

// Getting movie title by ID
console.log(exercise3.get_movie_title_by_id('thriller', '1')); // Should return 'The American (Updated)'
console.log(exercise3.get_movie_title_by_id('action', '3')); // Should return 'Inception (Updated)'
console.log(exercise3.get_movie_title_by_id('action', '5')); // Should return '' (not found)

// Deleting movie
exercise3.delete_movie_by_genre_and_movie_id('thriller', '1');
exercise3.delete_movie_by_genre_and_movie_id('action', '3');
