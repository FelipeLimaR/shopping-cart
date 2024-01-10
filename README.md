# :construction: README em construção ! :construction:
const itemsCart = document.querySelector('.cart__items');
const clearCartBtn = document.querySelector('.empty-cart');
const itemSelect = document.querySelector('.items');
const precoTotal = document.querySelector('.total-price');

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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );
  return section;
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

const cartItemClickListener = ({ target }) => {
  target.remove();
  saveCartItems(itemsCart.innerHTML);
  precoTotal.innerText = (Number(precoTotal.innerText) - target.id);
  localStorage.setItem('precoTotal', precoTotal.innerText);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const renderItems = async (items) => {
  items.forEach(async ({ id: sku, title: name, thumbnail: image }) => {
    const productItem = createProductItemElement({ sku, name, image });
    const btn = productItem.querySelector('.item__add');
    const { price: salePrice } = await fetchItem(getSkuFromProductItem(productItem));
    
    itemSelect.appendChild(productItem);
    btn.addEventListener('click', async () => {
      const cartProduct = await createCartItemElement({ sku, name, salePrice });
      cartProduct.id = salePrice;
      precoTotal.innerText = (Number(precoTotal.innerText) + salePrice);
      localStorage.setItem('precoTotal', precoTotal.innerText);
      
      itemsCart.appendChild(cartProduct);
      saveCartItems(itemsCart.innerHTML);
    });
  });
};

clearCartBtn.addEventListener('click', () => {
  while (itemsCart.firstChild) itemsCart.firstChild.remove();
  saveCartItems(itemsCart.innerHTML);
  precoTotal.innerText = 0;

  localStorage.setItem('precoTotal', precoTotal.innerText);
});

itemSelect.appendChild(createCustomElement('p', 'loading', 'carregando...'));

window.onload = async () => {
  const { results } = await fetchProducts('computador');
  await renderItems(results);
  document.querySelector('.loading').remove();
  itemsCart.innerHTML = getSavedCartItems();
  precoTotal.innerHTML = localStorage.getItem('precoTotal');
  itemsCart.querySelectorAll('.cart__item').forEach((item) =>
    item.addEventListener('click', cartItemClickListener));
};