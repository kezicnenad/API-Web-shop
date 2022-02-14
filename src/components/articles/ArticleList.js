import React from 'react';
import PropTypes from 'prop-types';
import Article from './Article';
import './ArticleList.css';

function ArticleList({articles, addToBasket}) {

  const articleList = () => {
    return (
      (articles.length > 0) && articles.map(article => (
       <Article
          key={article.id}
          article={article}
          addToBasket={addToBasket}
        />
      ))
    )
  }

  return(
    <div className='container'>
      <div className='row'>
        <h2>Article List</h2>
        {articleList()}
      </div>
    </div>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array,
  addToBasket: PropTypes.func,
}
 
ArticleList.defaultProps = {
}

export default ArticleList;