const addAttackBtn = document.querySelector("#add-attack-btn");
const addAttackForm = document.querySelector("#add-attack-form");
const editAttackBtns = document.querySelectorAll(".edit-attack-btn");
const addPowerBtn = document.querySelector("#add-power-btn");
const addPowerForm = document.querySelector("#add-power-form");
const editPowerBtns = document.querySelectorAll(".edit-power-btn");
const infoBtn = document.querySelector("#info-btn");
const infoModal = document.querySelector("#info-modal");
infoBtn.addEventListener("click", () => {
  infoModal.showModal();
});

if (addPowerBtn) {
  addPowerBtn.addEventListener("click", () => {
    addPowerForm.showModal();
  });
}
if (addAttackBtn) {
  addAttackBtn.addEventListener("click", () => {
    addAttackForm.showModal();
  });
}

editAttackBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(`#modal-${btn.id}`).showModal();
  });
});

editPowerBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(`#modal-${btn.id}`).showModal();
  });
});
