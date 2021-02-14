import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import './AdminPanel.css';
import ContentAdminPanel from "./ContentAdminPanel";
import MenuAdminPanel from "./MenuAdminPanel";
const db = firebase.firestore();

class AdminPanel extends React.Component {


    submitHandler = (event) => {
        event.preventDefault();
        var result = true;
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
                result = false;
            });


        let title = document.getElementById("Page-title");
        db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("title").set({
            color: title.style.color,
            fontSize: title.style.fontSize,
            margin: title.style.marginLeft
        }, {merge: true})
            .then(() => {
                console.log("Content title successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                result = false;
            });

        let img = document.getElementById("img");
        db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("image").set({
            width: img.style.width,
            height: img.style.height,
            float: img.style.float
        }, {merge: true})
            .then(() => {
                console.log("Content image successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                result = false;
            });


        db.collection("pages").doc(localStorage.getItem("item")).set({
            title: title.innerText,
            text: document.getElementById("Page-text").innerHTML,
            image: document.getElementById("Admin-img").value
        }, {merge: true})
            .then(() => {
                console.log("Content image successfully written!");
                var oldTitle = localStorage.getItem("oldTitle");
                console.log(oldTitle + " stary i nowy " + title.innerText);
                if((oldTitle != "") && (oldTitle != title.innerText)){
                    localStorage.setItem("oldTitle", title.innerText);
                    window.location.reload(false);

                }

            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                result = false;
            });

        db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("text").set({
            fontSize: document.getElementById("Content-textSize").value,
            margin: document.getElementById("Content-textMargin").value,
            color: document.getElementById("Content-textColor").value,

        }, {merge: true})
            .then(() => {
                console.log("Content image successfully written!");

            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                result = false;
            });

        document.getElementById("Page-text").setAttribute("contenteditable", "false");

        let menuItem = Array.from(document.getElementsByClassName("App-nav-item"))[0];
        db.collection("header").doc("menu").set({
            backgroundColor: document.getElementById("navbar").style.backgroundColor,
            textColor: menuItem.style.color,
            margin: menuItem.style.padding,
            fontSize: menuItem.style.fontSize,
            hoverColor: document.getElementById("hoverMenuColor").value,
            hoverBackgroundColor: document.getElementById("hoverMenuBackground").value,
        },{ merge: true })
            .then(() => {
                console.log("Menu successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                result = false;
            });

        if(result)
            window.alert("Changes successfully saved!");
        else
            window.alert("An error occurred while saving the changes");
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

                        <button className="App-delete" id="Reset" onClick={() => window.location.reload(false)}>Reset changes</button>
                        <button className="App-save" id="Save" onClick={this.submitHandler}>Save changes</button>

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



                            <tr className="details" id={"-logoTab"} style={{background: "white"}}>
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

                            <tr className="details" id={"-textTab"} style={{background: "white"}}>
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