// hi the safari of apis is just started this is the first project for any API

const apikey = "00b7fbcbb6e74d02bb3bc4cd6f0363b6"   // api key i get it from newsAPI only 100 limits p-day
const apiurl = "https://newsapi.org/v2/everything?q=" // here is API url

window.addEventListener("load", () => fetchNews("tata"));

async function fetchNews (query) {
  const res = await fetch (`${apiurl}${query}&apikey=${apikey}`)
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
    const newsbox = document.getElementById("newsbox")
    const newstemplate = document.getElementById("news-template")

    newsbox.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newstemplate.content.cloneNode(true)
        filldataincard(cardclone,article)
        newsbox.appendChild(cardclone)
    })
}

function filldataincard(cardclone,article){
    const newsimg = cardclone.querySelector("#newsimg");
    const newstitle = cardclone.querySelector("#news-title");
    const newssource = cardclone.querySelector("#news-source");
    const newsdesc = cardclone.querySelector("#description");

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newssource.innerHTML = `${article.source.name} · ${date}`;

    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


function itemclick (id){
  fetchNews(id)  
}

const searchbutton = document.getElementById("searchbutton")
const searchtext = document.getElementById("searchtext")

searchbutton.addEventListener("click", function(){
    const query = searchtext.value;
    if (!query) return;
    fetchNews(query);
})