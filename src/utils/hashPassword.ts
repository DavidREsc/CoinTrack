import bcrypt from 'bcryptjs'

// Hash password with bcryptjs
const hashPassword = (password: string) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);
            resolve(hashedPassword)
        } catch (error) {
            reject(error)
        }
    })
}

export default hashPassword;
