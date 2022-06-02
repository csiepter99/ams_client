import router from '../router'

export const tip = (msg) => {
    console.log(msg)
}

export const toLogin = () => {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

