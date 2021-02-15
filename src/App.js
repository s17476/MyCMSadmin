import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
        products: []
    };
      localStorage.setItem("product", "false");
      localStorage.setItem("item", "main");
  }

  componentDidUpdate(){
      //open main page onLoad
      if((document.getElementById("main") != null) && (this.state.loaded === false)){
          document.getElementById("main").click();
          localStorage.setItem("product", "false");
          localStorage.setItem("item", "main");
          this.setState({
              loaded: true
          })
      }
      localStorage.setItem("product", "false");
      document.getElementById("Products")
          .addEventListener('mouseenter', () => document.getElementById("productNavbar")
              .style.visibility = "visible");


      window.addEventListener("click", async() => {
          document.getElementById("productNavbar")
              .style.visibility = "hidden"
      });

      document.getElementById("Products", () => {
          localStorage.setItem("product", "true");
      });
  }

  async componentDidMount() {
    var items = [];
    var products = [];



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


      //load products menu and products
      var productsRef = await db.collection("pages").doc("Products").collection("pages");
      productsRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {

              products.push([doc.id, doc.data()]);
          })
          this.setState({
              products: products
          });

      });

      //load menu style propeteries
      var menuRef = await db.collection("header").doc("menu");
      menuRef.get()
          .then((doc) => {
              var menu = document.getElementById("navbar");
              var productMenu = document.getElementById("productNavbar");

              var menuItems = document.getElementsByClassName("App-nav-item");

              var backgroundColor = doc.data().backgroundColor;
              var color = doc.data().textColor;
              var margin = doc.data().margin;
              var fontSize = doc.data().fontSize;
              var hoverColor = doc.data().hoverColor;
              var hoverBackgroundColor = doc.data().hoverBackgroundColor;

              menu.style.backgroundColor = backgroundColor;
              productMenu.style.backgroundColor = backgroundColor;

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

  async setItemId(item){
      this.setState({
          currentItem: item
      });
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async clickHandler(item){
//image CSS
        localStorage.setItem("item", item[0]);
        await this.setItemId(item);
        localStorage.setItem("oldTitle", item[1].title);
        if(localStorage.getItem("item") === "Products"){
           // document.getElementById("productNavbar").style.display = "block";
            localStorage.setItem("product", "true");
            console.log("ON     ON     ON     ON   products  ");
        }

        else{
            //document.getElementById("productNavbar").style.display = "none";
            localStorage.setItem("product", "false");
            console.log("OFF     OFF     OFF     OFF     OFF     OFF     OFF     ");
        }




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

                if(document.getElementById("Image-height") != null){
                    document.getElementById("Image-height").value = imgHeight.split("px")[0];
                    document.getElementById("Image-width").value = imgWidth.split("px")[0];
                    if(imgFloat === "right"){
                        document.getElementById("right").style.backgroundColor = "#00b100";
                        document.getElementById("left").style.backgroundColor = "#9b9a9a";
                    }else{
                        document.getElementById("left").style.backgroundColor = "#00b100";
                        document.getElementById("right").style.backgroundColor = "#9b9a9a";
                    }
                }


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

                if(document.getElementById("pageTextColor") != null){
                    document.getElementById("pageTextColor").value = this.rgbToHex(color);
                    document.getElementById("Title-textSize").value = fontSize.split("px")[0];
                    document.getElementById("Title-textMargin").value = margin.split("%")[0];
                    document.getElementById("Title-pageTitle").value = item[1].title;

                }

            }).catch((error) => {
                console.log(error);
            });


        let textColor, textFontSize, textMargin;
        await db.collection("pages")
            .doc(item[0])
            .collection("style")
            .doc("text")
            .get()
            .then((doc) => {
                textColor = doc.data().color;
                textFontSize = doc.data().fontSize;
                textMargin = doc.data().margin;

                if(document.getElementById("Content-textSize") != null){
                    document.getElementById("Content-textSize").value = textFontSize.split("px")[0];
                    document.getElementById("Content-textMargin").value = textMargin.split("%")[0];
                    document.getElementById("Content-textColor").value = textColor;






                }

            }).catch((error) => {
                console.log(error);
            });





        //build
        localStorage.setItem("item", item[0]);
        ReactDOM.render(
            <div className="App-page" id="Page">
                <h1 id="Page-title" style={{
                    color: color,
                    fontSize: fontSize,
                    margin: "5px",
                    marginLeft: margin,
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
                <p id="Page-text" style={{

                }}></p>
            </div>
            ,document.getElementById("Body"));
        document.getElementById("Page-text").setAttribute("contenteditable", "false");
        document.getElementById("Page-text").innerHTML = item[1].text;
        document.getElementById("Page-text").style.fontSize = textFontSize+"px";
        document.getElementById("Page-text").style.margin = textMargin+"%";
        document.getElementById("Page-text").style.color = textColor;

        document.getElementById("Admin-img").value = item[1].image;


// sorting menu
    var tab = this.state.items;
    var sorted = [];
    for(var i = 0; i < tab.length; i++){
        if(tab[i][0] === "main") {
            sorted.push(tab[i]);
            tab[i] = null;
            for (var j = 0; j < tab.length; j++) {
                if ((tab[j] != null) && (tab[j][0] === "Products")) {
                    sorted.push(tab[j]);
                    tab[j] = null;
                    for(var k = 0; k < tab.length; k++)
                        if(tab[k] != null)
                            sorted.push(tab[k]);
                    j=tab.length;
                }
            }
            i = tab.length;
        }
    }
    this.setState({
        items: sorted
    })

    }

    //products click handler ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async productClickHandler(item){
//image CSS
        localStorage.setItem("item", item[0]);
        await this.setItemId(item);
        localStorage.setItem("oldTitle", item[1].title);

 //       if((localStorage.getItem("item") === "Products") || (localStorage.getItem("product") === "true")){
 //           document.getElementById("productNavbar").style.display = "block";
            localStorage.setItem("product", "true");
            console.log("ON     ON     ON     ON     ");
  //      }

   //     else{
   //         document.getElementById("productNavbar").style.display = "none";
   //         localStorage.setItem("product", "false");
   //         console.log("OFF     OFF     OFF     OFF     OFF     OFF     OFF czemu     ");
    //    }

        let imgWidth, imgHeight, imgFloat;
        await db.collection("pages")
            .doc("Products")
            .collection("pages")
            .doc(item[0])
            .collection("style")
            .doc("image")
            .get()
            .then((doc) => {
                imgWidth = doc.data().width;
                imgHeight = doc.data().height;
                imgFloat = doc.data().float;

                if(document.getElementById("Image-height") != null){
                    document.getElementById("Image-height").value = imgHeight.split("px")[0];
                    document.getElementById("Image-width").value = imgWidth.split("px")[0];
                    if(imgFloat === "right"){
                        document.getElementById("right").style.backgroundColor = "#00b100";
                        document.getElementById("left").style.backgroundColor = "#9b9a9a";
                    }else{
                        document.getElementById("left").style.backgroundColor = "#00b100";
                        document.getElementById("right").style.backgroundColor = "#9b9a9a";
                    }
                }


            }).catch((error) => {
                console.log(error);
            });

        let color, fontSize, margin;
        await db.collection("pages")
            .doc("Products")
            .collection("pages")
            .doc(item[0])
            .collection("style")
            .doc("title")
            .get()
            .then((doc) => {
                color = doc.data().color;
                fontSize = doc.data().fontSize;
                margin = doc.data().margin;

                if(document.getElementById("pageTextColor") != null){
                    document.getElementById("pageTextColor").value = this.rgbToHex(color);
                    document.getElementById("Title-textSize").value = fontSize.split("px")[0];
                    document.getElementById("Title-textMargin").value = margin.split("%")[0];
                    document.getElementById("Title-pageTitle").value = item[1].title;
                }

            }).catch((error) => {
                console.log(error);
            });


        let textColor, textFontSize, textMargin;
        await db.collection("pages")
            .doc("Products")
            .collection("pages")
            .doc(item[0])
            .collection("style")
            .doc("text")
            .get()
            .then((doc) => {
                textColor = doc.data().color;
                textFontSize = doc.data().fontSize;
                textMargin = doc.data().margin;

                if(document.getElementById("Content-textSize") != null){
                    document.getElementById("Content-textSize").value = textFontSize.split("px")[0];
                    document.getElementById("Content-textMargin").value = textMargin.split("%")[0];
                    document.getElementById("Content-textColor").value = textColor;






                }

            }).catch((error) => {
                console.log(error);
            });





        //build

        ReactDOM.render(

            <div className="App-page" id="Page">
                <h1 id="Page-title" style={{
                    color: color,
                    fontSize: fontSize,
                    margin: "5px",
                    marginLeft: margin,
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
                <p id="Page-text" style={{

                }}></p>
            </div>
            ,document.getElementById("Body"));
        document.getElementById("Page-text").setAttribute("contenteditable", "false");
        document.getElementById("Page-text").innerHTML = item[1].text;
        document.getElementById("Page-text").style.fontSize = textFontSize+"px";
        document.getElementById("Page-text").style.margin = textMargin+"%";
        document.getElementById("Page-text").style.color = textColor;

        console.log(document.getElementById("Admin-img").value);


        document.getElementById("Admin-img").value = item[1].image;











    }






  render(){



    return (

            <div className="App" id="App">

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

                    <div className="App-nav" id="productNavbar" style={{visibility: "hidden"}}>
                        {this.state.products.map(product => {

                                console.log("local storage ", product[0]);

                                return (
                                    <ul>

                                    <li>
                                        <a className="App-nav-item" id={product[0]} style={{width: "100%", display:"inline"}} onClick={async () => {
                                            await this.productClickHandler(product);

                                        }}>{product[1].title}</a>

                                        </li>
                                    </ul>
                                )

                        })}

                    </div>
                    <div className="App-body" id="Body">
                    </div>



            </div>




    );

  }

}

export default App;
