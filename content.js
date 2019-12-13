var slideTime;
var refreshTime;
var execute = 1;
var refresh = 1;


window.onload = function () {

    chrome.storage.sync.get(
        { slide_time: 30 }
        ,
        function (items) {
            slideTime = items.slide_time;
        }
    );

    chrome.storage.sync.get(
        { refresh_time: 60 }
        ,
        function (items) {
            refreshTime = items.refresh_time;
        }
    );

    chrome.storage.sync.get(
        { execute_trigger: 0 }
        ,
        function (items) {
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

    angular.element(document.getElementsByClassName("enterFullScreenBtn")).click();
    SlideShowLoop();

}

function SlideShowLoop() {

    setTimeout(function () {

        angular.element(document.getElementsByClassName("fullScreenNext floatingViewBtn")).click()
        angular.element(document.getElementsByClassName("exitFullScreenBtn floatingViewBtn")).click()

        if (refresh === 1) {
            angular.element(document.getElementsByClassName("refresh")).click();
            refresh = 0;
        }
        
        angular.element(document.getElementsByClassName("enterFullScreenBtn")).click()

        if (execute === 1) {
            SlideShowLoop();
        }

    }, slideTime * 1000);

    console.log(slideTime);

}

function RefreshLoop() {

    setInterval(
        function () {
            refresh = 1;
        },
        refreshTime * 1000
    )

}