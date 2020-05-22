import React from 'react';
import './App.css';


const Iframe = ({ src }) => {

  if (!src) {
      return <div>Loading...</div>;
  }

  return (
    <iframe id="configurator" title="configurator" src={src} height="500"></iframe>
  );
};

window.cart = {};
const cart = window.cart;

cart.getCart = () => {
  return JSON.parse(localStorage.getItem('cart'));
}

cart.clear = () => {
  localStorage.removeItem('cart');
}

cart.updateCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
  console.log('cart updated');
}

cart.isItemInCart = (item, items = cart.getCart()) => {
  return items && items.find(val => val === item.toString());
}

cart.addItem = (item, cb) => {
  // get cart from localStorage
  let items = cart.getCart();

  // check if item exists in array
  if(cart.isItemInCart(item, items)) {
    console.log('item already added');
    return
  }

  // if cart doesn't exist make an empty array
  if(!items) items = [];

  // push item into items array
  items.push(item);

  // store items in localStorage cart
  cart.updateCart(items)

  console.log(`added item: ${item}`);
  
  // callback
  if(cb) { cb(items) }
}

cart.removeItem = (item, cb) => {
  if(!cart.isItemInCart(item)) {
    console.log('item does not exist')
    if(cb) cb(false);
  } else {
    // get items
    const items = cart.getCart();
    
    // remove item from array
    const result = items.filter(val => val !== item);

    cart.updateCart(result);

    // send true to callback
    if(cb) cb(result);
  }
}

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <div>
        <Iframe src={`/configurator.html`} />
      </div>
    </div>
  );
}

export default App;
