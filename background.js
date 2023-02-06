let item = 1;

let MINUTES_TO_MILLIS = 60000;
let HOURS_TO_MILLIS = MINUTES_TO_MILLIS * 60;

let NOTIFICATION_ID = "Therapy_Instructions_Id";
let ALARM_NAME = "Therapy_Instructions_Alarm";
let NOTIFICATION_PRIORITY = 2;
let isFromScheduled = false;
let isFirstPush = false;
let canPush = true;

chrome.alarms.onAlarm.addListener(
    function (alarm) {
        if (alarm.name === ALARM_NAME) {
            if ((canPush || isFromScheduled) && !isFirstPush) {
                pushNotification();
                console.log("return from onAlarm");
                return;
            }

            isFirstPush = false;
            canPush = true;
            console.log("set CanPush = true");
        }
    });

function pushNotification() {
    let notificationId = NOTIFICATION_ID + Math.random();
    chrome.notifications.create(notificationId, {
        type: 'basic',
        iconUrl: 'main/img/notification.png',
        title: 'Therapy Instructions',
        message: 'It is time to make your neck healthier. Open the extension and click "Start now"',
        priority: NOTIFICATION_PRIORITY
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.time_on_notion) {
            chrome.storage.local.get(['time_frequency'], (result) => {
                let periodInMinutes = parseInt(result.time_frequency);
                let when = getWhenFromRequestData(request.time_on_notion, periodInMinutes);
                clearPreviousAlarms();
                createAlarm(when, periodInMinutes);
            });
        }
    }
);

function getWhenFromRequestData(data, periodInMinutes) {
    let time;

    if (data.trim().length === 5) {
        isFromScheduled = true;
        time = data.trim().split(":");
    } else {
        let date = new Date(data);

        time = date.toLocaleTimeString({hour12: false}).split(":");
        let timeToStorage = time[0] + ":" + time[1];

        date = new Date(date.getTime() + periodInMinutes * MINUTES_TO_MILLIS);
        time = date.toLocaleTimeString({hour12: false}).split(":");

        chrome.storage.local.set({
            time_on_notion: timeToStorage
        }, () => {
            console.log("Time that go to storage.local:", timeToStorage);
        });
    }

    canPush = false;
    isFirstPush = true;
    return time[0] * HOURS_TO_MILLIS + time[1] * MINUTES_TO_MILLIS;
}

function createAlarm(when, periodInMinutes) {
    console.log("Creating Alarm (when:", when, ", period:", periodInMinutes, ")");
    chrome.alarms.create(ALARM_NAME, {
        when: when,
        periodInMinutes: periodInMinutes
    });
}

function clearPreviousAlarms() {
    console.log("clearPreviousAlarms()");
    chrome.alarms.clearAll();
}
