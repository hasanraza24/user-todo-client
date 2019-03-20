import React, { Component } from 'react';
import { postCallApi } from '../../utils/utils'
import {  API_URL } from '../../constants/index'
import '../../assets/css/home.css';

class createThread extends Component {

  createThread = (e) =>{
    let currentComponent =this;
    e.preventDefault();
    var title = document.getElementById("ttitle").value;
    var description = document.getElementById("tdescription").value;
    var tags = document.getElementById("ttags").value;
    let token = localStorage.getItem("token");

    let threadBody = {
      title: title,
      description: description
    };

    if(tags){
      threadBody.tags = tags.split(',');
    }

    postCallApi(`${API_URL}/threads/create?token=${token}`, threadBody).then((data) => {
      if (data) {
              console.log('threadData',data);
              currentComponent.refs.threadCreated.innerHTML = "Your thread has been created";
                            setTimeout(() => {
                                currentComponent.props.history.push({
                                  pathname: '/threads',
                              });
                                }, 2000
                            );
              // localStorage.setItem("token", data.data.token);
            //   this.props.history.push({
            //     pathname: '/threads',
            // });
          // document.getElementById("myForm").reset();          
      } else {
          // currentComponent.refs.formMessage.innerHTML = "Please try again";
      }
  })
  }


  render() {
    return (
      <div className="create-form">
        <form id="rForm" name="contact-us-form" onSubmit={(e)=>this.createThread(e)}>
            <input type="text" id="ttitle" required placeholder="Title"/>
            <textarea type="text"  id="tdescription" required placeholder="Description"/>
            <input type="text" id="ttags" placeholder="Tags"/>
            <input type="submit" value="Create"/>
          </form>
          <p ref='threadCreated' style={{ fontFamily: "Lato",color: "#2a0ad0",fontSize: "15px",marginTop:8, fontWeight:600, textAlign:"center" }}></p>
      </div>
    );
  }
}

export default createThread;
