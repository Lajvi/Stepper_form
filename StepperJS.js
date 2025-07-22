let currentStep = 0;
const steps = document.querySelectorAll(".step");
const indicators = document.querySelectorAll(".step-indicator");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

showStep(currentStep);

function showStep(n) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === n);
    indicators[index].classList.toggle("active", index <= n);
  });

  prevBtn.style.display = n === 0 ? "none" : "inline-block";
  nextBtn.textContent = n === steps.length - 1 ? "Submit" : "Next";

  if (n === steps.length - 1) displaySummary();
}

function changeStep(n) {
  if (n === 1 && !validateForm()) return;

  currentStep += n;

  if (currentStep >= steps.length) {
    document.getElementById("stepForm").submit();
    return;
  }

  showStep(currentStep);
}

function validateForm() {
  const activeStep = steps[currentStep];
  const inputs = activeStep.querySelectorAll("input, select");

  for (let input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      return false;
    }

    if (input.id === "city" && /[^a-zA-Z\s]/.test(input.value)) {
      alert("City should contain only letters.");
      return false;
    }

    if (input.id === "pincode" && !/^\d{6}$/.test(input.value)) {
      alert("PIN Code must be exactly 6 digits.");
      return false;
    }

    if (input.id === "contact" && !/^\d{10}$/.test(input.value)) {
      alert("Contact number must be exactly 10 digits.");
      return false;
    }
  }

  return true;
}

function displaySummary() {
  const summaryBox = document.getElementById("summaryBox");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("pincode").value;
  const skills = document.getElementById("skills").value;

  summaryBox.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Date of Birth:</strong> ${dob}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>PIN:</strong> ${pincode}</p>
    <p><strong>Skills:</strong> ${skills}</p>
  `;
}
