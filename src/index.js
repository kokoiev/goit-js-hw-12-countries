import './styles.css';
import { debounce } from 'throttle-debounce';
import templateCountry from "../src/templates/template-item.hbs";
import templateCountryList from "../src/templates/template-list.hbs";

const containerRef = document.querySelector(".container")
const inputRef = document.querySelector('.search-input');

function appendMarkUp(array) {
    containerRef.insertAdjacentHTML('beforeend', markUp( array))
 }
function markUp(array) {
    containerRef.innerHTML = ""
    if (array.length === 1) {
        console.log(templateCountry(array)); return templateCountry(array);
    } 
        console.log(templateCountry(array)); return templateCountryList(array);
     }


inputRef.addEventListener('input', debounce(300, event => {
    const searchName = event.target.value;    
    fetch(`https://restcountries.eu/rest/v2/name/${searchName}`)
        .then(res => res.json())
        .then(res => {
            if (res.length > 10) { 
                console.log(`Сделайте запрос точнее`);
                return
            }
            console.log(markUp(res));
            console.log(res)
            appendMarkUp(res)
        })
        .catch(console.log(`error country do not exist`))

}));








