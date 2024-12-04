export const ICON_MAP = new Map ()

addMapping([0, 1], "clear-day")
addMapping([2], "cloudy-partly1")
addMapping([3], "cloudy-day")
addMapping([45, 48], "foggy-day")
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "heavy-rain")
addMapping([71, 73, 75, 77, 85, 86], "snowy")
addMapping([95, 96, 99], "thunderstorm")

function addMapping(value, icon){
    value.forEach(value => {
        ICON_MAP.set(value, icon)
    })
}

ICON_MAP.get(0)