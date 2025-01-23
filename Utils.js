const generateStars = (rating) => {
  let stars = [];
  let fullStars = Math.floor(rating);
  for (let i = 0; i < fullStars; i++) stars.push("./star.svg");

  let rem = rating - fullStars;
  if (rem > 0.2 && rem < 0.8) stars.push("./star-half.svg");
  else if (rem > 0.7) stars.push("./star.svg");

  return stars;
};

const trimTitle = (title) => title.length > 40 ? `${title.slice(0, 37)}...` : title;

export default { generateStars, trimTitle }