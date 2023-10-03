function validateAlphanumeric(value) {
    const nonAlphanumericPattern = /[^a-zA-Z0-9]+/;
    return nonAlphanumericPattern.test(value); // Return true if it's valid, false otherwise
}

module.exports = {
    validateAlphanumeric,
};