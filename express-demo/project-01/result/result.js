class Result{
    constructor(code = 200, msg = ""){
        this.code = code;
        this.msg = msg;
    }

    notFound(msg){
        this.code = 404;
        this.msg = msg;
    }

    badRequest(msg){
        this.code = 400;
        this.msg = msg;
    }

    unauthorized(msg){
        this.code = 401;
        this.msg = msg;
    }

    forbidden(msg){
        this.code = 403;
        this.msg = msg;
    }

    success(code, msg){
        this.code = code;
        this.msg = msg;
    }
}

module.exports = Result;
