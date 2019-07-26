var time_transaction;

window.onload = function() {
    chrome.storage.sync.get({
    // Default value was previously 10.
    slide_time: 30,
    }, function(items) {
      time_transaction = items.slide_time;
    }
  );
    callAngu()
}

var i = true;

function myLoop() {

    setTimeout(function () {

        angular.element(document.getElementsByClassName("fullScreenNext floatingViewBtn")).click()

        // These 3 JS lines were added to programatically refresh the Power BI Report via the
        // the Refresh Button in the Power BI Service's UI.
        angular.element(document.getElementsByClassName("exitFullScreenBtn floatingViewBtn")).click()
        angular.element(document.getElementsByClassName("refresh")).click()
        angular.element(document.getElementsByClassName("enterFullScreenBtn")).click()

        if (i === true) {
            myLoop();
        }

    }, time_transaction * 1000)

    console.log(time_transaction);

}

function callAngu() {

    angular.element(document.getElementsByClassName("enterFullScreenBtn")).click()
    myLoop();

}