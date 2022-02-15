import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

  let x = [];

function Final({articles, basket, clearBasket, getTotal, userData, promo20Used, promo5Used, promo20EUsed, checkTotal}) {
  const [offerDifferencies, setOfferDifferencies] = useState([]);
  const [offered, setOffered] = useState(false);

  useEffect(() => {
    setOfferDifferencies([])
    differentOfferPrice();
  }, [])

  const differentOfferPrice = () => {
    basket.map(bask => {
      return articles.filter(filteredArticle => filteredArticle.id === bask.article_id).map(article => {
        if (article.id === 2 && bask.pieces % 3 === 0){
          x.push({name: article.name, price: (article.price * bask.pieces) - bask.finalPrice});
        }
        else if (article.id === 4 && bask.pieces % 2 === 0){
          x.push({name: article.name, price: (article.price * bask.pieces) - bask.finalPrice});
        }
        setOfferDifferencies(x);
      })
    })
  }

  const displayTotal = () => {
    if (promo20Used === true){
      return ((getTotal() - (getTotal() * 0.2)).toFixed(2));
    }
    else if (promo20EUsed === true && promo5Used === true){
      return ((getTotal() - ((getTotal() * 0.05) + 20)).toFixed(2));
    }
    else if (promo5Used === true){
      return ((getTotal() - (getTotal() * 0.05)).toFixed(2));
    }
    else if (promo20EUsed === true){
      return ((getTotal() - 20).toFixed(2));
    }
    else{
      return getTotal();
    }
  }

  const basketArticles = () => {
    return (basket.length > 0) && basket.map(bask => (
      articles.filter(filteredArticle => filteredArticle.id === bask.article_id).map(article => (
        <tr className='artikli' key={article.id}>
          <td className='tekst'>{article.name}</td>
          <td className='tekst text-center'>{bask.pieces} {(bask.pieces === 1) ? 'Item' : 'Items'}</td>
          <td className='tekst right'>{bask.finalPrice.toFixed(2)}</td>
        </tr>
      ))
    ))
  }

  return(
    <div className=''>
      <h5>Thank you, delivery details are sent to <b>{userData.mail}</b></h5>
      <h5 className='orderText'>Order will be delivered soon on <b>{userData.address}</b></h5>
      <table className="table table-hover">
        <tbody>
          {basketArticles()}
        </tbody>
      </table>
      <h4>Price: {getTotal()} €</h4>
      <div className='activePromoCodes'>
        {(promo20EUsed === true || promo20Used === true || promo5Used === true) && <h5 className='inUseTitle'>Codes in use:</h5>}
        {(promo20Used === true) && <p>Promo code 20%: <b>-{(getTotal() * 0.2).toFixed(2)} €</b></p>}
        {(promo5Used === true) && ((promo20EUsed === false) && (<p>Promo code 5%: <b>-{(getTotal() - checkTotal).toFixed(2)} €</b></p>))}
        {(promo5Used === true) && ((promo20EUsed === true) && (<p>Promo code 5%: <b>-{(getTotal() - checkTotal - 20).toFixed(2)} €</b></p>))}
        {(promo20EUsed === true) && <p>Promo code 20 €: <b>-20.00 €</b></p>}
      </div>
      <div>
        {(offerDifferencies.length !== 0) && <h4 className='quantity'>Included quantity discounts</h4>}
        {(offerDifferencies.length !== 0) && offerDifferencies.map((offer, index) => (
          <p key={index}>{offer.name}: <b>{offer.price.toFixed(2)} €</b></p>
        ))}
      </div>
      <h4 className='totalCost'>Total cost <b>{checkTotal} €</b></h4>
      <button onClick={() => {
        clearBasket();
      }} className='btn btn-warning'>Close</button>
    </div>
  );
}

Final.propTypes = {
  articles: PropTypes.array,
  basket: PropTypes.array,
  userData: PropTypes.object,
  promo20EUsed: PropTypes.bool,
  promo20Used: PropTypes.bool,
  promo5Used: PropTypes.bool,
}
 
Final.defaultProps = {
}

export default Final;