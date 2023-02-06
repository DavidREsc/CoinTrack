class ErrorResponse extends Error {
    private statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }

    getStatusCode() {
        return this.statusCode;
    }

    setStatusCode(statusCode: number) {
        this.statusCode = statusCode;
    }
}

export default ErrorResponse;
