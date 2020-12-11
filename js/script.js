let page = 1
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0f8ac3ded3a89fee38b86f56c61c3f71&page=${page}`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=0f8ac3ded3a89fee38b86f56c61c3f71&query="'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const next = document.getElementById('next')
const previous = document.getElementById('previous')


// Get initial set of movies 
getMovies(API_URL)
console.log(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
        // console.log(data)
        // console.log(data.results)
    showMovies(data.results)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})

function showMovies(movies) {
    main.innerHTML = '' // used to clear 
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h6>${title}</h6>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        
    `
        main.appendChild(movieEl)
    });

}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

next.addEventListener('click', () => {
    page += 1
    getMovies(API_URL)
    console.log(API_URL)

})

previous.addEventListener('click', () => {
    page--
    getMovies(API_URL + page)
    console.log(API_URL + page)
})