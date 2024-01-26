const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll("select");
let btn = document.querySelector("button");
const fromCurr = document.querySelector(".one select");
const toCurr = document.querySelector(".three select");
let para=document.querySelector("p");
let box=document.getElementsByClassName(".third")

for (let select of dropdown) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (select.name === "From" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "To" && currcode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


const abs=async (evt) => {
  let amt = document.querySelector("input");
  let amtval = amt.value;
  if (amtval < 1 || amtval == " ") {
    alert("Invalid Value");
    amt.value = "";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let response=await fetch(URL);
   let data=await response.json();
   let rate = data[toCurr.value.toLowerCase()];
   let finalamount=amtval*rate;
   const ans = finalamount.toFixed(3);
   para.innerText=`${amtval} ${fromCurr.value} = ${ans} ${toCurr.value}`;
 
}
btn.addEventListener("click",function(){
  abs();
})
let Input=document.querySelector("input");
Input.addEventListener("keydown",function(event){
  if(event.key=="Enter")
  abs();
})

