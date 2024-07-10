const slider=document.querySelector('.slider');
const length=document.querySelector('.password');
const upperCaseCheck=document.querySelector('#c1');
const lowerCaseCheck=document.querySelector('#c2');
const numberCheck=document.querySelector('#c3');
const symbolCheck=document.querySelector('#c4');
const indicator=document.querySelector('.indicator');
const symbols='-=[]\;`,./~!@#$%^&*()_+{}|:"<>?';
const cpyBtn=document.querySelector('.copyBtn');
const copyMsg = document.querySelector('.copyMsg');
const passwordDisplay=document.querySelector('.passwordDisplay');
const generateButton=document.querySelector('.mvpButton');
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let checkCount=1;
let passwordLength=10;
let password="";

function handleSlider(){
    slider.value=passwordLength;
    length.innerText=passwordLength;
}
handleSlider();

function getRandomInteger(min ,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function getRandomNumber(){
    return getRandomInteger(0,10);
}
function getRandomUpperCharacter(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function getRandomLowerCharacter(){
    return String.fromCharCode(getRandomInteger(97,121));
}
function getRandomSymbols(){
   return symbols.charAt(getRandomInteger(0,symbols.length));
}
function setindicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
  }
function calculateStrength() {
    let hasupper = false;
    let haslower = false;
    let hasNum = false;
    let hasSymbol = false;
  
    if (upperCaseCheck.checked) {
      hasupper = true;
    }
    if (lowerCaseCheck.checked) {
      haslower = true;
    }
    if (numberCheck.checked) {
      hasNum = true;
    }
    if (symbolCheck.checked) {
      hasSymbol = true;
    }
  
    if (hasupper && haslower && (hasNum || hasSymbol) && passwordLength >= 8) {
      setindicator("#0f0");
    } else if (
      (haslower || hasupper) &&
      (hasNum || hasSymbol) &&
      passwordLength >= 6
    ) {
      setindicator("#ff0");
    } else {
      setindicator("#f00");
    }
  }
  async function copyContent() {
    //promise resolve or reject dono ho skta hai so we give in try and catch block
    //copy msg invisible ho gya kuch time ka bad
    try {
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText = "Copied";
    } catch (error) {
      copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
  
    copyMsg.classList.remove('opacity-0');
    copyMsg.classList.add('opacity-100');

            setTimeout(() => {
              copyMsg.classList.add('opacity-0');
                copyMsg.classList.remove('opacity-100');
            }, 2000);
  }
  
  //to add event listener
  //slider ko jb bhi aag picha kr raha hun to slider ki avlue change ho rhi yeh woh value lakar de rha hai
  slider.addEventListener("input", (e) => {
    //pasword length ko updat kr diya
    passwordLength = e.target.value;
  
    handleSlider();
  });
  // add eventListner uspe lagate hai jisko click karte hai
  cpyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
      copyContent();
    }
  });

  function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkBox)=>{
      if(checkBox.checked) checkCount++;
    });

    if(checkCount>passwordLength){
      passwordLength=checkCount;
      handleSlider();
    }
  }
  allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheckBoxChange);
  });

  generateButton.addEventListener('click',()=>{
   // hame pata hona chahiye na ki konsa check hai konsa nahi to uske liye function likho
   if(checkCount<=0){
    return;
   }
   password="";
   passArray=[];
   // isme store karenge function name taki hame pata rhe ki konsa function add karna hai
   if(upperCaseCheck.checked)
    passArray.push(getRandomUpperCharacter);
   if(lowerCaseCheck.checked)
    passArray.push(getRandomLowerCharacter);
   if(numberCheck.checked)
    passArray.push(getRandomNumber);
   if(symbolCheck.checked) 
    passArray.push(getRandomSymbols);
  for(let i=0;i<passArray.length;i++){
    password+=passArray[i]();
  }
  // baaki me randomly generate karlo so landom index generate karo
  for(let i=0;i<passwordLength-passArray.length;i++){
    let randomIndex=getRandomInteger(0,passArray.length);
    password+=passArray[randomIndex]();
  }
  //shuffle isliye kar rhe hai kyoki agar nhi karenge to fix hai ki sequence me aayega answer
  password = shufflePassword(Array.from(password));
  passwordDisplay.value=password;
  calculateStrength();
  }); 

  function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
      //random J, find out using random function
      const j = Math.floor(Math.random() * (i + 1));
      //swap number at i index and j index
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }

  
