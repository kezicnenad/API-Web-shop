import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({basket, apiCheckbox, fetchApiCheckbox}) {

  return(
    <div className='navbar'>
      <div>
        <h1>Web Shop</h1>
      </div>
      <div className='navbar nav'>
        <div className='custom-control custom-switch'>
          <label className='custom-control-label' htmlFor='customSwitch1'>Get Articles from API</label>
          <input onChange={fetchApiCheckbox} type='checkbox' className='custom-control-input' id='customSwitch1' />
        </div>

        {/* <input onChange={fetchApiCheckbox} type="checkbox" checked={apiCheckbox} data-toggle="toggle" data-onstyle="warning" /> */}

        <NavLink to={'/'}>Shop</NavLink>
        <NavLink className='basket' to={'/basket/'}><i className="fa fa-shopping-basket" /> My Basket {(basket.length > 0) && (basket.length)}</NavLink>
      </div>
    </div>
  );
}

export default Navigation;