import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import './App.css';
import firebase from './Firebase';
import AdminPanel from "./AdminPanel";
const db = firebase.firestore();

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        loaded: false,
        currentItem: [],
        items: [],
        logoHeight: "",
        logoWidth: "",
        logoMargin: ""
    };
  }

  componentDidUpdate(){
      if((document.getElementById("main") != null) && (this.state.loaded === false)){
          document.getElementById("main").click();
          this.setState({
              loaded: true
          })
      }
  }

  async componentDidMount() {
    var items = [];


    //load header
    var headerRef = await db.collection("header").doc("myHeader");
    headerRef.get()
        .then((doc) => {
            this.setState({
                logoHeight: doc.data().logoHeight,
                logoWidth: doc.data().logoWidth,
                logoMargin: doc.data().logoMargin
                });
            ReactDOM.render(
                <div className="App-head" id="App-head" style={{background: doc.data().backgroundColor}}>
                    <img src={doc.data().headerLogo} className="App-logo" id="logo" alt="logo"
                        style = {{
                            height: this.state.logoHeight+"px",
                            width: this.state.logoWidth+"px",
                            margin: this.state.logoMargin+"px"
                    }}
                    />
                    <h1 className="App-text" id="App-text"
                        style={{
                            fontSize: doc.data().fontSize,
                            color: doc.data().textColor,
                            margin: doc.data().textMargin
                        }}
                    >{doc.data().headerText}</h1>
                </div>,
                document.getElementById("App-header")
            );
        })
        .catch((error) => {
          console.log(error);
        });

    //load menu and pages
    var pagesRef = await db.collection("pages");
    pagesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        items.push([doc.id, doc.data()]);
      })
      this.setState({
        items: items
      });
    })

      //load admin panel

      ReactDOM.render(
          <AdminPanel />,
          document.getElementById("App-admin")
      )

  }

  async setItemId(item){
      this.setState({
          currentItem: item
      });
  }

    async clickHandler(item){
//image CSS
        await this.setItemId(item);
        let imgWidth, imgHeight, imgFloat;
        await db.collection("pages")
            .doc(item[0])
            .collection("style")
            .doc("image")
            .get()
            .then((doc) => {
                imgWidth = doc.data().width;
                imgHeight = doc.data().height;
                imgFloat = doc.data().float;
                console.log(imgHeight, imgWidth)
            }).catch((error) => {
                console.log(error);
            });

        //build
        ReactDOM.render(
            <div className="App-page" id="Page">
                <h1>{item[1].title}</h1>
                <img
                    src={item[1].image}
                    id="img"
                    alt=""
                    style={{
                        width: imgWidth,
                        height: imgHeight,
                        float: imgFloat
                    }}
                />
                <p>{item[1].text}</p>
            </div>
            ,document.getElementById("Body"));
        console.log("iiiiiiiiiiddddddddddd", item[0]);

    }

  render(){


    return (

            <div className="App">

                <div className="App-admin" id="App-admin">

                </div>

                <header className="App-header" id="App-header">


                </header>
                <div className="App-nav" id="navbar">
                    {this.state.items.map(item => (
                        <div>
                            <a className="App-nav-item" id={item[0]} onClick={ async () => {
                                await this.clickHandler(item);

                            }}>{item[1].title}</a>
                        </div>
                    ))}

                </div>
                <div className="App-body" id="Body">
                </div>


            </div>




    );
  }

}

export default App;
