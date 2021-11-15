import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#submit').click(function() {
  const search = $('#keyword').val();
  $('#keyword').val("");
  $('.showGifs').empty();

  let request = new XMLHttpRequest();
  const url = `api.giphy.com/v1/gifs/trending?limit=10&api_key=Ilcu6Bgq2HiCCSQsiyZFMrMkm4TYthCV`;
  const url2 = `api.giphy.com/v1/gifs/random?api_key=Ilcu6Bgq2HiCCSQsiyZFMrMkm4TYthCV`;
  const url3 = `api.giphy.com/v1/gifs/search?limit=10&q=search&api_key=Ilcu6Bgq2HiCCSQsiyZFMrMkm4TYthCV`;
  
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
      $(".showGifs").append(`<img src=response.data[${i}].url alt=response.data[${i}].title>`);
    }
  }
  });
});