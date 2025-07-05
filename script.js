



let newSrc = `https://flagsapi.com/PK/shiny/64.png`;

const flag = document.querySelectorAll('.flag img')

const select = document.querySelectorAll('.currency select')
let BASE_URL =
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/pkr.json`;

var currcode = 'pkr'
var tocurrcode = 'inr'


const amount = document.getElementById('input')



const btn = document.querySelector("#convert")

const rslt = document.querySelector('.result')


console.log('value is ',amount.value);


function updateflagandfrom(el, index) {
    const selected = el.options[el.selectedIndex]


    const value = selected.value


    code = selected.getAttribute('curcode').toLowerCase()

    console.log(el.value, index, code)


    flag[index].src = `https://flagsapi.com/${value}/shiny/64.png`

    if (index == 0) {

        currcode = code
        BASE_URL =
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currcode}.json`;
        console.log(currcode, index);
    }

    if (index == 1) {
        tocurrcode = code
        console.log(tocurrcode, index);
    }
}








select.forEach((element, index) => {

    for (const key in countryList) {
        const opt = document.createElement("option")
        opt.value = `${countryList[key]}`;
        opt.setAttribute('curcode', `${key}`)


        opt.textContent = `${key}`;

        element.append(opt)

    }

    Array.from(element).forEach(element => {




        if (element.value === 'PK' && (element.parentElement.parentElement.parentElement.classList.contains('from'))) {
            element.selected = true
        }

        if (element.value === 'IN' && (element.parentElement.parentElement.parentElement.classList.contains('to'))) {
            element.selected = true
        }



    });

    element.addEventListener('change', function () {
        updateflagandfrom(element, index);
        rslt.style.display = 'none'
    
        
    });


});





btn.addEventListener('click', async () => {

    
    let resp = await fetch(BASE_URL);
    let text = await resp.json()
    getresult(text);
    rslt.style.display = 'flex'


})

function getresult(text) {

    let rate = text[currcode][tocurrcode];
    const amval = amount.value>0?amount.value:1
    let final = rate * amval
    rslt.textContent = `${amval} ${currcode.toUpperCase()} are equal to  ${final.toFixed(2)} ${tocurrcode.toUpperCase()}`



}


