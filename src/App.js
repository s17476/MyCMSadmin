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
            ReactDOM.render(
                <div className="App-head" id="App-head" style={{background: doc.data().backgroundColor}}>
                    <img src={doc.data().headerLogo} className="App-logo" id="logo" alt="logo"
                        style = {{
                            height: doc.data().logoHeight,
                            width: doc.data().logoWidth,
                            margin: doc.data().logoMargin
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

        items.push([doc.id, doc.data()]);
      })
      this.setState({
        items: items
      });
    })

      //load menu style propeteries
      var menuRef = await db.collection("header").doc("menu");
      menuRef.get()
          .then((doc) => {
              var menu = document.getElementById("navbar");



              var menuItems = document.getElementsByClassName("App-nav-item");

              var backgroundColor = doc.data().backgroundColor;
              var color = doc.data().textColor;
              var margin = doc.data().margin;
              var fontSize = doc.data().fontSize;
              var hoverColor = doc.data().hoverColor;
              var hoverBackgroundColor = doc.data().hoverBackgroundColor;

              menu.style.backgroundColor = backgroundColor;

              Array.from(menuItems).forEach((item) => {
                  item.style.color = color;
                  item.style.padding = margin;
                  item.style.fontSize = fontSize;
                  document.getElementById(item.id).onmouseleave = () => {
                      item.style.color = color;
                      item.style.background = backgroundColor;
                  };
                  document.getElementById(item.id).onmouseenter= () => {
                      item.style.color = hoverColor;
                      item.style.backgroundColor = hoverBackgroundColor;
                  };
              });

          })
          .catch((error) => {
              console.log(error);
          });
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

            }).catch((error) => {
                console.log(error);
            });

        let color, fontSize, margin;
        await db.collection("pages")
            .doc(item[0])
            .collection("style")
            .doc("title")
            .get()
            .then((doc) => {
                color = doc.data().color;
                fontSize = doc.data().fontSize;
                margin = doc.data().margin;

            }).catch((error) => {
                console.log(error);
            });

        //build
        ReactDOM.render(
            <div className="App-page" id="Page">
                <h1 id="Page-title" style={{
                    color: color,
                    fontSize: fontSize,
                    marginLeft: margin
                }}>{item[1].title}</h1>
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
