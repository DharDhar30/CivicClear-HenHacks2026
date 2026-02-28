// ===== Auth guard: block dashboard if not logged in =====
const currentUser = localStorage.getItem("civicclear_current_user");
if (!currentUser) {
  window.location.href = "login_signup/login.html";
}

// ===== Welcome + Logout =====
document.getElementById("welcomeText").textContent = `Welcome, ${currentUser}`;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("civicclear_current_user");
  window.location.href = "login_signup/login.html";
});

// ===== Tabs + Feature content =====
const tabs = document.querySelectorAll(".tab");
const panelTitle = document.getElementById("panelTitle");
const userInput = document.getElementById("userInput");

const exampleBtn = document.getElementById("exampleBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const riskBadge = document.getElementById("riskBadge");
const summaryText = document.getElementById("summaryText");
const keyPointsList = document.getElementById("keyPointsList");
const actionsList = document.getElementById("actionsList");
const accessibleText = document.getElementById("accessibleText");

let currentTab = "guidance";

const titles = {
  guidance: "Civic Text Guidance",
  carbon: "Personal Carbon Footprint Tracker",
  emergency: "Emergency Route Planner",
  resources: "Resource Recommendation Engine",
  planner: "Smart Planner / Organizer"
};

const examples = {
  guidance: "EMERGENCY ALERT: A severe thunderstorm warning is in effect until 8:30 PM. Winds may exceed 60 mph. Avoid windows and do not drive through flooded roads.",
  carbon: "Today I drove 18 miles, used AC for 6 hours, and ate beef once.",
  emergency: "Location: Newark, DE. Disaster: Flood. Need evacuation steps and hazards to avoid.",
  resources: "I need help with rent and food assistance in Delaware. What should I do next?",
  planner: "Tasks: lab report due Friday, quiz Wednesday, work Thu 5–9, grocery run."
};

function setRisk(level){
  riskBadge.textContent = level;
  riskBadge.classList.remove("low","med","high");
  if (level === "Low") riskBadge.classList.add("low");
  if (level === "Medium") riskBadge.classList.add("med");
  if (level === "High") riskBadge.classList.add("high");
}

function clearOutput(){
  setRisk("Low");
  summaryText.textContent = "Your result will appear here.";
  accessibleText.textContent = "";
  keyPointsList.innerHTML = "";
  actionsList.innerHTML = "";
}

function setActiveTab(tabName){
  currentTab = tabName;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  panelTitle.textContent = titles[tabName];
  userInput.value = "";
  clearOutput();
}

function renderResult(result){
  setRisk(result.risk);
  summaryText.textContent = result.summary;

  keyPointsList.innerHTML = "";
  result.keyPoints.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    keyPointsList.appendChild(li);
  });

  actionsList.innerHTML = "";
  result.actions.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    actionsList.appendChild(li);
  });

  accessibleText.textContent = result.accessible;
}

// Simple mock results (replace later with real AI API)
function generateMockResult(input){
  const lowered = input.toLowerCase();
  let risk = "Low";
  if (lowered.includes("warning") || lowered.includes("evac") || lowered.includes("flood") || lowered.includes("fire")) risk = "High";
  else if (lowered.includes("recommend") || lowered.includes("should")) risk = "Medium";

  if (currentTab === "carbon") {
    return {
      risk: "Medium",
      summary: "Your estimated footprint today is moderate based on transportation and energy use.",
      keyPoints: ["Driving increases emissions", "AC use increases electricity demand", "Diet choices can raise impact"],
      actions: ["Combine trips or carpool once this week", "Raise thermostat 1–2°F when possible", "Swap one beef meal for beans/chicken"],
      accessible: "Moderate footprint today. Biggest factors: driving and AC. Small changes can help."
    };
  }

  if (currentTab === "emergency") {
    return {
      risk: "High",
      summary: "Flood conditions can become dangerous quickly. Prioritize early safety steps.",
      keyPoints: ["Avoid driving through water", "Move essentials to higher ground", "Monitor official alerts"],
      actions: ["Pack a go-bag (ID, meds, water, charger)", "Plan a route to higher ground/shelter", "Leave early if water rises"],
      accessible: "Flood safety: avoid floodwater, stay informed, and move to higher ground if needed."
    };
  }

  if (currentTab === "resources") {
    return {
      risk: "Medium",
      summary: "Start with local referral services and gather documents for assistance applications.",
      keyPoints: ["211 can connect you to local programs", "Rental help often requires proof of lease/income", "Food help may include pantries/SNAP"],
      actions: ["Call 2-1-1 and ask for rent + food help", "Gather ID, lease, pay stubs, bills", "Apply for SNAP or find a nearby pantry"],
      accessible: "You can get rent and food support. Start with 211 and prepare basic documents."
    };
  }

  if (currentTab === "planner") {
    return {
      risk: "Low",
      summary: "Here’s a simple plan that matches deadlines and your schedule.",
      keyPoints: ["Quiz prep comes first (Wednesday)", "Lab report needs 2 sessions", "Errands fit before your work shift"],
      actions: ["Today: 60 min quiz study + outline report", "Tomorrow: finish quiz study + draft report", "Thursday: grocery run before work"],
      accessible: "Study for the quiz first, then finish the report in two sessions. Do errands before work."
    };
  }

  // guidance default
  return {
    risk,
    summary: "This message contains important information. Here’s the simplified meaning and next steps.",
    keyPoints: ["Main message simplified", "Key details highlighted", "What to avoid and why"],
    actions: ["Follow official instructions", "Prepare essentials and stay informed", "Avoid hazards mentioned in the alert"],
    accessible: "Plain version: focus on the key steps, avoid risky actions, and check official updates."
  };
}

// Events
tabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));

exampleBtn.addEventListener("click", () => {
  userInput.value = examples[currentTab];
});

generateBtn.addEventListener("click", () => {
  const input = userInput.value.trim();
  if (!input) return alert("Please enter something first.");
  renderResult(generateMockResult(input));
});

copyBtn.addEventListener("click", async () => {
  const text =
`Risk: ${riskBadge.textContent}

Summary:
${summaryText.textContent}

Key Points:
- ${Array.from(keyPointsList.children).map(li => li.textContent).join("\n- ")}

Recommended Actions:
- ${Array.from(actionsList.children).map(li => li.textContent).join("\n- ")}

Accessible Version:
${accessibleText.textContent}
`;
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  } catch {
    alert("Copy failed in this browser.");
  }
});

// Start
setActiveTab("guidance");