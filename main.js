let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let load = document.querySelector("#load");

const accesskey = "br5Qy54xLUIgt7m8NbneR6Dd1DU8v7UXAvhECyJWBds";
let page = 1;
let keyword = "";

// download function
function download(imgurl) {
  //   console.log(imgurl);
  fetch(imgurl)
    .then((res) => res.blob())
    .then((file) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("failed download!!"));
}

async function getResponse() {
  keyword = input.value;
  let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=20`;
  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;
  if (page == 1) {
    images.innerHTML = "";
  }
  load.style.display = "block";

  //   console.log(results);
  results.map((result) => {
    let li = document.createElement("li");
    li.classList.add("image");
    let html = `<img src="${result.preview_photos[0].urls.small}" alt="img" class="photo" />
          <div class="details">
            <div class="user">
              <img src="camera.svg" alt="img" />
              <span>${result.title}</span>
            </div>
            <div class="download" onclick=download("${result.preview_photos[0].urls.small}")>
              <img src="download.svg" alt="img" />
            </div>
          </div>`;
    li.innerHTML = html;
    images.appendChild(li);
  });
}
btn.addEventListener("click", () => {
  page = 1;
  getResponse();
});

load.addEventListener("click", () => {
  page++;
  getResponse();
});
input.addEventListener("keyup", (e) => {
  paeg = 1;
  //   console.log(e);
  if (e.key == "Enter") {
    getResponse();
  }
});
