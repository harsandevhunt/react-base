import React from 'react';
import { Router } from '@reach/router';
import './components.scss';
import SideNav from '../../components/common/semantics/sideNav';
import DefaultLanding from '../../components/componentsPage/default';
import loadData from '../../data/dropdown-multi-menu.data.json';
import DropdownMenu from '../../components/common/DropdownMenu';
import Dropdown from '../../components/common/Dropdown';

const dropDownData:any = loadData;
const Components = (props:any)=> {
    return (
        <div>
            <h2>Components</h2>
            <div className="component-grid">
                <SideNav/>
                <section>
                    {props.children}
                    {/* To avoid Router div full height issue passing predefined div class */}
                    <Router component={wrapperProps=> <div className="fullBox m-15" {...wrapperProps}  /> }>
                        <DefaultLanding path="/" />
                        
                        <DropdownMenu path="dropdown-old" active={true} multi={true} domKey="2" title="Select Department" data={dropDownData}/>
                        
                        <Dropdown path="dropdown" active={true} multi={true} title="Select Items" data={dropDownData}/>
                    </Router>
                </section>
            </div>
        </div>
    );
}
export default Components;