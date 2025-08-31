const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const resultDiv = document.getElementById("result");
const marker = document.getElementById("bmiMarker");
const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearHistoryBtn");

// Load history on page load
window.addEventListener("load", displayHistory);

document.getElementById("calculateBtn").addEventListener("click", function() {
  const weight = parseFloat(weightInput.value);
  const heightCm = parseFloat(heightInput.value);

  if (!weight || !heightCm) {
    resultDiv.innerHTML = "Please enter valid weight and height.";
    resultDiv.style.color = "#e67e22";
    marker.style.display = "none";
    return;
  }

  const heightM = heightCm / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);

  let category = "";
  let color = "";
  let tips = [];

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#3498db";
    tips = [
      "Eat more nutrient-rich foods and gain healthy weight.",
      "Include nuts, dairy, and lean protein in your diet.",
      "Try small frequent meals to increase calorie intake."
    ];
  } else if (bmi < 25) {
    category = "Normal";
    color = "#2ecc71";
    tips = [
      "Maintain your weight with balanced diet and exercise.",
      "Stay active and hydrate well daily.",
      "Include a variety of fruits and vegetables in your meals."
    ];
  } else if (bmi < 30) {
    category = "Overweight";
    color = "#e67e22";
    tips = [
      "Try light exercise and a balanced diet to manage weight.",
      "Reduce sugary drinks and processed foods.",
      "Take short walks after meals to aid digestion."
    ];
  } else {
    category = "Obese";
    color = "#e74c3c";
    tips = [
      "Consult a healthcare professional and follow a healthy diet plan.",
      "Focus on portion control and regular physical activity.",
      "Track your meals and exercise to monitor progress."
    ];
  }

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  // Update result text
  resultDiv.innerHTML = `
    Your BMI: ${bmi}<br>
    Category: ${category}<br>
    <small style="display:block;margin-top:5px;font-weight:normal;color:#555;">${randomTip}</small>
  `;
  resultDiv.style.color = color;

  // Show and animate marker
  marker.style.display = "block";
  marker.style.backgroundColor = color;
  marker.style.left = Math.min((bmi / 40) * 100, 100) + "%";
  marker.innerText = bmi;

  // Save to history
  const record = {
    bmi,
    category,
    tip: randomTip,
    date: new Date().toLocaleString()
  };

  let history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  history.unshift(record); // newest first
  localStorage.setItem("bmiHistory", JSON.stringify(history));

  displayHistory();
});

// Display BMI history
function displayHistory() {
  const history = JSON.parse(localStorage.getItem("bmiHistory")) || [];
  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.bmi}</strong> - ${item.category} <br><small>${item.tip} (${item.date})</small>`;
    historyList.appendChild(li);
  });
}

// Clear history
clearBtn.addEventListener("click", function() {
  localStorage.removeItem("bmiHistory");
  displayHistory();
});


const themeToggleBtn = document.getElementById("themeToggleBtn");

// Load theme on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("bmiTheme") || "light";
  document.body.className = savedTheme + "-theme";
});

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  let currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
  let newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.className = newTheme + "-theme";
  localStorage.setItem("bmiTheme", newTheme);
});
