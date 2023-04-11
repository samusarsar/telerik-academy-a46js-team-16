export const toMiniGifView = (gif) => `
  <div class="gif-box">
    <a id="${gif.id}"><img src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}"></a>
  </div>
`;
