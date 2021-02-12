import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import './AdminPanel.css';
const db = firebase.firestore();


class ContentAdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldTitle: ""
        };
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

    contentSubmitHandler = (event) => {
        event.preventDefault();
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
            });


        db.collection("pages").doc(localStorage.getItem("item")).set({
            title: title.innerText
        }, {merge: true})
            .then(() => {
                console.log("Content image successfully written!");
                if((this.state.oldTitle != "") && (this.state.oldTitle != title.innerText)){
                    this.setState({
                        oldTitle: title.innerText
                    })
                    window.location.reload(false);

                }

            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });


    }

    async componentDidMount() {
        var contentItemRef = await db.collection("pages").doc(localStorage.getItem("item"));
        contentItemRef.get()
            .then(async (docItem) => {

        var contentRef = await db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("title");
        contentRef.get()
            .then(async (doc) => {
                var contentImgRef = await db.collection("pages").doc(localStorage.getItem("item")).collection("style").doc("image");
                contentImgRef.get()
                    .then(async (docImg) => {
                        ReactDOM.render(
                            <div className="Admin-header">
                                <table className="ItemsTable">
                                    <thead>
                                    <tr>
                                        <th id="th-id">CONTENT</th>
                                    </tr>
                                    </thead>
                                    <tbody>










                                    <tr id="pageTab" className="tabRow" onClick={() => {
                                        var thisElement = document.getElementById("pageTab");
                                        var e = document.getElementById("-pageTab");
                                        if (e.style.display === 'table-row') {
                                            e.style.display = 'none';
                                            thisElement.style.border = 'none';
                                            thisElement.style.border = 'none';
                                        } else {
                                            e.style.display = 'table-row';
                                            thisElement.style.border = '2px solid black';
                                            e.style.border = '2px solid black';
                                            thisElement.style.borderBottom = 'none';
                                            e.style.borderTop = 'none';

                                        }
                                    }}>

                                        <td>Page</td>
                                    </tr>

                                    <tr className="details" id={"-pageTab"}>
                                        <td>
                                            <div className="slidecontainer">
                                                <button className="App-delete" id="Delete"
                                                        onClick={async () => {
                                                            if(window.confirm("Are you sure you want to delete this page?")) {
                                                                var itemId = localStorage.getItem("item");
                                                                console.log(itemId);
                                                                const res = await db.collection('pages').doc(itemId).delete();
                                                                localStorage.setItem("item", "main");
                                                                window.location.reload(false);
                                                            }
                                                        }}>Delete this page
                                                </button>





                                            </div>
                                        </td>

                                    </tr>











                                    <tr id="contentTab" className="tabRow" onClick={() => {
                                        var thisElement = document.getElementById("contentTab");
                                        var e = document.getElementById("-contentTab");
                                        if (e.style.display === 'table-row') {
                                            e.style.display = 'none';
                                            thisElement.style.border = 'none';
                                            thisElement.style.border = 'none';
                                        } else {
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

                                                <p className="Label">Page title:</p>
                                                <input type="text"
                                                       id="Title-pageTitle"
                                                       defaultValue={docItem.data().title}
                                                       name = "headerLogo"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           this.setState({
                                                               oldTitle: document.getElementById("Page-title").innerText
                                                           });
                                                           document.getElementById("Page-title").innerText = val;

                                                       }}
                                                />


                                                <p className="Label">Text size:</p>
                                                <input type="range" min="8" max="80" id="Title-textSize"
                                                       defaultValue={doc.data().fontSize.split("px")[0]}
                                                       name="fontSize"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-title").style.fontSize = val + "px";
                                                       }}
                                                />

                                                <p className="Label">Text margin:</p>
                                                <input type="range" min="0" max="100" id="Title-textMargin"
                                                       defaultValue={doc.data().margin.split("%")[0]}
                                                       name="textMargin"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-title").style.marginLeft = val + "%";
                                                       }}
                                                />
                                                <p className="Label">Text color:</p>
                                                <input type="color" id="pageTextColor" name="pageTextColor"
                                                       defaultValue={this.rgbToHex(doc.data().color)}
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-title").style.color = val;
                                                       }}
                                                />

                                                <button className="App-save" id="Save"
                                                        onClick={this.contentSubmitHandler}>Save content changes
                                                </button>


                                            </div>
                                        </td>

                                    </tr>


                                    <tr id="contentImgTab" className="tabRow" onClick={() => {
                                        var thisElement = document.getElementById("contentImgTab");
                                        var e = document.getElementById("-contentImgTab");
                                        if (e.style.display === 'table-row') {
                                            e.style.display = 'none';
                                            thisElement.style.border = 'none';
                                            thisElement.style.border = 'none';
                                        } else {
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
                                                       id="Image-height"
                                                       defaultValue={docImg.data().height.split("px")[0]}
                                                       name="fontSize"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("img").style.height = val + "px";
                                                       }}
                                                />

                                                <p className="Label">Image width:</p>
                                                <input type="range" min="20" max="1000"
                                                       id="Image-width"
                                                       defaultValue={docImg.data().width.split("px")[0]}
                                                       name="textMargin"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("img").style.width = val + "px";
                                                       }}
                                                />

                                                <p className="Label">Image float:</p>
                                                <button className="App-float" id="left"
                                                        onClick={(event) => {
                                                            event.target.style.backgroundColor = "#00b100";
                                                            document.getElementById("right").style.backgroundColor = "#9b9a9a";
                                                            document.getElementById("img").style.float = "left";
                                                        }}>Left
                                                </button>
                                                <button className="App-float" id="right"
                                                        onClick={(event) => {
                                                            event.target.style.backgroundColor = "#00b100";
                                                            document.getElementById("left").style.backgroundColor = "#9b9a9a";
                                                            document.getElementById("img").style.float = "right";
                                                        }}>Right
                                                </button>

                                                <button className="App-save" id="Save"
                                                        onClick={this.contentSubmitHandler}>Save content changes
                                                </button>


                                            </div>
                                        </td>

                                    </tr>

























                                    <tr id="textContentTab" className="tabRow" onClick={() => {
                                        var thisElement = document.getElementById("textContentTab");
                                        var e = document.getElementById("-textContentTab");
                                        if (e.style.display === 'table-row') {
                                            e.style.display = 'none';
                                            thisElement.style.border = 'none';
                                            thisElement.style.border = 'none';
                                        } else {
                                            e.style.display = 'table-row';
                                            thisElement.style.border = '2px solid black';
                                            e.style.border = '2px solid black';
                                            thisElement.style.borderBottom = 'none';
                                            e.style.borderTop = 'none';

                                        }


                                    }}>

                                        <td>Text content</td>
                                    </tr>

                                    <tr className="details" id={"-textContentTab"}>
                                        <td>
                                            <div className="slidecontainer">

                                                <button className="App-save" id="Save"
                                                        onClick={() => {
                                                            document.getElementById("sticky").style.height = "100%";
                                                        }}>Edit text
                                                </button>


                                                <p className="Label">Text size:</p>
                                                <input type="range" min="8" max="80" id="Title-textSize"
                                                       defaultValue={doc.data().fontSize.split("px")[0]}
                                                       name="fontSize"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-title").style.fontSize = val + "px";
                                                       }}
                                                />

                                                <p className="Label">Text margin:</p>
                                                <input type="range" min="0" max="100" id="Title-textMargin"
                                                       defaultValue={doc.data().margin.split("%")[0]}
                                                       name="textMargin"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-title").style.marginLeft = val + "%";
                                                       }}
                                                />
                                                <p className="Label">Text color:</p>
                                                <input type="color" id="pageTextColor" name="pageTextColor"
                                                       defaultValue={this.rgbToHex(doc.data().color)}
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-title").style.color = val;
                                                       }}
                                                />

                                                <button className="App-save" id="Save"
                                                        onClick={this.contentSubmitHandler}>Save content changes
                                                </button>


                                            </div>
                                        </td>

                                    </tr>
















                                    </tbody>

                                </table>

                            </div>,

                            document.getElementById("Content"))

                        if(document.getElementById("Image-height") != null){
                            if(docImg.data().float === "right"){
                                document.getElementById("right").style.backgroundColor = "#00b100";
                                document.getElementById("left").style.backgroundColor = "#9b9a9a";
                            }else{
                                document.getElementById("left").style.backgroundColor = "#00b100";
                                document.getElementById("right").style.backgroundColor = "#9b9a9a";
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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
            <div id="Content"></div>
        )
    }
}

export default ContentAdminPanel;