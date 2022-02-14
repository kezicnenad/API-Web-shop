import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Article({article, addToBasket}) {

  useEffect(() => {

  }, [])

  // NUMBER OF ITEMS CHOOSED FOR BUY
  const [pieces, setPieces] = useState(1);

  // INCREMENT NUMBER OF ITEMS function
  const piecesIncrement = ()=> {
    setPieces(pieces + 1);
  }

  // DECREMENT NUMBER OF ITEMS function
  const piecesDecrement = () => {
    setPieces(pieces - 1);
    if (pieces === 1){
      setPieces(1);
    }
  }

  // ADD THIS NUMBER OF THAT ARTICLE AT THIS PRICE TO LOCAL STATE function
  const checkBasket = (articleId, articlePrice, howMuch)=> {
    addToBasket(articleId, articlePrice, howMuch);
    setPieces(1);
  }

  // RENDER
  return(
    <div className='col-md-6 oneArticle' key={article.id}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{article.name}</h5>
            <p className="card-text">{article.price.toFixed(2)} €</p>

            <div className='addToBasket'>
              <div className='col-md-1 incDec'>
                <button className="incDecCommands btn btn-primary" onClick={piecesDecrement}>-</button>
                  <p className='numOfPieces'>{pieces}</p>
                  <button className="incDecCommands btn btn-primary" onClick={piecesIncrement}>+</button>
              </div>
                  {(article.id === 4) && <small className='notification'>*Special offer, 2 Pieces for 35 €</small>}
                  {(article.id === 2) && <small className='notification'>*Special offer, 3 Pieces for 65 €</small>}
              <button onClick={() => checkBasket(article.id, article.price, pieces)} className="btn btn-primary">Add to Basket</button>
            </div>
            
          </div>
        </div>
      </div>
  );
}

Article.propTypes = {
  articles: PropTypes.array,
  addToBasket: PropTypes.func,
}
 
Article.defaultProps = {
}

export default Article;