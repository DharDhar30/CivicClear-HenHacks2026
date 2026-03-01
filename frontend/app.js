// ===== Login Guard =====
const currentUser = localStorage.getItem("civicclear_current_user");
if (!currentUser) {
  window.location.href = "login_signup/login.html";
}


function userKey(suffix) {
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

function ymdToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function formatYMD(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function dayLabelFromOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const name = d.toLocaleDateString(undefined, { weekday: "short" });
  return { ymd, label: `${name} (${formatYMD(ymd)})` };
}

// ===== Welcome + Logout =====
document.getElementById("welcomeText").textContent = `Welcome, ${currentUser}`;
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("civicclear_current_user");
  window.location.href = "login_signup/login.html";
});

// ===== DOM =====
const tabs = document.querySelectorAll(".tab");
const panelTitle = document.getElementById("panelTitle");

const sharedActions = document.getElementById("sharedActions");
const exampleBtn = document.getElementById("exampleBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// Guidance
const guidanceBox = document.getElementById("guidanceBox");
const userInput = document.getElementById("userInput");

// Eco
const ecoLayout = document.getElementById("ecoLayout");
const ecoScoreBigNum = document.getElementById("ecoScoreBigNum");
const ecoScoreRating = document.getElementById("ecoScoreRating");
const ecoKeyPointsList = document.getElementById("ecoKeyPointsList");
const ecoActionsList = document.getElementById("ecoActionsList");
const ecoAccessibleText = document.getElementById("ecoAccessibleText");
const ecoStatsText = document.getElementById("ecoStatsText");
const ecoHistoryList = document.getElementById("ecoHistoryList");
const ecoCommute = document.getElementById("ecoCommute");
const ecoMiles = document.getElementById("ecoMiles");
const ecoCarpool = document.getElementById("ecoCarpool");
const ecoDiet = document.getElementById("ecoDiet");
const ecoShopping = document.getElementById("ecoShopping");
const ecoRecycleHabit = document.getElementById("ecoRecycleHabit");
const ecoPlastic = document.getElementById("ecoPlastic");

// Normal output (Guidance)
const normalOutput = document.getElementById("normalOutput");
const riskBadge = document.getElementById("riskBadge");
const summaryText = document.getElementById("summaryText");
const keyPointsList = document.getElementById("keyPointsList");
const actionsList = document.getElementById("actionsList");
const accessibleText = document.getElementById("accessibleText");

// Home dashboard
const homeDash = document.getElementById("homeDash");
const ecoScoreNum = document.getElementById("ecoScoreNum");
const streakNum = document.getElementById("streakNum");
const lastActiveText = document.getElementById("lastActiveText");
const impactStatus = document.getElementById("impactStatus");
const impactSaved = document.getElementById("impactSaved");
const impactEquivalent = document.getElementById("impactEquivalent");

// Impact Simulator DOM
const impactBox = document.getElementById("impactBox");
const impactAction = document.getElementById("impactAction");
const impactIntensity = document.getElementById("impactIntensity");
const impactWeeks = document.getElementById("impactWeeks");
const impactSaveToHome = document.getElementById("impactSaveToHome");
const impactRunBtn = document.getElementById("impactRunBtn");
const impactClearBtn = document.getElementById("impactClearBtn");
const impactCO2 = document.getElementById("impactCO2");
const impactCO2Note = document.getElementById("impactCO2Note");
const impactMoney = document.getElementById("impactMoney");
const impactMoneyNote = document.getElementById("impactMoneyNote");
const impactEquiv = document.getElementById("impactEquiv");
const impactScore = document.getElementById("impactScore");
const impactHistoryStats = document.getElementById("impactHistoryStats");
const impactHistoryList = document.getElementById("impactHistoryList");

// Resources DOM
const resourcesBox = document.getElementById("resourcesBox");
const resCategory = document.getElementById("resCategory");
const resLocation = document.getElementById("resLocation");
const resDetails = document.getElementById("resDetails");
const resGenerateBtn = document.getElementById("resGenerateBtn");
const resExampleBtn = document.getElementById("resExampleBtn");
const resLinks = document.getElementById("resLinks");
const resChecklist = document.getElementById("resChecklist");
const resPlain = document.getElementById("resPlain");

// Planner DOM
const plannerBox = document.getElementById("plannerBox");
const planTasks = document.getElementById("planTasks");
const planTime = document.getElementById("planTime");
const planDays = document.getElementById("planDays");
const planSave = document.getElementById("planSave");
const planGenerateBtn = document.getElementById("planGenerateBtn");
const planLoadBtn = document.getElementById("planLoadBtn");
const planClearBtn = document.getElementById("planClearBtn");
const planMeta = document.getElementById("planMeta");
const planSchedule = document.getElementById("planSchedule");
const planToday = document.getElementById("planToday");

let currentTab = "guidance";

const titles = {
  guidance: "Home & Civic Guidance",
  carbon: "Eco Score Calculator",
  impact: "Impact Simulator",
  resources: "Resources Helper",
  planner: "Action Planner"
};

const examples = {
  guidance:
    "EMERGENCY ALERT: Severe thunderstorm warning for Newark, DE until 8:30 PM. Winds may exceed 60 mph. Heavy rain and flash flooding possible. Avoid windows and do not drive through flooded roads.",
  resources:
    "Behind on rent and need food help. I’m in Newark, DE.",
  planner:
    "Lab report — due Fri\nQuiz study — Wed\nWork shift — Thu 5–9pm\nGrocery run — 30 min"
};


function setRisk(level) {
  riskBadge.textContent = level;
  riskBadge.classList.remove("low", "med", "high");
  if (level === "Low") riskBadge.classList.add("low");
  if (level === "Medium") riskBadge.classList.add("med");
  if (level === "High") riskBadge.classList.add("high");
}

function clearNormalOutput() {
  setRisk("Low");
  summaryText.textContent = "Your result will appear here.";
  accessibleText.textContent = "";
  keyPointsList.innerHTML = "";
  actionsList.innerHTML = "";
}

function renderNormalResult(result) {
  setRisk(result.risk || "Low");
  summaryText.textContent = result.summary || "";

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
  if (!response.ok) throw new Error(data.error || "Gemini request failed");

  const raw = data.text || "";
  const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI did not return JSON.");
  return JSON.parse(cleaned.slice(start, end + 1));
}

// ===== Eco output helpers =====
function clearEcoOutput() {
  if (ecoScoreBigNum) ecoScoreBigNum.textContent = "—";
  if (ecoScoreRating) ecoScoreRating.textContent = "Fill inputs and click Calculate";
  ecoKeyPointsList.innerHTML = "";
  ecoActionsList.innerHTML = "";
  ecoAccessibleText.textContent = "";
}

function renderEcoResult(eco) {
  ecoScoreBigNum.textContent = String(eco.score);
  ecoScoreRating.textContent = `${eco.rating} • Saved to history`;

  ecoKeyPointsList.innerHTML = "";
  [eco.commuteText, eco.dietText, eco.consumptionText, eco.wasteText].forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    ecoKeyPointsList.appendChild(li);
  });

  ecoActionsList.innerHTML = "";
  eco.actions.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    ecoActionsList.appendChild(li);
  });

  ecoAccessibleText.textContent = eco.accessible;
}

// ===== Eco calculation =====
function calculateEcoFromForm() {
  const commute = ecoCommute?.value || "car";
  const miles = Number(ecoMiles?.value || 0);

  let score = 100;

  const perMile = {
    walk: 0.0,
    bus: 0.2,
    car: 0.6,
    rideshare: 0.8
  }[commute] ?? 0.6;

  const drivePenalty = miles * perMile;
  score -= drivePenalty;

  if (ecoCarpool?.checked) score += 5;

  const diet = ecoDiet?.value || "mixed";
  const dietPenaltyMap = { vegan: -5, vegetarian: -2, mixed: 6, heavyMeat: 16 };
  const dietPenalty = (dietPenaltyMap[diet] ?? 6);
  score -= dietPenalty;

  const shopping = ecoShopping?.value || "small";
  const shoppingPenaltyMap = { none: -2, small: 2, big: 8 };
  const shoppingPenalty = (shoppingPenaltyMap[shopping] ?? 2);
  score -= shoppingPenalty;

  const recycleHabit = ecoRecycleHabit?.value || "sometimes";
  const recyclePenaltyMap = { always: -3, sometimes: 2, rarely: 6 };
  const recyclePenalty = (recyclePenaltyMap[recycleHabit] ?? 2);
  score -= recyclePenalty;

  const plastic = ecoPlastic?.value || "medium";
  const plasticPenaltyMap = { low: -2, medium: 2, high: 7 };
  const plasticPenalty = (plasticPenaltyMap[plastic] ?? 2);
  score -= plasticPenalty;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let rating = "Excellent";
  if (score < 80) rating = "Good";
  if (score < 60) rating = "Fair";
  if (score < 40) rating = "Poor";

  const commuteLabel =
    commute === "walk" ? "Walk/Bike" :
    commute === "bus" ? "Public Transit" :
    commute === "rideshare" ? "Rideshare" : "Car";

  const dietLabel =
    diet === "vegan" ? "Vegan" :
    diet === "vegetarian" ? "Vegetarian" :
    diet === "heavyMeat" ? "Heavy meat" : "Mixed";

  const shopLabel =
    shopping === "none" ? "No shopping" :
    shopping === "big" ? "Big purchase" : "Small purchase";

  const recycleLabel =
    recycleHabit === "always" ? "Always" :
    recycleHabit === "rarely" ? "Rarely" : "Sometimes";

  const plasticLabel =
    plastic === "low" ? "Low" :
    plastic === "high" ? "High" : "Medium";

  const commuteText = `Transport: ${commuteLabel} • Miles: ${miles} • Impact: -${Math.round(drivePenalty)}${ecoCarpool?.checked ? " • Carpool +5" : ""}`;
  const dietText = `Food: ${dietLabel} • Impact: ${dietPenalty <= 0 ? `+${Math.abs(Math.round(dietPenalty))}` : `-${Math.round(dietPenalty)}`}`;
  const consumptionText = `Consumption: ${shopLabel} • Impact: ${shoppingPenalty <= 0 ? `+${Math.abs(Math.round(shoppingPenalty))}` : `-${Math.round(shoppingPenalty)}`}`;
  const wasteText = `Waste: Recycle ${recycleLabel}, Plastics ${plasticLabel} • Impact: -${Math.round(recyclePenalty + plasticPenalty)}`;

  const biggest = [
    { name: "Driving", value: drivePenalty },
    { name: "Diet", value: Math.max(0, dietPenalty) },
    { name: "Consumption", value: Math.max(0, shoppingPenalty) },
    { name: "Waste", value: Math.max(0, recyclePenalty + plasticPenalty) }
  ].sort((a,b) => b.value - a.value)[0].name;

  let tip1 = "Try one small change today.";
  if (biggest === "Driving") tip1 = "Driving was biggest: combine trips, carpool, or try transit once.";
  if (biggest === "Diet") tip1 = "Diet was biggest: swap one heavy-meat meal for vegetarian/beans.";
  if (biggest === "Consumption") tip1 = "Consumption was biggest: skip one purchase or buy secondhand.";
  if (biggest === "Waste") tip1 = "Waste was biggest: reduce single-use plastics and recycle/compost.";

  const actions = [
    tip1,
    "Aim for a +5 improvement this week by repeating one change 2–3 days.",
    "Track daily to improve your 7-day average."
  ];

  const accessible = `Your Eco Score is ${score} out of 100 (${rating}). Higher is better.`;

  return { score, rating, commuteText, dietText, consumptionText, wasteText, actions, accessible };
}

// ===== Eco history (PER USER) =====
function getEcoHistory() {
  return loadJSON(userKey("ecoHistory"), []);
}
function saveEcoHistory(arr) {
  saveJSON(userKey("ecoHistory"), arr);
}
function upsertTodayEcoScore(score, note) {
  const today = ymdToday();
  let history = getEcoHistory();
  history = history.filter(item => item.date !== today);
  history.unshift({ date: today, score, note });
  history = history.slice(0, 14);
  saveEcoHistory(history);
  return history;
}
function renderEcoHistory() {
  const history = getEcoHistory();
  const last7 = history.slice(0, 7);

  ecoHistoryList.innerHTML = "";

  if (last7.length === 0) {
    ecoStatsText.textContent = "No scores yet. Calculate your first Eco Score today!";
    return;
  }

  const scores = last7.map(x => x.score);
  const avg = Math.round(scores.reduce((a,b) => a + b, 0) / scores.length);
  const best = Math.max(...scores);
  const latest = last7[0].score;

  ecoStatsText.textContent = `Today: ${latest}/100 • 7-day avg: ${avg}/100 • Best: ${best}/100`;

  last7.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${formatYMD(item.date)} — ${item.score}/100`;
    ecoHistoryList.appendChild(li);
  });
}

// ===== Home Dashboard (Quick Actions) — PER USER =====
const DEFAULT_ECO_SCORE = 50;

function formatLastActive(ymd) {
  if (!ymd) return "Never";
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, (m - 1), d);
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

let homeEcoScore = parseInt(localStorage.getItem(userKey("ecoScore")) || String(DEFAULT_ECO_SCORE), 10);
let streak = parseInt(localStorage.getItem(userKey("streak")) || "0", 10);
let lastActionDay = localStorage.getItem(userKey("lastActionDay")) || "";

let doneToday = loadJSON(userKey("doneToday"), { date: ymdToday(), actions: {} });
if (doneToday.date !== ymdToday()) {
  doneToday = { date: ymdToday(), actions: {} };
  saveJSON(userKey("doneToday"), doneToday);
}

if (ecoScoreNum) ecoScoreNum.textContent = homeEcoScore;
if (streakNum) streakNum.textContent = streak;
if (lastActiveText) lastActiveText.textContent = formatLastActive(lastActionDay);

function refreshQuickButtons() {
  const buttons = document.querySelectorAll(".qaBtn");

  buttons.forEach(function(button) {
    const action = button.dataset.action;
    const isDone = doneToday.actions[action] === true;
    button.disabled = isDone;
    let text = button.textContent.replace("DONE - ", "");

    if (isDone) {
      button.textContent = "DONE - " + text;
    } else {
      button.textContent = text;
    }
  });
}

function computeTodaySavedKg() {
  const savings = { bus: 1.8, bottle: 0.1, veg: 1.2, lights: 0.3 };
  const extra = loadJSON(userKey("impactSavedToday"), { date: ymdToday(), kg: 0 });
  let saved = (extra.date === ymdToday()) ? Number(extra.kg || 0) : 0;

  for (const [action, isDone] of Object.entries(doneToday.actions || {})) {
    if (isDone && savings[action]) saved += savings[action];
  }
  return saved;
}

function setFootprintColor(level) {
  if (!impactStatus) return;
  impactStatus.style.fontWeight = "900";
  if (level === "High") impactStatus.style.color = "#e74c3c";
  else if (level === "Medium") impactStatus.style.color = "#f1c40f";
  else impactStatus.style.color = "#2ecc71";
}

function updateImpactSnapshot() {
  if (!impactStatus || !impactSaved || !impactEquivalent) return;
  const BASELINE = 5.0; // kg/day baseline for a simple demo
  const saved = computeTodaySavedKg();
  const footprint = Math.max(0, BASELINE - saved);

  let level = "Medium";
  if (footprint >= 4.0) level = "High";
  else if (footprint >= 2.5) level = "Medium";
  else level = "Low";

  impactStatus.textContent = level;
  setFootprintColor(level);

  impactSaved.textContent = `+${saved.toFixed(1)} kg CO₂`;

  const phones = Math.max(0, Math.round(saved * 80)); // fun equivalency
  impactEquivalent.textContent = `≈ Charging ${phones} phones`;
}

function persistDashboard() {
  localStorage.setItem(userKey("ecoScore"), String(homeEcoScore));
  localStorage.setItem(userKey("streak"), String(streak));
  localStorage.setItem(userKey("lastActionDay"), lastActionDay);
  saveJSON(userKey("doneToday"), doneToday);
}

refreshQuickButtons();
updateImpactSnapshot();

document.querySelectorAll(".qaBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (doneToday.actions[action]) return;

    doneToday.actions[action] = true;

    const scoreBumps = { bus: 3, bottle: 1, veg: 2, lights: 1 };
    homeEcoScore += (scoreBumps[action] || 1);
    if (ecoScoreNum) ecoScoreNum.textContent = homeEcoScore;

    const today = ymdToday();
    if (lastActionDay !== today) {
      const last = lastActionDay ? new Date(lastActionDay) : null;
      const now = new Date(today);
      const diffDays = last ? Math.round((now - last) / (1000 * 60 * 60 * 24)) : 999;
      streak = (diffDays === 1) ? (streak + 1) : 1;
      if (streakNum) streakNum.textContent = streak;
    }

    lastActionDay = today;
    if (lastActiveText) lastActiveText.textContent = formatLastActive(lastActionDay);

    persistDashboard();
    refreshQuickButtons();
    updateImpactSnapshot();
  });
});


document.querySelectorAll(".tipIcon").forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    const tip = btn.parentElement.querySelector(".tipText");
    if (!tip) return;

    const open = tip.style.opacity === "1";

    if (open) {
      tip.style.opacity = "0";
      tip.style.transform = "translateY(-4px)";
      tip.style.pointerEvents = "none";
    } else {
      tip.style.opacity = "1";
      tip.style.transform = "translateY(0)";
      tip.style.pointerEvents = "auto";
    }
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

function setActiveTab(tabName) {
  currentTab = tabName;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
  panelTitle.textContent = titles[tabName] || "CivicClear";

  if (homeDash) homeDash.style.display = (tabName === "guidance") ? "block" : "none";

  guidanceBox.style.display = (tabName === "guidance") ? "block" : "none";
  ecoLayout.style.display = (tabName === "carbon") ? "grid" : "none";
  impactBox.style.display = (tabName === "impact") ? "block" : "none";
  resourcesBox.style.display = (tabName === "resources") ? "block" : "none";
  plannerBox.style.display = (tabName === "planner") ? "block" : "none";

  normalOutput.style.display = (tabName === "guidance") ? "block" : "none";
  const showShared = (tabName === "guidance" || tabName === "carbon");
  sharedActions.style.display = showShared ? "flex" : "none";

  if (tabName === "guidance") {
    exampleBtn.style.display = "inline-block";
    generateBtn.textContent = "Generate";
  }
  if (tabName === "carbon") {
    exampleBtn.style.display = "none";
    generateBtn.textContent = "Calculate";
    renderEcoHistory();
  }

  if (tabName === "guidance") clearNormalOutput();
  if (tabName === "carbon") clearEcoOutput();
  if (tabName === "impact") renderImpactHistory();
  if (tabName === "resources") clearResourcesUI();
  if (tabName === "planner") renderPlannerFromSavedIfAny();
}
exampleBtn.addEventListener("click", () => {
  if (!userInput) return;
  userInput.value = examples[currentTab] || "";
});

generateBtn.addEventListener("click", async () => {
  try {
    if (currentTab === "carbon") {
      const eco = calculateEcoFromForm();
      const note = `${eco.commuteText} | ${eco.dietText} | ${eco.consumptionText} | ${eco.wasteText}`;
      upsertTodayEcoScore(eco.score, note);
      renderEcoHistory();
      renderEcoResult(eco);
      return;
    }

    // guidance
    clearNormalOutput();
    const input = (userInput?.value || "").trim();
    if (!input) return alert("Please enter something first.");

    summaryText.textContent = "Generating AI response...";
    const result = await generateGuidanceWithGemini(input);
    renderNormalResult(result);

  } catch (error) {
    console.error("Error:", error);
    alert("Failed: " + (error?.message || error));
    clearNormalOutput();
  }
});

copyBtn.addEventListener("click", () => {
  if (currentTab === "carbon") {
    let text = `Eco Score: ${ecoScoreBigNum.textContent}/100\n`;
    text += `${ecoScoreRating.textContent}\n\n`;

    text += "Breakdown:\n";
    Array.from(ecoKeyPointsList.children).forEach(li => text += `- ${li.textContent}\n`);

    text += "\nSuggestions:\n";
    Array.from(ecoActionsList.children).forEach(li => text += `- ${li.textContent}\n`);

    text += "\nAccessible Summary:\n" + ecoAccessibleText.textContent + "\n\n";
    text += "History:\n" + (ecoStatsText.textContent || "") + "\n";
    Array.from(ecoHistoryList.children).forEach(li => text += `- ${li.textContent}\n`);

    navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => alert("Copy failed."));
    return;
  }

  let text = "Risk: " + riskBadge.textContent + "\n\n";
  text += "Summary:\n" + summaryText.textContent + "\n\n";

  text += "Key Points:\n";
  Array.from(keyPointsList.children).forEach(li => text += `- ${li.textContent}\n`);

  text += "\nRecommended Actions:\n";
  Array.from(actionsList.children).forEach(li => text += `- ${li.textContent}\n`);

  text += "\nAccessible Version:\n" + accessibleText.textContent;

  navigator.clipboard.writeText(text).then(() => alert("Copied!")).catch(() => alert("Copy failed."));
});

function impactBase(action) {
  const map = {
    drive_less:     { kg: 6.0,  dollars: 6.5, note: "10–15 miles less/week" },
    transit_more:   { kg: 8.0,  dollars: 10,  note: "Replacing 1–2 car trips/week" },
    energy:         { kg: 5.0,  dollars: 8,   note: "Lowering electricity use" },
    meatless:       { kg: 4.0,  dollars: 4,   note: "1 meatless day/week" },
    reusable:       { kg: 0.6,  dollars: 3,   note: "Replacing bottled drinks" },
    recycle:        { kg: 1.5,  dollars: 1,   note: "Better recycling/composting" }
  };
  return map[action] || map.drive_less;
}
function impactMultiplier(intensity) {
  return intensity === "light" ? 0.7 : intensity === "strong" ? 1.4 : 1.0;
}
function computeImpact(action, intensity, weeks) {
  const base = impactBase(action);
  const mult = impactMultiplier(intensity);
  const w = Math.max(1, Number(weeks || 1));
  const kg = Math.max(0, base.kg * mult * w);
  const dollars = Math.max(0, base.dollars * mult * w);

  // equivalents
  const phoneCharges = Math.round(kg * 80);       
  const treeMonths = Math.max(1, Math.round(kg / 2)); 
  const score = Math.min(100, Math.round(20 + kg * 3)); 

  return {
    kg: Number(kg.toFixed(1)),
    dollars: Math.round(dollars),
    phoneCharges,
    treeMonths,
    score,
    note: base.note
  };
}

function getImpactHistory() {
  return loadJSON(userKey("impactHistory"), []);
}
function saveImpactHistory(arr) {
  saveJSON(userKey("impactHistory"), arr);
}
function addImpactHistory(entry) {
  let h = getImpactHistory();
  h.unshift(entry);
  h = h.slice(0, 10);
  saveImpactHistory(h);
  return h;
}
function renderImpactHistory() {
  const h = getImpactHistory();
  impactHistoryList.innerHTML = "";

  if (!h.length) {
    impactHistoryStats.textContent = "No simulations yet.";
    return;
  }

  const last = h[0];
  impactHistoryStats.textContent = `Latest: ${last.kg} kg CO₂ saved (${last.label}) • ${formatYMD(last.date)}`;

  h.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.label} <span class="miniMuted">• ${formatYMD(item.date)}</span></span>
      <span class="smallPill">-${item.kg} kg</span>
    `;
    impactHistoryList.appendChild(li);
  });
}

function clearImpactUI() {
  impactCO2.textContent = "—";
  impactMoney.textContent = "—";
  impactEquiv.textContent = "—";
  impactScore.textContent = "—";
  impactCO2Note.textContent = "";
  impactMoneyNote.textContent = "";
}

impactRunBtn.addEventListener("click", () => {
  const action = impactAction.value;
  const intensity = impactIntensity.value;
  const weeks = Number(impactWeeks.value || 1);

  const out = computeImpact(action, intensity, weeks);

  impactCO2.textContent = `-${out.kg} kg`;
  impactCO2Note.textContent = out.note;

  impactMoney.textContent = `$${out.dollars}`;
  impactMoneyNote.textContent = `Estimated over ${weeks} week(s)`;

  impactEquiv.textContent = `≈ ${out.phoneCharges} phones • ${out.treeMonths} tree-months`;
  impactScore.textContent = `${out.score}/100`;

  // save history
  const label = impactAction.options[impactAction.selectedIndex].textContent.trim();
  addImpactHistory({
    date: ymdToday(),
    label,
    kg: out.kg,
    dollars: out.dollars,
    score: out.score
  });
  renderImpactHistory();

  
  if (impactSaveToHome.checked) {
    const extra = loadJSON(userKey("impactSavedToday"), { date: ymdToday(), kg: 0 });
    const next = (extra.date === ymdToday()) ? Number(extra.kg || 0) + out.kg : out.kg;
    saveJSON(userKey("impactSavedToday"), { date: ymdToday(), kg: Number(next.toFixed(1)) });
    updateImpactSnapshot();
  }
});

impactClearBtn.addEventListener("click", () => {
  clearImpactUI();
});

function clearResourcesUI() {
  resLinks.innerHTML = "";
  resChecklist.innerHTML = "";
  resPlain.textContent = "Your resource plan will appear here.";
}
function linkCard(title, url, tag) {
  const div = document.createElement("div");
  div.className = "resLink";
  div.innerHTML = `
    <a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>
    <span class="resTag">${tag}</span>
  `;
  return div;
}
function buildResourcesPlan(category, locationText, detailsText) {
  const loc = (locationText || "").trim() || "your area";
  const details = (detailsText || "").trim();

  const commonLinks = [
    { title: "Call 2-1-1 (local help & referrals)", url: "https://www.211.org/", tag: "Best first step" },
    { title: "FindFood (food banks / pantries)", url: "https://www.feedingamerica.org/find-your-local-foodbank", tag: "Food" },
    { title: "Benefits.gov (benefits screener)", url: "https://www.benefits.gov/", tag: "Benefits" },
    { title: "USA.gov (official services directory)", url: "https://www.usa.gov/", tag: "Official" }
  ];

  const plan = { links: [...commonLinks], checklist: [], plain: "" };

  if (category === "housing") {
    plan.links.unshift(
      { title: "HUD Rental Assistance", url: "https://www.hud.gov/topics/rental_assistance", tag: "Housing" }
    );
    plan.checklist = [
      "Call 2-1-1 and ask for emergency rental assistance programs near you.",
      "Gather: ID, lease, pay stubs or income proof, past-due notices, utility bills.",
      "Ask your landlord about payment plan options (get it in writing).",
      "If eviction risk: seek legal aid immediately (local legal aid / tenant hotline)."
    ];
    plan.plain = `For housing help in ${loc}, start with 2-1-1 and ask for emergency rental assistance. Gather basic documents and request a payment plan if needed. If eviction is possible, contact legal aid fast.`;
  }

  if (category === "food") {
    plan.links.unshift(
      { title: "SNAP (food assistance) info", url: "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program", tag: "SNAP" }
    );
    plan.checklist = [
      "Call 2-1-1 and ask for food pantries + SNAP help in your area.",
      "Use Feeding America’s locator to find a nearby pantry.",
      "Gather: ID, address proof, income info (if applying for SNAP).",
      "Plan a 3–5 day grocery list based on pantry items to stretch food longer."
    ];
    plan.plain = `For food help in ${loc}, check a nearby pantry first (fastest), then apply for SNAP if you qualify. 2-1-1 can connect you to both.`;
  }

  if (category === "health") {
    plan.links.unshift(
      { title: "Find a Health Center (HRSA)", url: "https://findahealthcenter.hrsa.gov/", tag: "Low-cost care" }
    );
    plan.links.unshift(
      { title: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/", tag: "Urgent help" }
    );
    plan.checklist = [
      "If you feel unsafe right now: call/text 988 or local emergency services.",
      "Search HRSA for low-cost clinics near you.",
      "Ask 2-1-1 for mental health services and sliding-scale therapy.",
      "Write down symptoms + meds so you can explain clearly at an appointment."
    ];
    plan.plain = `For health support in ${loc}, use HRSA to find low-cost clinics. If there’s a crisis, 988 is available now. 2-1-1 can point to local programs.`;
  }

  if (category === "legal") {
    plan.links.unshift(
      { title: "Legal Services Corporation (find legal aid)", url: "https://www.lsc.gov/about-lsc/what-legal-aid/i-need-legal-help", tag: "Legal aid" }
    );
    plan.checklist = [
      "Write a short timeline of what happened (dates, names, notices).",
      "Gather key paperwork and screenshots.",
      "Find legal aid near you (LSC) and request an intake appointment.",
      "If dealing with benefits: use Benefits.gov to find programs you may qualify for."
    ];
    plan.plain = `For legal/benefit issues in ${loc}, gather your documents and contact legal aid via LSC. Keep a clear timeline—it speeds up help.`;
  }

  if (category === "jobs") {
    plan.links.unshift(
      { title: "Department of Labor (worker rights)", url: "https://www.dol.gov/general/topic/workhours", tag: "Worker rights" }
    );
    plan.checklist = [
      "Write down employer details, hours worked, pay rate, and missed payments/issues.",
      "Save messages, schedules, pay stubs, and screenshots.",
      "If it’s a job scam: stop sending info and report (FTC).",
      "Use 2-1-1 for local job programs and emergency support if needed."
    ];
    plan.links.unshift(
      { title: "Report fraud / scams (FTC)", url: "https://reportfraud.ftc.gov/", tag: "Report scams" }
    );
    plan.plain = `For job issues in ${loc}, document everything (hours/pay/messages). If it seems like a scam, report to the FTC and stop sharing personal info.`;
  }

  if (category === "emergency") {
    plan.links.unshift(
      { title: "Find an emergency shelter (Red Cross)", url: "https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html", tag: "Shelter" }
    );
    plan.links.unshift(
      { title: "FEMA disaster assistance", url: "https://www.disasterassistance.gov/", tag: "Disaster" }
    );
    plan.checklist = [
      "If in immediate danger: call emergency services and move to safety.",
      "Monitor official alerts from your local government/weather services.",
      "Pack essentials: ID, meds, water, charger, warm layer.",
      "Use Red Cross shelter finder if you need a safe place quickly."
    ];
    plan.plain = `For emergencies in ${loc}, prioritize safety first. Follow official alerts and prepare essentials. If you need shelter, use Red Cross and check FEMA assistance if applicable.`;
  }

  // If user wrote details, add a custom first step
  if (details) {
    plan.checklist.unshift(`Your note: “${details}” — Start by calling 2-1-1 and saying this sentence exactly.`);
  }

  return plan;
}

function renderResourcesPlan(plan) {
  resLinks.innerHTML = "";
  plan.links.forEach(l => resLinks.appendChild(linkCard(l.title, l.url, l.tag)));

  resChecklist.innerHTML = "";
  plan.checklist.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    resChecklist.appendChild(li);
  });

  resPlain.textContent = plan.plain;
}

resExampleBtn.addEventListener("click", () => {
  resCategory.value = "housing";
  resLocation.value = "Newark, DE";
  resDetails.value = "Behind on rent and need food support this week.";
});

resGenerateBtn.addEventListener("click", () => {
  const plan = buildResourcesPlan(resCategory.value, resLocation.value, resDetails.value);
  renderResourcesPlan(plan);
});

// ===== Planner =====
function parseTasks(text) {
  // accepts "Task — due Fri" / "Task - due Wed" / "Task (due Fri)" etc.
  const lines = (text || "").split("\n").map(x => x.trim()).filter(Boolean);
  const tasks = [];

  const dayNames = ["sun","mon","tue","wed","thu","fri","sat"];
  const dayMap = {
    sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6
  };

  for (const line of lines) {
    const lower = line.toLowerCase();
    let due = null;

    // find "due fri" etc
    for (const dn of dayNames) {
      if (lower.includes(`due ${dn}`) || lower.includes(`due ${dn}.`) || lower.includes(`due ${dn},`)) {
        due = dn;
        break;
      }
    }

    // estimate minutes
    let minutes = 45;
    if (lower.includes("30 min") || lower.includes("30min")) minutes = 30;
    if (lower.includes("60 min") || lower.includes("1 hour") || lower.includes("1hr")) minutes = 60;
    if (lower.includes("90 min") || lower.includes("1.5")) minutes = 90;
    if (lower.includes("2 hour") || lower.includes("2hr")) minutes = 120;
    if (lower.includes("3 hour") || lower.includes("3hr")) minutes = 180;
    if (lower.includes("work") || lower.includes("shift")) minutes = 60; // we treat as "block it" note

    // priority
    let priority = 2; // 1 high, 2 normal, 3 low
    if (lower.includes("quiz") || lower.includes("exam") || lower.includes("due")) priority = 1;
    if (lower.includes("optional") || lower.includes("if time")) priority = 3;

    tasks.push({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2),
      text: line,
      dueDay: due,
      dueIndex: (due ? dayMap[due] : null),
      minutes,
      priority
    });
  }

  return tasks;
}

function buildPlan(tasks, daysCount, minutesPerDay) {
 
  const now = new Date();
  const startDow = now.getDay(); 

  function dueInDays(task) {
    if (task.dueIndex == null) 
      return 999;
    let delta = task.dueIndex - startDow;
    if (delta < 0) delta += 7;
    return delta;
  }

  const sorted = [...tasks].sort((a,b) => {
    const da = dueInDays(a), db = dueInDays(b);
    if (da !== db) return da - db;
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.minutes - a.minutes;
  });

  const days = [];
  for (let i=0; i<daysCount; i++) {
    const info = dayLabelFromOffset(i);
    days.push({
      ymd: info.ymd,
      label: info.label,
      budget: minutesPerDay,
      used: 0,
      items: []
    });
  }

  for (const task of sorted) {
    // pick best day: before or on due if possible, otherwise earliest day
    let targetIndex = 0;
    const dueDelta = dueInDays(task);
    if (dueDelta !== 999) {
      targetIndex = Math.min(daysCount - 1, dueDelta);
    }

    // try to place on target day, else spill earlier days
    let placed = false;
    for (let i = targetIndex; i >= 0; i--) {
      if (days[i].used + task.minutes <= days[i].budget) {
        days[i].items.push({ ...task, done: false });
        days[i].used += task.minutes;
        placed = true;
        break;
      }
    }
    if (!placed) {
      // spill forward if no space
      for (let i = targetIndex; i < daysCount; i++) {
        if (days[i].used + task.minutes <= days[i].budget) {
          days[i].items.push({ ...task, done: false });
          days[i].used += task.minutes;
          placed = true;
          break;
        }
      }
    }
    if (!placed) {
      // force place as "overflow note" on last day
      days[daysCount - 1].items.push({ ...task, done: false, overflow: true });
    }
  }

  return days;
}

function savedPlannerKey() {
  return userKey("plannerSaved");
}
function savePlanner(days, rawInput, meta) {
  saveJSON(savedPlannerKey(), { date: ymdToday(), days, rawInput, meta });
}
function loadPlanner() {
  return loadJSON(savedPlannerKey(), null);
}

function renderPlanner(days, meta) {
  planSchedule.innerHTML = "";
  planToday.innerHTML = "";

  if (!days || !days.length) {
    planMeta.textContent = "No plan yet. Build one to start.";
    return;
  }

  planMeta.textContent = `Saved plan • ${meta.days} day(s) • ${meta.minutes}/day • ${formatYMD(ymdToday())}`;

  // Render day cards
  days.forEach((d, dayIdx) => {
    const card = document.createElement("div");
    card.className = "dayCard";

    const head = document.createElement("div");
    head.className = "dayHeader";
    head.innerHTML = `
      <div class="dayTitle">${d.label}</div>
      <div class="dayTime">${Math.min(d.used, d.budget)}/${d.budget} min</div>
    `;
    card.appendChild(head);

    if (!d.items.length) {
      const empty = document.createElement("div");
      empty.className = "miniMuted";
      empty.textContent = "No tasks scheduled. Use this as rest/catch-up time.";
      card.appendChild(empty);
    } else {
      d.items.forEach((it) => {
        const row = document.createElement("label");
        row.className = "taskRow";

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = !!it.done;

        cb.addEventListener("change", () => {
          it.done = cb.checked
          const saved = loadPlanner();
          if (saved && saved.days) {
            saved.days[dayIdx].items = saved.days[dayIdx].items.map(x => x.id === it.id ? { ...x, done: it.done } : x);
            saveJSON(savedPlannerKey(), saved);
          }
          renderTodayFocus(days);
        });

        const text = document.createElement("div");
        text.className = "taskText";
        text.textContent = it.text;

        const meta = document.createElement("div");
        meta.className = "taskMeta";
        const overflow = it.overflow ? " • overflow" : "";
        meta.textContent = `${it.minutes} min${overflow}`;

        row.appendChild(cb);
        row.appendChild(text);
        row.appendChild(meta);

        card.appendChild(row);
      });
    }

    planSchedule.appendChild(card);
  });

  renderTodayFocus(days);
}

function renderTodayFocus(days) {
  planToday.innerHTML = "";
  if (!days?.length) return;
  const today = days[0];

  // show up to 4 undone tasks from day 0, else next days
  let items = today.items.filter(x => !x.done);
  if (items.length < 2 && days[1]) items = items.concat(days[1].items.filter(x => !x.done));
  items = items.slice(0, 4);

  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = "✅ You’re done! Pick one small bonus task or rest.";
    planToday.appendChild(li);
    return;
  }

  items.forEach(it => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${it.text}</span><span class="smallPill">${it.minutes} min</span>`;
    planToday.appendChild(li);
  });
}

function renderPlannerFromSavedIfAny() {
  const saved = loadPlanner();
  if (saved && saved.days && saved.meta) {
    renderPlanner(saved.days, saved.meta);
    if (saved.rawInput) planTasks.value = saved.rawInput;
    if (saved.meta.minutes) planTime.value = String(saved.meta.minutes);
    if (saved.meta.days) planDays.value = String(saved.meta.days);
  } else {
    planSchedule.innerHTML = "";
    planToday.innerHTML = "";
    planMeta.textContent = "No plan yet. Build one to start.";
  }
}

planGenerateBtn.addEventListener("click", () => {
  const text = planTasks.value.trim();
  if (!text) return alert("Add a few tasks first (one per line).");

  const tasks = parseTasks(text);
  const minutes = Number(planTime.value);
  const daysCount = Number(planDays.value);

  const days = buildPlan(tasks, daysCount, minutes);

  const meta = { minutes, days: daysCount };
  if (planSave.checked) savePlanner(days, text, meta);

  renderPlanner(days, meta);
});

planLoadBtn.addEventListener("click", () => {
  renderPlannerFromSavedIfAny();
});

planClearBtn.addEventListener("click", () => {
  planTasks.value = "";
  planSchedule.innerHTML = "";
  planToday.innerHTML = "";
  planMeta.textContent = "No plan yet. Build one to start.";
});

tabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));


setActiveTab("guidance");
