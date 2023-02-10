import { useEffect, useState } from "react";
import axios from 'redaxios'
import { IError, ISignupData, ILoginData } from "../types";

interface AuthResponse {
    data: {
        success: boolean;
        user: string;
    }
}

export default function useAuth() {
    const login = (loginData: ILoginData) => {
        const {email, password} = loginData
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.post('/api/v1/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                email,
                password
            })
            .then((response: AuthResponse) => resolve(response))
            .catch((e: IError) => reject(e))
        })
    }
    const signup = (signupData: ISignupData) => {
        const {email, password} = signupData
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.post('/api/v1/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                email,
                password  
            })
            .then((response: AuthResponse) => resolve(response))
            .catch((e: IError) => reject(e))
        })
    }
    const verify = () => {
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.get('/api/v1/auth/verify', {
                method: 'GET'
            })
            .then((response: AuthResponse) => resolve(response))
            .catch((e: IError) => reject(e))
        })
    }
    const demoLogin = () => {
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.post('/api/v1/auth/demoLogin', {method: 'POST'})
            .then((response: AuthResponse) => resolve(response))
            .catch((e: IError) => reject(e))
        })
    }
    return {login, signup, verify, demoLogin}
}
