import { displayNavbar, createPagination, getPageParameter, displayErrorMsg } from './util.js';

const IIFE_IMAGE_SIZE = {
  SMALL: 200,
  MEDIUM: 400,
  LARGE: 600,
  FULL: 843,
};

function createImageLink(imageId, size = IIFE_IMAGE_SIZE.MEDIUM) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
}

async function getArtworks(pageNumber) {
  const FIELDS_PARAMETER = `fields=${['id', 'title', 'api_link', 'thumbnail', 'artist_title', 'image_id', 'pagination'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=24&${FIELDS_PARAMETER}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    return {
      artworks: result.data,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error(error);
  }
}

async function displayArtworks(artworks) {
  const artworkSection = document.getElementById('artworks');
  const artworkGrid = document.createElement('div');
  artworkGrid.setAttribute('class', 'artwork_grid');

  artworks.forEach((artwork) => {
    const img = document.createElement('img');
    img.src = createImageLink(artwork.image_id);

    const artworkContainer = document.createElement('div');
    artworkContainer.appendChild(img);

    const title = document.createElement('div');
    title.textContent = artwork.title;
    artworkContainer.appendChild(title);
    title.setAttribute('class', 'title');

    const artist = document.createElement('div');
    artist.textContent = artwork.artist_title;
    artworkContainer.appendChild(artist);
    artist.setAttribute('class', 'artist');

    artworkContainer.setAttribute('class', 'art_container');
    artworkGrid.appendChild(artworkContainer);
  });
  artworkSection.appendChild(artworkGrid);
}

(async () => {
  try {
    displayNavbar();
    const pageNumber = getPageParameter();
    if (pageNumber < 1) {
      window.location.href = window.location.href.split('?')[0];
    } else {
      const { artworks, pagination } = await getArtworks(pageNumber);
      displayArtworks(artworks);
      const paginationElement = createPagination(pageNumber, pagination.total_pages, '');
      document.body.appendChild(paginationElement);
    }
  } catch (error) {
    displayErrorMsg('Unable to fetch artworks at this time');
  }
})();
