/*
- Create two sections in the middle of the page 

1- The first section contains two elements:
  - A text input.
  - A color input.

When the user clicks on the color input, a color picker will appear.
Whatever color the user chooses, the background color of the page will change accordingly.
The hex code of the selected color will be displayed in the text input.

2- Dynamic Color Change:
By modifying the code in the text input, the color of the page should update.

3- In the second section(History Section):
Display the last 10 colors selected by the user.
*/


const body=document.querySelector("body");
const allSection=document.querySelector(".all");


// sec1
const section1=document.createElement("section");
section1.classList.add("sec1");
allSection.append(section1);



// sec2
const section2=document.createElement("section");
section2.classList.add("secTow");

section2.innerHTML=`

<span class="history-part">History Section</span>
<section class="history"></section>
`;


allSection.append(section2);
const historySec=document.querySelector(".history");



section1.innerHTML=`
   <input type="text" class="text-input" placeholder="Write...." />
    <label for="color"></label>
    <input type="color" id="color"/>
`

const textIn=document.querySelector(".text-input");
const colorIn=document.querySelector("#color");
///////////////////////////////////////////////////////////////////////////////////////



function check(color) {

  const divEl=document.createElement("div");
  divEl.style.backgroundColor=color.toLowerCase();

  
   return divEl.style.backgroundColor !=="";
  
}

function addColor(color) {
if (!check(color)) {
  alert("Please enter a valid color.");
  return
}
  const articleElement=document.createElement("article");
  articleElement.classList.add("choosen-color");
  articleElement.innerHTML=`
  <article class="rectangle"    style="background-color:${color}"></article>
  <span   class="color-code">${color}</span>`

  historySec.append(articleElement);


if (historySec.children.length>10) {

  historySec.removeChild(historySec.firstChild);
  
}

  
}


colorIn.addEventListener("input",(e)=>{

body.style.backgroundColor=e.target.value;
textIn.value=e.target.value;
const choosen=e.target.value;
addColor(choosen);


})


textIn.addEventListener("input",(e)=>{
const writtenColor=e.target.value.trim();

if (check(writtenColor)) {
  body.style.backgroundColor=writtenColor;
  colorIn.value=writtenColor;
  const choosen=writtenColor;
  addColor(choosen);
}


  })
  






