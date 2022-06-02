import req from './https'

export const login = (studentId, password) => {
    return req('post', `/login?studentId=${studentId}&password=${password}`)
};