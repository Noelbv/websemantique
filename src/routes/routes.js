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
        element: () => <HomePage />
    },
    {
        path: "/search",
        key: RouteKey.SEARCH_PAGE,
        exact: true,
        element: () => <SearchPage />,
    },
    {
        path: "/film",
        key: RouteKey.FILM_PAGE,
        exact: true,
        element: () => <FilmPage />,
    },
];

const RenderRoutes = (routes) => {
    return (       
    <Routes>
        {routes.map((route) => {
          return <Route {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
    </Routes> );
}
 
export {RenderRoutes, ROUTES};


