import './styles.css';
import { debounce } from 'throttle-debounce';
import templateCountry from "../src/templates/template-item.hbs";
import templateCountryList from "../src/templates/template-list.hbs";
import "./styles.css";
import { info, error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const containerRef = document.querySelector(".main-container");
const inputRef = document.querySelector('.search-input');

function appendMarkUp(array) {
  if (array.status === 404) { 
    cleanList()
    return
  }
    containerRef.insertAdjacentHTML('beforeend', markUp( array))
};
function cleanList() {
  containerRef.innerHTML = "" 
};
 function markUp(array) {
  if (array.length === 1) {
    return templateCountry(array);
  };
 return templateCountryList(array);
};
function showError() {
  error({
    title: "Ошибка!!",
    text:
      "Хитер харе страдать херней, у меня загрузка долгая....",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
};


inputRef.addEventListener('input', debounce(300, event => {
  cleanList()
    const searchName = event.target.value;    
    fetch(`https://restcountries.eu/rest/v2/name/${searchName}`)
        .then(res => res.json())
        .then(res => {
          if (res.length > 10) { 
                showError();
                return
            }
            appendMarkUp(res)
        })
        .catch(cleanList())

}));







