// Basic form interactions for the mortgage calculator
document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const openModalBtn = document.querySelector(".open-modal-btn");
  const closeModalBtn = document.querySelector(".close-modal-btn");
  const modalOverlay = document.getElementById("modal-overlay");

  // Form elements
  const clearBtn = document.querySelector(".clear-btn");
  const calculateBtn = document.querySelector(".calculate-btn");
  const inputs = document.querySelectorAll('input[type="number"]');
  const radioInputs = document.querySelectorAll('input[type="radio"]');

  // Modal functionality
  function openModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Event listeners for modal
  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside the calculator card
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // Clear all form inputs
  clearBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Clear all number inputs
    inputs.forEach((input) => {
      input.value = "";
    });

    // Reset radio buttons to first option
    const firstRadio = document.getElementById("repayment");
    if (firstRadio) {
      firstRadio.checked = true;
    }

    // Add visual feedback
    clearBtn.style.color = "hsl(61, 70%, 52%)";
    setTimeout(() => {
      clearBtn.style.color = "hsl(200, 26%, 54%)";
    }, 200);
  });

  // Calculate button interaction (no actual calculation as per requirements)
  calculateBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Basic form validation
    let isValid = true;
    const requiredInputs = [
      "mortgage-amount",
      "mortgage-term",
      "interest-rate",
    ];

    requiredInputs.forEach((inputId) => {
      const input = document.getElementById(inputId);
      if (!input.value.trim()) {
        isValid = false;
        input.parentElement.style.borderColor = "hsl(4, 69%, 50%)";
        setTimeout(() => {
          input.parentElement.style.borderColor = "hsl(200, 24%, 40%)";
        }, 2000);
      }
    });

    if (isValid) {
      // Visual feedback for successful form submission
      calculateBtn.style.background = "hsl(145, 63%, 42%)";
      calculateBtn.innerHTML = '<i class="bx bx-check"></i>Calculating...';

      setTimeout(() => {
        calculateBtn.style.background = "hsl(61, 70%, 52%)";
        calculateBtn.innerHTML =
          '<i class="bx bx-calculator"></i>Calculate Repayments';
      }, 1500);
    }
  });

  // Input focus effects
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.borderColor = "hsl(61, 70%, 52%)";
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.style.borderColor = "hsl(200, 24%, 40%)";
      }
    });

    // Number input formatting
    input.addEventListener("input", function () {
      if (this.id === "mortgage-amount") {
        // Format mortgage amount with commas
        let value = this.value.replace(/,/g, "");
        if (value && !isNaN(value)) {
          this.value = Number(value).toLocaleString();
        }
      }
    });
  });

  // Radio button interactions
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove active state from all radio options
      document.querySelectorAll(".radio-option").forEach((option) => {
        option.classList.remove("active");
      });

      // Add active state to selected option
      if (this.checked) {
        this.closest(".radio-option").classList.add("active");
      }
    });
  });

  // Initialize first radio button as checked
  const firstRadio = document.getElementById("repayment");
  if (firstRadio && firstRadio.checked) {
    firstRadio.closest(".radio-option").classList.add("active");
  }
});
