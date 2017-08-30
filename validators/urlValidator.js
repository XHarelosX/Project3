function validateUrl(val) {
    var URL_PATTERN = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

    return EMAIL_PATTERN.test(val);
}

var urlValidator = [
    { validator: validateUrl, msg: 'Illegal url format' }
];

module.exports = {
    validateUrl: validateUrl,
    urlValidator: urlValidator
};