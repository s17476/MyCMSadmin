import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import './AdminPanel.css';
import ContentAdminPanel from "./ContentAdminPanel";
import MenuAdminPanel from "./MenuAdminPanel";
const db = firebase.firestore();

class AdminPanel extends React.Component {


    headerSubmitHandler = (event) => {
        event.preventDefault();
        db.collection("header").doc("myHeader").set({
            backgroundColor: document.getElementById("App-head").style.backgroundColor,
            textColor: document.getElementById("App-text").style.color,
            headerText: document.getElementById("App-text").innerText,
            textMargin: document.getElementById("App-text").style.margin,
            fontSize: document.getElementById("App-text").style.fontSize,
            headerLogo: document.getElementById("logo").src,
            logoHeight: document.getElementById("logo").style.height,
            logoWidth: document.getElementById("logo").style.width,
            logoMargin: document.getElementById("logo").style.margin
        },{ merge: true })
            .then(() => {
                console.log("Header successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        
    }






    rgbToHex(col)
    {
        if(col.charAt(0)=='r')
        {
            col=col.replace('rgb(','').replace(')','').split(',');
            var r=parseInt(col[0], 10).toString(16);
            var g=parseInt(col[1], 10).toString(16);
            var b=parseInt(col[2], 10).toString(16);
            r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
            var colHex='#'+r+g+b;
            return colHex;
        }
    }

    async componentDidMount(){
        var headerRef = await db.collection("header").doc("myHeader");
        headerRef.get()
            .then((doc) => {
                ReactDOM.render(
                    <div className="Admin-header">

                        <button className="App-save" id="Save" onClick={this.headerSubmitHandler}>Save changes</button>

                        <table className="ItemsTable">
                            <thead>

                            <tr>
                                <th id="th-id">HEADER</th>
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
                                    thisElement.style.border = '2px solid #3662d9';
                                    e.style.border = '2px solid #3662d9';
                                    thisElement.style.borderBottom = 'none';
                                    e.style.borderTop = 'none';

                                }
                            }}>
                                <td>Logo</td>
                            </tr>



                            <tr className="details" id={"-logoTab"} onMouseEnter={event => event.target.style.backgroundColor = "white"}>
                                <td>


                                    <p className="Label">Logo url:</p>
                                    <input type="text"
                                           defaultValue={document.getElementById("logo").src}
                                           name = "headerLogo"
                                           onChange={(event) => {
                                               let val = event.target.value;
                                               document.getElementById("logo").src = val;
                                               this.setState({
                                                   headerLogo: val
                                               })
                                           }}
                                    />

                                    <div className="slidecontainer">
                                        <p className="Label">Logo height:</p>
                                        <input type="range" min="50" max="500"
                                               defaultValue={doc.data().logoHeight.split("px")[0]}
                                               name = "logoHeight"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("logo").style.height = val+"px";
                                                   this.setState({
                                                       logoHeight: val
                                                   })
                                               }}
                                        />
                                        <p className="Label">Logo width:</p>
                                        <input type="range" min="50" max="500"
                                               defaultValue={doc.data().logoWidth.split("px")[0]}
                                               name = "logoHeight"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("logo").style.width = val+"px";
                                                   this.setState({
                                                       logoWidth: val
                                                   })
                                               }}

                                        />
                                        <p className="Label">Logo margin:</p>
                                        <input type="range" min="0" max="100"
                                               defaultValue={doc.data().logoMargin.split("px")[0]}
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
                                    thisElement.style.border = '2px solid #3662d9';
                                    e.style.border = '2px solid #3662d9';
                                    thisElement.style.borderBottom = 'none';
                                    e.style.borderTop = 'none';

                                }
                            }}>
                                <td>Title</td>
                            </tr>

                            <tr className="details" id={"-textTab"} onMouseEnter={event => event.target.style.backgroundColor = "white"}>
                                <td>
                                    <div className="slidecontainer">
                                        <p className="Label">Title:</p>
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
                                        <p className="Label">Text size:</p>
                                        <input type="range" min="5" max="150"
                                               defaultValue={document.getElementById("App-text").style.fontSize.split("px")[0]}
                                               name = "fontSize"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").style.fontSize = val+"px";
                                                   this.setState({
                                                       logoHeight: val
                                                   })
                                               }}
                                        />

                                        <p className="Label">Text margin:</p>
                                        <input type="range" min="0" max="100"
                                               defaultValue={document.getElementById("App-text").style.margin.split("px")[0]}
                                               name = "textMargin"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").style.margin = val+"px";
                                                   this.setState({
                                                       textMargin: val
                                                   })
                                               }}
                                        />
                                        <p className="Label">Text color:</p>
                                        <input type="color" id="headerColor" name="headerColor" defaultValue={this.rgbToHex(doc.data().textColor)}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("App-text").style.color = val;
                                                   this.setState({
                                                       textColor: val
                                                   })
                                               }}
                                        />
                                        <p className="Label">Background:</p>
                                        <input type="color" id="headerBackgroung" name="headerBackgroung" defaultValue={this.rgbToHex(doc.data().backgroundColor)}
                                               onChange={(event) => {
                                                   let val = event.target.value;

                                                   console.log(val);
                                                   document.getElementById("App-head").style.backgroundColor = val;

                                                   this.setState({
                                                       backgroundColor: val
                                                   })
                                               }}
                                        />

                                        <button className="App-save" id="Save" onClick={this.headerSubmitHandler}>Save header changes</button>
                                    </div>
                                </td>

                            </tr>


                            </tbody>






                        </table>

                    </div>,
                    document.getElementById("Admin-header")
                );
            })
            .catch((error) => {
                console.log(error);
            });




























        ReactDOM.render(
            <MenuAdminPanel />,
            document.getElementById("Admin-menu")
        );






        ReactDOM.render(
            <ContentAdminPanel />,
            document.getElementById("Admin-content")
        );















    }

    render() {
        return (
            <div className="admin">
                <div className="Admin-header" id="Admin-header"></div>
                <div className="Admin-menu" id="Admin-menu"></div>
                <div className="Admin-content" id="Admin-content"></div>
                <div className="Admin-content" id="Admin-content-img"></div>
            </div>
        );
    }
}

export default AdminPanel;