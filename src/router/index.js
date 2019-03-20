import React from 'react';
import {  Redirect } from 'react-router'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Header from '../containers/header/header.container';
import Home from '../containers/home/home.container';
import Thread from '../containers/threads/thread.container';
import createThread from '../containers/createthreads/createthread.container';

const token = localStorage.getItem("token");
export default (

    <Router>
            <Route exact path="*" component={Header} />
            <Route exact path="/" component={Home} />
            <Route exact path="/threads" render={() => (
            !token ? (
                <Redirect to="/"/>
            ) : (
                <Thread/>
            )
            )}/>
            {/* <Route exact path="/create-thread" render={() => (
            !token ? (
                <Redirect to="/"/>
            ) : (
                <createThread/>
            )
            )}/> */}
            {/* <Route exact path="/threads" component={Thread} /> */}
            <Route exact path="/create-thread" component={createThread} />
    </Router>

)