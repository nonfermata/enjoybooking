const updateFavourites = (user, roomId) => {
    console.log(process.env);
    let newFavourites = user.favourites;
    if (user.favourites) {
        if (user.favourites.some((item) => item === roomId)) {
            newFavourites = user.favourites.filter((item) => item !== roomId);
        } else newFavourites.push(roomId);
    } else newFavourites = [roomId];
    return { ...user, favourites: newFavourites };
};

export default updateFavourites;
