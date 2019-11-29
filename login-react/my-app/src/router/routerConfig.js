import React from 'react'
import Loadable from 'react-loadable'

function Loading() {
    return <div> loading </div>
}

const Register = Loadable({
    loader: () =>
        import ('../views/register'),
    loading: Loading
})

const Login = Loadable({
    loader: () =>
        import ('../views/login'),
    loading: Loading
})
const Detail = Loadable({
    loader: () =>
        import ('../views/detail'),
    loading: Loading
})
const Home = Loadable({
    loader: () =>
        import ('../views/home'),
    loading: Loading
})



const routes = [{
        path: "/register",
        component: Register
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/detail",
        component: Detail
    },
    {
        path: "/home",
        component: Home
    },
    {
        from:"/",
        to:"/home"
    }
]

export default routes;