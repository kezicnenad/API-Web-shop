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
          {(apiCheckbox === true) ? <i onClick={fetchApiCheckbox} id='customSwitch1' class=" fa fa-toggle-on" aria-hidden="true"></i> : <i onClick={fetchApiCheckbox} id='customSwitch1' class="fa fa-toggle-off" aria-hidden="true"></i>}
        </div>

        {/* <input onChange={fetchApiCheckbox} type="checkbox" checked={apiCheckbox} data-toggle="toggle" data-onstyle="warning" /> */}

        <NavLink to={'/'}>Shop</NavLink>
        <NavLink className='basket' to={'/basket/'}><i className="fa fa-shopping-basket" /> My Basket {(basket.length > 0) && (basket.length)}</NavLink>
      </div>
    </div>
  );
}

export default Navigation;