/*jshint esversion: 11 */
"use strict";

var TICK_DURATION = 200;      // milliseconds
var DATE_TICK_DURATION = 1000 * 60;
var DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Clock(element,
               hourHand,
               minuteHand,
               secondHand,
               dayComplication,
               dateComplication,
               cx,
               cy) {
    console.log("new Clock");
    this.element = element;
    this.isObjectElement = false;
    this.isSvgElement = false;
    console.log(this.element.tagName);
    if (this.element.tagName.toLowerCase() === "object") {
        console.log("is an object");
        this.isObjectElement = true;
        this.svgDocument = this.element.getSVGDocument();
        if (hourHand != null && hourHand.constructor === String) {
            this.hourHand = this.svgDocument.getElementById(hourHand);
        }
        if (minuteHand != null && minuteHand.constructor === String) {
            this.minuteHand = this.svgDocument.getElementById(minuteHand);
        }
        if (secondHand != null && secondHand.constructor === String) {
            this.secondHand = this.svgDocument.getElementById(secondHand);
        }
        if (dayComplication != null && dayComplication.constructor === String) {
            this.dayComplication = this.svgDocument.getElementById(dayComplication);
        }
        if (dateComplication != null && dateComplication.constructor === String) {
            this.dateComplication = this.svgDocument.getElementById(dateComplication);
        }
        this.cx = cx;
        this.cy = cy;
    } else if (this.element.tagName.toLowerCase() === "svg") {
        console.log("is an svg");
        this.isSvgElement = true;
        if (hourHand != null && hourHand.constructor === String) {
            this.hourHand = document.getElementById(hourHand);
        } else if (hourHand instanceof Element) {
            this.hourHand = hourHand;
        }
        if (minuteHand != null && minuteHand.constructor === String) {
            this.minuteHand = document.getElementById(minuteHand);
        } else if (minuteHand instanceof Element) {
            this.minuteHand = minuteHand;
        }
        if (secondHand != null && secondHand.constructor === String) {
            this.secondHand = document.getElementById(secondHand);
        } else if (secondHand instanceof Element) {
            this.secondHand = secondHand;
        }
        if (dayComplication != null && dayComplication.constructor === String) {
            this.dayComplication = document.getElementById(dayComplication);
        } else if (dayComplication instanceof Element) {
            this.dayComplication = dayComplication;
        }
        if (dateComplication != null && dateComplication.constructor === String) {
            this.dateComplication = document.getElementById(dateComplication);
        } else if (dateComplication instanceof Element) {
            this.dateComplication = dateComplication;
        }
        this.cx = cx;
        this.cy = cy;
        console.log(
            this.hourHand,
            this.minuteHand,
            this.secondHand,
            this.dayComplication,
            this.dateComplication,
            this.cx,
            this.cy
        );
    }
}
Object.assign(Clock.prototype, {
    update: function (date) {
        date = date == null ? new Date() : date;
        this.updateTime(date);
        this.updateDayDate(date);
    },
    updateTime: function (date) {
        date = date == null ? new Date() : date;
        var ms = date.getMilliseconds();
        var s  = date.getSeconds();
        var m  = date.getMinutes();
        var h  = date.getHours();
        [s, m, h] = [((s + ms/1000) * 6) % 360,
                     ((m + s/60 + ms/60000) * 6) % 360,
                     ((h + m/60 + s/3600 + ms/3600000)) * 30 % 360];
        this.hourHand.setAttribute("transform",
                                   "rotate(" + String(h) + " " + String(this.cx) + " " + String(this.cy) + ")");
        this.minuteHand.setAttribute("transform",
                                     "rotate(" + String(m) + " " + String(this.cx) + " " + String(this.cy) + ")");
        this.secondHand.setAttribute("transform",
                                     "rotate(" + String(s) + " " + String(this.cx) + " " + String(this.cy) + ")");
    },
    updateDayDate: function (date) {
        date = date == null ? new Date() : date;
        this.dayComplication.innerHTML = DAYS_OF_THE_WEEK[date.getDay()].toUpperCase();
        this.dateComplication.innerHTML = String(date.getDate());
    },
    startTimeClock: function (date) {
        date = date == null ? new Date() : date;
        var now = date.getTime();
        var delay = TICK_DURATION - now % TICK_DURATION;
        var then = now + delay;
        this.updateTime(new Date(then));
        setTimeout(this.startTimeClock.bind(this), delay);
    },
    startDayDateClock: function (date) {
        date = date == null ? new Date() : date;
        var now = date.getTime();
        var delay = DATE_TICK_DURATION - now % DATE_TICK_DURATION;
        var then = now + delay;
        this.updateDayDate(new Date(then));
        setTimeout(this.startTimeClock.bind(this), delay);
    },
    start: function () {
        var date = new Date();
        this.startTimeClock(date);
        this.startDayDateClock(date);
    },
});
