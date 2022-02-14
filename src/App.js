import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ArticleList from './components/articles/ArticleList';
import Basket from './components/basket/Basket';
import './App.css';

function App() {

  // DEFAULT ARTIKLI
  const [articles, setArticles] = useState([
    {id: 1, name: 'Smart Hub', price: 49.99},
    {id: 2, name: 'Motion Sensor', price: 24.99},
    {id: 3, name: 'Wireless Camera', price: 99.99},
    {id: 4, name: 'Smoke Sensor', price: 19.99},
    {id: 5, name: 'Water Leak Sensor', price: 14.99},
  ]);

  // ITEMS IN BASKET
  const [basket, setBasket] = useState([
    // {id: 123223123, article_id: 1, pieces: 50, finalPrice: 111},
    // {id: 123222123, article_id: 3, pieces: 1, finalPrice: 111},
    // {id: 163232123, article_id: 2, pieces: 22, finalPrice: 111},
    // {id: 183222163, article_id: 4, pieces: 11, finalPrice: 111},
  ]);

  // IS API CHOOSED OR NOT
  const [apiCheckbox, setApiCheckbox] = useState(false);

  // USER DATA FROM CHECKOUT
  const [userData, setUserData] = useState({id: '', address: '', mail: '', cardNumber: ''});

  useEffect(() => {
  }, [])

  // RANDOM GENERATED TOKEN USED FOR ID
  const token = Math.floor(Math.random() * 99999999);

  // ADD ITEMS TO BASKET function
  const addToBasket = (articleId, articlePrice, howMuch) => {
    let setPrice = articlePrice * howMuch;

    if (articleId === 2 && (howMuch % 3 === 0)){
      // console.log('DA ARTICLE 2');
      setPrice = (howMuch / 3) * 65;
    }

    if (articleId === 4 && howMuch % 2 === 0){
      //  console.log('DA ARTICLE 4');
      setPrice = (howMuch / 2) * 35;
    }
    // console.log('PRICE', setPrice);
    setBasket([...basket, {id: token, article_id: articleId, pieces: howMuch, finalPrice: setPrice}]);
  }

  // REMOVE ITEMS FROM BASKET function
  const removeFromBasket = (id) => {
    let filteredBasket = basket.filter(filteredBasket => filteredBasket.id !== id);
    setBasket(filteredBasket);
  }

  // REMOVE ALL ITEMS FROM BASKET AFTER CHECKOUT FINISHED
  const clearBasket = () => {
    setBasket([]);
  }

  // CHECKBOX CHOOSING DEFAULT OR API DATA function
  const fetchApiCheckbox = () => {
    if (apiCheckbox === true){
      setApiCheckbox(false);
      setArticles([
        {id: 1, name: 'Smart Hub', price: 49.99},
        {id: 2, name: 'Motion Sensor', price: 24.99},
        {id: 3, name: 'Wireless Camera', price: 99.99},
        {id: 4, name: 'Smoke Sensor', price: 19.99},
        {id: 5, name: 'Water Leak Sensor', price: 14.99},
      ])
    }
    if (apiCheckbox === false){
      setApiCheckbox(true);
      fetchApi();
    }
  }

  // FETCH ARTICLES FROM API
  const fetchApi = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        return setArticles(apiDataToState(json));
      })
      .catch(err => console.log(err))
  }

  // SAVE API ARTICLES TO LOCAL STATE
  const apiDataToState = (apiJson) => {
    return apiJson.map((apiJsonItem) => ({
      id: apiJsonItem.id + 5,
      name: apiJsonItem.title,
      price: apiJsonItem.price,
    }));
  };

  // GET USER DATA FROM CHECKOUT FORM function
  const getUserData = (address, mail, cardNumber) => {
    setUserData({id: token, address: address, mail: mail, cardNumber: cardNumber})
  }

  // GET TOTAL PRICE
  const getTotal = () => {
    let total = 0;
    basket.forEach(item => {
      total += item.finalPrice;
      // console.log(total);
    });
    return total.toFixed(2);
  }

  // RENDER
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <div>
            <Navigation
              basket={basket}
              fetchApiCheckbox={fetchApiCheckbox}
              apiCheckbox={apiCheckbox}
            />
            <ArticleList
              articles={articles}
              basket={basket}
              addToBasket={addToBasket}
            />
          </div>
        } />
        <Route path='/basket/' element={
          <div>
            <Navigation
              basket={basket}
              fetchApiCheckbox={fetchApiCheckbox}
              apiCheckbox={apiCheckbox}
            />
            <Basket
              articles={articles}
              basket={basket}
              removeFromBasket={removeFromBasket}
              clearBasket={clearBasket}
              getUserData={getUserData}
              userData={userData}
              getTotal={getTotal}
            />
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
