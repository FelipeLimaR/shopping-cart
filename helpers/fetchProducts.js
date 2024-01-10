const fetchProducts = async (query) => {
  if (!query) {
    throw new Error('You must provide an url');
  }
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}