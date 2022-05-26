console.log("Dark Sky");

const submitBtn = document.getElementById("submit-btn");
const cityName = document.getElementById("city-name");
const opCity = document.getElementById("output");
const tempRealValue = document.getElementById("temp-real-value");
const tempStatus = document.getElementById("temp-status");
const todayDate = document.getElementById("today-date");
const day = document.getElementById("day");
const dataHide = document.querySelector(".middle-layer");
const apiKey = "SECRET-KEY";

const weekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

day.innerText = weekNames[new Date().getDay()];

const MonthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

todayDate.textContent =
    new Date().getDate() +
    ", " +
    MonthNames[new Date().getMonth()].substring(0, 3);

opCity.innerText = `Get Output here`;
dataHide.classList.add("data-hide");

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        opCity.innerText = `Please write the name before search`;
        dataHide.classList.add("data-hide");
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${apiKey}`;
            const resp = await fetch(url);
            const respData = await resp.json();
            const arrData = [respData];

            tempRealValue.innerText = arrData[0].main.temp;
            // * tempStatus.innerText = arrData[0].weather[0].main;
            opCity.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            // ** condition to check sunny or cloudy

            const tempMood = arrData[0].weather[0].main;
            if (tempMood == "Clear") {
                tempStatus.innerHTML = `<i class="fas fa-sun" style='color: #eccc68'></i>`;
            } else if (tempMood == "Clouds") {
                tempStatus.innerHTML = `<i class="fas fa-cloud"  style='color: #f1f2f6'></i>`;
            } else if (tempMood == "Rain") {
                tempStatus.innerHTML = `<i class="fas fa-cloud-rain"  style='color: #a4b0be'></i>`;
            } else {
                tempStatus.innerHTML = `<i class="fas fa-sun"  style='color: #eccc68'></i>`;
            }

            dataHide.classList.remove("data-hide");
        } catch (error) {
            opCity.innerText = `Please enter the correct city name`;
            dataHide.classList.add("data-hide");
            console.log(error);
        }
    }
};

submitBtn.addEventListener("click", getInfo);
