document.addEventListener("DOMContentLoaded", function () {
  const billAmountInput = document.getElementById("billAmount");
  const tipButtons = document.querySelectorAll(".tip-btn");
  const customTipContainer = document.getElementById("customTipContainer");
  const customTipInput = document.getElementById("customTip");
  const peopleCountInput = document.getElementById("peopleCount");
  const calculateBtn = document.getElementById("calculateBtn");
  const resetBtn = document.getElementById("resetBtn");

  const subtotalEl = document.getElementById("subtotal");
  const tipAmountEl = document.getElementById("tipAmount");
  const totalEl = document.getElementById("total");
  const perPersonEl = document.getElementById("perPerson");

  let selectedTipPercentage = 0;

  // Tip button selection
  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      tipButtons.forEach((btn) => btn.classList.remove("active"));

      if (this.dataset.tip === "custom") {
        // Show custom tip input
        customTipContainer.classList.remove("hidden");
        customTipInput.focus();
        selectedTipPercentage = 0;
      } else {
        // Hide custom tip input if it's visible
        customTipContainer.classList.add("hidden");
        // Set selected tip percentage
        selectedTipPercentage = parseFloat(this.dataset.tip);
        // Add active class to clicked button
        this.classList.add("active");
      }

      // Clear custom tip input if another button is selected
      if (this.dataset.tip !== "custom") {
        customTipInput.value = "";
      }
    });
  });

  // Custom tip input handler
  customTipInput.addEventListener("input", function () {
    selectedTipPercentage = parseFloat(this.value) || 0;
  });

  // Calculate function
  function calculateTip() {
    const billAmount = parseFloat(billAmountInput.value) || 0;
    const peopleCount = parseInt(peopleCountInput.value) || 1;

    const tipAmount = billAmount * (selectedTipPercentage / 100);
    const totalAmount = billAmount + tipAmount;
    const perPersonAmount = totalAmount / peopleCount;

    // Update UI
    subtotalEl.textContent = `$${billAmount.toFixed(2)}`;
    tipAmountEl.textContent = `$${tipAmount.toFixed(2)}`;
    totalEl.textContent = `$${totalAmount.toFixed(2)}`;
    perPersonEl.textContent = `$${perPersonAmount.toFixed(2)}`;
  }

  // Calculate button click handler
  calculateBtn.addEventListener("click", calculateTip);

  // Reset button click handler
  resetBtn.addEventListener("click", function () {
    billAmountInput.value = "";
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipContainer.classList.add("hidden");
    customTipInput.value = "";
    peopleCountInput.value = "1";
    selectedTipPercentage = 0;

    subtotalEl.textContent = "₹0.00";
    tipAmountEl.textContent = "₹0.00";
    totalEl.textContent = "₹0.00";
    perPersonEl.textContent = "₹0.00";
  });

  // Calculate on input changes
  billAmountInput.addEventListener("input", calculateTip);
  customTipInput.addEventListener("input", calculateTip);
  peopleCountInput.addEventListener("input", calculateTip);
});
