const api = axios.create({
  baseURL: "https://api.thedogapi.com/v1/"
});
api.defaults.headers.common["X-API-Key"] = "live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ";

const API_URL_RANDOM =
  "https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ";

const API_URL_FAVORITES =
  "https://api.thedogapi.com/v1/favourites";

const API_URL_UPLOAD =
  "https://api.thedogapi.com/v1/images/upload";

const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thedogapi.com/v1/favourites/${id}api_key=live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ`;

const spanError = document.getElementById("error");

async function loadRandomDogs() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
    console.log(res);
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavotiteDog(data[0].id);
    btn2.onclick = () => saveFavotiteDog(data[1].id);
  }
}

async function loadFavoritesRandomDogs() {
  const res = await fetch(API_URL_FAVORITES, {
    method: "GET",
    headers: {
      'X-API-Key':'live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ'
    }
  });
  const data = await res.json();
  console.log("Favoritos");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
      const section = document.getElementById("favoriteDogs");
    section.innerHTML = "";

    data.forEach(dogs => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Quitar de favoritos");

      img.src = dogs.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoriteDog(dogs.id);
      btn.classList.add("btn")
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
      article.classList.add("dogs");
    });
  }
}

async function saveFavotiteDog(id) {
 const { data, status } = await api.post('/favourites', {
    image_id: id,
  });
  

//  const res = await fetch(API_URL_FAVORITES, {
//    method: "POST",
//    headers: {
//      "Content-Type": "application/json",
//      'X-API-Key':'live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ',
//    },
//    body: JSON.stringify({
//      image_id: id
//    }),
//  });
//  const data = await res.json();

  console.log("Save")

  if (status !== 200) {
    spanError.innerHTML = "Hubo un error: " + status + data.message;
  } else {
    console.log("Guardado en favoritos");
    loadFavoritesRandomDogs();
  }
}

async function deleteFavoriteDog(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: {
      'X-API-Key':'live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ'
    }
  });
  const data = await res.json();


  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Eliminado en favoritos")
    loadFavoritesRandomDogs();
  }
}

async function uploadDogPhoto() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  console.log(formData.get("file"));

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      'X-API-Key':'live_L3n8iS7W6mRDqsRn7T0ieCK3xfB20kX32sXBQZ7KkErmaXpKX5Cavs7B2NRTJ8jJ',
    },
    body: formData,
  })

  const data = await res.json();


  if (res.status !== 201) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Foto subida");
    console.log({ data });
    console.log(data.url);
    saveFavotiteDog(data.id)
  }
}

loadRandomDogs();
loadFavoritesRandomDogs();
