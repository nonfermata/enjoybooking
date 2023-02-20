const changeNumber = (value) => {
    let newValue = value.trim();
    const arr = [];
    for (const i of newValue) {
        if (i !== ' ' && !isNaN(i)) {
            arr.push(i);
        }
    }
    newValue = arr.join('');
    return Number(newValue);
};

export default changeNumber;
