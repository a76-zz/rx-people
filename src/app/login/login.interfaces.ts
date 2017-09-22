export interface LoginQuery {
    login: string;
    password: string;
}
export interface LoginInfo {
    firstName: string;
    lastName: string;
    token: string;
}

export const CurrentUserKey = 'currentUser';
