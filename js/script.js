/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
//
// Project movies.
//

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '396be616';
let movies = [];
let detailView = null;

const search = async (text) => {
  const response = await fetch(`${BASE_URL}?s=${text}&apikey=${API_KEY}`);
  return response.json();
};

const getById = async (id) => {
  const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  return response.json();
};

function loadMovies(m) {
  const status = m.Response;
  movies = [];
  let count = 0;
  let html = '';
  const inpList = document.getElementById('list');
  document.getElementById('total').innerHTML = 'Total: 0';
  inpList.innerHTML = '';
  if (status == 'True') {
    movies = m.Search;
    count = m.totalResults;
    document.getElementById('total').innerHTML = `Total: ${count}`;
    movies.forEach((item, index) => {
      html += `
      <div id="movie-${item.imdbID}" class="listContent">
        <h1>${item.Title}</h1>
        <button onclick="detail('${item.imdbID}')" class="button">More details</button>
        <div id="detail-${item.imdbID}" class="clearfix" style="display:none">
          <div class="style">
            <a href="#modal" onclick="openModal('${item.Poster}','${item.imdbID}')" id="open-modal-${item.imdbID}">
            <img src="${item.Poster}}">
            </a>
          </div>
          <div class="style">
            <span>Year ${item.Year}</span>
            <h6 id="duration-${item.imdbID}"></h6>
            <h6 id="actors-${item.imdbID}"></h6>
            <h6 id="metascore-${item.imdbID}"></h6>
            <h6 id="trama-${item.imdbID}"></h6>
          </div>
        </div>
      </div>
      <br>
      `;
    });
    inpList.innerHTML = html;
  }
}

function openModal(img, id) {
  document.getElementById('modal-movie-image').src = img;
}

function loadDetail(detail, detailElement) {
  const id = detail.imdbID;
  document.getElementById('duration-' + id).innerHTML =
    'Duration : ' + detail.Runtime;
  document.getElementById('actors-' + id).innerHTML =
    'Actors : ' + detail.Actors;
  document.getElementById('metascore-' + id).innerHTML =
    'Metascore : ' + detail.Metascore;
  document.getElementById('trama-' + id).innerHTML = 'Trama : ' + detail.Plot;
  detailElement.style.display = 'block';
}

const detail = async (id) => {
  movies.forEach((element) => {
    document.getElementById('detail-' + element.imdbID).style.display = 'none';
  });

  const detailElement = document.getElementById('detail-' + id);

  if (detailView != id) {
    detailView = id;
    const detail = await getById(id);
    loadDetail(detail, detailElement);
  } else {
    detailElement.style.display = 'none';
    detailView = null;
  }
};

const inpSearch = document.getElementById('_search');
inpSearch.addEventListener('keyup', async (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    movies = await search(inpSearch.value);
    loadMovies(movies);
  }
});

window.onload = async () => { };
