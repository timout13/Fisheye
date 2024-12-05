import {applyClassAndAttrsToElement} from "./domManipulation.js";

function handleForm() {
  const btnContact = document.querySelector(".submit-btn");
  btnContact.addEventListener("click", (e) => {
    e.preventDefault();
    resetFormErrors();
    const {lastname, firstname, email, msg} = getFormVars();
    const form = document.querySelector(".form-contact");
    const regexpStringTxt = /^[^\d]{3,}$/;
    const regexpString = /^.{3,}$/;
    const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let bool_error = false;
    if(!regexpStringTxt.test(lastname.value)){
      handleError(lastname);
      bool_error = true;
    }
    if(!regexpStringTxt.test(firstname.value)){
      handleError(firstname);
      bool_error = true;
    }
    if(!regexMail.test(email.value)){
      handleError(email);
      bool_error = true;
    }
    if(!regexpString.test(msg.value)){
      handleError(msg);
      bool_error = true;
    }
    if(bool_error)
      return;
    const formValues = {
      lastname: lastname.value,
      firstname: firstname.value,
      email: email.value,
      msg: msg.value
    };
    form.reset();
    console.log(formValues);
  });

}
function getFormVars(){

  const lastname = document.querySelector("[name='lastname']");
  const firstname = document.querySelector("[name='firstname']");
  const email = document.querySelector("[name='email']");
  const msg = document.querySelector("[name='message']");
  return {lastname, firstname, email, msg};
}
function resetFormErrors(){
  const errors = document.querySelectorAll(".form-error");
  const varInputs = getFormVars();
  errors.forEach(error=> error.classList.remove("show"));
  Object.values(varInputs).forEach(element => {
    if (element && element.classList.contains("failure-border")) {
      element.classList.remove("failure-border");
    }
  });
}

function handleError(element){
  const key = element.getAttribute("name");
  const errorDom = element.parentElement.querySelector(`.form-error.${key}`);
  errorDom.classList.add("show");
  applyClassAndAttrsToElement(element,["failure","failure-border"]);
  setTimeout(()=>{
    element.classList.remove("failure");
  },3000);
}
export {handleForm};
