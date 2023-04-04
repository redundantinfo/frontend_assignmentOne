export async function loadStorePage() {
  console.log('store page loaded');
  let books = await (await fetch('/js/books.json')).json();
  let html = books.map(b => `
    <div class="col-150 col-md-60 col-lg-40" id="product-container">
      <div class="card">
        <img src="${b.image}" class="card-img-right" alt="${b.title}">
        <div class="card-body">
          <h5 class="card-title">${b.title}</h5>
          <p class="card-author">${b.author}</p>
          <button class="accordion">Read more</button>
          <div class="panel">
            <p class="card-desc">${b.description}</p>
          </div>
          <a href="#" data-book='${JSON.stringify(b)}' class="btn btn-primary add-to-cart-btn" id="btn-add-to-cart">Add to cart</a>
          <p class="card-price">${b.price} Dogecoin</p> 
        </div>
      </div>
    </div>
  `).join('');
  document.querySelector('#content').innerHTML = html;

  // Accordion, opted out of using bootstrap for this. JS is just less of a hassle.
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("accordion-active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // Attach event listeners to Add to cart buttons
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const book = JSON.parse(btn.dataset.book);
      addToCart(book);
    });
  });
}

export let cart = [];
function addToCart(book) {
  cart.push(book);
  console.log(`Added book "${book.title}" to cart`);
  console.log(cart);
}
