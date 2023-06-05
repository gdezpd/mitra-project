import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from './routeConfig';

export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={(
                    <Suspense fallback={<Spinner
                        style={{ position: 'absolute', top: '40%', left: '44%', height: '50px', width: '50px', }}
                        animation='border'/>}>
                        <div className='page-wrapper'>{element}</div>
                    </Suspense>
                )}
            />
        ))}
    </Routes>
);
