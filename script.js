const API_KEY = "1ec911196da74dff8ab1c3501aa78368";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fecthNews("Latest"));

function reload(){
    window.location.reload();
}

async function fecthNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector(`#news-img`);
    const newsTitle = cardClone.querySelector(`#news-title`);
    const newsSrc = cardClone.querySelector(`#news-src`);
    const newsDesc = cardClone.querySelector(`#news-desc`);
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/Jakarta"
     });

    newsSrc.innerHTML = `${article.source.name} | ${date}`;   
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url,"_blank"); 
    });
}    
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
}