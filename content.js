var connectivityMode;
var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;
var reportName;
var chromeReportName;


function ImportRefresh() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    // Invoke listener for added list item under Datasets on the quick access navigation pane.
    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    function QuickAccessPaneLoaded(mSummary) {

        // Disconnect listener.
        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

        console.log("QuickAccessPaneLoaded Summary:");
        console.log(mSummary);

        if (mSummary[0]["added"]) {

            // Invoke listener for popup menu.
            $(document).mutationSummary("connect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

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

        }
    }

    function DatasetEllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        if (mSummary[0]["added"]) {

            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content").find("button");

            // Find the dataset's Refresh Button.
            var $refreshButton = $matMenuButtons.find("span:contains('Refresh now')").parent();
            // Click the Refresh Button.
            $refreshButton.click();

            /// Close the popup menu.
            //window.close();

        }
    }
}


function GetReportName() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var chromeReportName = $spans.text();

    // Write the Report's name to Chrome Storage.
    chrome.storage.sync.set(
        { reportName: chromeReportName },
        function () {
            // Now determine the Connectivity Mode of the current Report.
            DetermineConnectivityMode();
        }
    )

}


function DetermineConnectivityMode() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
    var reportTitle = $spans.text();

    // Invoke listener for added list item under Datasets on the quick access navigation pane.
    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    function QuickAccessPaneLoaded(mSummary) {

        // Disconnect listener.
        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted[title='" + reportTitle + "']" }]);

        console.log("QuickAccessPaneLoaded Summary:");
        console.log(mSummary);

        if (mSummary[0]["added"]) {

            // Invoke listener for popup menu.
            $(document).mutationSummary("connect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

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

        }

    }

    function DatasetEllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        console.log("DatasetEllipsisClicked Summary:");
        console.log(mSummary);

        if (mSummary[0]["added"]) {

            // Invoke listener to identify when a navigation has taken place.
            $(document).mutationSummary("connect", SearchUI, [{ element: "span.refreshSectionTitle" }]);

            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content").find("button.mat-menu-item");

            if ($matMenuButtons) {
                console.log("Popup menu buttons found.")
            }
            else if (!$matMenuButtons) {
                console.log("Popup menu buttons NOT found.")
            }

            // Find the dataset's Settings Button.
            var $settingsButton = $(document).find("span:contains('Settings')").parent();

            // Click the Settings Button.
            $settingsButton.click();

        }
    }

    function SearchUI(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", SearchUI, [{ element: "span.refreshSectionTitle" }]);

        console.log("SearchUI Summary:");
        console.log(mSummary);

        if (mSummary) {

            // Create variables and search DOM for determining Connectivity Mode.
            $importCheck = $("span.refreshSectionTitle:contains('Scheduled refresh')");
            $directQueryCheck = $("span.refreshSectionTitle:contains('Scheduled cache refresh')");

            // Check which variable returns a value.
            if ($importCheck.length) {
                console.log("Connectivity Mode Determined: Import. \n>>> Navigating back to the report.");
                chrome.storage.sync.set(
                    // Store Connectivity Mode in Chrome Storage.
                    { connectivityMode: "Import" },
                    function () {
                        // Invoke the Report's popup menu under the Reports Header to navigate back to the Power BI Report.
                        ReportEllipsisClick();
                    }
                );
            }
            else if ($directQueryCheck.length) {
                console.log("Connectivity Mode Determined: Direct Query. \n>>> Navigating back to the report.");
                chrome.storage.sync.set(
                    // Store Connectivity Mode in Chrome Storage.
                    { connectivityMode: "Direct Query" },
                    function () {
                        // Invoke the Report's popup menu under the Reports Header to navigate back to the Power BI Report.
                        ReportEllipsisClick();
                    }
                );
            }
        }
    }

    function ReportEllipsisClick() {

        // Invoke listener for popup menu buttons.
        $(document).mutationSummary("connect", ReportEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        // Show hidden list elements on the quick access navigation pane.
        $("li").show();

        // Filter navigation pane's DOM to Report list.
        var $reportItems = $("button.headerButton[aria-label='Reports']").next();

        // Dynamically find the list item corresponding to the currently opened report.
        var $reportName = $reportItems.find("li.item.ng-star-inserted[title='" + reportTitle + "']");

        // Find the ellipsis button corresponding to the list item.
        var $reportEllipsisButton = $reportName.find("button.mat-menu-trigger.openMenu");
        // Click the ellipsis button to load the popup menu.
        $reportEllipsisButton.click();

    }

    function ReportEllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", ReportEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        console.log("ReportEllipsisClicked Summary:");
        console.log(mSummary);

        if (mSummary[0]["added"].length > 0) {

            // Invoke listener to identify when a navigation has taken place.
            $(document).mutationSummary("connect", ReloadReportPage, [{ element: "button.edit" }]);

            // Navigate the DOM to find the Open button on the popup menu.
            var $openButton = $("div.mat-menu-content").find("button.mat-menu-item:contains('Open')");

            if ($openButton) {
                console.log("Open menu button found.")
            }
            else if (!$openButton) {
                console.log("Open menu button NOT found.")
            }

            // Click the Open Button to navigate back to the Power BI Report.
            $openButton.click();

        }
    }

    function ReloadReportPage(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", ReloadReportPage, [{ element: "button.edit" }]);

        // Reload the Power BI Report page upon navigation.
        location.reload();

    }
}


window.onload = function () {

    // Retrieve values from chrome.storage and update global variables. Include default values for the chrome.storage pairs.
    chrome.storage.sync.get(
        { execute_trigger: 0, slide_time: 15, refresh_time: 30, reportName: "unknown", connectivityMode: "undetermined" },
        function (items) {

            // Retrieve the name of the currently selected report from the top left-hand corner of the page.
            var $spans = $("span.pbi-fcl-np[ng-bind='breadcrumb.label']").last();
            var reportName = $spans.text();

            slideTime = items.slide_time;
            refreshTime = items.refresh_time;
            chromeReportName = items.reportName;
            connectivityMode = items.connectivityMode;
            execute = items.execute_trigger;

            if (execute === 1 && (connectivityMode === "undetermined" || chromeReportName != reportName)) {
                console.log("Determining Connectivity Mode.");
                GetReportName();
            }
            else if (execute === 1 && (connectivityMode === "Import" || connectivityMode === "Direct Query")) {
                console.log("Initializing Slideshow.")
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
