// const { fetchProducts } = require("./helpers/fetchProducts");

// const { fetchItem } = require("./helpers/fetchItem");

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
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
const bilenRaums = document.querySelector('.cart__items');

const funcao1 = async () => {
  const { results } = await fetchProducts('computador');
  results.forEach(async (product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const productItem = createProductItemElement({ sku, name, image });
    const section1 = document.querySelector('.items');
    const bilen = productItem.querySelector('.item__add');
    console.log(bilen);
    section1.appendChild(productItem);

    const { price: salePrice } = await fetchItem(getSkuFromProductItem(productItem));
    bilen.addEventListener('click', createCartItemElement({ sku, name, salePrice }));
    bilen.addEventListener('click', async () => {
      const item1 = createCartItemElement({ sku, name, salePrice });
      bilenRaums.appendChild(item1);
    });
  });
};

const getClearBtn = document.querySelector('.empty-cart');

const clearBtn = () => {
  console.log('olá!');
  getClearBtn.addEventListener('click', () => { bilenRaums.innerText = ''; });
};

clearBtn();

window.onload = () => { funcao1(); };
