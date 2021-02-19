import data from "./data.js";
import { searchMovieByTitle, makeBgActive, addCategories } from "./helpers.js";

class MoviesApp {
    constructor(options) {
        const { root, searchInput, searchForm, yearHandler, genreHandler, yearSubmitter, genreSubmitter } = options;
        this.$tableEl = document.getElementById(root);
        this.$tbodyEl = this.$tableEl.querySelector("tbody");
        this.$searchInput = document.getElementById(searchInput);
        this.$searchForm = document.getElementById(searchForm);
        this.yearHandler = yearHandler;
        this.genreHandler = genreHandler;
        this.$yearSubmitter = document.getElementById(yearSubmitter);
        this.$genreSubmitter = document.getElementById(genreSubmitter)
    }

    createMovieEl(movie) {
        const { image, title, genre, year, id } = movie;
        return `<tr data-id="${id}"><td><img src="${image}"></td><td>${title}</td><td>${genre}</td><td>${year}</td></tr>`
    }

    fillTable() {
        const moviesArr = data.map((movie) => {
            return this.createMovieEl(movie)
        }).join("");
        this.$tbodyEl.innerHTML = moviesArr;
    }
    /* YEAR CATEGORIES*/
    getYearCategories() {
        const yearArr = data.map(movie => movie.year)
        const uniqueYearArr = [...new Set(yearArr)]
        uniqueYearArr.sort((a, b) => b - a);
        //array to json 
        const res = uniqueYearArr.reduce((acc, curr) => (acc[curr] = '', acc), {});
        uniqueYearArr.forEach(year => {
            //count array objects
            const count = yearArr.filter(item => item === year).length;
            res[year] = count;
        })
        addCategories(res, "radio", "year");
    }
    /* GENRE CATEGORIES*/
    getGenreCategories() {
        const genreArr = data.map(movie => movie.genre)
        const uniqueGenreArr = [...new Set(genreArr)]
        const res = uniqueGenreArr.reduce((acc, curr) => (acc[curr] = '', acc), {});
        uniqueGenreArr.forEach(year => {
            //count array objects
            const count = genreArr.filter(item => item === year).length;
            res[year] = count;
        })
        const $genreFilterParentEl = document.querySelector('.genre-box');
        const $genreButton = document.querySelector('.genre-button')
        addCategories(res, "checkbox", "genre");
    }

    reset() {
        this.$tbodyEl.querySelectorAll("tr").forEach((item) => {
            item.style.background = "transparent";
        })
    }

    handleSearch() {
        this.$searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.reset();
            const searchValue = this.$searchInput.value;
            const matchedMovies = data.filter((movie) => {
                return searchMovieByTitle(movie, searchValue);
            }).forEach(makeBgActive)
            this.$searchForm.reset();
        });
    }

    handleYearFilter() {
        this.$yearSubmitter.addEventListener("click", () => {
            this.reset();
            const selectedYear = document.querySelector(`input[name='${this.yearHandler}']:checked`).value
            const matchedMovies = data.filter((movie) => {
                return movie.year === selectedYear;
            }).forEach(makeBgActive)
        });
    }

    handleGenreFilter() {
        this.$genreSubmitter.addEventListener('click', () => {
            this.reset();
            const selectedGenre = document.querySelectorAll(`input[name='${this.genreHandler}']:checked`)
            let selectedGenreArr = Array.from(selectedGenre)
            selectedGenreArr = selectedGenreArr.map(genre => genre.value);
            selectedGenreArr.forEach(selectedGenre => {
                const matchedGenres = data.filter((movie) => {
                    return movie.genre === selectedGenre;
                }).forEach(makeBgActive)

            })
        })
    }

    init() {
        this.fillTable();
        this.handleSearch();
        this.handleYearFilter();
        this.getYearCategories();
        this.getGenreCategories();
        this.handleGenreFilter();
    }
}

let myMoviesApp = new MoviesApp({
    root: "movies-table",
    searchInput: "searchInput",
    searchForm: "searchForm",
    yearHandler: "year",
    genreHandler: "genre",
    yearSubmitter: "yearSubmitter",
    genreSubmitter: "genreSubmitter"
});

myMoviesApp.init();
