//import { ICON_MAP } from "./iconMap"

import "./master.css"
import { getweather } from "./weather"
import { ICON_MAP } from "./iconMap"

//get and tether to location
navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
function positionSuccess({coords}) {
    getweather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone)
.then(renderweather)
.catch(e => {
    console.error(e)
    alert("Error Getting The Weather.")
})
}

function positionError() {
    alert ("Unable to get your location. Please, enable location permission and refresh the webpage!")
}

function renderweather({current, daily, hourly}){
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}

function setValue(selector, value, {parent = document} = {} ) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconUrl(iconCode) {
    return `/${ICON_MAP.get(iconCode)}.png`
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue("current-temp", current.currentTemp)
    setValue("current-high", current.highTemp)
    setValue("current-low", current.lowTemp)
    setValue("current-fl-high", current.highFeelsLike)
    setValue("current-fl-low", current.lowFeelsLike)
    setValue("current-wind", current.windSpeed)
    setValue("current-precip", current.precip)
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, {weekday: "long"})
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.contentEditable.cloneNode(true)
        setValue("temp", day.maxTemp, {parent: element})
        setValue("date", DAY_FORMATTER.format(day.timestamp), {parent: element})
        element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
        dailySection.append(element)
    })
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {hour: "numeric"})
const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.getElementById("hour-row-template")
function renderHourlyWeather(hourly) {
    hourlySection.innerHTML = ""
    hourly.forEach(hour => {
       const element = dayCardTemplate.contentEditable.cloneNode(true)
       setValue("temp", hour.Temp, {parent: element})
       setValue("fl-temp", hour.feelsLike, {parent: element})
       setValue("wind", hour.windSpeed, {parent: element})
       setValue("precip", hour.precip, {parent: element})
       setValue("day", DAY_FORMATTER.format(hour.timestamp), {parent: element})
       setValue("time", HOUR_FORMATTER.format(hour.timestamp), {parent: element})
       element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
       hourlySection.append(element)
    })
}