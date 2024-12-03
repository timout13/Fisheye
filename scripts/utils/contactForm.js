// eslint-disable-next-line no-unused-vars


function handleForm() {
  const btnContact = document.querySelector(".submit-btn");
  btnContact.addEventListener("click", (e) => {
    e.preventDefault();
    const lastname = document.querySelector("[name='lastname']");
    const firstname = document.querySelector("[name='firstname']");
    const email = document.querySelector("[name='email']");
    const msg = document.querySelector("[name='message']");
    const form = document.querySelector(".form-contact");

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

export {handleForm};
