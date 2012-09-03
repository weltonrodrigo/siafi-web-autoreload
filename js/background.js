var active = {};
var saved = {};

function setIcon(tab){
    var icon = active[tab.id]? 'on': 'off';

    chrome.pageAction.setIcon({
        'path': 'icons/' + icon + '.png',
        'tabId': tab.id
    }
    )
}

function setTitle(tab){
	var title = active[tab.id]? 'Deixa descer': 'Puxa o freio de mão';

	chrome.pageAction.setTitle({
		'title': title, 
		'tabId': tab.id
	}
	)
}

function check(tab_id, data, tab){
    if ( tab.url.match(/siafi2012/) ) {
        chrome.pageAction.show(tab_id);

        // Initialize with a valid value.
        active[tab_id] = active[tab_id] || false;
        setIcon(tab);
    }
}

function clicked(tab){
    var icon;

    // Swap activation.
    active[tab.id] = active[tab.id]? false : true;

    // Set icon.
    setIcon(tab);

    // Set title.
    setTitle(tab);

    console.log('clicked: active[' + tab.id + ']= ' + active[tab.id]);
}

// Informs content_script if it Is authorized to reload.
function autorizer(request, sender, sendResponse){
    sendResponse({'data': active[sender.tab.id]});
}

// Save the text requested by content_script for later retrieval
// (usually a command user has entered on the text field used
// to reload the page)
function saver(request, sender, sendResponse){
    saved[sender.tab.id] = request.data;
}
function getter(request, sender, sendResponse){
    sendResponse({'data': saved[sender.tab.id]});
}

function dispatcher(request, sender, sendResponse){
    switch(request.cmd){
        case 'autorize': autorizer(request, sender, sendResponse);
                         break;
        case 'saveText': saver(request, sender, sendResponse);
                         break;
        case 'getText' : getter(request, sender, sendResponse);
                         break;
    }
}

chrome.tabs.onUpdated.addListener(check);
chrome.pageAction.onClicked.addListener(clicked);
chrome.extension.onMessage.addListener(dispatcher);
