var time_transaction;
var i = true;
var begin_execution = 1;


window.onload = function () {

    chrome.storage.sync.get(
        { slide_time: 30 }
        ,
        function (items) {
            time_transaction = items.slide_time;
        }
    );


    chrome.storage.sync.get(
        { execute_trigger: 0 }
        ,
        function (items) {
            begin_execution = items.execute_trigger;
            begin();
        }
    );

}


function begin() {
    if (begin_execution === 1) {
        callAngu();
    }
    else {
        //alert(begin_execution);
    }
}


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