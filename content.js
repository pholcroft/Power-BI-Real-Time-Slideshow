var importModeDOMChangedWaitTime = 2;
var extensionName = "Power BI Real-Time Slideshow";
var connectivityMode;
var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;

/*
For Jquery Mutation Summary Root Node, use $("div.quickAccessPanePlaceHolder")
e.g. $("div.quickAccessPanePlaceHolder").mutationSummary("connect", callback, [{ all: true }])
*/

/*
 For Jquery Mutation Summary Root Node when navigating from dataset Settings page back to report page, use $("title")
 e.g. $("title").mutationSummary("connect", callback, [{ all: true }])
 */


function ImportRefresh() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    setTimeout(function () {

        // Show hidden list elements on the quick access navigation pane.
        $("li").show();

        // Filter navigation pane's DOM to Dataset list.
        var $datasetItems = $("button.headerButton[aria-label='Datasets']").next();

        // Dynamically find the list item corresponding to the currently opened report.
        var $datasetName = $datasetItems.find("li.item.ng-star-inserted[title='" + reportTitle + "']");

        // Find the ellipsis button corresponding to the list item.
        var $datasetEllipsisButton = $datasetName.find("button.mat-menu-trigger.openMenu");
        // Click the ellipsis button to load the popup menu.
        $datasetEllipsisButton.click();

        setTimeout(function () {

            console.log("Dataset Ellipsis Button Clicked. Proceeding to Refresh.");
             
            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content").find("button");

            // Find the dataset's Refresh Button.
            var $refreshButton = $matMenuButtons.find("span:contains('Refresh now')").parent();
            // Click the Refresh Button.
            $refreshButton.click();

            console.log("Refreshed. Closing popup menu.")

        }, 4000);

    }, importModeDOMChangedWaitTime * 1000)

}


function DetermineConnectivityMode() {
//window.onload = function () {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    console.log("Expanding quick access navigation pane.");

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    setTimeout(function () {

        console.log(">>> Navigating to dataset's Settings page.");

        // Show hidden list elements on the quick access navigation pane.
        $("li").show();

        // Filter navigation pane's DOM to Dataset list.
        var $datasetItems = $("button.headerButton[aria-label='Datasets']").next();

        // Dynamically find the list item corresponding to the currently opened report.
        var $datasetName = $datasetItems.find("li.item.ng-star-inserted[title='" + reportTitle + "']");

        // Find the ellipsis button corresponding to the list item.
        var $datasetEllipsisButton = $datasetName.find("button.mat-menu-trigger.openMenu");
        // Click the ellipsis button to load the popup menu.
        $datasetEllipsisButton.click();

        setTimeout(function () {

            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content").find("button");

            // Find the dataset's Refresh Button.
            var $settingsButton = $matMenuButtons.find("span:contains('Settings')").parent();

            // Click the Refresh Button.
            $settingsButton.click();

            setTimeout(function () {

                $importCheck = $("span.refreshSectionTitle:contains('Scheduled refresh')");
                $directQueryCheck = $("span.refreshSectionTitle:contains('Scheduled cache refresh')");

                if ($importCheck.length) {
                    console.log("Connectivity Mode Determined: Import. \n>>> Navigating back to the report.");
                    chrome.storage.sync.set(
                        { connectivityMode: "Import" },
                        function () {
                            setTimeout(function () {
                                window.history.back();

                                setTimeout(function () {
                                    location.reload();
                                }, 5000);

                            }, 5000);
                        }
                    );
                }
                else if ($directQueryCheck.length) {
                    console.log("Connectivity Mode Determined: Direct Query. \n>>> Navigating back to the report.");
                    chrome.storage.sync.set(
                        { connectivityMode: "Direct Query" },
                        function () {
                            setTimeout(function () {
                                window.history.back();

                                setTimeout(function () {
                                    location.reload();
                                }, 5000);

                            }, 5000);
                        }
                    );
                }
                else {
                    alert("Error: Connectivity Mode could not be determined.");
                }

            }, 4000);

        }, 4000);

    }, importModeDOMChangedWaitTime * 1000)

}


window.onload = function () {

    /*
    // Retrieve values from chrome.storage and update global variables. Include default values for the chrome.storage pairs.
    chrome.storage.sync.get(
        { execute_trigger: 0, slide_time: 25, refresh_time: 60, connectivityMode: "undetermined" },
        function (items) {
            slideTime = items.slide_time;
            refreshTime = items.refresh_time;
            connectivityMode = items.connectivityMode;
            execute = items.execute_trigger;

            if (execute === 1 && connectivityMode === "undetermined") {
                DetermineConnectivityMode();
            }
            else if (execute === 1 && (connectivityMode === "Import" || connectivityMode === "Direct Query")) {
                firstFullScreen();
            }
        }
    );
    */

    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    function LogDOMChanges(changes) {

        if (changes[0]["added"]) {
            console.log(changes[0]["added"]);
        }

        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect");

    }

    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", LogDOMChanges, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

}

function firstFullScreen() {

    // It is necessary to separate the first Full Screen click from the other recursive clicks.
    $(document).find("button.enterFullScreenBtn").click();

    if (connectivityMode === "Import") {
        ImportSlideShowLoop();
    }
    else if (connectivityMode === "Direct Query") {
        DirectQuerySlideShowLoop();
    }

}

function ImportSlideShowLoop() {

    // The setInterval function creates an infinite loop which is desired.
    setInterval(
        function () {

            $(document).find("button.fullScreenNext").click()
            $(document).find("button.exitFullScreenBtn").click()

            // This conditional statement prevents the data source(s) from being overloaded by constant querying.
            if (elapsedTime > refreshTime) {
                console.log("Refreshing dataset.");
                ImportRefresh();
                // Reset the elapsed time if the Refresh Button is clicked.
                elapsedTime = 0;
            }

            $(document).find("button.refresh").click();
            $(document).find("button.enterFullScreenBtn").click();

            // Accumulate the elapsed time from the previous refresh.
            elapsedTime = elapsedTime + parseInt(slideTime, 10);
        },

        slideTime * 1000
    )

}

function DirectQuerySlideShowLoop() {

    // The setInterval function creates an infinite loop which is desired.
    setInterval(
        function () {

            $(document).find("button.fullScreenNext").click()
            $(document).find("button.exitFullScreenBtn").click()

            // This conditional statement prevents the data source(s) from being overloaded by constant querying.
            if (elapsedTime > refreshTime) {
                console.log("Refreshing dataset.");
                $(document).find("button.refresh").click();
                // Reset the elapsed time if the Refresh Button is clicked.
                elapsedTime = 0;
            }

            $(document).find("button.enterFullScreenBtn").click();

            // Accumulate the elapsed time from the previous refresh.
            elapsedTime = elapsedTime + parseInt(slideTime, 10);
        },

        slideTime * 1000
    )

}
