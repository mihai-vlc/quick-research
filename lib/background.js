if(localStorage['open'] != 1)
	chrome.browserAction.setPopup({'popup' : 'pop.html'});

if(!localStorage['tabs'])
    localStorage['tabs'] = JSON.stringify([0,1,2,3,4]);

if(!localStorage['suggest-lg'])
    localStorage['suggest-lg'] = 'en';

chrome.browserAction.onClicked.addListener(function(tab) { 
		chrome.windows.create({'url': 'pop.html', 'type': 'popup'});
});


chrome.contextMenus.create({
	"title" : "Copy link address",
	"onclick" : function(info, tab) {
		qr_copyToClipboard(info.linkUrl);
	},
	"contexts" : ["link"]
});


function update_notice() {
    if (localStorage.getItem('update_time_1_2'))
        return;

    localStorage.setItem('update_time_1_2', 1);
    chrome.tabs.create({url: "changelog.html"});
}
update_notice();

function qr_copyToClipboard( text ){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}
