console.log("Extension background is running");

chrome.browserAction.onClicked.addListener(popupOnClick);
function popupOnClick() {
  console.log("Pop-up is triggered");
}

class Background {
  constructor() {
    let that = this;
    chrome.runtime.onConnect.addListener(function(port) {
      console.log("CONNECTED TO =>", port);

      if (port.name === "bgconnect") {
        port.onMessage.addListener(function(received) {
          console.log("Data received. Popup to background -> ", received);
          that.dispatcher(port, received);
        });
      }
    });
  }

  dispatcher(port, msg) {
    console.log("BG Dispatcher => ", msg);
    if (msg.method === "set") {
      let data = this.process(msg);
      port.postMessage({ name: "bgset", msg: data });
    }

    if (msg.method === "get") {
    }
  }

  process(msg) {
    return {
      name: msg.params.name + "[coming from BG]",
      phone: msg.params.phone + "[coming from BG]"
    };
  }
}

const bgc = new Background();
// console.log()
