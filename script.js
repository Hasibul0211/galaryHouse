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
            
            const div=document.createElement('div');
            div.classList.add('col');
            div.innerHTML=` 
                 <div class="card cards">
                      <div>
                        <img src="..." class="card-img-top" alt="...">
                      </div>
                     <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }
   
}