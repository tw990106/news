const API_KEY = `fa3bf53b47ed4acebebefefbfc4c03e1`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

// http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines


const getLatestNews = async() => {
    const url = new URL(`https://playful-bienenstitch-9af164.netlify.app/top-headlines`);
    const response = await fetch(url);
    const data = await response.json(); // json은 파일 형식 중 하나.
    newsList = data.articles;
    render();
    console.log('ddd', newsList);
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log('category', category);
    const url = new URL(`https://playful-bienenstitch-9af164.netlify.app/top-headlines?category=${category}`);

    const response = await fetch(url);
    const data = await response.json();
    console.log('ddd', data);

    newsList = data.articles;
    render();
}

const getNewsByKeyword = async () => {
    const keyword = document.getElementById('search-input').value;
    console.log("keyword", keyword);

    const url = new URL(`https://playful-bienenstitch-9af164.netlify.app/top-headlines?q=${keyword}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log('keyword data', data);

    newsList = data.articles;
    render();
}


// side menu open
const openNav = () => {
    document.getElementById("m-sideNav").style.width = "100%";
}
// side menu close
const closeNav = () => {
    document.getElementById("m-sideNav").style.width = "0";
}

// search open
const toggleSearch = () => {
    let searchArea = document.getElementById("search-area");

    if(searchArea.style.display === "block"){
        searchArea.style.display = "none";
    }else{
        searchArea.style.display = "block";
    }
}



const render = () => {

    const newsHTML = newsList.map((news) => 
        

    `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src=${news.urlToImage || "https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"}>
                </div>
                <div class="col-lg-8 news-txt">
                    <h2>${news.title}</h2>
                    <p>${
                        news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + '...'
                        : news.description
                    }</p>
                    <div>${news.source.name || 'no'} * ${moment(news.publishedAt).startOf('day').fromNow()}</div>
                </div>
            </div>`).join('');
    


    document.getElementById('news-board').innerHTML = newsHTML;


}


getLatestNews();

