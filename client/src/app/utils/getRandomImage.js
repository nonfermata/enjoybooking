const getRandomImage = () => {
    return `https://avatars.dicebear.com/api/adventurer-neutral/${(
        Math.random() + 1
    )
        .toString(36)
        .substring(7)}.svg`;
};

export default getRandomImage;
