import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#search').click(function() {
  const search = $('#keyword').val();
  $('#keyword').val("");
  $('.showGifs').empty();

  let request = new XMLHttpRequest();
  //api.giphy.com/v1/gifs/search
  const url = `https://api.giphy.com/v1/gifs/search?q=${search}&limit=10&api_key=${process.env.API_KEY}`;
  
  request.onreadystatechange = function() {
    try {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
      else if (this.readyState === 4 && this.status !== 200) {
        throw Error("something went wrong!");
      }
    } catch(error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  request.open("GET", url, true);
  request.send();

  function getElements(response) {
    for (let i=0; i < response.data.length; i++) {
      $(".showGifs").append('<img src="' + response.data[i].images.original.url + '">');
    }
  }
  });

  $('#trending').click(function() {
    $('.showGifs').empty();
    let trendRequest = new XMLHttpRequest();
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?limit=10&api_key=${process.env.API_KEY}`;

    trendRequest.onreadystatechange = function() {
      try {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          getElements(response);
        }
        else if (this.readyState === 4 && this.status !== 200) {
          throw Error("something went wrong!");
        }
      } catch(error) {
        console.error(error.message);
        alert(error.message);
      }
    };

    trendRequest.open("GET", trendUrl, true);
    trendRequest.send();
  
    function getElements(response) {
      for (let i=0; i < response.data.length; i++) {
        $(".showGifs").append('<img src="' + response.data[i].images.original.url + '">');
      }
    }
  
  });

  $('#random').click(function() {
    $('.showGifs').empty();
    let randomRequest = new XMLHttpRequest();
    const randomUrl = `https://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;

    randomRequest.onreadystatechange = function() {
      try {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          getElements(response);
        }
        else if (this.readyState === 4 && this.status !== 200) {
          throw Error("something went wrong!");
        }
      } catch(error) {
        console.error(error.message);
        alert(error.message);
      }
    };

    randomRequest.open("GET", randomUrl, true);
    randomRequest.send();

    function getElements(response) {
      $(".showGifs").append('<img src="' + response.data.images.original.url + '">');
    }
  });

});

