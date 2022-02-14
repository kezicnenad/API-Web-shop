// NAMJERNO RAĐENO KAO CLASS COMPONENT DA NE ISPADNE DA SAMO ZNAM FUNCTION COMPONENTS

import React from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';

class CheckOutForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      address: '',
      mail: '',
      cardNumber: '',
      errorMail: 'Enter valid email address',
      errorCard: 'Enter valid card number',
    }
  }

  render() {
    const address = this.state.address;
    const mail = this.state.mail;
    const cardNumber = this.state.cardNumber;

    return(
      <div>
        <div className="form-group">
          <label htmlFor="">Address</label>
          <input autoFocus value={this.state.address} onChange={e => this.setState({address: e.target.value})} type="text" className="form-control" id="address" placeholder="Enter your address" />

          <label htmlFor="mail">Email</label>
          <input 
            value={this.state.mail} 
            id='mail'
            onChange={e => {
              if (validator.isEmail(mail)) {
                this.setState({mail: e.target.value});
                this.setState({errorMail: ''});
              } else {
                this.setState({mail: e.target.value});
                this.setState({errorMail: 'Enter valid email address'});
              }
            }}  
            type='email'
            className={(this.state.errorMail === 'Enter valid email address') ? 'form-control btn-outline-secondary' : 'form-control'}
            placeholder='Email address'
          />

          <label htmlFor='card'>Card Number</label>
          <input 
            value={this.state.cardNumber} 
            id='card'
            onChange={e => {
              if (validator.isCreditCard(cardNumber)) {
                this.setState({cardNumber: e.target.value});
                this.setState({errorCard: ''});
              } else {
                this.setState({cardNumber: e.target.value});
                this.setState({errorCard: 'Enter valid card number'});
              }
            }} 
          type='number'
          className={(this.state.errorCard === 'Enter valid card number') ? 'form-control btn-outline-secondary' : 'form-control'}
          placeholder="Card number"
        />
      </div>

      <button 
        onClick={() => {
          this.props.getUserData(address, mail, cardNumber);
          this.setState({
            address: '',
            mail: '',
            cardNumber: '',
            });
        }} 
        type='submit'
        className='makeOrder btn btn-warning'
        disabled={
          ((!this.state.address || !this.state.mail || !this.state.cardNumber) || (this.state.errorMail === 'Enter valid email address') || (this.state.errorCard === 'Enter valid card number')) && true
      }>
      Make Order
    </button>
    </div>
    );
  }
}

CheckOutForm.propTypes = {
  getUserData: PropTypes.func,
}
 
CheckOutForm.defaultProps = {
}

export default CheckOutForm;