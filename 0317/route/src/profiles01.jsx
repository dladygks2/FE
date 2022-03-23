import React from 'react';
import { Link, Route } from 'react-router-dom';
import Apple from './apple';
import Banana from './banana';

const Profiles01 = () => {
    return (
        <div>
            <h2>유저 목록</h2>
            <ul>
                <li>
                    <Link to="/profiles/apple">apple</Link>
                </li>
                <li>
                    <Link to="/profiles/banana">banana</Link>
                </li>
            </ul>
            <div>
                <Route path='./apple' component={Apple} />
                <Route path='./banana' component={Banana} />
            </div>    
        </div>
    );
};

export default Profiles01;
