function createImageLink(id) {
  return `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
}

async function getArtworks() {
  const url = 'https://api.artic.edu/api/v1/artworks?limit=12';
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const artworks = result.data.map((artworkData) => {
      return {
        api_link: artworkData.api_link,
        thumbnail: artworkData.thumbnail,
      };
    });
    console.log(artworks);
    return artworks;
  } catch (error) {
    console.error(error);
  }
}

// getArtworks();

async function displayArtworks() {
  const artworks = await getArtworks();
  const img = document.createElement('img');
  img.src = artworks[10].thumbnail.lqip;
  img.width = artworks[10].thumbnail.width / 5;
  img.height = artworks[10].thumbnail.height / 5;
}
displayArtworks();
