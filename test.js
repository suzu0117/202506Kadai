let products = [];
let searchedProducts = [];
let categoryProducts = [];
let genderProducts = [];
let priceProducts = [];

fetch('./test.json')
    //読み込み成功
    .then(response => response.json())
    .then(data => {
        products = data;
        searchedProducts = products;
        categoryProducts = products;
        genderProducts = products;
        priceProducts = products;
        displayProducts(products);
        console.log(searchedProducts,categoryProducts,genderProducts,priceProducts);
    })
    //読み込み失敗
    .catch(error => {
        console.log('商品の読み込みに失敗しました:',error);
    });

//商品を表示する関数
function displayProducts(items){
    const list = document.getElementById('product_list');
    list.innerHTML = '' //表示を初期化
    //商品をHTML上に反映させる
    items.forEach(item => {
        const product = document.createElement('div');
        product.className = 'product';
        product.dataset.category = item.category;
        product.dataset.gender = item.gender; //data属性の追加
        product.innerHTML = `
            <h3>${item.name}</h3>
            <img src="./img/${item.image}" alt="${item.name}"></img>
            <p>価格 : &yen;${item.price.toLocaleString()}</p>
            <p>発売日 : ${item.release_date}</p>
        `;
        list.appendChild(product)
    });
}

//検索機能
document.getElementById('search').addEventListener('input', event =>{
    const keyword = event.target.value.toLowerCase(); //大文字を小文字に変換
    const selected = document.getElementById('category_buttons').querySelector('.active').dataset.category;
    /*const filtered = products.filter(product => product.name.toLowerCase().includes(keyword)&&(selected === 'all'||product.category===selected));*/
    searchedProducts = products.filter(product => product.name.toLowerCase().includes(keyword)&&(selected === 'all'||product.category===selected));
    const filtered = products.filter(product =>
        searchedProducts.includes(product)&&categoryProducts.includes(product)&&genderProducts.includes(product)&&priceProducts.includes(product)
    )
    displayProducts(filtered);
});


//カテゴリ機能
document.querySelectorAll('#category_buttons button').forEach(btn => {
    btn.addEventListener('click',() =>{
        document.querySelectorAll('#category_buttons button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selected = btn.dataset.category;
        const all_products = document.querySelectorAll('.product');
        categoryProducts = products.filter(product => product.category===selected||selected === 'all');
        const filtered = products.filter(product =>
            searchedProducts.includes(product)&&categoryProducts.includes(product)&&genderProducts.includes(product)&&priceProducts.includes(product)
        )
        displayProducts(filtered);
        /*all_products.forEach(p => {
            if(selected === 'all' || p.dataset.category === selected){
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });*/
    });
});


document.querySelectorAll('#gender_buttons button').forEach(btn => {
    btn.addEventListener('click',() =>{
        document.querySelectorAll('#gender_buttons button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selected = btn.dataset.category;
        const all_products = document.querySelectorAll('.product');
        genderProducts = products.filter(product => product.gender===selected||selected === 'all');
        const filtered = products.filter(product =>
        searchedProducts.includes(product)&&categoryProducts.includes(product)&&genderProducts.includes(product)&&priceProducts.includes(product)
            )
        displayProducts(filtered);
        /*all_products.forEach(p => {
            if(selected === 'all'||p.dataset.gender === selected||p.dataset.gender==='unisex' ){
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        });*/

    })
})


document.getElementById('price-filter-button').addEventListener('click',()=>{
    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;
    
    /*const filtered = products.filter(product => product.price >= min && product.price <= max);*/
    priceProducts = products.filter(product => product.price >= min && product.price <= max);
    const filtered = products.filter(product =>
        searchedProducts.includes(product)&&categoryProducts.includes(product)&&genderProducts.includes(product)&&priceProducts.includes(product)
    )
    displayProducts(filtered);
})
