// Saves options to chrome.storage
document.addEventListener('DOMContentLoaded', restore_options);

function save_slide_time_options() {

    var slide_time = document.getElementById('slide_time').value;

    chrome.storage.sync.set({
        slide_time: slide_time,
    }, function () {
        var status = document.getElementById('slide_status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });

    chrome.tabs.executeScript(null,
        {
            code: "location.reload()"
        }
    );
}

function save_refresh_time_options() {

    var refresh_time = document.getElementById('refresh_time').value;

    chrome.storage.sync.set({
        refresh_time: refresh_time,
    }, function () {
        var status = document.getElementById('refresh_status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });

    chrome.tabs.executeScript(null,
        {
            code: "location.reload()"
        }
    );
}

function stop_execution() {
    chrome.storage.sync.set(
        { execute_trigger: 0 },
        function () {
            chrome.runtime.sendMessage({ execute: "stop" });
            window.close();
        }
    )
}

function start_execution() {
    chrome.storage.sync.set(
        { execute_trigger: 1 },
        function () {
            chrome.runtime.sendMessage({ execute: "start" });
            window.close();
        }
    )
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        slide_time: 30, refresh_time: 180
    }, function (items) {
            document.getElementById('slide_time').value = items.slide_time;
            document.getElementById('refresh_time').value = items.refresh_time;
    });
}

document.getElementById('slide_time_save').addEventListener('click', save_slide_time_options);
document.getElementById('refresh_time_save').addEventListener('click', save_refresh_time_options);
document.getElementById('play').addEventListener('click', start_execution);
document.getElementById('stop').addEventListener('click', stop_execution);