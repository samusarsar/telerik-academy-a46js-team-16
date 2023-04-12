import { EMPTY_HEART } from "../common/constants.js";

export const toMiniGifView = (gif) => `
  <div class="gif-box">
    <a href=#><img class="mini-gif-img" data-gif-id="${gif.id}" src="${gif.images.fixed_height_downsampled.url}" alt="${gif.title}"></a>
  </div>
`;

export const toDetailedGifView = (gif) => {
  console.log(gif)
  return `<h3>${gif.title}</h3>
  <img src="${gif.images.original.url}">
  <p>Uploaded by: ${gif.user?.display_name || gif.username || 'anonymous user'}</p>`
}

{/* <p>Uploaded by: ${gif.user.display_name}, username: ${gif.username}</p> */}