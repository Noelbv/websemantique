import React from 'react';
import FilmPage from './FilmPage';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import { RouteKey } from '../misc/constantes';
import { Route, Routes } from 'react-router-dom';
const ROUTES = [
    { 
        path: "/", 
        key: RouteKey.HOME_PAGE, 
        exact: true, 
        element: <HomePage />,
    },
    {
        path: "/search/:input",
        key: RouteKey.SEARCH_PAGE,
        exact: true,
        element: <SearchPage />,
    },
    {
        path: "/film/:title",
        key: RouteKey.FILM_PAGE,
        exact: true,
        element: <FilmPage />,
    },
];

const RenderRoutes = () => {
    return (       
    <Routes>
        {ROUTES.map((route) => {
          return <Route 
            path={route.path} 
            key={route.key}
            exact={route.exact} 
            element={route.element} 
            />;
        })}
        <Route element={<h1>Not Found!</h1>} />
    </Routes> );
}
 
export {RenderRoutes, ROUTES};


