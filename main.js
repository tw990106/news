const API_KEY = `fa3bf53b47ed4acebebefefbfc4c03e1`;
let news = [];

// http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines

const getLatestNews = async() => {
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = response.json(); // json은 파일 형식 중 하나.
    news = data.articles;
    console.log('ddd', news);
};

getLatestNews();