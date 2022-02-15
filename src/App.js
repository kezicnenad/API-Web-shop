import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import ArticleList from './components/articles/ArticleList';
import Basket from './components/basket/Basket';
import './App.css';

function App() {

  const [articles, setArticles] = useState([
    {id: 1, name: 'Smart Hub', price: 49.99},
    {id: 2, name: 'Motion Sensor', price: 24.99},
    {id: 3, name: 'Wireless Camera', price: 99.99},
    {id: 4, name: 'Smoke Sensor', price: 19.99},
    {id: 5, name: 'Water Leak Sensor', price: 14.99},
  ]);

  const [basket, setBasket] = useState([]);
  const [apiCheckbox, setApiCheckbox] = useState(false);
  const [userData, setUserData] = useState({id: '', address: '', mail: '', cardNumber: ''});

  useEffect(() => {
  }, [])

  const token = Math.floor(Math.random() * 99999999);

  const addToBasket = (articleId, articlePrice, howMuch) => {
    let setPrice = articlePrice * howMuch;

    if (articleId === 2 && (howMuch % 3 === 0)){
      setPrice = (howMuch / 3) * 65;
    }

    if (articleId === 4 && howMuch % 2 === 0){
      setPrice = (howMuch / 2) * 35;
    }
    setBasket([...basket, {id: token, article_id: articleId, pieces: howMuch, finalPrice: setPrice}]);
  }

  const removeFromBasket = (id) => {
    let filteredBasket = basket.filter(filteredBasket => filteredBasket.id !== id);
    setBasket(filteredBasket);
  }

  const clearBasket = () => {
    setBasket([]);
    window.location.replace("/");
  }

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

  const fetchApi = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        return setArticles(apiDataToState(json));
      })
      .catch(err => console.log(err))
  }

  const apiDataToState = (apiJson) => {
    return apiJson.map((apiJsonItem) => ({
      id: apiJsonItem.id + 5,
      name: apiJsonItem.title,
      price: apiJsonItem.price,
    }));
  };

  const getUserData = (address, mail, cardNumber) => {
    setUserData({id: token, address: address, mail: mail, cardNumber: cardNumber})
  }

  const getTotal = () => {
    let total = 0;
    basket.forEach(item => {
      total += item.finalPrice;
    });
    return total.toFixed(2);
  }

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
