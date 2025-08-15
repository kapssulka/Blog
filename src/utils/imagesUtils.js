export const returnMainImage = (images) => {
  for (let i = 0; i < images.length; i++) {
    if (images[i].is_main === true) return images[i].url;
  }
};
