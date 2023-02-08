import { useEffect, useState } from "react";
import axios from 'redaxios'
import { ILoginData } from "../types";

export default function useAuth() {
    const login = (loginData: ILoginData) => {
        const {email, password} = loginData
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                email,
                password
            })
            .then((response) => resolve(response))
            .catch((e) => reject(e))
        })
    }
    return {login}
}
