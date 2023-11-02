import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  //1033e4cd1d724b57b7752cc0811d455f
  let searchdata = "today";

  let [articles,setArticles] = useState([]);

  function readValue(value){

    searchdata = value;

  }

  useEffect(()=>{

    getNews();
      
  },[])

  function getNews(){

    fetch(`https://newsapi.org/v2/everything?q=${searchdata}&apiKey=1033e4cd1d724b57b7752cc0811d455f`)
    .then((response)=>response.json())
    .then((news)=>{
      setArticles(news.articles);
    })
    .catch((err)=>{
      console.log(err);
    })
  }




  return (
    <div className="App">
      <div className='search'>
          <input placeholder='Search News' className='search-input' 
          onChange={(event)=>{readValue(event.target.value)}}/>
          <button className='search-btn' onClick={getNews}>Search</button>

      </div>

      <div className='articles'>

      {
        articles.map((article,index)=>{
          return(

            <div key={index} className="article">
              <img className='news-img' src={article.urlToImage}/>
              <div className='news-details'>
                <h3>{article.title}</h3>
                <h4 className='author'>{article.author}</h4>
                <h4 className='author'>{article.publishedAt.split("T")[0]}</h4>
                

                
                <a href={article.url} target="_blank">
                  <button className='btn'>Read More</button>
                </a>
                
              </div>

            </div>

          )
        })

      }
      </div>
      
    </div>
  );
}

export default App;
