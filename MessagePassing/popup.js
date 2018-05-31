// var port = chrome.runtime.connect({ name: "bgconnect" });
// port.onMessage.addListener(function(msg) {
//   console.log("from background -> ", msg);
// });

let port = chrome.runtime.connect({ name: "bgconnect" });

class Popup {
  constructor() {
    let that = this;
    port.onMessage.addListener(function(bgmsg) {
      console.log(`From background -> ${JSON.stringify(bgmsg)}`);
      that.dispatcher(port, bgmsg);
    });
  }

  dispatcher(port, msg) {
    console.log("BG Dispatcher => ", msg);
    if (msg.name === "bgset") {
      console.log(
        `Hello ${msg.msg.name}. Hope you like your phone ${msg.msg.phone}`
      );
      //...
      document.getElementById("msgid").innerText = `Hello ${
        msg.msg.name
      }. Hope you like your phone ${msg.msg.phone}`;
    }

    if (msg.method === "get") {
    }
  }

  send() {
    var msg = { name: "Sam", phone: "S8" };
    port.postMessage({ method: "set", params: msg });

    // let x = port.postMessage({
    //   method: "get",
    //   params: { key: "name" }
    // });
  }
}

const puc = new Popup();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", puc.send);
  console.log("Button clicked");
});
