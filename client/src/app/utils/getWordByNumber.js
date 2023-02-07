const getWordByNumber = (value, category) => {
    const categoryArr = getWordsByCategory(category);
    let word = categoryArr[2];
    if (value % 10 === 1 && Math.floor((value / 10) % 10) !== 1) {
        word = categoryArr[0];
    } else if (
        (value % 10 === 2 || value % 10 === 3 || value % 10 === 4) &&
        Math.floor((value / 10) % 10) !== 1
    ) {
        word = categoryArr[1];
    }
    return word;
};

function getWordsByCategory(category) {
    switch (category) {
        case 'days':
            return ['день', 'дня', 'дней'];
        case 'nights':
            return ['ночь', 'ночи', 'ночей'];
        case 'hours':
            return ['час', 'часа', 'часов'];
        case 'minutes':
            return ['минута', 'минуты', 'минут'];
        case 'people':
            return ['человек', 'человека', 'человек'];
        case 'guests':
            return ['гость', 'гостя', 'гостей'];
        default:
            return [];
    }
}

export default getWordByNumber;
