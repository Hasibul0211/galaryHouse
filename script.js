console.log('connected');
const container=document.getElementById('card-container');
// spinner 

const spinner=(value)=>{
    const spin=document.getElementById('spinner');
    spin.style.display=value;
}
const getError=(value)=>{
    const alert=document.getElementById('error-alert');
    alert.style.display=value;
}
const getSearch=()=>{
    spinner('block');
    const inputTextGet=document.getElementById('input-field');
    const inputText=inputTextGet.value;
    inputTextGet.value='';
    
    if(inputText===''){
        getError('block');//error function
        spinner('none');
        container.innerHTML=''
        return;
    }
    else{
        getError('none');//error function
        spinner('block');
        const url=`https://fakestoreapi.com/products`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>getProduct(data))
    }
}

const getProduct=(products)=>{
    if(products.length === undefined){
        spinner('none');
    }
    else{
        spinner('none');
        products.forEach(product => {
            console.log(product)
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=` 
                 <div class="card cards">
                      <div class="img-container">
                        <img src="${product.image}" class="card-img-top" alt="...">
                      </div>
                     <div class="card-body">
                      <h5 class="card-title">${product.title.slice(0,20)}</h5>
                      <p class="catagorie">Catagories: ${product.category}</p>
                      <p class="price-tag">Price:$<span>${product.price}</span></p>
                      <p class="Ratings">Ratings: ${product.rating.rate}(${product.rating.count})</p>
                      
                    </div>
                    <div class="btn-get">
                    <button class="btn btn-warning fw-bold">Add Cart</button>
                      <button class="btn btn-warning fw-bold">Show Details</button>
                      </div>
                </div>
            `;
            container.appendChild(div);
        });
    }
   
}
