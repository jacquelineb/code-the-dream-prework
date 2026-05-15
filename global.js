function displayNavbar() {
  const NAV_ITEMS = [
    { title: 'Artworks', path: '/' },
    { title: 'Shop', path: 'shop.html' },
  ];
  const unorderedList = document.createElement('ul');
  NAV_ITEMS.forEach((navItem) => {
    const link = document.createElement('a');
    link.href = navItem.path;
    link.textContent = navItem.title;
    const listItem = document.createElement('li');
    listItem.appendChild(link);
    unorderedList.appendChild(listItem);
  });

  const nav = document.createElement('nav');
  nav.appendChild(unorderedList);
  document.body.prepend(nav);
}

function createPagination(currPage, numPages, basePath) {
  const gotoFirst = document.createElement('a');
  gotoFirst.textContent = 'First';
  gotoFirst.href = `${basePath}?page=1`;

  const gotoPrev = document.createElement('a');
  gotoPrev.textContent = 'Prev';
  const isFirstPage = currPage === 1;
  if (isFirstPage) {
    gotoPrev.setAttribute('aria-disabled', true);
  } else {
    gotoPrev.href = `${basePath}?page=${currPage - 1}`;
  }

  const gotoLast = document.createElement('a');
  gotoLast.textContent = 'Last';
  gotoLast.href = `${basePath}?page=${numPages}`;

  const gotoNext = document.createElement('a');
  gotoNext.textContent = 'Next';
  const isLastPage = currPage === numPages;
  if (isLastPage) {
    gotoNext.setAttribute('aria-disabled', true);
  } else {
    gotoNext.href = `${basePath}?page=${currPage + 1}`;
  }

  const pageInput = document.createElement('input');
  pageInput.setAttribute('id', 'page_input');
  pageInput.value = currPage;
  pageInput.type = 'number';
  pageInput.min = 1;
  pageInput.max = numPages;

  const paginationForm = document.createElement('form');
  paginationForm.appendChild(pageInput);
  paginationForm.insertAdjacentText('beforeend', ` of ${numPages}`);
  paginationForm.onsubmit = (e) => {
    e.preventDefault();
    const pageInputValue = e.target.firstChild.value;
    window.location.href = `${basePath}?page=${pageInputValue}`;
  };

  const pagination = document.createElement('div');
  pagination.setAttribute('id', 'pagination');
  pagination.append(gotoFirst, gotoPrev, paginationForm, gotoNext, gotoLast);
  return pagination;
}

displayNavbar();

export { createPagination };
