import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckOutForm from './CheckOutForm';
import Final from './Final';
import './Basket.css';


function Basket({articles, basket, removeFromBasket, getUserData, userData, clearBasket, getTotal}) {
  
  const [Promo, setPromo] = useState('');

  const [promo20Used, setPromo20Used] = useState(false);
  const [promo5Used, setPromo5Used] = useState(false);
  const [promo20EUsed, setPromo20EUsed] = useState(false);

  const [checkOut, setCheckOut] = useState(false);

  const [promoTotal, setTotalPromo] = useState(getTotal());
  const [checkTotal, setCheckTotal] = useState(getTotal());

  const enterPromo = e => {
    setPromo(e.target.value);
  }

  const countTotal = () => {

  }

  const addPromo = () =>  {
    if (Promo === '20%OFF'){
      if (promo20EUsed === false && promo5Used === false){
        setPromo20Used(true);
        setPromo('');
        setTotalPromo((promoTotal * 0.2).toFixed(2));
        setCheckTotal((checkTotal - (getTotal() * 0.2)).toFixed(2));
      }
      else{
        alert('This promo code cannot be in conjuction with other codes');
        setPromo('');
        setTotalPromo(getTotal());
        setCheckTotal(getTotal());
      }
    }
    else if (Promo === '5%OFF'){
      if (promo20Used === false){
        setPromo5Used(true);
        setPromo('');
        setTotalPromo((promoTotal * 0.05).toFixed(2));
        (promo20EUsed === false) ? (setCheckTotal((getTotal() - (getTotal() * 0.05)).toFixed(2))) : (setCheckTotal(((getTotal() - 20) - (checkTotal * 0.05)).toFixed(2)));
      }
      else{
        alert('Usage of promo code 20%OFF cannot be in conjuction with other codes');
        setPromo('');
        setTotalPromo(getTotal());
        setCheckTotal(getTotal());
      }
    }
    else if (Promo === '20EUROFF'){
      if (promo20Used === false){
        setPromo20EUsed(true);
        setPromo('');
        setTotalPromo((20).toFixed(2));
        (promo5Used === false) ? (setCheckTotal((getTotal() - 20).toFixed(2))) : (setCheckTotal(((getTotal() - 20).toFixed(2) - ((getTotal() - 20) * 0.05)).toFixed(2)));
      }
      else{
        alert('Usage of promo code 20%OFF cannot be in conjuction with other codes');
        setPromo('');
        setTotalPromo(getTotal());
        setCheckTotal(getTotal());
      }
    }
    else{
      setPromo('');
      setTotalPromo(getTotal());
      setCheckTotal(getTotal());
      (Promo !== '') && alert(Promo + ' cannot be used as promo code. Please enter valid code');
    }
  }

  const checkOutBtn = () => {
    if (checkOut === true){
      setCheckOut(false);
    }
    if (checkOut === false){
      setCheckOut(true);
    }
  }

  const remove20 = () => {
    setPromo20Used(false);
    setCheckTotal(getTotal());
  }

  const remove5 = () => {
    setPromo5Used(false);
    setCheckTotal(getTotal());
    (promo20EUsed === true && setCheckTotal((getTotal() - 20).toFixed(2)));
  }

  const remove20E = () => {
    setPromo20EUsed(false);
    setCheckTotal(getTotal());
    (promo5Used === true && setCheckTotal((getTotal() - (getTotal() * 0.05)).toFixed(2)));
  }

  const basketArticles = () => {
    return basket.map(bask => (
      articles.filter(filteredArticle => filteredArticle.id === bask.article_id).map(article => (
        <tr className='artikli' key={article.id}>
          <td className='tekst'>{article.name}</td>
          <td className='tekst text-center'>{bask.pieces}</td>
          <td className='tekst text-center'>{article.price}</td>
          <td className='tekst text-center'>{bask.finalPrice.toFixed(2)}</td>
          <td className='right'><button className="btn btn-danger" onClick={() => {
            removeFromBasket(bask.id);
          }}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
        </tr>
      ))
    ))
  }

  const basketList = () => {
    return (
      (basket.length !== 0) ? 
      (<table className="table table-hover">
        <thead>
          <tr className='artikli'>
            <th>Article</th>
            <th className='titleBar text-center'>Quantity</th>
            <th className='titleBar text-center'>Price per piece</th>
            <th className='titleBar text-center'>Price</th>
            <th className='titleBar right'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {basketArticles()}
        </tbody>
        <tfoot>
          <tr className='artikli'>
            <th>Total price</th>
            <th className='text-center'></th>
            <th className='text-center'></th>
            <th className='text-center'></th>
            <th className='right'>{checkTotal} €</th>
          </tr>
        </tfoot>
      </table>
    ) :
    (<h4>No items in basket. Please go to <a className='link' href='/'>Web Shop</a> and choose some articles</h4>))
  }

  return(
    <div className='container'>
      <div className='row'>
        <h2>Basket</h2>
        {(checkOut === false) && basketList()}
        {(checkOut === false) && 
          basket.length > 0 && 
          <div className='row'>
            <h2>Add Promo Code</h2>
            <div className='addedPromoCodes'>
              {(promo20Used === true) && <span className='promoCodes'><p><button className='btn btn-danger' onClick={() => remove20()}><i className="fa fa-trash-o removePromoCode" aria-hidden="true"></i></button>Promo code 20%OFF</p></span>}
              {(promo5Used === true) && <span className='promoCodes'><p><button className='btn btn-danger' onClick={() => remove5()}><i className="fa fa-trash-o removePromoCode" aria-hidden="true"></i></button>Promo code 05%OFF</p></span>}
              {(promo20EUsed === true) && <span className='promoCodes'><p><button className='btn btn-danger' onClick={() => remove20E()}><i className="fa fa-trash-o removePromoCode" aria-hidden="true"></i></button>Promo code 20EUROFF</p></span>}
            </div>
            <div className='addPromo'>
              <input autoFocus type='text' className='inputPromo' value={Promo} placeholder='Add Promo Code' onChange={(e) => enterPromo(e)}/>
              <button type="submit" className="inputBtn btn btn-primary" onClick={addPromo}>Add Promo Code</button>
              <button type="submit" className="inputBtn btn btn-primary" onClick={checkOutBtn}>Check Out</button>
            </div>
          </div>
        }
        {(checkOut === true) &&
          <div>
            {(userData.address === '') && 
            <CheckOutForm
              getUserData={getUserData}
            />}
            {(userData.address !== '') && 
            <Final
              clearBasket={clearBasket}
              getTotal={getTotal}
              basket={basket}
              articles={articles}
              userData={userData}
              promo20EUsed={promo20EUsed}
              promo20Used={promo20Used}
              promo5Used={promo5Used}
              checkTotal={checkTotal}
            />}
          </div>
        }
      </div>
    </div>
  );
}

Basket.propTypes = {
  articles: PropTypes.array,
  basket: PropTypes.array,
  userData: PropTypes.object,
  removeFromBasket: PropTypes.func,
  getUserData: PropTypes.func,
  clearBasket: PropTypes.func,
  getTotal: PropTypes.func,
}
 
Basket.defaultProps = {
}

export default Basket;