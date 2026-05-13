const IIFE_IMAGE_SIZE = {
  SMALL: 200,
  MEDIUM: 400,
  LARGE: 600,
  FULL: 843,
};

function createImageLink(imageId, size = IIFE_IMAGE_SIZE.MEDIUM) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
}

async function getArtworks() {
  const FIELDS_PARAMETER = `fields=${['id', 'title', 'api_link', 'thumbnail', 'artist_title', 'image_id'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/artworks?page=1&limit=24&${FIELDS_PARAMETER}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const artworks = (await response.json()).data;
    console.log(artworks);
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

async function displayArtworks() {
  const artworks = await getArtworks();
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

displayArtworks();
