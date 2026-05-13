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

function displayPagination() {}

displayNavbar();
