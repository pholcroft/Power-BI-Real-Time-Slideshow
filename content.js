var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;


window.onload = function () {

    chrome.storage.sync.get(
        { execute_trigger: 0, slide_time: 30, refresh_time: 180 }
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

    angular.element(document.getElementsByClassName("enterFullScreenBtn")).click();
    SlideShowLoop();

}

function SlideShowLoop() {

    setInterval(
        function () {

            angular.element(document.getElementsByClassName("fullScreenNext floatingViewBtn")).click()
            angular.element(document.getElementsByClassName("exitFullScreenBtn floatingViewBtn")).click()

            if (elapsedTime > refreshTime) {
                angular.element(document.getElementsByClassName("refresh")).click();
                elapsedTime = 0;
            }

            angular.element(document.getElementsByClassName("enterFullScreenBtn")).click()

            elapsedTime = elapsedTime + parseInt(slideTime, 10);
        },

        slideTime * 1000
    )

}