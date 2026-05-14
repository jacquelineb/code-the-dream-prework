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

function createPagination(numPages, basePath) {
  const gotoFirst = document.createElement('a');
  gotoFirst.textContent = 'First';
  gotoFirst.href = `${basePath}?page=1`;

  const gotoLast = document.createElement('a');
  gotoLast.textContent = 'Last';
  gotoLast.href = `${basePath}?page=${numPages}`;

  const params = new URLSearchParams(document.location.search);
  let pageNumber = params.get('page');

  const currentPage = document.createElement('div');
  currentPage.textContent = `${pageNumber === null ? 1 : pageNumber} of ${numPages}`;

  const pagination = document.createElement('div');
  pagination.appendChild(gotoFirst);
  pagination.appendChild(currentPage);
  pagination.appendChild(gotoLast);
  return pagination;
}

displayNavbar();

export { createPagination };
