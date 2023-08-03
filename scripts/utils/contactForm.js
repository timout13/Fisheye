function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.classList.add("modalwp--show");
}

function closeModal() {
    const modal = document.querySelector(".modalwp--show");
    modal.classList.remove("modalwp--show");
}
