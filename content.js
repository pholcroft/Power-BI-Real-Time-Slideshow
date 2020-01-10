var connectivityMode;
var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;


function ImportRefresh() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    // Invoke listener for added list item under Datasets on the quick access navigation pane.
    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

    function QuickAccessPaneLoaded(mSummary) {

        // Disconnect listener.
        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect");

        if (mSummary[0]["added"]) {

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

            // Invoke listener for popup menu.
            $(document).mutationSummary("connect", EllipsisClicked, [{ element: "div.mat-menu-content" }]);

        }

    }

    function EllipsisClicked(mSummary) {

        $(document).mutationSummary("disconnect");

        if (mSummary[0]["added"]) {

            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content").find("button");

            // Find the dataset's Refresh Button.
            var $refreshButton = $matMenuButtons.find("span:contains('Refresh now')").parent();
            // Click the Refresh Button.
            $refreshButton.click();

            /// Close the popup menu.
            window.close();

        }
    }
}


function DetermineConnectivityMode() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    // Invoke listener for added list item under Datasets on the quick access navigation pane.
    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

    function QuickAccessPaneLoaded(mSummary) {

        // Disconnect listener.
        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect");

        if (mSummary[0]["added"]) {

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

            // Invoke listener for popup menu.
            //$(document).mutationSummary("connect", EllipsisClicked, [{ element: "div.mat-menu-content" }]);
            //$(document).mutationSummary("connect", EllipsisClicked, [{ all: true }]);

        }

    }

    $(document).mutationSummary("connect", EllipsisClicked, [{ element: "div.mat-menu-content" }]);

    function EllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect");

        if (mSummary[0]["added"]) {

            console.log("Test");
            console.log(mSummary);

            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content")//.find("button.mat-menu-item");

            console.log($matMenuButtons);

            // Find the dataset's Settings Button.
            var $settingsButton = $(document).find("span:contains('Settings')").parent();

            // Click the Settings Button.

            $settingsButton.click(function () {
                console.log("Settings button clicked.");
            });


            console.log("Settings button clicked 2.")

            // Invoke listener to identify when a navigation has taken place.
            $(document).mutationSummary("connect", SearchUI, [{ all: true }]);

        }



    }

    function SearchUI(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect");

        // Create variables and search DOM for determining Connectivity Mode.
        $importCheck = $("span.refreshSectionTitle:contains('Scheduled refresh')");
        $directQueryCheck = $("span.refreshSectionTitle:contains('Scheduled cache refresh')");

        // Check which variable returns a value.
        if ($importCheck.length) {
            console.log("Connectivity Mode Determined: Import. \n>>> Navigating back to the report.");
            chrome.storage.sync.set(
                { connectivityMode: "Import" },
                function () {
                    // Navigate back to Report.
                    window.history.back();
                    // Invoke listener for navigating back to Report.
                    $(document).mutationSummary("connect", ReloadReportPage(), [{ all: true }]);
                }
            );
        }
        else if ($directQueryCheck.length) {
            console.log("Connectivity Mode Determined: Direct Query. \n>>> Navigating back to the report.");
            chrome.storage.sync.set(
                { connectivityMode: "Direct Query" },
                function () {
                    // Navigate back to Report.
                    window.history.back();
                    // Invoke listener for navigating back to Report.
                    $(document).mutationSummary("connect", ReloadReportPage(), [{ all: true }]);
                }
            );
        }

    }

    function ReloadReportPage(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect");

        // Reload the Report's webpage to reinvoke this entire content file.
        location.reload();

    }
}


window.onload = function () {

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
