const getBlinking = (func) => {
    func('');
    setTimeout(() => {
        func('hidden');
    }, 200);
    setTimeout(() => {
        func('');
    }, 400);
    setTimeout(() => {
        func('hidden');
    }, 3000);
};

export default getBlinking;
