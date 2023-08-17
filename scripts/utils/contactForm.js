function displayModal() {
    const modal = document.getElementById("contact_modal");
    const main = document.querySelector("main");
    const header = document.querySelector(".header");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");
	modal.classList.add("modalwp--show");
}

function closeModal() {
    const modal = document.querySelector(".modalwp--show");
    const main = document.querySelector("main");
    const header = document.querySelector(".header");
    main.setAttribute("aria-hidden", "false");
    header.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("modalwp--show");
}

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
        }
        form.reset();
        console.log(formValues);
    })

}

handleForm();