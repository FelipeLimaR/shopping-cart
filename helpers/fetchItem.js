const fetchItem = async (id) => {
  if (!id) {
    throw new Error('You must provide an url');
  }

  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
