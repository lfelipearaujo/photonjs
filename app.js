const auth = "563492ad6f91700001000001cc188333259c4ddab527c16ee89a2083";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//! Event listeners

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

//! Fns
function updateInput(e) {
  // console.log(e.target.value);
  searchValue = e.target.value;
}

//! Feth API

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
//! generate data html

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
      <div class="gallery-info">
      <p>${photo.photographer}</p>
      <p>${photo.photographer_url}</p>
      <a href=${photo.src.original}> Download </a>
      </div>
      <img src=${photo.src.large}</img>
    `;
    gallery.appendChild(galleryImg);
  });
}

//! Fetch function
async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
  const data = await fetchApi(fetchLink);

  //? how it was before moduling
  // const dataFetch = await fetch(
  //     "https://api.pexels.com/v1/curated?per_page=15",
  //     {
  //         method: "GET",
  //         headers: {
  //             Accept: "application/json",
  //             Authorization: auth,
  //         },
  //     }
  // );

  //   ? after
  generatePictures(data);
  //? b4 moduling
  //   data.photos.forEach((photo) => {
  //     // console.log(photo);
  //     const galleryImg = document.createElement("div");
  //     galleryImg.classList.add("gallery-img");
  //     galleryImg.innerHTML = `<img src=${photo.src.large}</img><p>${photo.photographer}</p><p>${photo.photographer_url}`;
  //     gallery.appendChild(galleryImg);
  //   });
}

//! Search photos
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  // ? b4 modeling
  // const dataFetch = await fetch(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15`, {
  //     method: "GET",
  //     headers: {
  //         Accept: 'applications/json',
  //         Authorization: auth
  //     }
  // });

  // ? after
  generatePictures(data);
  // ? b4 modeling
  // console.log(data);
  //   data.photos.forEach((photo) => {
  //     // console.log(photo);
  //     const galleryImg = document.createElement("div");
  //     galleryImg.classList.add("gallery-img");
  //     galleryImg.innerHTML = `<img src=${photo.src.large}</img><p>${photo.photographer}</p><p>${photo.photographer_url}`;
  //     gallery.appendChild(galleryImg);
  //   });
}

//! clear
function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

//! Load more
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
curatedPhotos();
