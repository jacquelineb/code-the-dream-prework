import { createPagination } from './global.js';

async function fetchShop(page) {
  const FIELDS_PARAMETER = `fields=${['description', 'image_url', 'title', 'max_current_price'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/products?page=${page}&limit=12&${FIELDS_PARAMETER}`;
  // const url = 'https://api.artic.edu/api/v1/products?limit=12';
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return {
      products: result.data,
      pagination: result.pagination,
    };
    // return result.data;
  } catch (error) {
    console.error(error);
  }
}

function displayProducts(products) {
  products.forEach((product) => {
    console.log(product);
    const img = document.createElement('img');
    img.src = product.image_url;
    const productImgContainer = document.createElement('div');
    productImgContainer.setAttribute('class', 'product_img_container');
    productImgContainer.appendChild(img);

    const productContainer = document.createElement('div');
    productContainer.setAttribute('class', 'product_container');
    productContainer.appendChild(productImgContainer);

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
  const params = new URLSearchParams(document.location.search);
  console.log(params);
  let pageNumber = params.get('page');
  console.log(typeof pageNumber);
  if (pageNumber === null) {
    pageNumber = 1;
  } else if (isNaN(Number(pageNumber)) || Number(pageNumber) <= 0) {
    window.location.href = window.location.href.split('?')[0];
  }

  console.log(pageNumber);
  const shop = await fetchShop(pageNumber);
  if (shop === undefined) {
    const error = document.createElement('div');
    error.textContent = 'Unable to fetch shop data at this time.';
    document.getElementById('products').appendChild(error);
  } else {
    const { products, pagination } = shop;
    displayProducts(products);
    // console.log(shop);
    // displayPagination(pagination.total_pages, document.getElementById('products'));
    const paginationElement = createPagination(pagination.total_pages, 'shop.html');
    document.getElementById('products').appendChild(paginationElement);
  }
  // */
})();
