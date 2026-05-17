import { displayNavbar, createPagination, getPageParameter } from './util.js';

async function fetchShop(page) {
  const FIELDS_PARAMETER = `fields=${['description', 'image_url', 'title', 'max_current_price'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/products?page=${page}&limit=12&${FIELDS_PARAMETER}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return {
      products: result.data,
      totalPages: result.pagination.total_pages,
    };
  } catch (error) {
    console.error(error);
  }
}

function initializeModal(targetId) {
  const closeButton = document.createElement('button');
  closeButton.title = 'Close';
  closeButton.innerHTML = `<svg viewbox= "0 0 24 24">
                              <path d="M18 6l-12 12" />
                              <path d="M6 6l12 12" />
                           </svg>`;

  closeButton.onclick = () => {
    modalContainer.style.display = 'none';
    document.documentElement.style.overflowY = 'scroll';
  };

  const modalContent = document.createElement('div');
  modalContent.setAttribute('id', 'modal_content');

  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  modal.onclick = (e) => e.stopPropagation();
  modal.append(closeButton, modalContent);

  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal_container');
  modalContainer.appendChild(modal);
  modalContainer.style.display = 'none';
  modalContainer.onclick = () => {
    modalContainer.style.display = 'none';
    document.documentElement.style.overflowY = 'scroll';
  };
  document.getElementById(targetId).appendChild(modalContainer);
}

function displayProductModal(name, description) {
  const productName = document.createElement('div');
  productName.textContent = name;
  productName.setAttribute('class', 'product_name');

  const productDescription = document.createElement('div');
  productDescription.innerHTML = description;

  const modalContent = document.getElementById('modal_content');
  modalContent.replaceChildren(productName, productDescription);

  document.documentElement.style.overflowY = 'hidden';
  document.getElementById('modal_container').style.display = 'flex';
  modalContent.scrollTop = 0;
}

function displayProducts(products) {
  products.forEach((product) => {
    const img = document.createElement('img');
    img.src = product.image_url;
    img.loading = 'lazy';

    const productImgContainer = document.createElement('div');
    productImgContainer.setAttribute('class', 'product_img_container');
    productImgContainer.appendChild(img);

    const name = document.createElement('div');
    name.setAttribute('class', 'product_name');
    name.textContent = product.title;

    const price = document.createElement('div');
    price.textContent = `$${product.max_current_price.toFixed(2)}`;
    price.setAttribute('class', 'price');

    const description = document.createElement('div');
    description.innerHTML = product.description;
    description.setAttribute('class', 'product_description');

    const viewDescriptionBtn = document.createElement('button');
    viewDescriptionBtn.textContent = 'View full description';
    viewDescriptionBtn.setAttribute('class', 'view_product_desc');
    viewDescriptionBtn.onclick = () => {
      displayProductModal(product.title, product.description);
    };

    const productInfo = document.createElement('div');
    productInfo.append(name, price, description, viewDescriptionBtn);

    const productContainer = document.createElement('div');
    productContainer.setAttribute('class', 'product_container');
    productContainer.append(productImgContainer, productInfo);
    document.getElementById('products').appendChild(productContainer);
  });
}

(async () => {
  displayNavbar();
  const currPage = getPageParameter();
  if (currPage < 1) {
    window.location.href = window.location.href.split('?')[0];
  } else {
    const shop = await fetchShop(currPage);
    if (shop === undefined) {
      const error = document.createElement('div');
      error.textContent = 'Unable to fetch shop data at this time.';
      document.getElementById('products').appendChild(error);
    } else {
      initializeModal('products');
      const { products, totalPages } = shop;
      displayProducts(products);
      const paginationElement = createPagination(currPage, totalPages, 'shop.html');
      document.getElementById('products').appendChild(paginationElement);
    }
  }
})();
