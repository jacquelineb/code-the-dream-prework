async function getProducts() {
  const FIELDS_PARAMETER = `fields=${['description', 'image_url', 'title', 'max_current_price'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/products?limit=12&${FIELDS_PARAMETER}`;
  // const url = 'https://api.artic.edu/api/v1/products?limit=12';
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

function displayProducts(products) {
  products.forEach((product) => {
    console.log(product);
    const img = document.createElement('img');
    img.src = product.image_url;

    const productContainer = document.createElement('div');
    productContainer.setAttribute('class', 'product_container');
    productContainer.appendChild(img);

    const productInfo = document.createElement('div');
    const name = document.createElement('div');
    name.textContent = product.title;
    productInfo.appendChild(name);

    const price = document.createElement('div');
    price.textContent = `$${product.max_current_price.toFixed(2)}`;
    productInfo.appendChild(price);

    const description = document.createElement('div');
    description.innerHTML = product.description;
    description.setAttribute('class', 'description');
    productInfo.appendChild(description);

    productContainer.appendChild(productInfo);
    document.getElementById('products').appendChild(productContainer);
  });
}

(async () => {
  const products = await getProducts();
  displayProducts(products);
})();
