import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#search').click(function() {
    const search = $('#keyword').val();
    $('#keyword').val("");
    $('.showGifs').empty();

    let searchPromise = new Promise(function(resolve, reject) {
      let searchRequest = new XMLHttpRequest();
      const searchUrl = `https://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=${process.env.API_KEY}`;
      searchRequest.onload = function() {
        if (this.status === 200) {
          resolve(searchRequest.response);
        } else {
          reject(searchRequest.response);
        }
      };
      searchRequest.open("GET", searchUrl, true);
      searchRequest.send();
    });

    searchPromise.then(function(response) {
      const body = JSON.parse(response);
      for (let i=0; i < body.data.length; i++) {
        $(".showGifs").append('<img src="' + body.data[i].images.original.url + '">');
      }
      $('.showErrors').text("");
    }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`); 
        $('.showGifs').empty();
    });
  });

  $('#trending').click(function() {
    $('.showGifs').empty();

    let trendPromise = new Promise(function(resolve, reject) {
      let trendRequest = new XMLHttpRequest();
      const trendUrl = `https://api.giphy.com/v1/gifs/trending?limit=10&api_key=${process.env.API_KEY}`;
      trendRequest.onload = function() {
        if (this.status === 200) {
          resolve(trendRequest.response);
        } else {
          reject(trendRequest.response);
        }
      };

      trendRequest.open("GET", trendUrl, true);
      trendRequest.send();
    });
    
    trendPromise.then(function(response) {
      const body = JSON.parse(response);
      for (let i=0; i < body.data.length; i++) {
        $(".showGifs").append('<img src="' + body.data[i].images.original.url + '">');
      }
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`); 
      $('.showGifs').empty();
    });
  });

  $('#random').click(function() {
    $('.showGifs').empty();
    let randomPromise = new Promise(function(resolve, reject){
      let randomRequest = new XMLHttpRequest();
      const randomUrl = `https://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;
      randomRequest.onload =function(){
        if (this.status === 200) {
          resolve(randomRequest.response);
        } else {
          reject(randomRequest.response);
        }
      };
        randomRequest.open("GET", randomUrl, true);
        randomRequest.send();
    });
    randomPromise.then(function(response){
      const body=JSON.parse(response);
      $(".showGifs").append('<img src="' + body.data.images.original.url + '">');
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`); 
      $('.showGifs').empty();
    });
  });
});