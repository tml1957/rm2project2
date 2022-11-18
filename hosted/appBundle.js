(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("userMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,o)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),c=await n.json();document.getElementById("userMessage").classList.add("hidden"),c.redirect&&(window.location=c.redirect),c.error&&t(c.error),o&&o(c)},hideError:()=>{document.getElementById("userMessage").classList.add("hidden")}}}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,a),c.exports}(()=>{a(603);const e=e=>React.createElement("body",null,React.createElement("canvas",{id:"mainCanvas",width:"700",height:"500"},"Get a real browser!"),React.createElement("div",{id:"controls"},React.createElement("label",null,"Tool:",React.createElement("select",{id:"toolChooser"},React.createElement("option",{value:"toolPencil"},"Pencil"))),React.createElement("label",null,"Line Width:",React.createElement("select",{id:"lineWidthChooser"},React.createElement("option",{value:"1"},"1"),React.createElement("option",{value:"2"},"2"),React.createElement("option",{value:"3",selected:!0},"3"),React.createElement("option",{value:"4"},"4"),React.createElement("option",{value:"5"},"5"),React.createElement("option",{value:"6"},"6"),React.createElement("option",{value:"7"},"7"),React.createElement("option",{value:"8"},"8"),React.createElement("option",{value:"9"},"9"),React.createElement("option",{value:"10"},"10"))),React.createElement("span",null,React.createElement("input",{id:"clearButton",type:"button",value:"Clear"})),React.createElement("span",null,React.createElement("input",{id:"exportButton",type:"button",value:"Export"})))),t=e=>{if(0===e.domos.length)return React.createElement("div",{className:"domoList"},React.createElement("h3",{className:"emptyDomo"},"No Domos Yet!"));const t=e.domos.map((e=>{let t;return console.log(e),t="green"===e.color?"/assets/img/greendomoface.jpg":"pink"===e.color?"/assets/img/pinkdomoface.jpg":"/assets/img/domoface.jpeg",React.createElement("div",{key:e._id,className:"domo"},React.createElement("img",{src:t,alt:"domo face",className:"domoFace"}),React.createElement("h3",{className:"domoName"},"Name: ",e.name," "),React.createElement("h3",{className:"domoAge"},"Age: ",e.age," "))}));return React.createElement("div",{className:"domoList"},t)};window.onload=async()=>{const a=await fetch("/getToken"),o=await a.json();ReactDOM.render(React.createElement(e,{csrf:o.csrfToken}),document.getElementById("makeDomo")),ReactDOM.render(React.createElement(t,{domos:[]}),document.getElementById("domos")),(async()=>{const e=await fetch("/getDomos"),a=await e.json();console.log(a),ReactDOM.render(React.createElement(t,{domos:a.domos}),document.getElementById("domos"))})()}})()})();