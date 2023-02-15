const updateFavourites = (favourites, id) => {
    let newFavourites = favourites;
    if (favourites) {
        if (favourites.some((item) => item === id)) {
            newFavourites = favourites.filter((item) => item !== id);
        } else newFavourites.push(id);
    } else newFavourites = [id];
    return newFavourites;
};

export default updateFavourites;
