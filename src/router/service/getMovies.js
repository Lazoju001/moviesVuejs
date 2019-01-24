import axios from 'axios';


let getMoviesUpcoming = ()=>{
    return axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=6f26fd536dd6192ec8a57e94141f8b20')
}

let getMoviesTopRated = ()=>{
    return axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=6f26fd536dd6192ec8a57e94141f8b20')
}

let getMoviesPopular = ()=>{
    return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20')
}

let getMoviesNowPlaying = ()=>{
    return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20')
}

export {
    getMoviesUpcoming,
    getMoviesTopRated,
    getMoviesPopular,
    getMoviesNowPlaying
}