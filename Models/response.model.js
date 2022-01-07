class Response {
    constructor(code, success, message) {
        this.code = code;
        this.success = success;
        this.message = message;
    }
}

module.exports = Response;