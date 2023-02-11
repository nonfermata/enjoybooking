const getServerError = (res) => {
    res.status(500).json({
        message: 'Server error! Try again later'
    });
};

module.exports = getServerError;
