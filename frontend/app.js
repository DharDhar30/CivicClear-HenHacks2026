// app.js
// ===== Login Guard =====
const currentUser = localStorage.getItem("civicclear_current_user");
if (!currentUser) window.location.href = "login_signup/login.html?expired=1";

// ===== Storage helpers (per user) =====
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

// ===== Toast =====
const toastEl = document.getElementById("toast");
let toastTimer = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
}

// ===== Dates (local-safe) =====
function ymdToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseYMDLocal(ymd) {
  if (!ymd || typeof ymd !== "string") return null;
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function formatYMD(ymd) {
  const dt = parseYMDLocal(ymd);
  if (!dt) return "—";
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function dayLabelFromOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const name = d.toLocaleDateString(undefined, { weekday: "short" });
  return { ymd, label: `${name} (${formatYMD(ymd)})` };
}
function diffDaysYMD(aYmd, bYmd) {
  const a = parseYMDLocal(aYmd);
  const b = parseYMDLocal(bYmd);
  if (!a || !b) return 999;
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
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

// Guidance
const guidanceBox = document.getElementById("guidanceBox");
const userInput = document.getElementById("userInput");
const exampleBtn = document.getElementById("exampleBtn");
const generateBtn = document.getElementById("generateBtn");
const clearGuidanceBtn = document.getElementById("clearGuidanceBtn");
const copyBtn = document.getElementById("copyBtn");
const guidanceStatus = document.getElementById("guidanceStatus");

// Eco
const ecoLayout = document.getElementById("ecoLayout");
const ecoCalcBtn = document.getElementById("ecoCalcBtn");
const ecoClearBtn = document.getElementById("ecoClearBtn");
const ecoCopyBtn = document.getElementById("ecoCopyBtn");
const ecoStatus = document.getElementById("ecoStatus");

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

// Home impact (REAL)
const impactStatus = document.getElementById("impactStatus");
const impactSaved = document.getElementById("impactSaved");
const impactEquivalent = document.getElementById("impactEquivalent");
const impactSources = document.getElementById("impactSources");
const resetTodayBtn = document.getElementById("resetTodayBtn");

// Home planned info
const plannedBox = document.getElementById("plannedBox");
const plannedPotential = document.getElementById("plannedPotential");
const plannedCount = document.getElementById("plannedCount");

// Impact Forecast DOM
const impactBox = document.getElementById("impactBox");
const impactAction = document.getElementById("impactAction");
const impactIntensity = document.getElementById("impactIntensity");
const impactWeeks = document.getElementById("impactWeeks");
const impactRunBtn = document.getElementById("impactRunBtn");
const impactClearBtn = document.getElementById("impactClearBtn");
const impactClearHistoryBtn = document.getElementById("impactClearHistoryBtn");
const impactCopyBtn = document.getElementById("impactCopyBtn");
const impactCO2 = document.getElementById("impactCO2");
const impactCO2Note = document.getElementById("impactCO2Note");
const impactMoney = document.getElementById("impactMoney");
const impactMoneyNote = document.getElementById("impactMoneyNote");
const impactEquiv = document.getElementById("impactEquiv");
const impactScore = document.getElementById("impactScore");
const impactHistoryStats = document.getElementById("impactHistoryStats");
const impactHistoryList = document.getElementById("impactHistoryList");
const impactStatusLine = document.getElementById("impactStatusLine");

// Resources DOM
const resourcesBox = document.getElementById("resourcesBox");
const resCategory = document.getElementById("resCategory");
const resLocation = document.getElementById("resLocation");
const resDetails = document.getElementById("resDetails");
const resGenerateBtn = document.getElementById("resGenerateBtn");
const resExampleBtn = document.getElementById("resExampleBtn");
const resCopyBtn = document.getElementById("resCopyBtn");
const resLinks = document.getElementById("resLinks");
const resChecklist = document.getElementById("resChecklist");
const resPlain = document.getElementById("resPlain");
const resStatus = document.getElementById("resStatus");

// Planner DOM
const plannerBox = document.getElementById("plannerBox");
const planTasks = document.getElementById("planTasks");
const planMode = document.getElementById("planMode");
const planTime = document.getElementById("planTime");
const planDays = document.getElementById("planDays");
const planEcoToHome = document.getElementById("planEcoToHome");
const planSave = document.getElementById("planSave");
const planGenerateBtn = document.getElementById("planGenerateBtn");
const planLoadBtn = document.getElementById("planLoadBtn");
const planClearBtn = document.getElementById("planClearBtn");
const planCopyBtn = document.getElementById("planCopyBtn");
const planMeta = document.getElementById("planMeta");
const planSchedule = document.getElementById("planSchedule");
const planToday = document.getElementById("planToday");
const planStatus = document.getElementById("planStatus");

// Planner summary cards
const planEcoSummary = document.getElementById("planEcoSummary");
const planEcoCompleted = document.getElementById("planEcoCompleted");
const planEcoPotential = document.getElementById("planEcoPotential");

// ===== State =====
let currentTab = "guidance";

const titles = {
  guidance: "Home & Civic Guidance",
  carbon: "Eco Score",
  impact: "Impact Forecast",
  resources: "Resources",
  planner: "Action Planner"
};

const examples = {
  guidance:
    "EMERGENCY ALERT: Severe thunderstorm warning for Newark, DE until 8:30 PM. Winds may exceed 60 mph. Heavy rain and flash flooding possible. Avoid windows and do not drive through flooded roads."
};

// ===== Activity + streak rules =====
const DEFAULT_ECO_SCORE = 50;
let homeEcoScore = parseInt(localStorage.getItem(userKey("ecoScore")) || String(DEFAULT_ECO_SCORE), 10);
let streak = parseInt(localStorage.getItem(userKey("streak")) || "0", 10);
let lastActionDay = localStorage.getItem(userKey("lastActionDay")) || "";

function formatLastActive(ymd) {
  if (!ymd) return "Never";
  return formatYMD(ymd);
}
function persistDashboardBasics() {
  localStorage.setItem(userKey("ecoScore"), String(homeEcoScore));
  localStorage.setItem(userKey("streak"), String(streak));
  localStorage.setItem(userKey("lastActionDay"), lastActionDay);
}
function markActiveToday() {
  const today = ymdToday();
  if (lastActionDay !== today) {
    const diffDays = lastActionDay ? diffDaysYMD(lastActionDay, today) : 999;
    streak = (diffDays === 1) ? (streak + 1) : 1;
  }
  lastActionDay = today;
  persistDashboardBasics();
  refreshHomeNumbers();
}

// ===== Today state normalization =====
function ensureTodayObject(key, fallback) {
  const obj = loadJSON(key, fallback);
  if (!obj || obj.date !== ymdToday()) return { ...fallback, date: ymdToday() };
  return obj;
}

// Quick actions today state
let doneToday = ensureTodayObject(userKey("doneToday"), { date: ymdToday(), actions: {} });
saveJSON(userKey("doneToday"), doneToday);

// ===== Planner eco-to-home preference (persists) =====
function loadPlannerEcoToHomePref() {
  const pref = localStorage.getItem(userKey("plannerEcoToHomePref"));
  return pref === null ? true : (pref === "true");
}
function savePlannerEcoToHomePref(v) {
  localStorage.setItem(userKey("plannerEcoToHomePref"), String(!!v));
}

// ===== Home UI helpers =====
function refreshHomeNumbers() {
  if (ecoScoreNum) ecoScoreNum.textContent = String(homeEcoScore);
  if (streakNum) streakNum.textContent = String(streak);
  if (lastActiveText) lastActiveText.textContent = formatLastActive(lastActionDay);
}
refreshHomeNumbers();

function refreshQuickButtons() {
  const buttons = document.querySelectorAll(".qaBtn");
  buttons.forEach(button => {
    const action = button.dataset.action;
    const isDone = doneToday.actions[action] === true;
    button.disabled = isDone;
    const baseText = button.textContent.replace("DONE - ", "");
    button.textContent = isDone ? ("DONE - " + baseText) : baseText;
  });
}

// ===== REAL impact model (trustworthy) =====
// Today’s Impact should ONLY reflect real actions done today:
// - Quick Actions done today
// - Planner eco tasks checked today (only if today plan day matches today ymd)
//
// It does NOT include forecasts.

function loadPlannerSaved() {
  return loadJSON(userKey("plannerSaved"), null);
}

// Quick action savings: modest, believable
function computeQuickActionSavings() {
  const savings = { bus: 0.6, bottle: 0.1, veg: 0.5, lights: 0.3 }; // kg CO2 estimate
  let kg = 0;
  let count = 0;
  for (const [action, isDone] of Object.entries(doneToday.actions || {})) {
    if (isDone && savings[action]) { kg += savings[action]; count += 1; }
  }
  return { count, kg: Number(kg.toFixed(1)) };
}

function getPlannerEcoStatsToday() {
  const pref = loadPlannerEcoToHomePref();
  if (!pref) return { doneCount: 0, doneKg: 0, todoCount: 0, todoKg: 0 };

  const saved = loadPlannerSaved();
  if (!saved?.days?.length) return { doneCount: 0, doneKg: 0, todoCount: 0, todoKg: 0 };

  const todayCard = saved.days[0];
  if (!todayCard?.items?.length) return { doneCount: 0, doneKg: 0, todoCount: 0, todoKg: 0 };

  // CRITICAL trust fix: only count if the first day is actually today
  if (todayCard.ymd !== ymdToday()) {
    return { doneCount: 0, doneKg: 0, todoCount: 0, todoKg: 0 };
  }

  const ecoItems = todayCard.items.filter(it => it.isEco);
  const done = ecoItems.filter(it => it.done);
  const todo = ecoItems.filter(it => !it.done);

  const doneKg = done.reduce((sum, it) => sum + Number(it.ecoKg || 0), 0);
  const todoKg = todo.reduce((sum, it) => sum + Number(it.ecoKg || 0), 0);

  return {
    doneCount: done.length,
    doneKg: Number(doneKg.toFixed(1)),
    todoCount: todo.length,
    todoKg: Number(todoKg.toFixed(1))
  };
}

function setImpactColor(level) {
  if (!impactStatus) return;
  impactStatus.style.fontWeight = "900";
  if (level === "High") impactStatus.style.color = "#e74c3c";
  else if (level === "Medium") impactStatus.style.color = "#f1c40f";
  else impactStatus.style.color = "#2ecc71";
}

function updateImpactSnapshot() {
  if (!impactStatus || !impactSaved || !impactEquivalent) return;

  const qa = computeQuickActionSavings();
  const planner = getPlannerEcoStatsToday();

  // REAL saved today
  const savedKg = Number((qa.kg + planner.doneKg).toFixed(1));

  // Planned potential (not counted)
  if (plannedPotential && plannedCount) {
    plannedPotential.textContent = `${planner.todoKg.toFixed(1)} kg`;
    plannedCount.textContent = `${planner.todoCount}`;
    plannedBox.style.display = "block";
  }

  // Rating: simple and believable
  let level = "Medium";
  if (savedKg >= 3.0) level = "Low";
  else if (savedKg >= 1.2) level = "Medium";
  else level = "High";

  impactStatus.textContent = level.toUpperCase();
  setImpactColor(level);

  impactSaved.textContent = `${savedKg.toFixed(1)} kg`;

  const phones = Math.max(0, Math.round(savedKg * 80));
  impactEquivalent.textContent = `Fun equivalent: Charging ${phones} phones`;

  if (impactSources) {
    impactSources.textContent = `From: Quick Actions (${qa.count}) • Planner completed (${planner.doneCount})`;
  }
}

refreshQuickButtons();
updateImpactSnapshot();

// ===== Reset today (REAL) =====
function resetToday() {
  if (!confirm("Reset today’s completed actions? (Quick Actions + today’s Planner checkmarks only)")) return;

  // Clear quick actions today
  doneToday = { date: ymdToday(), actions: {} };
  saveJSON(userKey("doneToday"), doneToday);

  // Clear planner checkmarks for today if today plan matches
  const saved = loadPlannerSaved();
  if (saved?.days?.length && saved.days[0]?.items?.length && saved.days[0].ymd === ymdToday()) {
    saved.days[0].items = saved.days[0].items.map(it => ({ ...it, done: false }));
    saveJSON(userKey("plannerSaved"), saved);
  }

  refreshQuickButtons();
  updateImpactSnapshot();
  toast("Reset today ✅");
}
resetTodayBtn?.addEventListener("click", resetToday);

// ===== Quick actions -> update eco score + streak =====
document.querySelectorAll(".qaBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (doneToday.actions[action]) return;

    doneToday.actions[action] = true;

    // Eco score bump: small & consistent
    const scoreBumps = { bus: 3, bottle: 1, veg: 2, lights: 1 };
    homeEcoScore += (scoreBumps[action] || 1);
    homeEcoScore = Math.max(0, Math.min(100, Math.round(homeEcoScore)));

    saveJSON(userKey("doneToday"), doneToday);
    persistDashboardBasics();
    markActiveToday();

    refreshQuickButtons();
    updateImpactSnapshot();
    toast("Logged ✅");
  });
});

// ===== Tooltip click behavior =====
document.querySelectorAll(".tipIcon").forEach(btn => {
  btn.addEventListener("click", (e) => {
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
      document.querySelectorAll(".tipText").forEach(t => {
        t.style.opacity = "0";
        t.style.transform = "translateY(-4px)";
        t.style.pointerEvents = "none";
      });
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

// ===== Tab switching =====
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

  if (tabName === "carbon") renderEcoHistory();
  if (tabName === "impact") renderImpactHistory();
  if (tabName === "resources") loadResourcesLastPlanIfAny();
  if (tabName === "planner") {
    const pref = loadPlannerEcoToHomePref();
    if (planEcoToHome) planEcoToHome.checked = pref;
    renderPlannerFromSavedIfAny();
  }

  updateImpactSnapshot();
}

// ===== Normal output helpers =====
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

  let response;
  try {
    response = await fetch("http://localhost:5050/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
  } catch {
    throw new Error("AI is offline (server not reachable). Start the backend at localhost:5050.");
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    throw new Error("AI returned an unexpected response. Check the backend console/logs.");
  }

  if (!response.ok) throw new Error(data?.error || "Gemini request failed");

  const raw = data.text || "";
  const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI did not return JSON.");

  return JSON.parse(cleaned.slice(start, end + 1));
}

// ===== Guidance actions =====
exampleBtn.addEventListener("click", () => {
  if (!userInput) return;
  userInput.value = examples.guidance || "";
  guidanceStatus.textContent = "Example loaded. Click Generate.";
});

function setGuidanceBusy(busy) {
  generateBtn.disabled = busy;
  exampleBtn.disabled = busy;
  clearGuidanceBtn.disabled = busy;
  copyBtn.disabled = busy;
  generateBtn.textContent = busy ? "Generating..." : "Generate";
}

generateBtn.addEventListener("click", async () => {
  const input = (userInput?.value || "").trim();
  if (!input) {
    guidanceStatus.textContent = "Please paste or type something first.";
    toast("Add input first");
    return;
  }

  setGuidanceBusy(true);
  guidanceStatus.textContent = "Working…";
  summaryText.textContent = "Generating AI response…";

  try {
    const result = await generateGuidanceWithGemini(input);
    renderNormalResult(result);
    guidanceStatus.textContent = "Done. You can copy the result.";
    toast("Generated ✅");
    markActiveToday();
  } catch (err) {
    setRisk("Low");
    summaryText.textContent = `AI unavailable: ${err?.message || err}`;
    guidanceStatus.textContent = "Tip: Make sure the Gemini backend server is running.";
    toast("AI offline");
  } finally {
    setGuidanceBusy(false);
  }
});

clearGuidanceBtn.addEventListener("click", () => {
  userInput.value = "";
  clearNormalOutput();
  guidanceStatus.textContent = "Cleared.";
  toast("Cleared");
});

copyBtn.addEventListener("click", () => {
  let text = "Risk: " + riskBadge.textContent + "\n\n";
  text += "Summary:\n" + summaryText.textContent + "\n\n";

  text += "Key Points:\n";
  Array.from(keyPointsList.children).forEach(li => text += `- ${li.textContent}\n`);

  text += "\nRecommended Actions:\n";
  Array.from(actionsList.children).forEach(li => text += `- ${li.textContent}\n`);

  text += "\nAccessible Version:\n" + accessibleText.textContent;

  navigator.clipboard.writeText(text).then(() => toast("Copied ✅")).catch(() => toast("Copy failed"));
});

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
function formatScoreChange(n) {
  const rounded = Math.round(n);
  if (rounded === 0) return "0";
  return (rounded > 0 ? `-${rounded}` : `+${Math.abs(rounded)}`);
}
function calculateEcoFromForm() {
  const commute = ecoCommute?.value || "car";
  const miles = Math.max(0, Number(ecoMiles?.value || 0));

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

  const commuteText = `Transport: ${commuteLabel} • Miles: ${miles} • Score change: -${Math.round(drivePenalty)}${ecoCarpool?.checked ? " • Carpool +5" : ""}`;
  const dietText = `Food: ${dietLabel} • Score change: ${formatScoreChange(dietPenalty)}`;
  const consumptionText = `Consumption: ${shopLabel} • Score change: ${formatScoreChange(shoppingPenalty)}`;
  const wasteTotal = recyclePenalty + plasticPenalty;
  const wasteText = `Waste: Recycle ${recycleLabel}, Plastics ${plasticLabel} • Score change: ${formatScoreChange(wasteTotal)}`;

  const biggest = [
    { name: "Driving", value: drivePenalty },
    { name: "Diet", value: Math.max(0, dietPenalty) },
    { name: "Consumption", value: Math.max(0, shoppingPenalty) },
    { name: "Waste", value: Math.max(0, wasteTotal) }
  ].sort((a, b) => b.value - a.value)[0].name;

  let tip1 = "Try one small change today.";
  if (biggest === "Driving") tip1 = "Driving was biggest: combine trips, carpool, or take transit once.";
  if (biggest === "Diet") tip1 = "Diet was biggest: swap one heavy-meat meal for beans/vegetarian.";
  if (biggest === "Consumption") tip1 = "Consumption was biggest: skip one purchase or buy secondhand.";
  if (biggest === "Waste") tip1 = "Waste was biggest: reduce single-use plastics and recycle/compost.";

  const actions = [
    tip1,
    "Pick one habit to repeat 2–3 days this week for a noticeable improvement.",
    "Use Quick Actions + Planner checkboxes to reinforce habits."
  ];

  const accessible = `Your Eco Score is ${score} out of 100 (${rating}). Higher is better.`;

  return { score, rating, commuteText, dietText, consumptionText, wasteText, actions, accessible };
}


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
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const best = Math.max(...scores);
  const latest = last7[0].score;

  const trend = (last7.length >= 2) ? (last7[0].score - last7[1].score) : 0;
  const trendText = trend === 0 ? "flat" : trend > 0 ? `up +${trend}` : `down ${Math.abs(trend)}`;

  ecoStatsText.textContent = `Latest: ${latest}/100 • 7-entry avg: ${avg}/100 • Best: ${best}/100 • Trend: ${trendText}`;

  last7.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${formatYMD(item.date)} — ${item.score}/100`;
    ecoHistoryList.appendChild(li);
  });
}

// Eco buttons
ecoCalcBtn.addEventListener("click", () => {
  const eco = calculateEcoFromForm();
  const note = `${eco.commuteText} | ${eco.dietText} | ${eco.consumptionText} | ${eco.wasteText}`;
  upsertTodayEcoScore(eco.score, note);
  renderEcoHistory();
  renderEcoResult(eco);

  // Align home eco score with calculated eco score
  homeEcoScore = eco.score;
  persistDashboardBasics();
  refreshHomeNumbers();
  updateImpactSnapshot();

  markActiveToday();

  ecoStatus.textContent = "Saved. Home Eco Score updated.";
  toast("Calculated ✅");
});

ecoClearBtn.addEventListener("click", () => {
  if (ecoMiles) ecoMiles.value = "0";
  if (ecoCommute) ecoCommute.value = "car";
  if (ecoCarpool) ecoCarpool.checked = false;
  if (ecoDiet) ecoDiet.value = "mixed";
  if (ecoShopping) ecoShopping.value = "small";
  if (ecoRecycleHabit) ecoRecycleHabit.value = "sometimes";
  if (ecoPlastic) ecoPlastic.value = "medium";
  clearEcoOutput();
  ecoStatus.textContent = "Cleared (history kept).";
  toast("Cleared");
});

ecoCopyBtn.addEventListener("click", () => {
  let text = `Eco Score: ${ecoScoreBigNum.textContent}/100\n`;
  text += `${ecoScoreRating.textContent}\n\n`;

  text += "Breakdown:\n";
  Array.from(ecoKeyPointsList.children).forEach(li => text += `- ${li.textContent}\n`);

  text += "\nSuggestions:\n";
  Array.from(ecoActionsList.children).forEach(li => text += `- ${li.textContent}\n`);

  text += "\nAccessible Summary:\n" + ecoAccessibleText.textContent + "\n\n";
  text += "History:\n" + (ecoStatsText.textContent || "") + "\n";
  Array.from(ecoHistoryList.children).forEach(li => text += `- ${li.textContent}\n`);

  navigator.clipboard.writeText(text).then(() => toast("Copied ✅")).catch(() => toast("Copy failed"));
});

// ===== Impact Forecast (NOT counted as today) =====
function impactBase(action) {
  const map = {
    drive_less: { kg: 6.0, dollars: 6.5, note: "10–15 miles less/week" },
    transit_more: { kg: 8.0, dollars: 10, note: "Replacing 1–2 car trips/week" },
    energy: { kg: 5.0, dollars: 8, note: "Lowering electricity use" },
    meatless: { kg: 4.0, dollars: 4, note: "1 meatless day/week" },
    reusable: { kg: 0.6, dollars: 3, note: "Replacing bottled drinks" },
    recycle: { kg: 1.5, dollars: 1, note: "Better recycling/composting" }
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

  // Deduplicate exact same label on same day to stop “spam”
  const dupe = h.find(x => x.date === entry.date && x.label === entry.label);
  if (dupe) return h;

  h.unshift(entry);
  h = h.slice(0, 10);
  saveImpactHistory(h);
  return h;
}
function renderImpactHistory() {
  const h = getImpactHistory();
  impactHistoryList.innerHTML = "";

  if (!h.length) {
    impactHistoryStats.textContent = "No forecasts yet.";
    return;
  }

  const last = h[0];
  impactHistoryStats.textContent = `Latest forecast: ${last.kg} kg saved (${last.label}) • ${formatYMD(last.date)}`;

  h.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.label} <span class="miniMuted">• ${formatYMD(item.date)}</span></span>
      <span class="smallPill">${item.kg} kg</span>
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
  impactStatusLine.textContent = "";
}

impactRunBtn.addEventListener("click", () => {
  const action = impactAction.value;
  const intensity = impactIntensity.value;
  const weeks = Number(impactWeeks.value || 1);

  const out = computeImpact(action, intensity, weeks);

  impactCO2.textContent = `${out.kg} kg`;
  impactCO2Note.textContent = out.note;

  impactMoney.textContent = `$${out.dollars}`;
  impactMoneyNote.textContent = `Estimated over ${weeks} week(s)`;

  impactEquiv.textContent = `Charging ${out.phoneCharges} phones • ${out.treeMonths} tree-months`;
  impactScore.textContent = `${out.score}/100`;

  const label = impactAction.options[impactAction.selectedIndex].textContent.trim();
  addImpactHistory({
    date: ymdToday(),
    label: `${label} • ${impactIntensity.value} • ${weeks}w`,
    kg: out.kg,
    dollars: out.dollars,
    score: out.score
  });
  renderImpactHistory();

  impactStatusLine.textContent = "Saved as a forecast (does not affect Today’s Impact).";
  toast("Forecast saved ✅");
});

impactClearBtn.addEventListener("click", clearImpactUI);

impactClearHistoryBtn.addEventListener("click", () => {
  if (!confirm("Clear forecast history?")) return;
  saveImpactHistory([]);
  renderImpactHistory();
  toast("History cleared");
});

impactCopyBtn.addEventListener("click", () => {
  const h = getImpactHistory();
  let text = "Impact Forecast\n\n";
  text += `CO₂ saved (forecast): ${impactCO2.textContent}\n`;
  text += `Money saved (forecast): ${impactMoney.textContent}\n`;
  text += `Equivalents: ${impactEquiv.textContent}\n`;
  text += `Impact Score: ${impactScore.textContent}\n\n`;
  text += "Recent Forecasts:\n";
  if (!h.length) text += "- (none)\n";
  else h.forEach(item => text += `- ${item.label} | ${item.kg} kg | ${formatYMD(item.date)}\n`);
  navigator.clipboard.writeText(text).then(() => toast("Copied ✅")).catch(() => toast("Copy failed"));
});

// ===== Resources (persist + validate details) =====
function clearResourcesUI() {
  resLinks.innerHTML = "";
  resChecklist.innerHTML = "";
  resPlain.textContent = "Your resource plan will appear here.";
  resStatus.textContent = "";
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
function mapsSearchLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
function googleSearchLink(query) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function detailsSeemsUseful(category, details) {
  const d = (details || "").toLowerCase().trim();
  if (!d) return false;
  if (d.length < 8) return false;

  // If user typed something obviously irrelevant
  const nonsense = ["happy", "lol", "idk", "test", "asdf", "hello"];
  if (nonsense.some(w => d === w)) return false;

  // Category hint keywords
  const hints = {
    housing: ["rent", "evict", "lease", "landlord", "homeless", "shelter", "utilities"],
    food: ["food", "snap", "hungry", "pantry", "groceries"],
    health: ["doctor", "clinic", "therapy", "meds", "depressed", "anxiety", "crisis"],
    legal: ["court", "notice", "benefits", "appeal", "lawyer", "ticket", "eviction"],
    jobs: ["scam", "pay", "wage", "hours", "fired", "unemploy", "job"],
    emergency: ["shelter", "storm", "evacu", "fire", "flood", "danger"]
  }[category] || [];

  return hints.length ? hints.some(k => d.includes(k)) : true;
}

function buildResourcesPlan(category, locationText, detailsText) {
  const loc = (locationText || "").trim() || "your area";
  const details = (detailsText || "").trim();
  const useDetails = detailsSeemsUseful(category, details);

  const commonLinks = [
    { title: "Call 2-1-1 (local help & referrals)", url: "https://www.211.org/", tag: "Best first step" },
    { title: "FindFood (food banks / pantries)", url: "https://www.feedingamerica.org/find-your-local-foodbank", tag: "Food" },
    { title: "Benefits.gov (benefits screener)", url: "https://www.benefits.gov/", tag: "Benefits" },
    { title: "USA.gov (official services directory)", url: "https://www.usa.gov/", tag: "Official" }
  ];

  const localShortcuts = [];
  if (locationText && locationText.trim()) {
    const base = locationText.trim();
    const qMap = {
      housing: ["emergency rental assistance", "housing authority", "tenant legal aid"],
      food: ["food pantry", "SNAP office", "community fridge"],
      health: ["community health clinic", "mental health crisis center", "urgent care"],
      legal: ["legal aid", "tenant lawyer", "benefits legal help"],
      jobs: ["workforce development center", "job center", "report job scam FTC"],
      emergency: ["emergency shelter", "evacuation center", "Red Cross shelter"]
    }[category] || ["local services"];

    qMap.forEach(q => {
      localShortcuts.push({
        title: `Map: ${q} near ${base}`,
        url: mapsSearchLink(`${q} near ${base}`),
        tag: "Local map"
      });
    });

    localShortcuts.push({
      title: `Search: ${category} help near ${base}`,
      url: googleSearchLink(`${category} help near ${base}`),
      tag: "Local search"
    });
  }

  const plan = { links: [...localShortcuts, ...commonLinks], checklist: [], plain: "" };
  const insertAt = localShortcuts.length;

  if (category === "housing") {
    plan.links.splice(insertAt, 0, { title: "HUD Rental Assistance", url: "https://www.hud.gov/topics/rental_assistance", tag: "Housing" });
    plan.checklist = [
      "Call 2-1-1 and ask for emergency rental assistance programs near you.",
      "Gather: ID, lease, pay stubs or income proof, past-due notices, utility bills.",
      "Ask your landlord about payment plan options (get it in writing).",
      "If eviction risk: seek legal aid immediately (local legal aid / tenant hotline)."
    ];
    plan.plain = `For housing help in ${loc}, start with 2-1-1 and ask for emergency rental assistance. Gather basic documents and request a payment plan if needed. If eviction is possible, contact legal aid fast.`;
  }

  if (category === "food") {
    plan.links.splice(insertAt, 0, { title: "SNAP (food assistance) info", url: "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program", tag: "SNAP" });
    plan.checklist = [
      "Call 2-1-1 and ask for food pantries + SNAP help in your area.",
      "Use Feeding America’s locator to find a nearby pantry.",
      "Gather: ID, address proof, income info (if applying for SNAP).",
      "Plan a 3–5 day grocery list based on pantry items to stretch food longer."
    ];
    plan.plain = `For food help in ${loc}, check a nearby pantry first (fastest), then apply for SNAP if you qualify. 2-1-1 can connect you to both.`;
  }

  if (category === "health") {
    plan.links.splice(insertAt, 0,
      { title: "Find a Health Center (HRSA)", url: "https://findahealthcenter.hrsa.gov/", tag: "Low-cost care" },
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
    plan.links.splice(insertAt, 0, { title: "Legal Services Corporation (find legal aid)", url: "https://www.lsc.gov/about-lsc/what-legal-aid/i-need-legal-help", tag: "Legal aid" });
    plan.checklist = [
      "Write a short timeline of what happened (dates, names, notices).",
      "Gather key paperwork and screenshots.",
      "Find legal aid near you (LSC) and request an intake appointment.",
      "If dealing with benefits: use Benefits.gov to find programs you may qualify for."
    ];
    plan.plain = `For legal/benefit issues in ${loc}, gather your documents and contact legal aid via LSC. Keep a clear timeline—it speeds up help.`;
  }

  if (category === "jobs") {
    plan.links.splice(insertAt, 0,
      { title: "Department of Labor (worker rights)", url: "https://www.dol.gov/general/topic/workhours", tag: "Worker rights" },
      { title: "Report fraud / scams (FTC)", url: "https://reportfraud.ftc.gov/", tag: "Report scams" }
    );
    plan.checklist = [
      "Write down employer details, hours worked, pay rate, and missed payments/issues.",
      "Save messages, schedules, pay stubs, and screenshots.",
      "If it’s a job scam: stop sending info and report (FTC).",
      "Use 2-1-1 for local job programs and emergency support if needed."
    ];
    plan.plain = `For job issues in ${loc}, document everything (hours/pay/messages). If it seems like a scam, report to the FTC and stop sharing personal info.`;
  }

  if (category === "emergency") {
    plan.links.splice(insertAt, 0,
      { title: "Find an emergency shelter (Red Cross)", url: "https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html", tag: "Shelter" },
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

  if (useDetails) {
    plan.checklist.unshift(`Call script: “Hi, I’m in ${loc}. ${details} Can you connect me to the right local program?”`);
  } else {
    plan.checklist.unshift(`Call script: “Hi, I’m in ${loc}. I need help with ${category}. What local programs should I start with?”`);
  }

  return { ...plan, usedDetails: useDetails };
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

// Persist last resource plan
function saveResourcesLastPlan(payload) {
  saveJSON(userKey("resourcesLastPlan"), payload);
}
function loadResourcesLastPlanIfAny() {
  const last = loadJSON(userKey("resourcesLastPlan"), null);
  if (!last) return; // keep whatever is on screen
  // restore inputs
  resCategory.value = last.category || "housing";
  resLocation.value = last.location || "";
  resDetails.value = last.details || "";
  if (last.plan) renderResourcesPlan(last.plan);
  resStatus.textContent = last.status || "";
}

resExampleBtn.addEventListener("click", () => {
  resCategory.value = "housing";
  resLocation.value = "Newark, DE";
  resDetails.value = "Behind on rent and need food support this week.";
  resStatus.textContent = "Example loaded. Click Build Plan.";
});

resGenerateBtn.addEventListener("click", () => {
  const category = resCategory.value;
  const loc = (resLocation.value || "").trim();
  const details = (resDetails.value || "").trim();

  const plan = buildResourcesPlan(category, resLocation.value, resDetails.value);
  renderResourcesPlan(plan);

  let status = loc ? "Plan built with local map links." : "Plan built. Add city/state for local map links.";
  if (details && !plan.usedDetails) status += " (Details looked unclear, so we used a generic call script.)";

  resStatus.textContent = status;
  toast("Plan built ✅");

  saveResourcesLastPlan({
    category,
    location: resLocation.value,
    details: resDetails.value,
    plan,
    status
  });
});

resCopyBtn.addEventListener("click", () => {
  let text = `Resources Plan (${resCategory.value})\n`;
  text += `Location: ${resLocation.value || "—"}\n`;
  if (resDetails.value.trim()) text += `Details: ${resDetails.value.trim()}\n`;
  text += "\nLinks:\n";
  resLinks.querySelectorAll("a").forEach(a => {
    text += `- ${a.textContent}: ${a.href}\n`;
  });
  text += "\nChecklist:\n";
  Array.from(resChecklist.children).forEach(li => text += `- ${li.textContent}\n`);
  text += "\nSummary:\n" + resPlain.textContent + "\n";
  navigator.clipboard.writeText(text).then(() => toast("Copied ✅")).catch(() => toast("Copy failed"));
});

// ===== Planner (more app-like + clear eco stats) =====
const WEEKDAY_MAP = {
  sun: 0, sunday: 0,
  mon: 1, monday: 1,
  tue: 2, tues: 2, tuesday: 2,
  wed: 3, wednesday: 3,
  thu: 4, thur: 4, thurs: 4, thursday: 4,
  fri: 5, friday: 5,
  sat: 6, saturday: 6
};
function detectWeekdayIndex(text) {
  const lower = (text || "").toLowerCase();
  const keys = Object.keys(WEEKDAY_MAP).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    const re = new RegExp(`\\b${k}\\b`, "i");
    if (re.test(lower)) return WEEKDAY_MAP[k];
  }
  return null;
}
function parseMinutes(text) {
  const lower = (text || "").toLowerCase();

  const range = lower.match(/(\d{1,2})\s*(?:-|–)\s*(\d{1,2})\s*(am|pm)?/i);
  if (range) {
    const a = parseInt(range[1], 10);
    const b = parseInt(range[2], 10);
    const hours = Math.max(1, Math.abs(b - a));
    return hours * 60;
  }

  const m1 = lower.match(/(\d+)\s*min/);
  if (m1) return Math.max(5, Math.min(480, parseInt(m1[1], 10)));

  const h1 = lower.match(/(\d+(\.\d+)?)\s*(hour|hr|hrs|h)\b/);
  if (h1) {
    const hrs = parseFloat(h1[1]);
    return Math.max(5, Math.min(480, Math.round(hrs * 60)));
  }

  if (lower.includes("work") || lower.includes("shift")) return 240;
  return 45;
}

function ecoTagging(text) {
  const lower = (text || "").toLowerCase();
  const tags = [];
  let points = 0;

  const rules = [
    { keys: ["bus", "transit", "train", "walk", "bike"], tag: "Transit", pts: 6, kg: 0.6 },
    { keys: ["carpool", "share ride"], tag: "Carpool", pts: 4, kg: 0.4 },
    { keys: ["meatless", "vegetarian", "vegan"], tag: "Diet", pts: 5, kg: 0.5 },
    { keys: ["recycle", "compost"], tag: "Waste", pts: 3, kg: 0.2 },
    { keys: ["reusable", "bottle", "tote"], tag: "Reuse", pts: 2, kg: 0.1 },
    { keys: ["lights off", "unplug", "energy", "thermostat"], tag: "Energy", pts: 4, kg: 0.3 }
  ];

  let kg = 0;
  rules.forEach(r => {
    if (r.keys.some(k => lower.includes(k))) {
      tags.push(r.tag);
      points += r.pts;
      kg += r.kg;
    }
  });

  return { tags, ecoPoints: points, ecoKg: Number(kg.toFixed(1)) };
}

function lineSeemsRealTask(line) {
  const t = (line || "").trim();
  if (t.length < 3) return false;
  // reject obvious gibberish: no vowels AND no digits AND no spaces pattern? (simple heuristic)
  const hasVowel = /[aeiou]/i.test(t);
  const hasWord = /[a-z]{3,}/i.test(t);
  return hasVowel || hasWord;
}

function parseTasks(text, mode) {
  const lines = (text || "").split("\n").map(x => x.trim()).filter(Boolean);
  const tasks = [];

  for (const line of lines) {
    if (!lineSeemsRealTask(line)) continue;

    const lower = line.toLowerCase();
    let dueIndex = detectWeekdayIndex(lower);
    const minutes = parseMinutes(lower);

    let priority = 2;
    if (/\bquiz\b|\bexam\b|\bdue\b|\bby\b/i.test(lower)) priority = 1;
    if (/\boptional\b|\bif time\b/i.test(lower)) priority = 3;

    const eco = ecoTagging(line);
    const isEco = eco.ecoPoints > 0;

    // In eco mode, we keep tasks but we want eco to matter:
    // we’ll prioritize eco tasks in scheduling.
    tasks.push({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2),
      text: line,
      dueIndex,
      minutes,
      priority,
      ecoTags: eco.tags,
      ecoPoints: eco.ecoPoints,
      ecoKg: eco.ecoKg,
      isEco
    });
  }

  if (mode === "eco") {
    const ecoCount = tasks.filter(t => t.isEco).length;
    if (tasks.length === 0) {
      planStatus.textContent = "Add tasks (one per line). Example: “bus to campus”, “reusable bottle”, “meatless dinner”.";
    } else if (ecoCount === 0) {
      planStatus.textContent = "Eco mode: no eco habits detected. Try adding: “bus”, “walk”, “reusable bottle”, “meatless meal”, “recycle”.";
    }
  }

  return tasks;
}

function buildPlan(tasks, daysCount, minutesPerDay, mode) {
  const now = new Date();
  const startDow = now.getDay();

  function dueInDays(task) {
    if (task.dueIndex == null) 
      return 999;
    let delta = task.dueIndex - startDow;
    if (delta < 0) delta += 7;
    return delta;
  }

  const sorted = [...tasks].sort((a, b) => {
    const da = dueInDays(a), db = dueInDays(b);
    if (da !== db) return da - db;

    // Eco mode: prefer eco tasks earlier
    if (mode === "eco" && a.isEco !== b.isEco) return a.isEco ? -1 : 1;

    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.minutes - a.minutes;
  });

  const days = [];
  for (let i = 0; i < daysCount; i++) {
    const info = dayLabelFromOffset(i);
    days.push({
      ymd: info.ymd,
      label: info.label,
      budget: minutesPerDay,
      used: 0,
      overflowMinutes: 0,
      items: []
    });
  }

  // Distribute better: don’t dump everything on day 0 unless it fits.
  for (const task of sorted) {
    let targetIndex = 0;
    const dueDelta = dueInDays(task);
    if (dueDelta !== 999) targetIndex = Math.min(daysCount - 1, dueDelta);

    let placed = false;

    // Try target day first
    if (days[targetIndex].used + task.minutes <= days[targetIndex].budget) {
      days[targetIndex].items.push({ ...task, done: false });
      days[targetIndex].used += task.minutes;
      placed = true;
    }

    // Then spread forward to balance
    if (!placed) {
      for (let i = targetIndex; i < daysCount; i++) {
        if (days[i].used + task.minutes <= days[i].budget) {
          days[i].items.push({ ...task, done: false });
          days[i].used += task.minutes;
          placed = true;
          break;
        }
      }
    }

    // If still not placed, mark overflow and count overflow time
    if (!placed) {
      const last = days[daysCount - 1];
      last.items.push({ ...task, done: false, overflow: true });
      last.overflowMinutes += task.minutes;
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
function loadPlannerSaved2() {
  return loadJSON(savedPlannerKey(), null);
}

function computeEcoPoints(days) {
  let total = 0;
  days.forEach(d => d.items.forEach(it => { total += (it.ecoPoints || 0); }));
  return total;
}

function computeEcoKgStats(days) {
  if (!days?.length) return { doneKg: 0, todoKg: 0, doneCount: 0, todoCount: 0 };
  const today = days[0];
  if (!today?.items?.length) return { doneKg: 0, todoKg: 0, doneCount: 0, todoCount: 0 };
  const eco = today.items.filter(x => x.isEco);
  const done = eco.filter(x => x.done);
  const todo = eco.filter(x => !x.done);
  const doneKg = done.reduce((s, it) => s + Number(it.ecoKg || 0), 0);
  const todoKg = todo.reduce((s, it) => s + Number(it.ecoKg || 0), 0);
  return {
    doneKg: Number(doneKg.toFixed(1)),
    todoKg: Number(todoKg.toFixed(1)),
    doneCount: done.length,
    todoCount: todo.length
  };
}

function renderPlanner(days, meta, savedDate) {
  planSchedule.innerHTML = "";
  planToday.innerHTML = "";

  if (!days || !days.length) {
    planMeta.textContent = "No plan yet. Build one to start.";
    return;
  }

  const points = computeEcoPoints(days);
  const ecoLine = points > 0 ? ` • Eco points: ${points}` : "";
  const stamp = savedDate ? formatYMD(savedDate) : formatYMD(ymdToday());
  planMeta.textContent = `Plan • ${meta.days} day(s) • ${meta.minutes}/day • ${stamp}${ecoLine}`;

  // Eco summary for today (visible!)
  const ecoStats = computeEcoKgStats(days);
  if (planEcoSummary && planEcoCompleted && planEcoPotential) {
    planEcoSummary.style.display = "flex";
    planEcoCompleted.textContent = `${ecoStats.doneKg.toFixed(1)} kg (${ecoStats.doneCount})`;
    planEcoPotential.textContent = `${ecoStats.todoKg.toFixed(1)} kg (${ecoStats.todoCount})`;
  }

  days.forEach((d, dayIdx) => {
    const card = document.createElement("div");
    card.className = "dayCard";

    const head = document.createElement("div");
    head.className = "dayHeader";
    const overflowBadge = d.overflowMinutes > 0 ? ` <span class="smallPill miniPill">Overflow</span>` : "";
    head.innerHTML = `
      <div class="dayTitle">${d.label}${overflowBadge}</div>
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

        const tag = (it.isEco && it.ecoTags?.length)
          ? ` <span class="smallPill miniPill">🌱 ${it.ecoTags.join(", ")}</span>`
          : "";

        const text = document.createElement("div");
        text.className = "taskText";
        text.innerHTML = `${it.text}${tag}`;

        const metaDiv = document.createElement("div");
        metaDiv.className = "taskMeta";
        const overflow = it.overflow ? " • overflow" : "";
        const ecoMeta = it.isEco ? ` • ${it.ecoKg}kg` : "";
        metaDiv.textContent = `${it.minutes} min${ecoMeta}${overflow}`;

        cb.addEventListener("change", () => {
          it.done = cb.checked;

          const saved = loadPlannerSaved2();
          if (saved && saved.days) {
            saved.days[dayIdx].items = saved.days[dayIdx].items.map(x => x.id === it.id ? { ...x, done: it.done } : x);
            saveJSON(savedPlannerKey(), saved);
          }

          // Meaningful activity if completing eco today
          if (loadPlannerEcoToHomePref() && it.isEco && it.done && d.ymd === ymdToday()) {
            markActiveToday();
          }

          updateImpactSnapshot();
          renderTodayFocus(days);

          // Update eco summary blocks live
          const ecoStatsNow = computeEcoKgStats(days);
          if (planEcoCompleted && planEcoPotential) {
            planEcoCompleted.textContent = `${ecoStatsNow.doneKg.toFixed(1)} kg (${ecoStatsNow.doneCount})`;
            planEcoPotential.textContent = `${ecoStatsNow.todoKg.toFixed(1)} kg (${ecoStatsNow.todoCount})`;
          }

          toast(it.done ? "Checked ✅" : "Unchecked");
        });

        row.appendChild(cb);
        row.appendChild(text);
        row.appendChild(metaDiv);

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
    const pill = it.isEco ? `<span class="smallPill miniPill">🌱 ${it.ecoKg}kg</span>` : `<span class="smallPill miniPill">${it.minutes} min</span>`;
    li.innerHTML = `<span>${it.text}</span>${pill}`;
    planToday.appendChild(li);
  });
}

function renderPlannerFromSavedIfAny() {
  const saved = loadPlannerSaved2();
  if (saved && saved.days && saved.meta) {
    renderPlanner(saved.days, saved.meta, saved.date);
    if (saved.rawInput) planTasks.value = saved.rawInput;
    if (saved.meta.minutes) planTime.value = String(saved.meta.minutes);
    if (saved.meta.days) planDays.value = String(saved.meta.days);
    if (saved.meta.mode) planMode.value = String(saved.meta.mode);
  } else {
    planSchedule.innerHTML = "";
    planToday.innerHTML = "";
    planMeta.textContent = "No plan yet. Build one to start.";
    if (planEcoSummary) planEcoSummary.style.display = "none";
  }

  updateImpactSnapshot();
}

planEcoToHome?.addEventListener("change", () => {
  savePlannerEcoToHomePref(planEcoToHome.checked);
  updateImpactSnapshot();
  toast(planEcoToHome.checked ? "Planner counts toward Today ✅" : "Planner removed from Today");
});

planGenerateBtn.addEventListener("click", () => {
  const text = planTasks.value.trim();
  if (!text) {
    planStatus.textContent = "Add a few tasks first (one per line).";
    toast("Add tasks first");
    return;
  }

  const minutes = Number(planTime.value);
  const daysCount = Number(planDays.value);
  const mode = planMode.value;

  const tasks = parseTasks(text, mode);
  if (!tasks.length) {
    planStatus.textContent = "Couldn’t detect any real tasks. Try short lines like “bus to campus” or “study 60 min”.";
    toast("No tasks detected");
    return;
  }

  const days = buildPlan(tasks, daysCount, minutes, mode);
  const meta = { minutes, days: daysCount, mode };

  if (planSave.checked) savePlanner(days, text, meta);

  renderPlanner(days, meta, ymdToday());
  planStatus.textContent = planSave.checked ? "Plan saved." : "Plan built (not saved).";
  toast("Plan built ✅");
});

planLoadBtn.addEventListener("click", () => {
  renderPlannerFromSavedIfAny();
  toast("Loaded");
});

planClearBtn.addEventListener("click", () => {
  planTasks.value = "";
  planSchedule.innerHTML = "";
  planToday.innerHTML = "";
  planMeta.textContent = "No plan yet. Build one to start.";
  planStatus.textContent = "Cleared (saved plan unchanged).";
  if (planEcoSummary) planEcoSummary.style.display = "none";
  toast("Cleared");
});

planCopyBtn.addEventListener("click", () => {
  const saved = loadPlannerSaved2();
  let text = "Action Planner\n\n";
  if (!saved?.days?.length) {
    text += "(No plan saved)\n";
  } else {
    text += `${saved.meta.days} day(s), ${saved.meta.minutes}/day, mode: ${saved.meta.mode}\nSaved: ${formatYMD(saved.date)}\n\n`;
    saved.days.forEach(d => {
      text += `${d.label} (${Math.min(d.used, d.budget)}/${d.budget} min)\n`;
      if (!d.items.length) text += "- (no tasks)\n";
      else d.items.forEach(it => {
        const eco = it.isEco ? ` [eco ${it.ecoKg}kg]` : "";
        const done = it.done ? " ✅" : "";
        text += `- ${it.text} (${it.minutes} min)${eco}${done}\n`;
      });
      text += "\n";
    });
  }
  navigator.clipboard.writeText(text).then(() => toast("Copied ✅")).catch(() => toast("Copy failed"));
});

// ===== Events =====
tabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));

// ===== Start =====
clearNormalOutput();
clearEcoOutput();
renderEcoHistory();
renderImpactHistory();

// Apply saved planner eco-to-home preference immediately
if (planEcoToHome) planEcoToHome.checked = loadPlannerEcoToHomePref();

setActiveTab("guidance");
