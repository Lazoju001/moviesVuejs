<template>

  <div class="homepage-container">    
        <div class='modalContainer' v-if="modal">
            <div class='modalAdd'>
                <div class='inputImageContainer'>
                    <img @click="showUrl"  class="load__img" v-if="!image" src="https://cdn0.iconfinder.com/data/icons/arrow-glyph-2/32/circle_up-512.png"  >
                    <img  class="load__img2" v-else :src="image"  >
                    <input required  type="text" class='input' placeholder="URL" v-model="image">
                </div>                  
                <div class='inputsContainer'>
                    <input required type="text" class='input' placeholder="Movie Title" v-model="title">    
                    <select required class='select' placeholder="Category" v-model="category" >
                        <option value="" disabled selected>Category</option>
                        <option value="upcoming">upcoming</option>
                        <option value="topRated">topRAted</option>
                        <option value="popular">popular</option>
                        <option value="nowPlaying">nowplaying</option>
                    </select>
                    <div>
                      <button @click="saveLocalStorage" class="buttonClose" type="submit">Save</button>
                    </div>
                </div>            
            </div>
        </div>
        <div>
            <button @click="modal=true" class="buttonAdd">add new movie</button>
        </div>
        <div class="moviesContainer">   
            <h1>Upcoming</h1>  
            <span @mouseover="scrollLeft('Upcoming')" @mouseout="clear"  class="handle handlePrev active">
                  <i class="icon icon-left" aria-hidden="true"></i>
            </span>
            <div id="Upcoming" class="line">
                <div class="wrapper">
                    <div class="movie" v-for="(item,index) in upcoming" :key="index">
                      <img v-if="!item.localstorage" class="item__img" :src="'https://image.tmdb.org/t/p/w500'+item.backdrop_path">
                      <img v-if="item.localstorage" class="item__img" :src="item.backdrop_path">       
                      <h2>{{item.title}}</h2>
                    </div>
                </div>
            </div> 
            <span @mouseover="scrollRight('Upcoming')" @mouseout="clear"  class="handle handleNext active">
                  <i class="icon icon-right" aria-hidden="true"></i>
            </span>     
        </div>
        
        <div class="moviesContainer">   
              <h1>Top Rated</h1>  
              <span @mouseover="scrollLeft('top')" @mouseout="clear"  class="handle handlePrev active">
                    <i class="icon icon-left" aria-hidden="true"></i>
              </span>
              <div id="top" class="line">
                  <div class="wrapper">
                      <div class="movie" v-for="(item,index) in topRated" :key="index">
                        <img v-if="!item.localstorage" class="item__img" :src="'https://image.tmdb.org/t/p/w500'+item.backdrop_path">
                        <img v-if="item.localstorage" class="item__img" :src="item.backdrop_path">      
                        <h2>{{item.title}}</h2>
                      </div>
                  </div>
              </div> 
              <span @mouseover="scrollRight('top')" @mouseout="clear"  class="handle handleNext active">
                    <i class="icon icon-right" aria-hidden="true"></i>
              </span>     
        </div>
        <div class="moviesContainer">   
            <h1>Popular</h1>  
            <span @mouseover="scrollLeft('popular')" @mouseout="clear"  class="handle handlePrev active">
                    <i class="icon icon-left" aria-hidden="true"></i>
            </span>
            <div id="popular" class="line">
                <div class="wrapper">
                    <div class="movie" v-for="(item,index) in popular" :key="index">
                        <img v-if="!item.localstorage" class="item__img" :src="'https://image.tmdb.org/t/p/w500'+item.backdrop_path">
                        <img v-if="item.localstorage" class="item__img" :src="item.backdrop_path">      
                        <h2>{{item.title}}</h2>
                    </div>
                </div>
            </div> 
            <span @mouseover="scrollRight('popular')" @mouseout="clear"  class="handle handleNext active">
                    <i class="icon icon-right" aria-hidden="true"></i>
            </span>     
        </div>
        <div class="moviesContainer">   
            <h1>Now Playing</h1>  
            <span @mouseover="scrollLeft('now')" @mouseout="clear"  class="handle handlePrev active">
                    <i class="icon icon-left" aria-hidden="true"></i>
            </span>
            <div id="now" class="line">
                <div class="wrapper">
                    <div class="movie" v-for="(item,index) in nowPlaying" :key="index">
                        <img v-if="!item.localstorage" class="item__img" :src="'https://image.tmdb.org/t/p/w500'+item.backdrop_path">
                        <img v-if="item.localstorage" class="item__img" :src="item.backdrop_path">     
                        <h2>{{item.title}}</h2>
                    </div>
                </div>
            </div> 
            <span @mouseover="scrollRight('now')" @mouseout="clear"  class="handle handleNext active">
                    <i class="icon icon-right" aria-hidden="true"></i>
            </span>     
        </div>    
  </div>
</template>

<script>
import {getMoviesUpcoming, getMoviesTopRated, getMoviesPopular, getMoviesNowPlaying} from  '../router/service/getMovies.js';

export default {
  name: 'Homepage',

  data () {
        return {
    upcoming:[],
    topRated:[],
    popular:[],   
    nowPlaying:[],
    options:["upcoming","topRated","popular","nowPlaying"],
    intervalo:"",
    modal: false,
    uploadImage:false,    
    image:'',
    title:'',
    category:'',
    moviesList:[]
  }
    
  },

  created (){  
    Promise.resolve(this.getLocalStorage()).then(()=>{
    getMoviesUpcoming().then((response)=>{     
    this.upcoming = response.data.results})
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "upcoming" ? this.upcoming.push(movie):null }):null)
    getMoviesTopRated().then((response)=>{    
    this.topRated = response.data.results})
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "topRated" ? this.topRated.push(movie):null }):null)
    getMoviesPopular().then((response)=>{
    this.popular = response.data.results})
     .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "popular" ? this.popular.push(movie):null }):null)
    getMoviesNowPlaying().then((response)=>{
    this.nowPlaying = response.data.results})
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "nowPlaying" ? this.nowPlaying.push(movie):null }):null)
    })    
  },

  methods:{
    scrollRight: function (_e){
	  this.intervalo = setInterval(function() {
		document.getElementById(_e).scrollLeft += 1 }, 5
	  );
  },
    scrollLeft: function(_e) {
    this.intervalo = setInterval(function() {
      document.getElementById(_e).scrollLeft -= 1 }  , 5
	  );
  },
    clear:function clear_Scroll() {
	  clearInterval(this.intervalo);
    },
    showUrl:function(){
      this.uploadImage= !this.uploadImage
    },
    saveLocalStorage:function(){
    let movie = {
      title: this.title,
      category:this.category,
      backdrop_path:this.image,
      localstorage:true
    }

    this.moviesList.push(movie)

    this.image && this.category && this.title ? Promise.resolve(localStorage.setItem('movies',JSON.stringify(this.moviesList)))
    .then(()=>this.modal=false)
    .then(()=>this.getLocalStorage())
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "upcoming" && this.upcoming.findIndex(x=>movie.title === x.title)<0 ? this.upcoming.push(movie):null }):null)
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "topRated" && this.topRated.findIndex(x=>movie.title === x.title)<0 ? this.topRated.push(movie):null }):null)
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "popular" && this.popular.findIndex(x=>movie.title === x.title)<0 ? this.popular.push(movie):null }):null)
    .then(()=>this.moviesList ? this.moviesList.map(movie=>{movie.category == "nowPlaying" && this.nowPlaying.findIndex(x=>movie.title === x.title)<0 ? this.nowPlaying.push(movie):null }):null)
    .then(()=>{ this.image = "", this.category = "", this.title= ""})
    :null
    },
    getLocalStorage:function(){
    Promise.resolve(this.moviesList = JSON.parse(localStorage.getItem( "movies" )) ? this.moviesList = JSON.parse(localStorage.getItem( "movies" )) :this.moviesList=[])
    },
    
  }
}
</script>

<style lang="scss" scoped></style>
