import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import "./index.css";

if (!document?.getElementById("root")) {
  const doc = document as any;
  const html = doc.firstElementChild;
  const currentHead = html.children[0];
  const body = doc.createElement("body");
  html.replaceChildren(currentHead);
  html.appendChild(body);
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    body
  );
  const removeBody = (tries = 0) => {
    setTimeout(() => {
      console.log(`[${tries}] timeout`)
      const secretBody = doc.firstElementChild.children[2];
      if (secretBody) {
        doc.firstElementChild.removeChild(secretBody);
      } else if (tries < 5){
        removeBody(tries + 1);
      }
    });
  }
  removeBody();
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}


// setTimeout(() => {
//   window.receiveCustomMsg("scrollToTop");
// }, 2000)

// (window.parent as any).postmessage("teste salve cpx", "data ponto com");
// window.parent.postMessage("teste mensagem", "bah nehhh");
// window.onmessage = (event) => {
//   console.log("bah chegou uma mesagem ne", event);
// }

// (window as any).receiveCustomMessage = (event: any) => {
//   console.log("nao acredito acho que foi *-*", event);
// }