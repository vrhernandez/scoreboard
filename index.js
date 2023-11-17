// get elements
let homeEl = document.getElementById("home-el")
let guestEl = document.getElementById("guest-el")
let periodEl = document.getElementById("period-el")
let timerEl = document.getElementById("timer-el")
let timerBtn = document.getElementById("timer-btn")
// define variables
let homeScore = 0
let guestScore = 0
let period = 1
let duration = 720 // duration of timer in seconds (basketball periods last 12 minutes)
let durationTemp = duration // used to save seconds when pausing
let min = Math.trunc(durationTemp / 60)
let sec = durationTemp % 60
let ifPaused = true
var timerVal

// console.log(homeEl)
// console.log(guestEl)
// console.log(timerBtn.textContent)

function addPointsHome(points) {
    homeScore += points // add points
    homeEl.textContent = homeScore // update scoreboard
    whoIsWinning() // if team is in the lead, add highlight effect
    
    // console.log(homeEl)
    // console.log("Home team scored " + points + " point(s)! New home score: " + homeScore)
}

function addPointsGuest(points) {
    guestScore += points // add points
    guestEl.textContent = guestScore // update scoreboard
    whoIsWinning() // if team is in the lead, add highlight effect
    
    // console.log(guestEl)
    // console.log("Guest team scored " + points + " point(s)! New guest score: " + guestScore)
}

function whoIsWinning() {
    if (homeScore > guestScore) { // if home team is in the lead
        // console.log("Home is in the lead!")
        homeEl.style.borderColor = "#F94F6D"
        guestEl.style.borderColor = "#080001"
    }
    else if (homeScore < guestScore) { // if guest team is in the lead
        // console.log("Guest is in the lead!")
        homeEl.style.borderColor = "#080001"
        guestEl.style.borderColor = "#F94F6D"
    }
    else { // if tied, no highlight
        homeEl.style.borderColor = "#080001"
        guestEl.style.borderColor = "#080001"
    }
}

function newGame() { // resets game
    // reset variables
    homeScore = 0
    guestScore = 0
    period = 0
    durationTemp = duration
    min = 0
    sec = 0
    ifPaused = true
    
    // display new varialbes
    homeEl.textContent = homeScore
    guestEl.textContent = guestScore
    periodEl.textContent = period
    timerBtn.textContent = "START CLOCK"
    // console.log("new Game! Points now " + homeScore + "/" + guestScore)
    whoIsWinning() // reset lead highlight
}

// BUG: period number needs fixing
function newPeriod() { // begins new period
    if (ifPaused) { // if paused, start timer
        // period++
        // periodEl.textContent = period
        timerBtn.textContent = "PAUSE CLOCK" // changes button text
        console.log("Period: " + period)
        timer() // start timer
        ifPaused = false
        durationTemp = duration
    }
    else { // pause timer
        console.log("Pausing timer")
        durationTemp = min * 60
        durationTemp += sec
        min = 0
        sec = 0
        ifPaused = true
        timerBtn.textContent = "START CLOCK" // changes button text
    }
    // else { // if already in 4th period
    //     console.log("Already in final period. Start new game?")
    // }
}

function timer(){
    if (period <= 4) {
        timerVal = setInterval(function(){
            // refresh display, adding 0s to single-digit numbers
            // console.log(displayTime())
            periodEl.textContent = period
            sec--
            if (sec < 0) {
                min--
                sec = 59
                if (min < 0) {
                    clearInterval(timerVal)
                    min = Math.trunc(durationTemp / 60)
                    sec = durationTemp % 60
                    timerEl.textContent = displayTime()
                    if (durationTemp == duration) {
                        console.log("end of period!")
                        period++
                        ifPaused = true
                        timerBtn.textContent = "START CLOCK" // changes button text
                    }
                    console.log("stopping timer, current saved time: " + durationTemp)
                }
            }
            timerEl.textContent = displayTime()
        }, 1000)
    }
    else {
        ifPaused = true
        timerBtn.textContent = "START CLOCK" // changes button text
        console.log("Game Over!!!")
    }
}

function displayTime() {
    return (min < 10 ? ("0" + min) : min) + ":" 
        + (sec < 10 ? ("0" + sec) : sec)
}