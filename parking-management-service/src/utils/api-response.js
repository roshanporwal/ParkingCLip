class ApiResponse{
    constructor(code, message, discription, body){
        this.statusCode = code;
        this.message = message;
        this.data = body
        this.discription = discription
    }
}

module.exports = ApiResponse