const changePhone = (value) => {
    let newValue = value.length < 3 ? '' : value.replace('+7 ', '');
    newValue = newValue.trim();
    if (isNaN(newValue)) {
        const arr = [];
        for (const i of newValue) {
            if (i !== ' ' && !isNaN(i)) {
                arr.push(i);
            }
        }
        newValue = arr.join('');
    }
    return newValue;
};

export default changePhone;
