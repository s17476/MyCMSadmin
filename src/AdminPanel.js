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

    menuSubmitHandler = (event) => {
        event.preventDefault();
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
            });

    }


    contentSubmitHandler = (event) => {
        event.preventDefault();
        let title = document.getElementById("Page-title");
        db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("title").set({
            color: title.style.color,
            fontSize: title.style.fontSize,
            margin: title.style.marginLeft
        },{ merge: true })
            .then(() => {
                console.log("Content title successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

        let img = document.getElementById("img");
        db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("image").set({
            width: img.style.width,
            height: img.style.height
        },{ merge: true })
            .then(() => {
                console.log("Content image successfully written!");
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
                                        <input type="range" min="50" max="300"
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
                                        <input type="range" min="50" max="700"
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
                                    thisElement.style.border = '2px solid black';
                                    e.style.border = '2px solid black';
                                    thisElement.style.borderBottom = 'none';
                                    e.style.borderTop = 'none';

                                }
                            }}>




















                                <td>Menu</td>
                            </tr>

                            <tr className="details" id={"-menuTab"}>
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

                                        <button className="App-save" id="Save" onClick={this.menuSubmitHandler}>Save menu changes</button>


                                    </div>
                                </td>

                            </tr>

                            </tbody>






                        </table>

                    </div>,
                    document.getElementById("Admin-menu")
                );
            })
            .catch((error) => {
                console.log(error);
            });






        var contentRef = await db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("title");
        contentRef.get()
            .then(async (doc) => {
                var contentRef = await db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("image");
                contentRef.get()
                    .then((docImg) => {


                ReactDOM.render(
                    <div className="Admin-header">
                        <table className="ItemsTable">
                            <thead>
                            <tr>
                                <th id="th-id">CONTENT</th>
                            </tr>
                            </thead>
                            <tbody>


                            <tr id="contentTab" className="tabRow" onClick={() => {
                                var thisElement = document.getElementById("contentTab");
                                var e = document.getElementById("-contentTab");
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

                            <tr className="details" id={"-contentTab"}>
                                <td>
                                    <div className="slidecontainer">

                                        <p className="Label">Text size:</p>
                                        <input type="range" min="8" max="80"
                                               defaultValue={doc.data().fontSize.split("px")[0]}
                                               name = "fontSize"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("Page-title").style.fontSize = val+"px";
                                               }}
                                        />

                                        <p className="Label">Text margin:</p>
                                        <input type="range" min="0" max="100"
                                               defaultValue={doc.data().margin.split("%")[0]}
                                               name = "textMargin"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("Page-title").style.marginLeft = val+"%";
                                               }}
                                        />
                                        <p className="Label">Text color:</p>
                                        <input type="color" id="pageTextColor" name="pageTextColor" defaultValue={this.rgbToHex(doc.data().color)}
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("Page-title").style.color = val;
                                               }}
                                        />

                                        <button className="App-save" id="Save" onClick={this.contentSubmitHandler}>Save content changes</button>


                                    </div>
                                </td>

                            </tr>








                            <tr id="contentImgTab" className="tabRow" onClick={() => {
                                var thisElement = document.getElementById("contentImgTab");
                                var e = document.getElementById("-contentImgTab");
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

                                <td>Image</td>
                            </tr>

                            <tr className="details" id={"-contentImgTab"}>
                                <td>
                                    <div className="slidecontainer">

                                        <p className="Label">Image height:</p>
                                        <input type="range" min="20" max="1000"
                                               defaultValue={docImg.data().height.split("px")[0]}
                                               name = "fontSize"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("img").style.height = val+"px";
                                               }}
                                        />

                                        <p className="Label">Image width:</p>
                                        <input type="range" min="20" max="1000"
                                               defaultValue={docImg.data().width.split("px")[0]}
                                               name = "textMargin"
                                               onChange={(event) => {
                                                   let val = event.target.value;
                                                   document.getElementById("img").style.width = val+"px";
                                               }}
                                        />


                                        <button className="App-save" id="Save" onClick={this.contentSubmitHandler}>Save content changes</button>


                                    </div>
                                </td>

                            </tr>

                            </tbody>

                        </table>

                    </div>,
                    document.getElementById("Admin-content")
                );
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });














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