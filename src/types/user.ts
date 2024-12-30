export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    username: string
    image: string
}

export interface UserState extends User {
    token: string
}

export interface UserLogin extends Pick<User, 'email'> {
    password: string
}

export type UserTypeAction = 
    | { type: 'LOGIN', payload: UserState }
    | { type: 'LOGOUT', payload: null }
