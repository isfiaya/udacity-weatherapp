// Create a new date instance dynamically with JS
let d = new Date();


const apiKey = "c1583e3177b759c15d6bdd2c162afe8c"
let newDate = `${d.toDateString()} || ${d.toLocaleTimeString()}`

// SELECTORS
const btnGenerate = document.getElementById('generate')
const feelings = document.getElementById('feelings')
const date = document.querySelector('#date p')
const content = document.querySelector('#content p')
const temp = document.querySelector('#temp p')
const feel = document.querySelector('#feel p')
const zip = document.getElementById('zip')



// REQUEST TO PULL DATA FROM API OpenWeatherMap
const getData = async () => {
  if (!zip.value || !feelings.value) {
    return alert('make sure to enter the correct data!')
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.value},us&units=metric&appid=${apiKey}`);
  const data = await response.json();
  zip.value = "";
  return data

}

// REQUEST TO POST DATA TO THE SERVER
const postData = async (data) => {

  fetch('http://localhost:3000/add', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      temp: data.main.temp,
      humidity: data.main.humidity,
      WindSpeed: data.wind.speed,
      date: newDate,
      feel: feelings.value
    })
  }).then(result => {
    feelings.value = ""
    console.log({
      message: "post data successfully!",
      result: result
    });
  }).catch(err => {
    console.error(err);
  });
}

// REQUEST TO PULL DATA FROM SERVER
const getDataFromServer = async () => {
  const response = await fetch(`http://localhost:3000/all`);
  const data = await response.json();
  return data
}

// UPDATE UI
const updateUi = async (data) => {
  date.innerHTML = `date: ${data.date}`;
  temp.innerHTML = `temperature: ${data.temp}°C`;
  content.innerHTML = `humidity ${data.humidity} %, wind speed: ${data.WindSpeed} mph`;
  feel.innerHTML = `Feeling: ${data.feel}`
}

const onGenerate = async () => {
  getData()
    .then(result => postData(result))
    .then(newResult => getDataFromServer())
    .then(data => updateUi(data))
}


btnGenerate.addEventListener('click', onGenerate)