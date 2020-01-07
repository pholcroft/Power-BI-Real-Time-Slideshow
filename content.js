var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;

$(window).on("load", function() {

    // Retrieve the name of the currently selected report from the top left-hand corner of the page.
    var $spans = $("span[ng-bind='breadcrumb.label'][class='pbi-fcl-np']").last();
    var reportTitle = $spans.text();

    // Expand the navigation pane for the current Workspace.

    //var paneExpanderHeader = document.querySelector('.paneExpanderHeader');
    //var workspaceNavigationButton = paneExpanderHeader.querySelector('.expanderButton');
    //angular.element(workspaceNavigationButton).click();
    $("button.expanderButton", "div.paneExpanderHeader").click();

    // Retrieve the name of the desired dataset from the Workspace's navigation pane using the reportTitle from above.
    var $datasetName = $("li[class='item'][class='ng-star-inserted'][title='" + reportTitle + "']");

    var $t = $("li [class='item'] [class='ng-star-inserted'] [title='" + reportTitle + "']").attr("title")

    console.log(reportTitle);
    console.log($t);
    //console.log(datasetName.attr('title'));

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