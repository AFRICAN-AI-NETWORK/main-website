import { jwtDecode } from 'jwt-decode'

const AUTH_TOKEN_KEY = 'aan_auth_token'

export const storageHandler = {
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },
  setToken(token: string) {
    return localStorage.setItem(AUTH_TOKEN_KEY, token)
  },
  isTokenExpired(): boolean | undefined {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (!token) return undefined

    const decodedToken: { exp: number } = jwtDecode(token)
    const expirationDate = new Date(decodedToken.exp * 1000)
    return expirationDate > new Date()
  },
  removeCredentials() {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }
}
