import React from 'react';
import { Router } from '@reach/router';

import Home from '../../../../pages/home';
import Dashboard from '../../../../pages/dashboard';
import Components from '../../../../pages/components';
// import DefaultLanding from '../../../componentsPage/default';

import './container.scss';

const Container = ()=>{
    return (
        <main>
            <section className="main-section">
                <Router primary={false}>
                    <Home path="/" />
                    <Dashboard path="dashboard" />
                    <Components path="components/*"/>
                        {/* <DefaultLanding path="/" />
                    </Components> */}
                </Router>
            </section>
        </main>
    )
};

export default Container;