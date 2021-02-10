import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import './AdminPanel.css';
const db = firebase.firestore();

class AdminPanel extends React.Component {


    headerSubmitHandler = (event) => {
        event.preventDefault();
        db.collection("header").doc("myHeader").set({
            backgroundColor: document.getElementById("App-head").style.backgroundColor,
            textColor: document.getElementById("App-text").style.color,
            headerText: document.getElementById("App-text").innerText,
            fontSize: document.getElementById("App-text").style.fontSize
        },{ merge: true })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    async componentDidMount(){
        var headerRef = await db.collection("header").doc("myHeader");
        headerRef.get()
            .then((doc) => {
                ReactDOM.render(
                    <div className="Admin-header">
                        <table className="ItemsTable">
                            <thead>
                            <tr>
                                <th id="th-id">ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr id="logoTab" className="tabRow" onClick={() => {
                                var thisElement = document.getElementById("logoTab");
                                var e = document.getElementById("-logoTab");
                                if(e.style.display === 'table-row'){
                                    e.style.display = 'none';
                                    thisElement.style.border = 'none';
                                    thisElement.style.border = 'none';
                                }
                                else{
                                    e.style.display = 'table-row';
                                    thisElement.style.border = '2px solid black';
                                    e.style.border = '2px solid black';
                                    thisElement.style.borderBottom = 'none';
                                    e.style.borderTop = 'none';

                                }
                            }}>
                                <td>Logo</td>
                            </tr>



                            <tr className="details" id={"-logoTab"}>
                                <td>
                                    <div className="slidecontainer">
                                        <p>Logo height:</p>
                                        <input type="range" min="50" max="300"
                                               defaultValue={doc.data().logoHeight}
                                               name = "logoHeight"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("logo").style.height = val+"px";
                                                   this.setState({
                                                       logoHeight: val
                                                   })
                                               }}
                                        />
                                        <p>Logo width:</p>
                                        <input type="range" min="50" max="700"
                                               defaultValue={doc.data().logoWidth}
                                               name = "logoHeight"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("logo").style.width = val+"px";
                                                   this.setState({
                                                       logoWidth: val
                                                   })
                                               }}

                                        />
                                        <p>Logo margin:</p>
                                        <input type="range" min="0" max="100"
                                               defaultValue={doc.data().logoMargin}
                                               name = "logoMargin"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("logo").style.margin = val+"px";
                                                   this.setState({
                                                       logoMargin: val
                                                   })
                                               }}
                                        />
                                        <button className="App-save" id="Save" onClick={this.headerSubmitHandler}>Save header changes</button>
                                    </div>
                                </td>

                            </tr>


                            <tr id="textTab" className="tabRow" onClick={() => {
                                var thisElement = document.getElementById("textTab");
                                var e = document.getElementById("-textTab");
                                if(e.style.display === 'table-row'){
                                    e.style.display = 'none';
                                    thisElement.style.border = 'none';
                                    thisElement.style.border = 'none';
                                }
                                else{
                                    e.style.display = 'table-row';
                                    thisElement.style.border = '2px solid black';
                                    e.style.border = '2px solid black';
                                    thisElement.style.borderBottom = 'none';
                                    e.style.borderTop = 'none';

                                }
                            }}>
                                <td>Title</td>
                            </tr>

                            <tr className="details" id={"-textTab"}>
                                <td>
                                    <div className="slidecontainer">
                                        <p>Title:</p>
                                        <input type="text"
                                               defaultValue={document.getElementById("App-text").innerText}
                                               name = "headerText"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").innerText = val;
                                                   this.setState({
                                                       headertext: val
                                                   })
                                               }}
                                        />
                                        <p>Text size:</p>
                                        <input type="range" min="3" max="150"
                                               defaultValue={document.getElementById("App-text").style.fontSize}
                                               name = "fontSize"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").style.fontSize = val+"px";
                                                   this.setState({
                                                       logoHeight: val
                                                   })
                                               }}
                                        />

                                        <p>Text margin:</p>
                                        <input type="range" min="0" max="100"
                                               defaultValue={doc.data().textMargin}
                                               name = "textMargin"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").style.margin = val+"px";
                                                   this.setState({
                                                       textMargin: val
                                                   })
                                               }}
                                        />
                                        <p>Text color:</p>
                                        <input type="color" id="favcolor" name="favcolor" value={doc.data().textColor}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").style.color = val;

                                                   this.setState({
                                                       textColor: val
                                                   })
                                               }}
                                        />
                                        <p>Background:</p>
                                        <input type="color" id="favcolor" name="favcolor" value={doc.data().backgroundColor}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-head").style.backgroundColor = val;

                                                   this.setState({
                                                       backgroundColor: val
                                                   })
                                               }}
                                        />
                                    </div>
                                </td>

                            </tr>

                            </tbody>






                        </table>

                    </div>,
                    document.getElementById("App-admin")
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="admin">
                <div className="Admin-header" id="Admin-header"></div>
            </div>
        );
    }
}

export default AdminPanel;