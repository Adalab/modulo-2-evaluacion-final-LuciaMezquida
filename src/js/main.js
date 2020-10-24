"use strict";

const searchingGap = document.querySelector(".js-search");
const button = document.querySelector(".js-btn");
const resultsList = document.querySelector(".js-results-list");
const favouriteList = document.querySelector(".js-favourite-list");

//Call API to get info
let dataList = [];
let favouritesDataList = [];
const triggerSearch = () => {
  let searchingGapValue = searchingGap.value;
  fetch(`//api.tvmaze.com/search/shows?q=${searchingGapValue}`)
    .then((response) => response.json())
    .then((data) => {
      dataList = data;
      paintShows();
      paintFavourites();
      if (dataList.length == 0) {
        resultsList.innerHTML = "<p class ='not-found-message'>No results found</p>";
      }
      //que al recargar la página me los marque como favoritos
      for (let i = 0; i < favouritesDataList.length; i++) {
        for (let j = 0; j < dataList.length; j++) {
          if (favouritesDataList[i].show.id === dataList[j].show.id) {
            console.log("hola");
          }
        }
      }
      listenListResults();
      console.log(favouritesDataList);
      setFavourites();
    });
};
//Paint data into the browser
const paintShows = () => {
  let htmlResult = "";
  for (let i = 0; i < dataList.length; i++) {
    htmlResult += `<li id="${i}" class="js-list">`;
    htmlResult += "<div class='show-container'>";
    htmlResult += `<h3 class="list-title">${dataList[i].show.name}</h3>`;
    if (dataList[i].show.image === null) {
      htmlResult += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="210" height="260" alt="Image not found"/>`;
    } else {
      htmlResult += `<img class="list-image" src="${dataList[i].show.image.medium}" alt="Image of ${dataList[i].show.name}"/>`;
    }
    htmlResult += "</div>";
    htmlResult += "</li>";
  }
  resultsList.innerHTML = htmlResult;
};

//Make favourites list
const localStorageName = "favourites";
console.log(favouritesDataList);
const getFavourites = (event) => {
  let selectedListId = event.currentTarget.id;
  const indexFav = favouritesDataList.indexOf(dataList[selectedListId]);
  const indexFav2 = favouritesDataList.indexOf(favouritesDataList[selectedListId]);
  console.log(indexFav);
  if (indexFav === -1) {
    favouritesDataList.push(dataList[selectedListId]);
    event.currentTarget.classList.add("paint-favourite");
  } else {
    favouritesDataList.splice(indexFav, 1);
    event.currentTarget.classList.remove("paint-favourite");
  }
  paintFavourites();
};
//Paint favourites list
const paintFavourites = () => {
  let htmlFavourite = "";
  for (let i = 0; i < favouritesDataList.length; i++) {
    htmlFavourite += `<li id="${i}" class="js-list">`;
    htmlFavourite += "<div>";
    htmlFavourite += `<h3 class="list-title">${favouritesDataList[i].show.name}</h3>`;
    if (favouritesDataList[i].show.image === null) {
      htmlFavourite += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="100" height="130" alt="Image not found"/>`;
    } else {
      htmlFavourite += `<img class="list-image" src="${favouritesDataList[i].show.image.medium}" alt="Image of ${favouritesDataList[i].show.name}" width="100"/>`;
    }
    htmlFavourite += "<button classs='delete-button'>x</button>";
    htmlFavourite += "</div>";
    htmlFavourite += "</li>";
  }
  favouriteList.innerHTML = htmlFavourite;
};
//Set favourites list
const setFavourites = () => {
  localStorage.setItem(localStorageName, JSON.stringify(favouritesDataList));
};

//Recover favourites list
const recoverFavourites = () => {
  const favouriteDataRecovered = JSON.parse(localStorage.getItem(localStorageName));
  if (favouriteDataRecovered === null) {
    triggerSearch();
  } else {
    favouritesDataList = favouriteDataRecovered;
    paintFavourites();
    listenListResults();
  }
};

//Delete favourites
const deleteAllButton = document.querySelector(".js-delete-all");
deleteAllButton.addEventListener("click", function () {
  const listResults = document.querySelectorAll(".js-list");
  for (const item of listResults) {
    item.classList.remove("paint-favourite");
  }
  favouriteList.innerHTML = "";
  localStorage.clear();
});

//listen every list item
const listenListResults = () => {
  const listResults = document.querySelectorAll(".js-list");
  for (let item of listResults) {
    item.addEventListener("click", getFavourites);
  }
};

button.addEventListener("click", triggerSearch);
triggerSearch();
recoverFavourites();
