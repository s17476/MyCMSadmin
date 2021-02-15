import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import './AdminPanel.css';
import ContentAdminPanel from "./ContentAdminPanel";
import {render} from "@testing-library/react";
const db = firebase.firestore();

class MenuAdminPanel extends React.Component {



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
        var headerRef = await db.collection("header").doc("menu");
        headerRef.get()
            .then((doc) => {
                ReactDOM.render(
                    <div className="Admin-header">
                        <table className="ItemsTable">
                            <thead>
                            <tr>
                                <th id="th-id">MENU</th>
                            </tr>
                            </thead>
                            <tbody>


                            <tr id="menuTab" className="tabRow" onClick={() => {
                                var thisElement = document.getElementById("menuTab");
                                var e = document.getElementById("-menuTab");
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




















                                <td>Menu</td>
                            </tr>

                            <tr className="details" id={"-menuTab"} style={{background: "white"}}>
                                <td>
                                    <div className="slidecontainer">

                                        <p className="Label">Text size:</p>
                                        <input type="range" min="3" max="50"
                                               defaultValue={doc.data().fontSize.split("px")[0]}
                                               name = "fontSize"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   var menuItems = document.getElementsByClassName("App-nav-item");

                                                   Array.from(menuItems).forEach((item) => {
                                                       item.style.fontSize = val+"px";

                                                   });
                                               }}
                                        />

                                        <p className="Label">Text margin:</p>
                                        <input type="range" min="0" max="30"
                                               defaultValue={doc.data().margin.split("px")[0]}
                                               name = "textMargin"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   var menuItems = document.getElementsByClassName("App-nav-item");

                                                   Array.from(menuItems).forEach((item) => {
                                                       item.style.padding = val+"px";

                                                   });
                                               }}
                                        />
                                        <p className="Label">Text color:</p>
                                        <input type="color" id="menuColor" name="menuColor" defaultValue={this.rgbToHex(doc.data().textColor)}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   var menuItems = document.getElementsByClassName("App-nav-item");

                                                   Array.from(menuItems).forEach((item) => {
                                                       item.style.color = val;
                                                       document.getElementById(item.id).onmouseleave= () => {
                                                           item.style.color = val;
                                                           item.style.backgroundColor = document.getElementById("menuBackground").value;
                                                       };
                                                   });
                                               }}
                                        />
                                        <p className="Label">Background:</p>
                                        <input type="color" id="menuBackground" name="menuBackground" defaultValue={this.rgbToHex(doc.data().backgroundColor)}
                                               onChange={(event) => {
                                                   let val = event.target.value;

                                                   document.getElementById("navbar").style.backgroundColor = val;
                                                   //document.getElementById("productNavbar").style.backgroundColor = val;
                                                   var menuItems = document.getElementsByClassName("App-nav-item");

                                                   Array.from(menuItems).forEach((item) => {
                                                       item.style.backgroundColor = val;
                                                       document.getElementById(item.id).onmouseleave= () => {
                                                           item.style.color = document.getElementById("menuColor").value;
                                                           item.style.backgroundColor = val;
                                                       };
                                                   });

                                               }}
                                        />


                                        <p className="Label">Hover text color:</p>
                                        <input type="color" id="hoverMenuColor" name="menuColor" defaultValue={doc.data().hoverColor}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   var menuItems = document.getElementsByClassName("App-nav-item");

                                                   Array.from(menuItems).forEach((item) => {
                                                       document.getElementById(item.id).onmouseenter= () => {
                                                           item.style.color = val;
                                                           item.style.backgroundColor = document.getElementById("hoverMenuBackground").value;
                                                       };
                                                   });
                                               }}
                                        />
                                        <p className="Label">Hover background:</p>
                                        <input type="color" id="hoverMenuBackground" name="menuBackground" defaultValue={doc.data().hoverBackgroundColor}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   var menuItems = document.getElementsByClassName("App-nav-item");

                                                   Array.from(menuItems).forEach((item) => {
                                                       document.getElementById(item.id).onmouseenter= () => {
                                                           item.style.color = document.getElementById("hoverMenuColor").value;
                                                           item.style.backgroundColor = val;

                                                       };
                                                   });
                                               }}
                                        />




                                    </div>
                                </td>

                            </tr>

                            </tbody>






                        </table>

                    </div>,
                    document.getElementById("Menu")
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return(
            <div id="Menu"></div>
        )
    }
}



export default MenuAdminPanel;