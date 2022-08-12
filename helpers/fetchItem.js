const fetchItem = async (ting) => {
  try {
    const findenItem = `https://api.mercadolibre.com/items/${ting}`;
    const res = await fetch(findenItem);
    const data = await res.json();
      return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
