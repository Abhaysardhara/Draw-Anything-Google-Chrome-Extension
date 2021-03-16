/***
  * @author Abhay Sardhara
  * @email <abhaysardhara7675@gmail.com>
***/

var enabled = false;
var myButton = document.getElementById('toggle');
var undo = document.getElementById('undo');
var redo = document.getElementById('redo');
var setWidth = document.getElementById('setWidth');
var clear = document.getElementById('clear');
var black = document.getElementById('black');
var white = document.getElementById('white');
var orange = document.getElementById('orange');
var yellow = document.getElementById('amber');
var lime = document.getElementById('lime');
var teal = document.getElementById('teal');
var blue = document.getElementById('blue');
var indigo = document.getElementById('indigo');

function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].text == valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}

chrome.storage.local.get('enabled', data => {
    enabled = !!data.enabled;
    if(enabled) {
        myButton.style.backgroundColor = '#f44336'
    }
    else {
        myButton.style.backgroundColor = '#4CAF50'
    }
    myButton.textContent = enabled ? 'Disable' : 'Enable';
});

chrome.storage.local.get('stroke_width', data => {
    if(data.stroke_width) {
        setSelectedValue(setWidth, (data.stroke_weight).toString());
    }
    else {
        chrome.storage.local.set({stroke_weight : 2});
    }
});

myButton.onclick = () => {
    enabled = !enabled;
    if(enabled) {
        eraseEnable = false;
        myButton.style.backgroundColor = '#f44336'
        chrome.tabs.query({active: true}, (tabs) => {
            for(let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {msg: "start_draw"}, function(response) {});
            }  
        });
    }
    else {
        eraseEnable = false;
        myButton.style.backgroundColor = '#4CAF50'
        chrome.tabs.query({active: true}, (tabs) => {
            for(let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, {msg: "stop_draw"}, function(response) {});
            }
        });
    }
    myButton.textContent = enabled ? 'Disable' : 'Enable';
    chrome.storage.local.set({enabled : enabled});
    chrome.storage.local.set({stroke_weight : 2});
}

undo.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "undo"}, function(response) {});
    });
}

redo.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "redo"}, function(response) {});
    });
}

setWidth.addEventListener('change', () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "setWidth", width: setWidth.value}, function(response) {});
    });
    chrome.storage.local.set({stroke_weight : setWidth.value});
    setSelectedValue(setWidth, (setWidth.value).toString());
});

clear.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "clear"}, function(response) {});
    });
}

black.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "black"}, function(response) {});
    });
}

white.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "white"}, function(response) {});
    });
}

orange.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "orange"}, function(response) {});
    });
}

yellow.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "yellow"}, function(response) {});
    });
}

lime.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "lime"}, function(response) {});
    });
}

teal.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "teal"}, function(response) {});
    });
}

blue.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "blue"}, function(response) {});
    });
}


indigo.onclick = () => {
    chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {msg: "color_change", color: "indigo"}, function(response) {});
    });
}