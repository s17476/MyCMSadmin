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
            title: title.innerText,
            text: document.getElementById("Page-text").innerHTML,
            image: document.getElementById("Admin-img").value
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
            });

        document.getElementById("Page-text").setAttribute("contenteditable", "false");
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
                                            thisElement.style.border = '2px solid #3662d9';
                                            e.style.border = '2px solid #3662d9';
                                            thisElement.style.borderBottom = 'none';
                                            e.style.borderTop = 'none';

                                        }
                                    }}>

                                        <td>Page</td>
                                    </tr>






                                    <tr className="details" id={"-pageTab"} onMouseEnter={event => event.target.style.backgroundColor = "white"}>
                                        <td>
                                            <div className="slidecontainer">
                                                <button className="App-add" id="AddPage"
                                                        onClick={async () => {
                                                            var newPage = window.prompt("New page title: ");
                                                            if (newPage == null || newPage == "") {
                                                                console.log("User cancelled the prompt.");
                                                            } else {
                                                                await db.collection("pages").doc(newPage).set({
                                                                    image: "data:image/png;base64,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",
                                                                    text: "This is your new page",
                                                                    title: newPage

                                                                }, {merge: true})
                                                                    .then(() => {
                                                                        console.log("New page successfully added!");

                                                                    })
                                                                    .catch((error) => {
                                                                        console.error("Error writing document: ", error);
                                                                    });

                                                                await db.collection("pages").doc(newPage).collection("style").doc("image").set({
                                                                    float: "left",
                                                                    height: "200px",
                                                                    width: "200px"
                                                                }, {merge: true})
                                                                    .then(() => {
                                                                        console.log("New page successfully added!");

                                                                    })
                                                                    .catch((error) => {
                                                                        console.error("Error writing document: ", error);
                                                                    });


                                                                await db.collection("pages").doc(newPage).collection("style").doc("text").set({
                                                                    color: "#055dff",
                                                                    fontSize: "30",
                                                                    margin: "0"
                                                                }, {merge: true})
                                                                    .then(() => {
                                                                        console.log("New page successfully added!");

                                                                    })
                                                                    .catch((error) => {
                                                                        console.error("Error writing document: ", error);
                                                                    });



                                                                await db.collection("pages").doc(newPage).collection("style").doc("title").set({
                                                                    color: "rgb(30, 150, 200)",
                                                                    fontSize: "54px",
                                                                    margin: "30%"
                                                                }, {merge: true})
                                                                    .then(() => {
                                                                        console.log("New page successfully added!");

                                                                    })
                                                                    .catch((error) => {
                                                                        console.error("Error writing document: ", error);
                                                                    });


                                                                //localStorage.setItem("item", newPage);
                                                                window.location.reload(false);
                                                            }




                                                        }}>Add new page
                                                </button>





                                            </div>




                                            <div className="slidecontainer">
                                                <button className="App-delete" id="Delete"
                                                        onClick={async () => {
                                                            if(localStorage.getItem("item") === "main" ||
                                                                localStorage.getItem("item") === "Products"){
                                                                window.alert("Home and  products page can not be deleted!");
                                                                return;
                                                            }
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
                                            thisElement.style.border = '2px solid #3662d9';
                                            e.style.border = '2px solid #3662d9';
                                            thisElement.style.borderBottom = 'none';
                                            e.style.borderTop = 'none';

                                        }
                                    }}>

                                        <td>Title</td>
                                    </tr>

                                    <tr className="details" id={"-contentTab"} onMouseEnter={event => event.target.style.backgroundColor = "white"}>
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
                                                <input type="range" min="0" max="80" id="Title-textMargin"
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
                                            thisElement.style.border = '2px solid #3662d9';
                                            e.style.border = '2px solid #3662d9';
                                            thisElement.style.borderBottom = 'none';
                                            e.style.borderTop = 'none';

                                        }
                                    }}>

                                        <td>Image</td>
                                    </tr>

                                    <tr className="details" id={"-contentImgTab"} onMouseEnter={event => event.target.style.backgroundColor = "white"}>
                                        <td>
                                            <div className="slidecontainer">

                                                <p className="Label">Page image url:</p>
                                                <input type="text"
                                                       id="Admin-img"
                                                       name = "headerLogo"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("img").src = val;
                                                       }}
                                                />


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
                                                <input type="range" min="20" max="2000"
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
                                            thisElement.style.border = '2px solid #3662d9';
                                            e.style.border = '2px solid #3662d9';
                                            thisElement.style.borderBottom = 'none';
                                            e.style.borderTop = 'none';

                                        }


                                    }}>

                                        <td>Text content</td>
                                    </tr>

                                    <tr className="details" id={"-textContentTab"} onMouseEnter={event => event.target.style.backgroundColor = "white"}>
                                        <td>
                                            <div className="slidecontainer">

                                                <button className="App-save" id="Edit-Text"
                                                        onClick={() => {
                                                            document.getElementById("Page-text").setAttribute("contenteditable", "true");
                                                        }}>Edit text
                                                </button>

                                                <button className="App-textEdit" id="Bold"
                                                        onClick={() => {
                                                            document.execCommand("bold");
                                                        }}><b>Bold</b>
                                                </button>
                                                <button className="App-textEdit" id="Italic"
                                                        onClick={() => {
                                                            document.execCommand("italic");
                                                        }}><i>Italic</i>
                                                </button>
                                                <button className="App-textEdit" id="Underline"
                                                        onClick={() => {
                                                            document.execCommand("underline");
                                                        }}><u>Underscore</u>
                                                </button>



                                                <p className="Label">Text size:</p>
                                                <input type="range" min="4" max="46" id="Content-textSize"

                                                       name="fontSize"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-text").style.fontSize = val + "px";
                                                       }}
                                                />

                                                <p className="Label">Text margin:</p>
                                                <input type="range" min="0" max="35" id="Content-textMargin"

                                                       name="textMargin"
                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-text").style.paddingLeft = val + "%";
                                                           document.getElementById("Page-text").style.paddingRight = val + "%";
                                                       }}
                                                />
                                                <p className="Label">Text color:</p>
                                                <input type="color" id="Content-textColor" name="pageTextColor"

                                                       onChange={(event) => {
                                                           let val = event.target.value;
                                                           document.getElementById("Page-text").style.color = val;
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