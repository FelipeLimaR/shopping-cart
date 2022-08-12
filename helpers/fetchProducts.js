// const fetch = require('node-fetch');

const fetchProducts = async (query) => {
  // seu código aqui
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
    const res = await fetch(url);
    const data = await res.json();
      // .then((data) => data.results[0].thumbnail)
      // return res.results[0].title
      return data;
      
      // console.log(results);
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
