const currentUser = localStorage.getItem("civicclear_current_user");
if (!currentUser) {
  window.location.href = "login_signup/login.html";
}

document.getElementById("welcomeText").textContent = `Welcome, ${currentUser}`;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("civicclear_current_user");
  window.location.href = "login_signup/login.html";
});


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

// ===== Tab titles =====
const titles = {
  guidance: "Civic Text Guidance",
  carbon: "Personal Carbon Footprint Tracker",
  emergency: "Emergency Route Planner",
  resources: "Resource Recommendation Engine",
  planner: "Smart Planner / Organizer"
};

// ===== Example inputs =====
const examples = {
  guidance:
    "EMERGENCY ALERT: A severe thunderstorm warning is in effect until 8:30 PM. Winds may exceed 60 mph. Avoid windows and do not drive through flooded roads.",
  carbon:
    "Today I drove 18 miles, used AC for 6 hours, and ate beef once.",
  emergency:
    "Location: Newark, DE. Disaster: Flood. Need evacuation steps and hazards to avoid.",
  resources:
    "I need help with rent and food assistance in Delaware. What should I do next?",
  planner:
    "Tasks: lab report due Friday, quiz Wednesday, work Thu 5–9, grocery run."
};

// ===== Risk badge UI =====
function setRisk(level) {
  riskBadge.textContent = level;
  riskBadge.classList.remove("low", "med", "high");

  if (level === "Low") riskBadge.classList.add("low");
  if (level === "Medium") riskBadge.classList.add("med");
  if (level === "High") riskBadge.classList.add("high");
}

// ===== Clear output =====
function clearOutput() {
  setRisk("Low");
  summaryText.textContent = "Your result will appear here.";
  accessibleText.textContent = "";
  keyPointsList.innerHTML = "";
  actionsList.innerHTML = "";
}

// ===== Switch tabs =====
function setActiveTab(tabName) {
  currentTab = tabName;

  tabs.forEach(tab =>
    tab.classList.toggle("active", tab.dataset.tab === tabName)
  );

  panelTitle.textContent = titles[tabName];
  userInput.value = "";
  clearOutput();
}

// ===== Render result =====
function renderResult(result) {
  setRisk(result.risk);

  summaryText.textContent = result.summary;

  keyPointsList.innerHTML = "";
  result.keyPoints.forEach(point => {
    const li = document.createElement("li");
    li.textContent = point;
    keyPointsList.appendChild(li);
  });

  actionsList.innerHTML = "";
  result.actions.forEach(action => {
    const li = document.createElement("li");
    li.textContent = action;
    actionsList.appendChild(li);
  });

  accessibleText.textContent = result.accessible;
}

function generateMockResult(input){
// ===== Gemini AI call for Civic Guidance =====
async function generateGuidanceWithGemini(userText) {

  const prompt = `
You are CivicClear, an AI civic assistant.

Analyze the user's civic or emergency-related input.

Return ONLY valid JSON in this exact format:

{
  "risk": "Low" | "Medium" | "High",
  "summary": string,
  "keyPoints": string[],
  "actions": string[],
  "accessible": string
}

Guidelines:

- High risk = immediate danger (fire, evacuation, severe storm, violence, disaster)
- Medium risk = urgent but not life-threatening (warnings, disruptions, health advisories)
- Low risk = general civic information or routine notices

Be accurate, clear, and helpful.
Provide practical steps.
If unclear, recommend checking official sources.

User input:
${userText}

Return ONLY JSON.
`;

  const response = await fetch("http://localhost:5050/api/gemini", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      prompt: prompt
    })

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Gemini failed");
  }

  const raw = data.text || "";

// Remove Markdown code fences if Gemini adds them
const cleaned = raw
  .replace(/```json/gi, "")
  .replace(/```/g, "")
  .trim();

// Extract the first JSON object from the text
const start = cleaned.indexOf("{");
const end = cleaned.lastIndexOf("}");

if (start === -1 || end === -1) {
  throw new Error("AI did not return JSON. Raw response: " + cleaned.slice(0, 120));
}

const jsonStr = cleaned.slice(start, end + 1);
return JSON.parse(jsonStr);
}
}
// ===== Mock results for other tabs =====
function generateMockResult(input) {

  const lowered = input.toLowerCase();

  let risk = "Low";

  if (
    lowered.includes("warning") ||
    lowered.includes("evac") ||
    lowered.includes("flood") ||
    lowered.includes("fire")
  ) {
    risk = "High";
  }
  else if (
    lowered.includes("recommend") ||
    lowered.includes("should")
  ) {
    risk = "Medium";
  }

  if (currentTab === "carbon") {
    return {
      risk: "Medium",
      summary:
        "Your estimated footprint today is moderate based on transportation and energy use.",
      keyPoints: [
        "Driving increases emissions",
        "AC use increases electricity demand",
        "Diet choices affect carbon impact"
      ],
      actions: [
        "Reduce driving distance",
        "Increase thermostat slightly",
        "Reduce high-impact foods"
      ],
      accessible:
        "Your carbon footprint today is moderate. Reducing driving and AC use can help."
    };
  }

  if (currentTab === "emergency") {
    return {
      risk: "High",
      summary:
        "Emergency conditions detected. Early preparation improves safety.",
      keyPoints: [
        "Conditions may worsen quickly",
        "Evacuation may be necessary",
        "Follow official alerts"
      ],
      actions: [
        "Prepare emergency supplies",
        "Identify evacuation routes",
        "Monitor official instructions"
      ],
      accessible:
        "Emergency detected. Prepare and follow official guidance."
    };
  }

  if (currentTab === "resources") {
    return {
      risk: "Medium",
      summary:
        "Support resources are available for your situation.",
      keyPoints: [
        "Local programs can help",
        "Documentation may be required",
        "Multiple assistance types exist"
      ],
      actions: [
        "Contact local resource centers",
        "Prepare documents",
        "Apply for assistance programs"
      ],
      accessible:
        "Help is available. Contact local services and prepare required documents."
    };
  }

  if (currentTab === "planner") {
    return {
      risk: "Low",
      summary:
        "Tasks organized into a simple plan.",
      keyPoints: [
        "Prioritize urgent deadlines",
        "Break work into smaller tasks",
        "Schedule efficiently"
      ],
      actions: [
        "Complete urgent tasks first",
        "Schedule focused work sessions",
        "Plan remaining tasks"
      ],
      accessible:
        "Focus on urgent tasks first, then complete remaining tasks step by step."
    };
  }

  return {
    risk,
    summary:
      "Information detected. Review and follow guidance.",
    keyPoints: [
      "Important information identified",
      "Review carefully",
      "Follow instructions"
    ],
    actions: [
      "Read full message",
      "Follow official guidance",
      "Stay informed"
    ],
    accessible:
      "Review information and follow instructions."
  };
}

tabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));
// ===== Tab click events =====
tabs.forEach(tab =>
  tab.addEventListener("click", () =>
    setActiveTab(tab.dataset.tab)
  )
);

// ===== Example button =====
exampleBtn.addEventListener("click", () => {
  userInput.value = examples[currentTab];
});

// ===== Generate button =====
generateBtn.addEventListener("click", async () => {

  const input = userInput.value.trim();

  if (!input) {
    alert("Please enter something first.");
    return;
  }

  try {

    // loading state
    setRisk("Low");
    summaryText.textContent = "Generating AI response...";
    keyPointsList.innerHTML = "";
    actionsList.innerHTML = "";
    accessibleText.textContent = "";

    if (currentTab === "guidance") {

      const result = await generateGuidanceWithGemini(input);

      renderResult(result);

    } else {

      renderResult(generateMockResult(input));

    }

  }
  catch (error) {
  console.error("Gemini error:", error);
  alert("AI failed: " + (error?.message || error));
  renderResult(generateMockResult(input));
}

});

// ===== Copy button =====
copyBtn.addEventListener("click", async () => {

  const text = `
Risk: ${riskBadge.textContent}

Summary:
${summaryText.textContent}

Key Points:
- ${Array.from(keyPointsList.children).map(li => li.textContent).join("\n- ")}

Actions:
- ${Array.from(actionsList.children).map(li => li.textContent).join("\n- ")}

Accessible Version:
${accessibleText.textContent}
`;

  try {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }
  catch {
    alert("Copy failed.");
  }

});

// ===== Start =====
setActiveTab("guidance");
