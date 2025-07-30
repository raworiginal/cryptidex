const addAttackBtn = document.querySelector("#add-attack-btn");
const addAttackForm = document.querySelector("#add-attack-form");
const editAttackBtn = document.querySelector("#edit-attack-btn");
const editAttackForm = document.querySelector("#edit-attack-form");

addAttackBtn.addEventListener("click", () => {
  addAttackForm.showModal();
});

editAttackBtn.addEventListener("click", () => {
  editAttackForm.showModal();
});
