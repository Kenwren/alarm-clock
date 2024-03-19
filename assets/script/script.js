'use strict';

// Variables
let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("./assets/audio/ringtone.mp3");


// Script for Time and Date
function updateClock() {
    const now = new Date();
    const [dname, mo, dnum, yr, hou, min, sec] = [
        now.getDay(),
        now.getMonth(),
        now.getDate(),
        now.getFullYear(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ];
    let pe = "AM";
    let hours = hou;

    if (hou === 0) {
        hours = 12;
    }

    if (hou > 12) {
        hours -= 12;
        pe = "PM";
    }

    const pad = (num) => (num < 10 ? `0${num}` : num);

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const ids = ["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
    const values = [week[dname], months[mo], pad(dnum), yr, pad(hours), pad(min), pad(sec), pe];

    ids.forEach((id, index) => {
        document.getElementById(id).firstChild.nodeValue = values[index];
    });

    alarmListArr.forEach((alarm) => {
        if (alarm === `${pad(hours)}:${pad(min)}:${pad(sec)} ${pe}`) {
            console.log("Alarm ringing...");
            playAlarm(); // Function to play the alarm sound
            document.querySelector("#stopAlarm").style.visibility = "visible";
        }
    });
}

// Function to play the alarm sound
function playAlarm() {
    ring.load("./assets/audio/ringtone.mp3");
    ring.play("./assets/audio/ringtone.mp3");
}

function initClock() {
    updateClock();
    window.setInterval(updateClock, 1000);
}

// Set Alarm section
[...Array(12).keys()].reverse().forEach((i) => {
    i = i < 10 ? "0" + i : i;
    const option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
});

[...Array(60).keys()].reverse().forEach((i) => {
    i = i < 10 ? "0" + i : i;
    const option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
});

["AM", "PM"].forEach((ampm) => {
    const option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
});

// Add alarm
const setAlarm = () => {
    document.querySelector("#alarm-h3").innerText = "Alarms";
    const time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if (time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")) {
        alert("Please, Select Valid Input");
    } else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(${alarmCount})">Delete</button>
        </div>`;
        alarmTime = time;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }
};

setAlarmBtn.addEventListener("click", setAlarm);

// Delete alarm
const deleteAlarm = (click_id) => {
    const element = document.getElementById("alarm" + click_id);
    const deleteIndex = alarmListArr.indexOf(document.querySelector("#span" + click_id).innerText);
    alarmListArr.splice(deleteIndex, 1);
    element.remove();
};

const stopAlarm = () => {
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility = "hidden";
};