import { createPagination } from './global.js';

async function fetchShop(page) {
  const FIELDS_PARAMETER = `fields=${['description', 'image_url', 'title', 'max_current_price'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/products?page=${page}&limit=12&${FIELDS_PARAMETER}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return {
      products: result.data,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error(error);
  }
}

function createModal() {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');

  const modalContent = document.createElement('div');
  modalContent.setAttribute('id', 'modal_content');
  modal.appendChild(modalContent);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.onclick = () => {
    modal.style.display = 'none';
  };
  modal.appendChild(closeButton);

  modal.style.display = 'none';
  document.getElementById('products').appendChild(modal);
}

function displayProductModal(name, description) {
  console.log('DISPLAY THIS');
  // const modalContent = document.createElement('div');
  // modalContent.setAttribute('class', 'modal');

  const productName = document.createElement('div');
  productName.textContent = name;
  // modalContent.appendChild(productName);

  const productDescription = document.createElement('div');
  productDescription.innerHTML = description;
  // modalContent.appendChild(productDescription);

  const modalContent = document.getElementById('modal_content');
  // modal.innerHTML = '';
  // modal.appendChild(productName);
  // modal.appendChild(productDescription);
  modalContent.replaceChildren(productName, productDescription);

  document.getElementById('modal').style.display = 'block';
}

function displayProducts(products) {
  products.forEach((product) => {
    // console.log(product);
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
    name.setAttribute('class', 'product_name');
    name.textContent = product.title;
    productInfo.appendChild(name);

    const price = document.createElement('div');
    price.textContent = `$${product.max_current_price.toFixed(2)}`;
    price.setAttribute('class', 'price');
    productInfo.appendChild(price);

    const description = document.createElement('div');
    description.innerHTML = product.description;
    description.setAttribute('class', 'description');
    productInfo.appendChild(description);

    const viewDescriptionBtn = document.createElement('button');
    viewDescriptionBtn.textContent = 'View description';
    viewDescriptionBtn.onclick = () => {
      // console.log(product.title);
      // console.log(product.description);
      displayProductModal(product.title, product.description);
    };
    productInfo.appendChild(viewDescriptionBtn);

    productContainer.appendChild(productInfo);
    document.getElementById('products').appendChild(productContainer);
  });
}

(async () => {
  const params = new URLSearchParams(document.location.search);
  let pageNumber = params.get('page');
  if (pageNumber === null) {
    pageNumber = 1;
  } else if (isNaN(Number(pageNumber)) || Number(pageNumber) <= 0) {
    window.location.href = window.location.href.split('?')[0];
  }

  // console.log(pageNumber);
  const shop = await fetchShop(pageNumber);
  if (shop === undefined) {
    const error = document.createElement('div');
    error.textContent = 'Unable to fetch shop data at this time.';
    document.getElementById('products').appendChild(error);
  } else {
    createModal();
    const { products, pagination } = shop;
    displayProducts(products);
    // console.log(shop);
    // displayPagination(pagination.total_pages, document.getElementById('products'));
    const paginationElement = createPagination(pagination.total_pages, 'shop.html');
    document.getElementById('products').appendChild(paginationElement);

    // displayProductModal('test', 'test description');
  }
  // */
})();
