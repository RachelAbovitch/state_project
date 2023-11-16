import {
    createCard,
    createBigCard,
    infoRender,
    showArrayStates,
    showBigCard,
    linkClick,
    searchState,
} from './script.js';


document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search");
    searchBtn.addEventListener("click", searchState);
});


const defaultStates=["Israel","usa","Thailand","FRANCE"];
showArrayStates(defaultStates);
