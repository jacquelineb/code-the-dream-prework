const IIFE_IMAGE_SIZE = {
  SMALL: 200,
  MEDIUM: 400,
  LARGE: 600,
  FULL: 843,
};

function createImageLink(imageId, size = IIFE_IMAGE_SIZE.SMALL) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/${size},/0/default.jpg`;
}

async function getArtworks() {
  const FIELDS_PARAMETER = `fields=${['id', 'title', 'api_link', 'thumbnail', 'artist_display', 'image_id'].join(',')}`;
  const url = `https://api.artic.edu/api/v1/artworks?page=1&limit=12&${FIELDS_PARAMETER}`;
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

// getArtworks();

async function displayArtworks() {
  const artworks = await getArtworks();
  // const artworkContainer = document.createElement('div');
  const artworkSection = document.getElementById('artworks');
  const artworkGrid = document.createElement('div');
  artworkGrid.setAttribute('class', 'art_grid');

  artworks.forEach((artwork) => {
    const img = document.createElement('img');
    // img.src = artwork.thumbnail.lqip;
    img.src = createImageLink(artwork.image_id);
    img.width = '300';

    const imgContainer = document.createElement('div');
    imgContainer.appendChild(img);
    artworkGrid.appendChild(imgContainer);
  });
  artworkSection.appendChild(artworkGrid);
  // const img = document.createElement('img');
  // img.src = artworks[10].thumbnail.lqip;
  // img.width = artworks[10].thumbnail.width / 5;
  // img.height = artworks[10].thumbnail.height / 5;
}
displayArtworks();
