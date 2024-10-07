
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url) {
        if (changeInfo.url.startsWith('chrome://') || changeInfo.url.startsWith('chrome-extension://') || changeInfo.url.startsWith('https://chrome.google.com/webstore')) {
            chrome.action.setBadgeText({text: 'OFF'});
            chrome.action.setBadgeBackgroundColor({color: 'white'});
            return; 
        }
        else if(changeInfo.url.startsWith("https://www.youtube.com/watch?")){
            chrome.action.setBadgeText({text: 'ON'});
            chrome.action.setBadgeBackgroundColor({color: '#28a691'});
            chrome.tabs.reload(tabId);
        }
        else{
            chrome.action.setBadgeText({text: 'OFF'});
            chrome.action.setBadgeBackgroundColor({color: 'white'});
        }
    }
});

chrome.tabs.onActivated.addListener((changeInfo)=>{
    chrome.tabs.get(changeInfo.tabId).then((result)=>{
        if(result.url?.startsWith("https://www.youtube.com/watch?")){
            chrome.action.setBadgeText({text: 'ON'});
            chrome.action.setBadgeBackgroundColor({color: '#28a691'});
        }
        else{
            chrome.action.setBadgeText({text: 'OFF'});
            chrome.action.setBadgeBackgroundColor({color: 'white'});
        }
    });
})

