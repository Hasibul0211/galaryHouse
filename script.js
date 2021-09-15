
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
        const url = `https://fakestoreapi.com/products`;
        fetch(url)
            .then(res => res.json())
            .then(data => getProduct(data))
    }
}

const getProduct = (products) => {
    if (products.length === undefined) {
        spinner('none');
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
                    <button class="btn btn-warning fw-bold" onclick="showCount()">Add Cart</button>
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
const showCount = () => {
    count++;
    showNumber.innerText = count;
    showNumberTwo.innerText = count;
}

// cart icon here 
const showPriceContent = () => {
    console.log('get cart icon');

}