/*jshint esversion: 11 */

let hourHand;
let minuteHand;
let secondHand;
let hourHandAttr;
let minuteHandAttr;
let secondHandAttr;

function initClock() {
    hourHand   = document.getElementById("hourHand");
    minuteHand = document.getElementById("minuteHand");
    secondHand = document.getElementById("secondHand");
    hourHandAttr   = hourHand.getAttribute("transform");
    minuteHandAttr = minuteHand.getAttribute("transform");
    secondHandAttr = secondHand.getAttribute("transform");
    hourHand.removeAttribute("transform");
    minuteHand.removeAttribute("transform");
    secondHand.removeAttribute("transform");
    startClock();
}

function updateClock(msec) {
    msec = msec ?? Date.now();
    let date = new Date(msec);

    let ms = date.getMilliseconds();
    let s  = date.getSeconds();
    let m  = date.getMinutes();
    let h  = date.getHours();

    [s, m, h] = [s + ms/1000,
                 m + s/60 + ms/60000,
                 h + /* hour hand on 9 in svg */ 3 + m/60 + s/3600 + ms/3600000];

    s *= 6;
    m *= 6;
    h *= 30;

    s %= 360;
    m %= 360;
    h %= 360;

    const xlate = 1;
    const hourHandTransform = [
        `translate(127,127)`,
        `rotate(${h})`,
        `translate(-127,-127)`,
        hourHandAttr,
    ].filter(t => t != null).join(" ");
    const minuteHandTransform = [
        `translate(127,127)`,
        `rotate(${m})`,
        `translate(-127,-127)`,
        minuteHandAttr,
    ].filter(t => t != null).join(" ");
    const secondHandTransform = [
        `translate(127,127)`,
        `rotate(${s})`,
        `translate(-127,-127)`,
        secondHandAttr,
    ].filter(t => t != null).join(" ");
    hourHand.style.transform = hourHandTransform;
    minuteHand.style.transform = minuteHandTransform;
    secondHand.style.transform = secondHandTransform;
    hourHand.setAttribute("transform", hourHandTransform);
    minuteHand.setAttribute("transform", minuteHandTransform);
    secondHand.setAttribute("transform", secondHandTransform);
}

function startClock() {
    const now = Date.now();
    const delay = 125 - now % 125;
    const then = now + delay;
    updateClock(then);
    setTimeout(startClock, delay);
}

if (document.readyState === 'complete') {
    initClock();
} else {
    window.addEventListener('load', initClock);
}
