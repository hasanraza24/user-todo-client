import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { getCallApi, getTimeAgo } from '../../utils/utils';
import {  API_URL } from '../../constants/index';
import '../../main.css';

class Thread extends Component {

    constructor(props) {
        super(props);
        this.state = {
            threads: []
        }
    }

    componentDidMount = () =>{
        let token = localStorage.getItem("token");
        return getCallApi(`${API_URL}/threads/list?token=${token}`)
            .then((data) => {
                if (data) {
                    // console.log('tdata', data.data.threads)
                    
                    this.setState({
                        threads: data.data.threads
                    });
                }
                else {
                }
            })
            .catch((error) => {
            });
    }

    goToCreateThreadPage = () =>{
        this.props.history.push({
            pathname: '/create-thread',
        });
    }

    threadsCard = (thread, index) => {
        return (
            <div key={index} className="card">
                <p className="thread-title">{thread.title}</p>
                <p className="thread-desc">{thread.description}</p>
                <div>
                    {thread.tags.length>0 && thread.tags.map((tag, index)=>{
                        return <span key={index} className="thread-tag">{tag}</span>
                    })}
                    <span className="thread-time">{getTimeAgo(thread.date)}</span>
                </div>
            </div>
        )
    };

    render() {
        const threads = this.state.threads;
        return (
        <div>
            {threads.length>0 && <div className="card-stack">{ threads.map(this.threadsCard)}</div>}
            {threads.length===0 && <div className="card-stack"><div className="card"><p className="thread-title">No Cards</p></div></div>}
            <div className="add-button" onClick={this.goToCreateThreadPage}>+</div>
        </div>
        
        );
    }
}

export default withRouter(Thread);
