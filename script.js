// const { fetchProducts } = require("./helpers/fetchProducts");
// const container = document.querySelector('.container');
const bilenRaums = document.querySelector('.cart__items');
const getClearBtn = document.querySelector('.empty-cart');
const section1 = document.querySelector('.items');
const precoTotal = document.querySelector('.total-price');
const carregando = document.querySelector('.loading');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
  const item = event.target;
  item.remove(event.target);
  saveCartItems(bilenRaums.innerHTML);
  localStorage.setItem('precoTotal', precoTotal.innerText);
  precoTotal.innerText = 0;
};
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const funcao1 = async () => {
  const { results } = await fetchProducts('computador');
  results.forEach(async (product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const productItem = createProductItemElement({ sku, name, image });
    
    const bilen = productItem.querySelector('.item__add');
    section1.appendChild(productItem);
    const { price: salePrice } = await fetchItem(getSkuFromProductItem(productItem));
    bilen.addEventListener('click', createCartItemElement({ sku, name, salePrice }));
    bilen.addEventListener('click', async () => {
      const item1 = await createCartItemElement({ sku, name, salePrice });
      bilenRaums.appendChild(item1);
      saveCartItems(bilenRaums.innerHTML);
      localStorage.setItem('precoTotal', precoTotal.innerText);
      precoTotal.innerText = (Number(precoTotal.innerText) + salePrice);
    });
  });
  carregando.remove();
};

const clearBtn = async () => {
  getClearBtn.addEventListener('click', () => { 
    bilenRaums.innerText = ''; 
    saveCartItems(bilenRaums.innerHTML);
    precoTotal.innerText = 0;
    localStorage.setItem('precoTotal', precoTotal.innerText);
  });
};

// consegui destravar os requisitos 8, 9 e 11 com grande ajuda do colega Arthur Debiasi

window.onload = async () => {
  funcao1();
  clearBtn();
  bilenRaums.innerHTML = getSavedCartItems();
  bilenRaums.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });

  precoTotal.innerHTML = localStorage.getItem('precoTotal');
  // container.removeChild(carregando);
};