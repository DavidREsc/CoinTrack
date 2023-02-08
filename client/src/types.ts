export interface IError {
    data: {
        success: boolean;
        error: string;
    }
}

export interface ILoginData {
    email: string;
    password: string;
}