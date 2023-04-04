import { cart } from './store.js';

export function getCart() {
  let html = cart.map(b => `
    <div class="col-150 col-md-60 col-lg-40" id="product-container">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${b.title}</h5>
          <p class="card-amount">${b.author}</p> EDIT THIS LINE
          <p class="card-price">${b.price} Dogecoin</p> 
        </div>
      </div>
    </div>
  `).join('');
  document.querySelector('#cart-items').innerHTML = html;
  // Add total sum
  let totalSum = cart.reduce((sum, book) => sum + book.price, 0);
  document.querySelector('#cart-total').innerHTML = `
    <div class="col-150 col-md-60 col-lg-40" id="total-sum-container">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Total sum</h5>
          <p class="card-total-sum">${totalSum} Dogecoin</p>
        </div>
      </div>
    </div>
  `;
}
/*
Each row in the cart should show the book title,

number of books of that title, the book price and a row sum.
I'm just going to assume that "row sum" means article price

Below the last row should be a total sum.
*/