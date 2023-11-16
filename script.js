async function createCard(stateName){
   
    try {
        let state = await infoRender(stateName);
    
    console.log(state);
  
    const cardEl = document.createElement("div");
    cardEl.className = "card p-1 m-2 shadow d-flex flex-column align-items-center justify-content-center height-300" ;
     let language = state.languages.join(', ');
    cardEl.innerHTML = `
    
    <img  
    width="300" height="190"
    src=${state.flag}
    alt=${state.name} />
    
    <h5 class="display-6 align-self-center">${state.name}</h5>
    <h6>Population : ${state.population}</h6>
     <h6>Languages : ${language}</h6>
    <h6>Capital City : ${state.capital}</h6>
    
    `;
    const btn=document.createElement("button");
            btn.className="btn btn-primary w-50";
            btn.id=state.name;
            btn.textContent="Get more info >>";
            
           cardEl.appendChild(btn);
            btn.addEventListener("click", () => linkClick(btn.id));
    console.log(cardEl);
    return cardEl;
} catch (error) {
    console.error('Error creating card:', error.message);
}
}



async function createBigCard(stateName){
   
    try {
        let state = await infoRender(stateName);
        console.log(state);

    const cardEl = document.createElement("div");
    const left = document.createElement("div");
    left.className="col-8 p-1 text-center";

    cardEl.className = "bigCard card col-8 shadow d-flex   align-items-center";
     let language = state.languages.join(', ');
    
    left.innerHTML = `
    <img class="col-6  border-secondary border-2 border"
    src=${state.flag}
    alt=${state.name} />
    <h5 class="display-6 ">${state.name}</h5>
    <h6>Population : ${state.population}</h6>
     <h6>Languages : ${language}</h6>
    <h6>Capital City : ${state.capital}</h6> 
    
    `;

    const right = document.createElement("div");
    right.className="col-8 p-1 text-center ";
    const bordersDiv = document.createElement("div");
    bordersDiv.className="d-flex flex-wrap align-items-center justify-content-center m-2";
 
    state.borderNames.forEach(border => {
        if(border.toLowerCase() !== "palestine")
        
        {
            const btn=document.createElement("button");
            btn.className="btn btn-success p-1 m-1";
            if(border === "United States")
                  border="USA";
            btn.id=border;
            btn.textContent=border;
            
            bordersDiv.appendChild(btn);
            btn.addEventListener("click", () => linkClick(btn.id));
        
        }
    });  

    const holder=document.createElement("div");
    holder.id="map";
    holder.className="m-2"
   
    const lat = state.lat; 
    const lon = state.lon; 

if (holder) {
        holder.innerHTML=`<div class="Mymap">
        <iframe width="100%" height="150%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=5&amp;output=embed">
        </iframe>
        </div>`;
        right.appendChild(holder);
}    
    right.appendChild(bordersDiv);
    
    console.log(cardEl);
    cardEl.appendChild(left);
    cardEl.appendChild(right);

    console.log(cardEl);
   

  
  return cardEl;

} catch (error) {
    console.error('Error creating card:', error.message);
}
}







async function infoRender(stateName){

try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${stateName}`);
    
   
       const state=response.data[0];
      
       const borderCountries = await Promise.all(state.borders.map(async borderCountryCode => {
        const borderResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`);
        return borderResponse.data[0].name.common;
    }));
       
    const [lat, lon] = state.latlng; 
        
    let stateInfo = {
        name: (Object.values(state.name))[0],
        population: state.population,
        flag: (Object.values(state.flags))[0],
        capital: state.capital[0],
        lat, 
        lon,
        borders: state.borders,
        languages: (Object.values(state.languages)),
        borderNames: borderCountries
    };
    if(stateInfo.name === "United States")
    stateInfo.name="USA";


    console.log('Name:', stateInfo.name);
    console.log('Population:', stateInfo.population);
    console.log('Flag:', stateInfo.flag);
    console.log('Capital:', stateInfo.capital);
    console.log('Lat:', stateInfo.lat);
    console.log('Lon:', stateInfo.lon);
    console.log('Borders:', stateInfo.borders.join(', '));
    console.log('Languages:', stateInfo.languages.join(', '));

    
    return stateInfo;
}
 catch (error) {
    
    throw error;
}
}



async function showArrayStates(arrayStates) {
    arrayStates.forEach(s=>{console.log(s)});
    const cardContainer = document.querySelector("#cardContainer");
    cardContainer.innerHTML="";

    for (const state of arrayStates) {
        const colEl = document.createElement("div");
        colEl.className = "col-3 mt-5";

        const cardEl = await createCard(state);
        console.log(cardEl);
        colEl.appendChild(cardEl);

        cardContainer.appendChild(colEl);
    }
    
}
async function showBigCard(state){
    console.log(state);
    const cardContainer=document.querySelector("#cardContainer");
    cardContainer.innerHTML="";
    const bigCardContainer=document.querySelector("#bigCardContainer");
    bigCardContainer.innerHTML="";
 
    const bigCard =  createBigCard(state);
    bigCard.then(data=>bigCardContainer.append(data)) ;
   
    
    
   
}

const searchState=()=>{

const searchInput = document.getElementById("searchInput");
const inputValue = searchInput.value;

    if (inputValue) {
        console.log(inputValue);
        showBigCard(inputValue);
}



};

function linkClick (id)  {
   
        if(id!=="search"){
       
            showBigCard(id); 
        
        }
}
    

export {
    createCard,
    createBigCard,
    infoRender,
    showArrayStates,
    showBigCard,
    linkClick,
    searchState,
};
