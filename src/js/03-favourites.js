//Make favourites list
const localStorageName = "favourites";
const getFavourites = (event) => {
  let selectedListId = parseInt(event.currentTarget.id);
  let indexFav = -1;
  for (let i = 0; i < favouritesDataList.length; i++) {
    if (favouritesDataList[i].show.id == dataList[selectedListId].show.id) {
      indexFav = i;
      break;
    }
  }
  if (indexFav === -1) {
    favouritesDataList.push(dataList[selectedListId]);
    event.currentTarget.classList.add("paint-favourite");
  } else {
    favouritesDataList.splice(indexFav, 1);
    event.currentTarget.classList.remove("paint-favourite");
  }
  paintFavourites();
  listenEachDelButton();
};
//Paint favourites list
const paintFavourites = () => {
  let htmlFavourite = "";
  for (let i = 0; i < favouritesDataList.length; i++) {
    htmlFavourite += `<li name"${i}" class="js-fav">`;
    htmlFavourite += "<div>";
    htmlFavourite += `<h3 class="list-title">${favouritesDataList[i].show.name}</h3>`;
    if (favouritesDataList[i].show.image === null) {
      htmlFavourite += `<img src="https://srv.latostadora.com/designall.dll/cat_not_available--i:14138557810514138520;x:20;w:520;m:1.jpg" width="100" height="130" alt="Image not found"/>`;
    } else {
      htmlFavourite += `<img class="list-image" src="${favouritesDataList[i].show.image.medium}" alt="Image of ${favouritesDataList[i].show.name}" width="100"/>`;
    }
    htmlFavourite += `<button class="delete-button button" name="${i}">x</button>`;
    htmlFavourite += "</div>";
    htmlFavourite += "</li>";
  }
  favouriteList.innerHTML = htmlFavourite;
  setFavourites();
};
//Select favourites
const selectShowsFav = () => {
  for (let i = 0; i < favouritesDataList.length; i++) {
    for (let j = 0; j < dataList.length; j++) {
      if (favouritesDataList[i].show.id === dataList[j].show.id) {
        const listResults = document.querySelectorAll(".js-list");
        listResults[j].classList.add("paint-favourite");
      }
    }
  }
};
