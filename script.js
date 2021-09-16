
const container = document.getElementById('card-container');
const div = document.createElement('div');
// spinner 

const spinner = (value) => {
    const spin = document.getElementById('spinner');
    spin.style.display = value;
}
const getError = (value) => {
    const alert = document.getElementById('error-alert');
    alert.style.display = value;
}
const getSearch = () => {
    spinner('block');
    const inputTextGet = document.getElementById('input-field');
    const inputText = inputTextGet.value;
    inputTextGet.value = '';
    container.textContent = '';
    if (inputText === '') {
        getError('block');//error function
        spinner('none');
        container.innerHTML = ''
        return;
    }
    else {
        getError('none');//error function
        spinner('block');
        div.textContent = '';
        const url = `https://fakestoreapi.com/${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getProduct(data))
    }

}

const getProduct = (products) => {
    if (products.length === 0) {
        getError('block')
    }

    else {
        spinner('none');
        products.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = ` 
                 <div class="card cards">
                      <div class="img-container">
                        <img src="${product.image}" class="card-img-top" alt="...">
                      </div>
                     <div class="cart-style">
                      <h5 class="card-title">${product.title.slice(0, 20)}</h5>
                      <p class="catagorie">Catagories: ${product.category}</p>
                      <p class="price-tag">Price:$<span>${product.price}</span></p>
                      <p class="Ratings">Ratings: ${product.rating.rate}(${product.rating.count})</p>
                      
                    </div>
                    <div class="btn-get">
                    <button class="btn btn-warning fw-bold" onclick="showCount(${product.price})">Add Cart</button>
                      <button class="btn btn-warning fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModalTwo" onclick="showDetails('${product.id}')">Show Details</button>
                      </div>
                </div>
            `;
            container.appendChild(div);
        });

    }

}


// details information here
const showDetails = (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showSingleDetails(data))
}

const showSingleDetails = (detail) => {
    console.log(detail)
    const secondModal = document.getElementById('second-modal');
    const div = document.createElement('div');
    secondModal.textContent = '';
    div.classList.add('modal-content');
    div.innerHTML = `
            <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Product Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="img-container-two">
            <img src="${detail.image}">
            </div>
                 <h3 class="single-title">${detail.title}</h3>
                 <hp class="single-catagory">Catagory: ${detail.category}</hp>
                 <h4 class="single-price">Price:$${detail.price}</h3>
                 <p class="single-rating">Ratings: ${detail.rating.rate}(${detail.rating.count})</p>
                 <p class="single-description"><span style="font-weight:bold">Description:</span> ${detail.description}</p>
            </div>
    `;
    secondModal.appendChild(div);
}


// show count here
let count = 0;
const showNumberTwo = document.getElementById('count-number');
const showNumber = document.getElementById('show-item-number');
const showCount = (price) => {
    count++;
    showNumber.innerText = count;
    showNumberTwo.innerText = count;
    updatePrices(price);
    updateDeliveryCharge();
    updateTaxes();
    updateTotal();
}

// cart icon here 
/* const showPriceContent = () => {
    console.log('get cart icon');

} */
// update price here 
const updatePrices = (price) => {
    const getOldPrice = document.getElementById("count-price").innerText;
    const updateOldPrice = parseFloat(getOldPrice);
    const newPrice = parseFloat(price);
    const totalPrice = updateOldPrice + newPrice;
    document.getElementById('count-price').innerText = totalPrice.toFixed(2);
}

// update delivery charge here 
const updateDeliveryCharge = () => {
    const getPrice = document.getElementById('count-price').innerText;
    const priceNumber = parseFloat(getPrice);
    const getCharge = document.getElementById('count-charge');

    if (priceNumber < 200) {
        getCharge.innerText = 20;
        updateTotal();
    }
    if (priceNumber > 200) {
        getCharge.innerText = 30;
        updateTotal();
    }
    if (priceNumber > 400) {
        getCharge.innerText = 50;
        updateTotal();
    }
    if (priceNumber > 500) {
        getCharge.innerText = 60;
        updateTotal();
    }
}

// update taxes here 

const updateTaxes = () => {
    const getTaxePrice = document.getElementById('count-price').innerText;
    const priceTaxNumber = parseFloat(getTaxePrice);
    const getTaxes = document.getElementById('count-tax');
    if (priceTaxNumber < 200) {
        const newTaxPrice = (priceTaxNumber * 0.1);
        getTaxes.innerText = newTaxPrice.toFixed(2);
        updateTotal();
    }
    if (priceTaxNumber > 200) {
        const newTaxPrice = (priceTaxNumber * 0.2);
        getTaxes.innerText = newTaxPrice.toFixed(2);
        updateTotal();
    }
    if (priceTaxNumber > 400) {
        const newTaxPrice = (priceTaxNumber * 0.3);
        getTaxes.innerText = newTaxPrice.toFixed(2);
        updateTotal();
    }
    if (priceTaxNumber > 500) {
        const newTaxPrice = (priceTaxNumber * 0.4);
        getTaxes.innerText = newTaxPrice.toFixed(2);
        updateTotal();
    }
}

// update total price here 

const updateTotal = () => {
    const getTotal = document.getElementById('count-total');

    const getOldPrice = document.getElementById("count-price").innerText;
    const updateOldPrice = parseFloat(getOldPrice);

    const getPrice = document.getElementById('count-charge').innerText;
    const priceNumber = parseFloat(getPrice);

    const getTaxePrice = document.getElementById('count-tax').innerText;
    const priceTaxNumber = parseFloat(getTaxePrice);

    const totatAmount = updateOldPrice + priceNumber + priceTaxNumber;
    getTotal.innerText = totatAmount.toFixed(2);
}

