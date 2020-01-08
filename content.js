var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;

$(window).on("load", function () {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span[ng-bind='breadcrumb.label'][class='pbi-fcl-np']").last();
    var reportTitle = $spans.text();

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    setTimeout(function () {

        // Show hidden list elements on the left-hand side navigation pane.
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
            console.log("Ellipsis Button Clicked. Proceeding to Refresh.");

            // Navigate the DOM to find the buttons on the popup menu.
            var $matMenuButtons = $("div.mat-menu-content").find("button");

            // Find the dataset's Refresh Button.
            var $refreshButton = $matMenuButtons.find("span:contains('Refresh now')").parent();
            // Click the Refresh Button.
            $refreshButton.click();

            console.log("Refreshed.")

        }, 4000);



    }, 2000)

})


/*
window.onload = function () {

    // Retrieve values from chrome.storage and update global variables. Include default values for the chrome.storage pairs.
    chrome.storage.sync.get(
        { execute_trigger: 0, slide_time: 25, refresh_time: 180 }
        ,
        function (items) {
            slideTime = items.slide_time;
            refreshTime = items.refresh_time;
            execute = items.execute_trigger;
            beginSlideShow();
        }
    );

}

function beginSlideShow() {

    if (execute === 1) {
        firstFullScreen();
    }

}

function firstFullScreen() {

    // It is necessary to separate the first Full Screen click from the other recursive clicks.
    angular.element(document.getElementsByClassName("enterFullScreenBtn")).click();
    SlideShowLoop();

}

function SlideShowLoop() {

    // The setInterval function creates an infinite loop which is desired.
    setInterval(
        function () {

            angular.element(document.getElementsByClassName("fullScreenNext floatingViewBtn")).click()
            angular.element(document.getElementsByClassName("exitFullScreenBtn floatingViewBtn")).click()

            // This conditional statement prevents the data source(s) from being overloaded by constant querying.
            if (elapsedTime > refreshTime) {
                angular.element(document.getElementsByClassName("refresh")).click();
                // Reset the elapsed time if the Refresh Button is clicked.
                elapsedTime = 0;
            }

            angular.element(document.getElementsByClassName("enterFullScreenBtn")).click()

            // Accumulate the elapsed time from the previous refresh.
            elapsedTime = elapsedTime + parseInt(slideTime, 10);
        },

        slideTime * 1000
    )

}
*/