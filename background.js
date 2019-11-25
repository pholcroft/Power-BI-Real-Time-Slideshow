chrome.browserAction.onClicked.addListener(function (tab) {

    chrome.storage.sync.set({ execute_trigger: 1 });

    /*
    chrome.storage.sync.get(
        "execute_trigger"
        ,
        function (items) {
            //begin_execution = items.execute_trigger;
            alert(items.execute_trigger);
        }
    );
    */
    
    chrome.tabs.executeScript(null,
        {
            code: "var link = location.href;" +
                "if (link.includes('ReportSection')){ alert('Real-Time Slideshow Mode Initialized!'); location.reload() } else {alert('Error: Please navigate to a Power BI Report URL.')};var lucar=5"
        });
    
});


chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { urlContains: 'app.powerbi' },
                }) ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});


