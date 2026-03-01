const currentUser = localStorage.getItem("civicclear_current_user");
if (!currentUser) {
  window.location.href = "login_signup/login.html";
}

// ===== Per-user storage helpers =====
function userKey(suffix) {
  // Safe key format in case username has spaces
  const u = encodeURIComponent(currentUser || "unknown");
  return `civicclear_user_${u}_${suffix}`;
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===== Welcome + Logout =====
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

const titles = {
  guidance: "Civic Text Guidance",
  carbon: "Personal Carbon Footprint Tracker",
  emergency: "Emergency Route Planner",
  resources: "Resource Recommendation Engine",
  planner: "Smart Planner / Organizer"
};

// Slightly improved demo example (location + flooding mention)
const examples = {
  guidance:
    "EMERGENCY ALERT: Severe thunderstorm warning for Newark, DE until 8:30 PM. Winds may exceed 60 mph. Heavy rain and flash flooding possible. Avoid windows and do not drive through flooded roads.",
  carbon:
    "Today I drove 18 miles, used AC for 6 hours, and ate beef once.",
  emergency:
    "Location: Newark, DE. Disaster: Flood. Need evacuation steps and hazards to avoid.",
  resources:
    "I need help with rent and food assistance in Delaware. What should I do next?",
  planner:
    "Tasks: lab report due Friday, quiz Wednesday, work Thu 5–9, grocery run."
};

function setRisk(level) {
  riskBadge.textContent = level;
  riskBadge.classList.remove("low", "med", "high");
  if (level === "Low") riskBadge.classList.add("low");
  if (level === "Medium") riskBadge.classList.add("med");
  if (level === "High") riskBadge.classList.add("high");
}

function clearOutput() {
  setRisk("Low");
  summaryText.textContent = "Your result will appear here.";
  accessibleText.textContent = "";
  keyPointsList.innerHTML = "";
  actionsList.innerHTML = "";
}

function setActiveTab(tabName) {
  currentTab = tabName;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  panelTitle.textContent = titles[tabName];
  userInput.value = "";
  clearOutput();

  // show dashboard only on guidance tab
  const homeDash = document.getElementById("homeDash");
  if (homeDash) homeDash.style.display = (tabName === "guidance") ? "block" : "none";
}

function renderResult(result) {
  setRisk(result.risk);
  summaryText.textContent = result.summary;

  keyPointsList.innerHTML = "";
  (result.keyPoints || []).forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    keyPointsList.appendChild(li);
  });

  actionsList.innerHTML = "";
  (result.actions || []).forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    actionsList.appendChild(li);
  });

  accessibleText.textContent = result.accessible || "";
}


async function generateGuidanceWithGemini(userText) {
  const prompt = `
You are CivicClear, an AI civic assistant.

Analyze the user's civic or emergency-related input and return ONLY valid JSON with EXACTLY these keys:

{
  "risk": "Low" | "Medium" | "High",
  "summary": string,
  "keyPoints": string[],
  "actions": string[],
  "accessible": string
}

Guidelines:
- High risk = immediate danger (fire, evacuation, severe storm, violence, disaster).
- Medium risk = urgent but not life-threatening (advisories, disruptions, time-sensitive notices).
- Low risk = general civic info or routine announcements.
- Provide practical, realistic steps and recommend official sources when relevant.
- Keep keyPoints to 3–6 items and actions to 3–8 items.
- Do NOT use Markdown. Do NOT wrap JSON in backticks. Output JSON only.

User input:
"""${userText}"""

Return ONLY JSON.
`.trim();

  const response = await fetch("http://localhost:5050/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Gemini request failed");
  }

  // Robust JSON extraction (handles ```json fences or extra text)
  const raw = data.text || "";
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("AI did not return JSON. Raw: " + cleaned.slice(0, 140));
  }

  const jsonStr = cleaned.slice(start, end + 1);
  return JSON.parse(jsonStr);
}


function generateMockResult(input) {
  const lowered = (input || "").toLowerCase();
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
      summary: "Emergency conditions can become dangerous quickly. Prioritize early safety steps.",
      keyPoints: ["Avoid driving through water", "Move essentials to higher ground", "Monitor official alerts"],
      actions: ["Pack a go-bag (ID, meds, water, charger)", "Plan a route to higher ground/shelter", "Leave early if conditions worsen"],
      accessible: "Emergency safety: avoid hazards, stay informed, and move to safety if needed."
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

  // guidance fallback
  return {
    risk,
    summary: "This message contains important information. Here’s the simplified meaning and next steps.",
    keyPoints: ["Main message simplified", "Key details highlighted", "What to avoid and why"],
    actions: ["Follow official instructions", "Prepare essentials and stay informed", "Avoid hazards mentioned in the alert"],
    accessible: "Plain version: focus on the key steps, avoid risky actions, and check official updates."
  };
}

// ===== Events =====
tabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));

exampleBtn.addEventListener("click", () => {
  userInput.value = examples[currentTab];
});

generateBtn.addEventListener("click", async () => {
  const input = userInput.value.trim();
  if (!input) return alert("Please enter something first.");

  try {
    // Loading state
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
  } catch (error) {
    console.error("Gemini error:", error);
    alert("AI failed: " + (error?.message || error));
    renderResult(generateMockResult(input));
  }
});

copyBtn.addEventListener("click", function() {

  // Build the text to copy
  var text = "Risk: " + riskBadge.textContent + "\n\n";
  text += "Summary:\n" + summaryText.textContent + "\n\n";

  text += "Key Points:\n";
  for (var i = 0; i < keyPointsList.children.length; i++) {
    text += "- " + keyPointsList.children[i].textContent + "\n";
  }

  text += "\nRecommended Actions:\n";
  for (var i = 0; i < actionsList.children.length; i++) {
    text += "- " + actionsList.children[i].textContent + "\n";
  }

  text += "\nAccessible Version:\n" + accessibleText.textContent;
  
  navigator.clipboard.writeText(text).then(function() {
    alert("Copied!");
  }).catch(function() {
    alert("Copy failed in this browser.");
  });

});

// ===== Home Dashboard (Eco Score + Quick Actions) — PER USER =====
const ecoScoreNum = document.getElementById("ecoScoreNum");
const streakNum = document.getElementById("streakNum");
const lastActiveText = document.getElementById("lastActiveText");
const impactStatus = document.getElementById("impactStatus");
const impactSaved = document.getElementById("impactSaved");
const impactEquivalent = document.getElementById("impactEquivalent");

// Choose your default for brand-new users:
const DEFAULT_ECO_SCORE = 50;

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatLastActive(ymd) {
  if (!ymd) return "Never";
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, (m - 1), d);
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" }); // e.g., "Feb 28"
}

// Load user-specific saved values (or defaults if new user)
let ecoScore = parseInt(localStorage.getItem(userKey("ecoScore")) || String(DEFAULT_ECO_SCORE), 10);
let streak = parseInt(localStorage.getItem(userKey("streak")) || "0", 10);
let lastActionDay = localStorage.getItem(userKey("lastActionDay")) || "";

// ✅ Auto-expire streak on login/load (if user missed days)
if (lastActionDay) {
  const last = new Date(lastActionDay);
  const now = new Date(todayKey());
  const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) {
    streak = 0;
    localStorage.setItem(userKey("streak"), "0");
  }
}

// Track today's actions PER USER
let doneToday = loadJSON(userKey("doneToday"), { date: todayKey(), actions: {} });
if (doneToday.date !== todayKey()) {
  doneToday = { date: todayKey(), actions: {} };
  saveJSON(userKey("doneToday"), doneToday);
}

// Render initial UI
ecoScoreNum.textContent = ecoScore;
streakNum.textContent = streak;
if (lastActiveText) lastActiveText.textContent = formatLastActive(lastActionDay);

function refreshQuickButtons() {
  document.querySelectorAll(".qaBtn").forEach(btn => {
    const action = btn.dataset.action;
    const done = !!doneToday.actions[action];
    btn.disabled = done;
    btn.textContent = (done ? "✅ " : "") + btn.textContent.replace(/^✅\s*/, "");
  });
}

function computeTodaySavedKg() {
  const savings = {
    bus: 1.8,
    bottle: 0.1,
    veg: 1.2,
    lights: 0.3
  };

  let saved = 0;
  for (const [action, isDone] of Object.entries(doneToday.actions || {})) {
    if (isDone && savings[action]) saved += savings[action];
  }
  return saved;
}

function setFootprintColor(level) {
  impactStatus.style.fontWeight = "900";
  if (level === "High") impactStatus.style.color = "#e74c3c";
  else if (level === "Medium") impactStatus.style.color = "#f1c40f";
  else impactStatus.style.color = "#2ecc71";
}

function updateImpactSnapshot() {
  const BASELINE = 5.0;

  const saved = computeTodaySavedKg();
  const footprint = Math.max(0, BASELINE - saved);

  let level = "Medium";
  if (footprint >= 4.0) level = "High";
  else if (footprint >= 2.5) level = "Medium";
  else level = "Low";

  impactStatus.textContent = level;
  setFootprintColor(level);

  impactSaved.textContent = `+${saved.toFixed(1)} kg CO₂`;
  const phones = Math.max(0, Math.round(saved * 80));
  impactEquivalent.textContent = `≈ Charging ${phones} phones`;
}

function persistDashboard() {
  localStorage.setItem(userKey("ecoScore"), String(ecoScore));
  localStorage.setItem(userKey("streak"), String(streak));
  localStorage.setItem(userKey("lastActionDay"), lastActionDay);
  saveJSON(userKey("doneToday"), doneToday);
}

refreshQuickButtons();
updateImpactSnapshot();

// Handle quick action taps
document.querySelectorAll(".qaBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (doneToday.actions[action]) return;

    // Mark done today
    doneToday.actions[action] = true;

    // Score bump based on action type
    const scoreBumps = { bus: 3, bottle: 1, veg: 2, lights: 1 };
    ecoScore += (scoreBumps[action] || 1);
    ecoScoreNum.textContent = ecoScore;

    // Streak update: only counts if it’s the first action of the day
    const today = todayKey();
    if (lastActionDay !== today) {
      const last = lastActionDay ? new Date(lastActionDay) : null;
      const now = new Date(today);
      const diffDays = last ? Math.round((now - last) / (1000 * 60 * 60 * 24)) : 999;

      streak = (diffDays === 1) ? (streak + 1) : 1;
      streakNum.textContent = streak;
    }

    // Always update last active when an action is taken
    lastActionDay = today;
    if (lastActiveText) lastActiveText.textContent = formatLastActive(lastActionDay);

    // Save everything per user
    persistDashboard();

    // Refresh UI
    refreshQuickButtons();
    updateImpactSnapshot();
  });
});

// ===== Start =====
setActiveTab("guidance");

// ===== Tooltip mobile support =====
document.querySelectorAll(".tipIcon").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const tip = btn.parentElement.querySelector(".tipText");
    if (!tip) return;

    const isOpen = tip.style.opacity === "1";
    tip.style.opacity = isOpen ? "0" : "1";
    tip.style.transform = isOpen ? "translateY(-4px)" : "translateY(0)";
    tip.style.pointerEvents = isOpen ? "none" : "auto";
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("tipIcon")) return;

  document.querySelectorAll(".tipText").forEach(tip => {
    tip.style.opacity = "0";
    tip.style.transform = "translateY(-4px)";
    tip.style.pointerEvents = "none";
  });
});