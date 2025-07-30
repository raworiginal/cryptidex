const addAttackBtn = document.querySelector("#add-attack-btn");
const addAttackForm = document.querySelector("#add-attack-form");
const editAttackBtns = document.querySelectorAll(".edit-attack-btn");

addAttackBtn.addEventListener("click", () => {
  addAttackForm.showModal();
});

editAttackBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(`#modal-${btn.id}`).showModal();
  });
});
