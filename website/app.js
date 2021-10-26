// Personal API Key for OpenWeatherMap API
const apiKey="d586526d704de8b02857530558bd8bee";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+(d.getMonth()+1) +'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generateBtn= document.getElementById("generate");
generateBtn.addEventListener("click",getTempretureData);

// Function called by event listener
async function getTempretureData(){

    let zipCode = document.getElementById("zip").value;
    let userFeel = document.getElementById("feelings").value;
    let WetherUrl=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

    getAPIData(WetherUrl)
    .then((temp)=>{postData(newDate,temp,userFeel)})
    .then(()=>{return getData()})
    .then((finalResult)=>{
        upadeUI(finalResult);
    })
    .catch(err => console.log(err))

}
/* Function to GET Web API Data*/
async function getAPIData(url){
    const res = await fetch(url);
    const wetherJson = await res.json();
    return wetherJson.main.temp;
}

/* Function to POST data */
async function postData(date,temp,content){
    await fetch("/addEntry",{
        method:"POST",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            date,
            temp,
            content
        })
    })
}

/* Function to GET Project Data */
async function getData(){
    const result = await fetch('/Wether');
    const finalResult = await result.json();
    return finalResult;
    // console.log(finalResult);
}

/* Function to update UI */
async function upadeUI(data){
    // console.log(data);
    document.getElementById('date').innerHTML=`Date: ${data.date}`;
    document.getElementById('temp').innerHTML=`Temperature: ${data.temp}`;
    document.getElementById('content').innerHTML=`Feels like: ${data.content}`;
    document.getElementById('resultHolder').style="visibility:visible";
}