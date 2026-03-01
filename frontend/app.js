const currentUser = localStorage.getItem("civicclear_current_user");
if (!currentUser) window.location.href = "login_signup/login.html?expired=1";
function userKey(suffix) {
  const u = encodeURIComponent(currentUser || "unknown");
  return "civicclear_user_" + u + "_" + suffix;
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
if (raw) {
  return JSON.parse(raw);
} else {
  return fallback;
}
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const toastEl = document.getElementById("toast");
let toastTimer = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
}

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
function diffDaysYMD(aYmd, bYmd) {
  const a = parseYMDLocal(aYmd);
  const b = parseYMDLocal(bYmd);
  if (!a || !b) return 999;
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

document.getElementById("welcomeText").textContent = `Welcome, ${currentUser}`;
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("civicclear_current_user");
  window.location.href = "login_signup/login.html";
});

const tabs = document.querySelectorAll(".tab");
const panelTitle = document.getElementById("panelTitle");

// the Text Guidance
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

// Impact Forecast 
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

// Resources DOM (LINKS ONLY)
const resourcesBox = document.getElementById("resourcesBox");
const resCategory = document.getElementById("resCategory");
const resLocation = document.getElementById("resLocation");
const resShowBtn = document.getElementById("resShowBtn");
const resClearBtn = document.getElementById("resClearBtn");
const resCopyBtn = document.getElementById("resCopyBtn");
const resLinks = document.getElementById("resLinks");
const resStatus = document.getElementById("resStatus");

// Planner DOM (Simplified)
const plannerBox = document.getElementById("plannerBox");
const planTasks = document.getElementById("planTasks");
const planTime = document.getElementById("planTime");
const planEcoToHome = document.getElementById("planEcoToHome");
const planSave = document.getElementById("planSave");
const planGenerateBtn = document.getElementById("planGenerateBtn");
const planLoadBtn = document.getElementById("planLoadBtn");
const planClearBtn = document.getElementById("planClearBtn");
const planCopyBtn = document.getElementById("planCopyBtn");
const planMeta = document.getElementById("planMeta");
const planStatus = document.getElementById("planStatus");

const planTodayList = document.getElementById("planTodayList");
const planNextList = document.getElementById("planNextList");
const planTodayFocus = document.getElementById("planTodayFocus");

// Planner summary cards
const planEcoSummary = document.getElementById("planEcoSummary");
const planEcoCompleted = document.getElementById("planEcoCompleted");
const planEcoPotential = document.getElementById("planEcoPotential");


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

const DEFAULT_ECO_SCORE = 50;
let homeEcoScore = parseInt(localStorage.getItem(userKey("ecoScore")) || DEFAULT_ECO_SCORE, 10);
let streak = parseInt(localStorage.getItem(userKey("streak")) || 0, 10);
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
function refreshHomeNumbers() {
  if (ecoScoreNum) ecoScoreNum.textContent = String(homeEcoScore);
  if (streakNum) streakNum.textContent = String(streak);
  if (lastActiveText) lastActiveText.textContent = formatLastActive(lastActionDay);
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
refreshHomeNumbers();

function ensureTodayObject(key, fallback) {
  const obj = loadJSON(key, fallback);
  if (!obj || obj.date !== ymdToday()) return { ...fallback, date: ymdToday() };
  return obj;
}

// Quick actions today state
let doneToday = ensureTodayObject(userKey("doneToday"), { date: ymdToday(), actions: {} });
saveJSON(userKey("doneToday"), doneToday);

function loadPlannerEcoToHomePref() {
  const pref = localStorage.getItem(userKey("plannerEcoToHomePref"));

  if (pref === null) {
    return true;
  }

  return pref === "true";
}

function savePlannerEcoToHomePref(v) {
  localStorage.setItem(
    userKey("plannerEcoToHomePref"),
    String(!!v)
  );
}

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

function loadPlannerSaved() {
  return loadJSON(userKey("plannerSaved"), null);
}

// Quick action savings: modest, believable
function computeQuickActionSavings() {
  const savings = { bus: 0.6, bottle: 0.1, veg: 0.5, lights: 0.3 }; 
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
  if (!saved?.today?.length) return { doneCount: 0, doneKg: 0, todoCount: 0, todoKg: 0 };

  // Only count today's planner if it's saved for today
  if (saved.date !== ymdToday()) return { doneCount: 0, doneKg: 0, todoCount: 0, todoKg: 0 };

  const eco = saved.today.filter(it => it.isEco);
  const done = eco.filter(it => it.done);
  const todo = eco.filter(it => !it.done);

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

  const savedKg = Number((qa.kg + planner.doneKg).toFixed(1));

  // Planned potential (eco tasks in today's list)
  if (plannedPotential && plannedCount && plannedBox) {
    const show = (planner.todoCount > 0);
    plannedBox.style.display = show ? "block" : "none";
    if (show) {
      plannedPotential.textContent = `${planner.todoKg.toFixed(1)} kg`;
      plannedCount.textContent = `${planner.todoCount}`;
    }
  }

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

function resetToday() {
  if (!confirm("Reset today’s completed actions? (Quick Actions + today's Planner checkmarks only)")) return;

  doneToday = { date: ymdToday(), actions: {} };
  saveJSON(userKey("doneToday"), doneToday);

  const saved = loadPlannerSaved();
  if (saved?.today?.length && saved.date === ymdToday()) {
    saved.today = saved.today.map(it => ({ ...it, done: false }));
    saveJSON(userKey("plannerSaved"), saved);
  }

  refreshQuickButtons();
  updateImpactSnapshot();
  renderPlannerFromSavedIfAny();
  toast("Reset today");
}
resetTodayBtn?.addEventListener("click", resetToday);


document.querySelectorAll(".qaBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    if (doneToday.actions[action]) return;

    doneToday.actions[action] = true;

    const scoreBumps = { bus: 3, bottle: 1, veg: 2, lights: 1 };
    homeEcoScore += (scoreBumps[action] || 1);
    homeEcoScore = Math.max(0, Math.min(100, Math.round(homeEcoScore)));

    saveJSON(userKey("doneToday"), doneToday);
    persistDashboardBasics();
    markActiveToday();

    refreshQuickButtons();
    updateImpactSnapshot();
    toast("Logged ");
  });
});

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
  if (tabName === "resources") loadResourcesPrefsAndRender();
  if (tabName === "planner") {
    if (planEcoToHome) planEcoToHome.checked = loadPlannerEcoToHomePref();
    renderPlannerFromSavedIfAny();
  }

  updateImpactSnapshot();
}

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
    toast("Generated");
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

  navigator.clipboard.writeText(text).then(() => toast("Copied")).catch(() => toast("Copy failed :("));
});

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

function formatScoreChange(n) {
  const rounded = Math.round(n);

  if (rounded === 0) {
    return "0";
  }

function formatScoreChange(n) {
  const rounded = Math.round(n);
  if (rounded === 0) return "0";
  if (rounded > 0) return `+${rounded}`;
  return `${rounded}`; 
}

function formatScoreChange(n) {
  var rounded = Math.round(n);
  if (rounded === 0) return "0";
  if (rounded > 0) return "+" + rounded;
  return "" + rounded;
}

function calculateEcoFromForm() {
  var commute = ecoCommute && ecoCommute.value ? ecoCommute.value : "car";
  var miles = ecoMiles && ecoMiles.value ? Number(ecoMiles.value) : 0;
  if (miles < 0) miles = 0;

  var score = 100;

  var perMile = 0.6;
  if (commute === "walk") perMile = 0;
  if (commute === "bus") perMile = 0.2;
  if (commute === "car") perMile = 0.6;
  if (commute === "rideshare") perMile = 0.8;

  var drivePenalty = miles * perMile;
  if (commute === "car") drivePenalty += 20;
  if (commute === "public") drivePenalty += 5;

  score = score - drivePenalty;
  if (ecoCarpool && ecoCarpool.checked) score += 5;

  var diet = ecoDiet && ecoDiet.value ? ecoDiet.value : "mixed";
  var dietPenalty = 6;
  if (diet === "vegan") dietPenalty = -5;
  if (diet === "vegetarian") dietPenalty = -2;
  if (diet === "heavyMeat") dietPenalty = 16;
  score = score - dietPenalty;

  var shopping = ecoShopping && ecoShopping.value ? ecoShopping.value : "small";
  var shoppingPenalty = 2;
  if (shopping === "none") shoppingPenalty = -2;
  if (shopping === "big") shoppingPenalty = 8;
  score = score - shoppingPenalty;

  var recycleHabit = ecoRecycleHabit && ecoRecycleHabit.value ? ecoRecycleHabit.value : "sometimes";
  var recyclePenalty = 2;
  if (recycleHabit === "always") recyclePenalty = -3;
  if (recycleHabit === "rarely") recyclePenalty = 6;

  var plastic = ecoPlastic && ecoPlastic.value ? ecoPlastic.value : "medium";
  var plasticPenalty = 2;
  if (plastic === "low") plasticPenalty = -2;
  if (plastic === "high") plasticPenalty = 7;

  var wasteTotal = recyclePenalty + plasticPenalty;
  score = score - wasteTotal;

  if (score < 0) score = 0;
  if (score > 100) score = 100;
  score = Math.round(score);

  var rating = "Excellent";
  if (score < 80) rating = "Good";
  if (score < 60) rating = "Fair";
  if (score < 40) rating = "Poor";

  return {
    score: score,
    rating: rating,
    commuteText: "Transport: " + commute + " • Miles: " + miles + " • Score change: " + formatScoreChange(drivePenalty),
    dietText: "Food: " + diet + " • Score change: " + formatScoreChange(dietPenalty),
    consumptionText: "Shopping: " + shopping + " • Score change: " + formatScoreChange(shoppingPenalty),
    wasteText: "Waste: Recycle " + recycleHabit + ", Plastic " + plastic + " • Score change: " + formatScoreChange(wasteTotal)
  };
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

  homeEcoScore = eco.score;
  persistDashboardBasics();
  refreshHomeNumbers();
  updateImpactSnapshot();

  markActiveToday();

  ecoStatus.textContent = "Saved. Home Eco Score updated.";
  toast("Calculated");
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

  text += "\nPlain-language summary:\n" + ecoAccessibleText.textContent + "\n\n";
  text += "History:\n" + (ecoStatsText.textContent || "") + "\n";
  Array.from(ecoHistoryList.children).forEach(li => text += `- ${li.textContent}\n`);

  navigator.clipboard.writeText(text).then(() => toast("Copied")).catch(() => toast("Copy failed :("));
});

function impactBase(action) {
  var map = {
    drive_less: { kg: 6.0, dollars: 6.5, note: "10–15 miles less/week" },
    transit_more: { kg: 8.0, dollars: 10, note: "Replacing 1–2 car trips/week" },
    energy: { kg: 5.0, dollars: 8, note: "Lowering electricity use" },
    meatless: { kg: 4.0, dollars: 4, note: "1 meatless day/week" },
    reusable: { kg: 0.6, dollars: 3, note: "Replacing bottled drinks" },
    recycle: { kg: 1.5, dollars: 1, note: "Better recycling/composting" }
  };
  if (map[action]) return map[action];
  return map["drive_less"];
}

function impactMultiplier(intensity) {
  if (intensity === "light") return 0.7;
  if (intensity === "strong") return 1.4;
  return 1.0;
}

function computeImpact(action, intensity, weeks) {
  var base = impactBase(action);
  var mult = impactMultiplier(intensity);
  var w = 1;
  if (weeks) w = Number(weeks);
  if (w < 1) w = 1;

  var kg = base.kg * mult * w;
  if (kg < 0) kg = 0;

  var dollars = base.dollars * mult * w;
  if (dollars < 0) dollars = 0;

  var phoneCharges = Math.round(kg * 80);
  var treeMonths = Math.round(kg / 2);
  if (treeMonths < 1) treeMonths = 1;

  var score = 20 + kg * 3;
  if (score > 100) score = 100;
  score = Math.round(score);

  return {
    kg: kg,
    dollars: dollars,
    phoneCharges: phoneCharges,
    treeMonths: treeMonths,
    score: score,
    note: base.note
  };
}
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

impactRunBtn.addEventListener("click", function() {
  var action = impactAction.value;
  var intensity = impactIntensity.value;
  var weeks = Number(impactWeeks.value);
  if (!weeks || weeks < 1) weeks = 1;

  var out = computeImpact(action, intensity, weeks);

  impactCO2.textContent = out.kg + " kg";
  impactCO2Note.textContent = out.note;

  impactMoney.textContent = "$" + Math.round(out.dollars);
  impactMoneyNote.textContent = "Estimated over " + weeks + " week(s)";

  impactEquiv.textContent = "Charging " + out.phoneCharges + " phones • " + out.treeMonths + " tree-months";
  impactScore.textContent = out.score + "/100";

  var label = impactAction.options[impactAction.selectedIndex].textContent;
  addImpactHistory({
    date: ymdToday(),
    label: label + " • " + impactIntensity.value + " • " + weeks + "w",
    kg: out.kg,
    dollars: out.dollars,
    score: out.score
  });

  renderImpactHistory();

  impactStatusLine.textContent = "Saved as a forecast (does not affect Today’s Impact).";
  toast("Forecast saved");
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
  navigator.clipboard.writeText(text).then(() => toast("Copied")).catch(() => toast("Copy failed :("));
});

function linkCard(title, url, tag) {
  const div = document.createElement("div");
  div.innerHTML = '<a href="' + url + '" target="_blank">' + title + '</a> <span>' + tag + '</span>';
  return div;
}

function mapsSearchLink(query) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

function googleSearchLink(query) {
  return "https://www.google.com/search?q=" + encodeURIComponent(query);
}

document.body.appendChild(linkCard("USA.gov", googleSearchLink("benefits"), "Official"));

function baseLinksForCategory(category) {
  const common = [
    { title: "Call 2-1-1 (local help & referrals)", url: "https://www.211.org/", tag: "Best first step" },
    { title: "Benefits.gov (benefits screener)", url: "https://www.benefits.gov/", tag: "Benefits" },
    { title: "USA.gov (official services directory)", url: "https://www.usa.gov/", tag: "Official" }
  ];

  const cat = {
    housing: [{ title: "HUD Rental Assistance", url: "https://www.hud.gov/topics/rental_assistance", tag: "Housing" }],
    food: [
      { title: "SNAP (food assistance) info", url: "https://www.fns.usda.gov/snap/supplemental-nutrition-assistance-program", tag: "SNAP" },
      { title: "FindFood (food banks / pantries)", url: "https://www.feedingamerica.org/find-your-local-foodbank", tag: "Food" }
    ],
    health: [
      { title: "Find a Health Center (HRSA)", url: "https://findahealthcenter.hrsa.gov/", tag: "Low-cost care" },
      { title: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/", tag: "Urgent help" }
    ],
    legal: [{ title: "Legal Services Corporation (find legal aid)", url: "https://www.lsc.gov/about-lsc/what-legal-aid/i-need-legal-help", tag: "Legal aid" }],
    jobs: [
      { title: "Department of Labor (worker rights)", url: "https://www.dol.gov/general/topic/workhours", tag: "Worker rights" },
      { title: "Report fraud / scams (FTC)", url: "https://reportfraud.ftc.gov/", tag: "Report scams" }
    ],
    emergency: [
      { title: "Find an emergency shelter (Red Cross)", url: "https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html", tag: "Shelter" },
      { title: "FEMA disaster assistance", url: "https://www.disasterassistance.gov/", tag: "Disaster" }
    ]
  }[category] || [];

  return [...cat, ...common];
}

function localShortcuts(category, loc) {
  const base = (loc || "").trim();
  if (!base) return [];

  const qMap = {
    housing: ["emergency rental assistance", "housing authority", "tenant legal aid"],
    food: ["food pantry", "SNAP office", "community fridge"],
    health: ["community health clinic", "mental health crisis center", "urgent care"],
    legal: ["legal aid", "tenant lawyer", "benefits legal help"],
    jobs: ["workforce development center", "job center", "report job scam FTC"],
    emergency: ["emergency shelter", "evacuation center", "Red Cross shelter"]
  }[category] || ["local services"];

  const out = [];
  qMap.forEach(q => out.push({ title: `Map: ${q} near ${base}`, url: mapsSearchLink(`${q} near ${base}`), tag: "Local map" }));
  out.push({ title: `Search: ${category} help near ${base}`, url: googleSearchLink(`${category} help near ${base}`), tag: "Local search" });
  return out;
}

function renderResourceLinks() {
  if (!resLinks) return;
  resLinks.innerHTML = "";

  const category = resCategory.value;
  const loc = (resLocation.value || "").trim();

  const links = [...localShortcuts(category, loc), ...baseLinksForCategory(category)];
  links.forEach(l => resLinks.appendChild(linkCard(l.title, l.url, l.tag)));

  resStatus.textContent = loc
    ? "Showing trusted links + local map/search shortcuts."
    : "Showing trusted links. Add city/state for local map links.";

  saveJSON(userKey("resourcesPrefs"), { category, loc });
}

function loadResourcesPrefsAndRender() {
  const saved = loadJSON(userKey("resourcesPrefs"), null);
  if (saved?.category) resCategory.value = saved.category;
  if (typeof saved?.loc === "string") resLocation.value = saved.loc;
  renderResourceLinks();
}

resShowBtn?.addEventListener("click", () => {
  renderResourceLinks();
  toast("Links updated");
});
resClearBtn?.addEventListener("click", () => {
  resLocation.value = "";
  renderResourceLinks();
  toast("Cleared");
});
resCategory?.addEventListener("change", renderResourceLinks);

resCopyBtn?.addEventListener("click", () => {
  let text = `Resources (${resCategory.value})\n`;
  text += `Location: ${resLocation.value || "—"}\n\nLinks:\n`;
  resLinks.querySelectorAll("a").forEach(a => { text += `- ${a.textContent}: ${a.href}\n`; });
  navigator.clipboard.writeText(text).then(() => toast("Copied")).catch(() => toast("Copy failed :("));
});

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
function weekdayLabel(idx) {
  const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (idx == null) ? "" : (map[idx] || "");
}

function ecoTagging(text) {
  const lower = (text || "").toLowerCase();
  const tags = [];
  let points = 0;

  const rules = [
    { keys: ["bus", "transit", "train", "walk", "bike", "biking"], tag: "Transit", pts: 6, kg: 0.6 },
    { keys: ["carpool", "share ride", "shared ride"], tag: "Carpool", pts: 4, kg: 0.4 },
    { keys: ["meatless", "vegetarian", "vegan", "beans"], tag: "Diet", pts: 5, kg: 0.5 },
    { keys: ["recycle", "recycling", "compost"], tag: "Waste", pts: 3, kg: 0.2 },
    { keys: ["reusable", "refill", "bottle", "tote"], tag: "Reuse", pts: 2, kg: 0.1 },
    { keys: ["lights off", "turn off lights", "unplug", "energy", "thermostat"], tag: "Energy", pts: 4, kg: 0.3 }
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

function isPriorityTask(text) {
  const lower = (text || "").toLowerCase();
  return /\bquiz\b|\bexam\b|\bdue\b|\bdeadline\b|\bby\b/i.test(lower);
}

function clampMinutes(n) {
  const v = Number(n || 0);
  return Math.max(5, Math.min(240, v));
}

// Safe minutes parsing (prevents "10-15" being treated as hours unless am/pm exists)
function parseMinutesSafe(text, { isEco, isPriority }) {
  const lower = (text || "").toLowerCase();

  const m1 = lower.match(/(\d+)\s*min\b/);
  if (m1) return clampMinutes(parseInt(m1[1], 10));

  const h1 = lower.match(/(\d+(\.\d+)?)\s*(hour|hr|hrs|h)\b/);
  if (h1) return clampMinutes(Math.round(parseFloat(h1[1]) * 60));

  const hasAmPm = /\b(am|pm)\b/i.test(lower);
  if (hasAmPm) {
    const range = lower.match(/(\d{1,2})\s*(?:-|–)\s*(\d{1,2})\s*(am|pm)\b/i);
    if (range) {
      const a = parseInt(range[1], 10);
      const b = parseInt(range[2], 10);
      const hours = Math.max(1, Math.abs(b - a));
      return clampMinutes(hours * 60);
    }
  }

  if (lower.includes("work") || lower.includes("shift")) return 240;

  if (isEco) return 15;
  if (isPriority) return 45;
  return 30;
}

function lineSeemsRealTask(line) {
  const t = (line || "").trim();
  if (t.length < 2) return false;
  if (/\d/.test(t)) return true;
  if (/[a-z]{3,}/i.test(t)) return true;
  if (/\s/.test(t) && /[a-z]/i.test(t)) return true;
  return false;
}

function parseTasksSimple(text) {
  const lines = (text || "").split("\n").map(x => x.trim()).filter(Boolean);
  const tasks = [];
  let ignored = 0;

  for (const line of lines) {
    if (!lineSeemsRealTask(line)) { ignored++; continue; }

    const dueIndex = detectWeekdayIndex(line);
    const eco = ecoTagging(line);
    const isEco = eco.ecoPoints > 0;
    const priority = isPriorityTask(line);

    const minutes = parseMinutesSafe(line, { isEco, isPriority: priority });

    tasks.push({
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "_" + String(Math.random()).slice(2)),
      text: line,
      dueIndex,
      isEco,
      ecoTags: eco.tags,
      ecoPoints: eco.ecoPoints,
      ecoKg: eco.ecoKg,
      priority,
      minutes,
      done: false
    });
  }

  return { tasks, ignored, total: lines.length };
}

function sortTasksForToday(tasks) {
  const now = new Date();
  const startDow = now.getDay();

  function dueInDays(task) {
    if (task.dueIndex == null) return 999;
    let delta = task.dueIndex - startDow;
    if (delta < 0) delta += 7;
    return delta;
  }

  return [...tasks].sort((a, b) => {
    const da = dueInDays(a), db = dueInDays(b);
    if (da !== db) return da - db;
    if (a.priority !== b.priority) return a.priority ? -1 : 1;
    if (a.isEco !== b.isEco) return a.isEco ? -1 : 1;
    return b.minutes - a.minutes;
  });
}

// Fill today first, rest goes to Next Up
function buildTodayAndBacklog(tasks, minutesPerDay) {
  const sorted = sortTasksForToday(tasks);
  const today = [];
  const next = [];

  let used = 0;
  for (const t of sorted) {
    if (used + t.minutes <= minutesPerDay) {
      today.push({ ...t });
      used += t.minutes;
    } else {
      next.push({ ...t });
    }
  }

  return { today, next, used, budget: minutesPerDay };
}

function savedPlannerKey() {
  return userKey("plannerSaved");
}
function savePlannerSimple(payload) {
  saveJSON(savedPlannerKey(), payload);
}
function loadPlannerSavedSimple() {
  return loadJSON(savedPlannerKey(), null);
}

function computeEcoStatsFromToday(todayItems) {
  const eco = (todayItems || []).filter(x => x.isEco);
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

function pillHTML(item) {
  const pills = [];
  if (item.priority) pills.push(`<span class="typePill pri">⭐ Priority</span>`);
  if (item.dueIndex != null) pills.push(`<span class="typePill due">📅 Due ${weekdayLabel(item.dueIndex)}</span>`);
  if (item.isEco) {
    const tag = item.ecoTags?.length ? `🌱 Eco (${item.ecoTags.join(", ")})` : "🌱 Eco";
    pills.push(`<span class="typePill eco">${tag}</span>`);
  }
  if (!pills.length) pills.push(`<span class="typePill">🧠 General</span>`);
  return pills.join("");
}

function renderTodayFocus(todayItems) {
  planTodayFocus.innerHTML = "";
  const todo = (todayItems || []).filter(x => !x.done).slice(0, 4);

  if (!todo.length) {
    const li = document.createElement("li");
    li.textContent = "You’re done! Pick one small bonus task or rest.";
    planTodayFocus.appendChild(li);
    return;
  }

  todo.forEach(it => {
    const li = document.createElement("li");
    const pill = it.isEco
      ? `<span class="smallPill miniPill">🌱 ${it.ecoKg}kg</span>`
      : `<span class="smallPill miniPill">${it.minutes} min</span>`;
    li.innerHTML = `<span>${it.text}</span>${pill}`;
    planTodayFocus.appendChild(li);
  });
}

function renderPlannerSimple(payload) {
  planTodayList.innerHTML = "";
  planNextList.innerHTML = "";
  planTodayFocus.innerHTML = "";

  if (!payload?.today && !payload?.next) {
    planMeta.textContent = "No plan yet. Build one to start.";
    if (planEcoSummary) planEcoSummary.style.display = "none";
    return;
  }

  const today = payload.today || [];
  const next = payload.next || [];
  const used = payload.used || 0;
  const budget = payload.budget || Number(planTime.value || 120);
  const stamp = payload.date ? formatYMD(payload.date) : formatYMD(ymdToday());

  planMeta.textContent = `Plan • Today budget: ${used}/${budget} min • ${stamp}`;

  const ecoStats = computeEcoStatsFromToday(today);
  if (planEcoSummary && planEcoCompleted && planEcoPotential) {
    planEcoSummary.style.display = "flex";
    planEcoCompleted.textContent = `${ecoStats.doneKg.toFixed(1)} kg (${ecoStats.doneCount})`;
    planEcoPotential.textContent = `${ecoStats.todoKg.toFixed(1)} kg (${ecoStats.todoCount})`;
  }

  // Today list (checkboxes)
  if (!today.length) {
    const div = document.createElement("div");
    div.className = "miniMuted";
    div.textContent = "No tasks scheduled for today. Add tasks and build a plan.";
    planTodayList.appendChild(div);
  } else {
    today.forEach((it) => {
      const row = document.createElement("div");
      row.className = "planRow";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!it.done;

      const textWrap = document.createElement("div");
      textWrap.style.flex = "1";

      const title = document.createElement("div");
      title.className = "planText";
      title.textContent = it.text;

      const pills = document.createElement("div");
      pills.className = "planPills";
      pills.innerHTML = pillHTML(it);

      textWrap.appendChild(title);
      textWrap.appendChild(pills);

      const right = document.createElement("div");
      right.className = "planMetaRight";
      right.innerHTML = `<span class="smallPill miniPill">${it.minutes} min</span>${it.isEco ? `<span class="smallPill miniPill">🌱 ${it.ecoKg}kg</span>` : ""}`;

      cb.addEventListener("change", () => {
        it.done = cb.checked;

        const saved = loadPlannerSavedSimple();
        if (saved?.today?.length) {
          saved.today = saved.today.map(x => x.id === it.id ? { ...x, done: it.done } : x);
          savePlannerSimple(saved);
        }

        if (loadPlannerEcoToHomePref() && it.isEco && it.done) {
          markActiveToday();
        }

        updateImpactSnapshot();
        renderTodayFocus(today);

        const ecoStatsNow = computeEcoStatsFromToday(today);
        if (planEcoCompleted && planEcoPotential) {
          planEcoCompleted.textContent = `${ecoStatsNow.doneKg.toFixed(1)} kg (${ecoStatsNow.doneCount})`;
          planEcoPotential.textContent = `${ecoStatsNow.todoKg.toFixed(1)} kg (${ecoStatsNow.todoCount})`;
        }

        toast(it.done ? "Checked" : "Unchecked");
      });

      row.appendChild(cb);
      row.appendChild(textWrap);
      row.appendChild(right);
      planTodayList.appendChild(row);
    });
  }

  if (!next.length) {
    const div = document.createElement("div");
    div.className = "miniMuted";
    div.textContent = "No backlog. Nice!";
    planNextList.appendChild(div);
  } else {
    next.forEach((it) => {
      const row = document.createElement("div");
      row.className = "planRow disabled";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = false;
      cb.disabled = true;

      const textWrap = document.createElement("div");
      textWrap.style.flex = "1";

      const title = document.createElement("div");
      title.className = "planText";
      title.textContent = it.text;

      const pills = document.createElement("div");
      pills.className = "planPills";
      pills.innerHTML = pillHTML(it);

      textWrap.appendChild(title);
      textWrap.appendChild(pills);

      const right = document.createElement("div");
      right.className = "planMetaRight";
      right.innerHTML = `<span class="smallPill miniPill">${it.minutes} min</span>${it.isEco ? `<span class="smallPill miniPill">🌱 ${it.ecoKg}kg</span>` : ""}`;

      row.appendChild(cb);
      row.appendChild(textWrap);
      row.appendChild(right);
      planNextList.appendChild(row);
    });
  }

  renderTodayFocus(today);
}

function normalizePlannerToToday(saved) {
  if (!saved) return null;

  // If older plan exists, keep the lists but reset done for a fresh day.
  if (saved.date !== ymdToday()) {
    const today = (saved.today || []).map(it => ({ ...it, done: false }));
    const next = (saved.next || []).map(it => ({ ...it, done: false }));
    const updated = { ...saved, date: ymdToday(), today, next };
    savePlannerSimple(updated);
    return updated;
  }
  return saved;
}

function renderPlannerFromSavedIfAny() {
  let saved = loadPlannerSavedSimple();
  saved = normalizePlannerToToday(saved);

  if (saved) {
    renderPlannerSimple(saved);
    if (saved.rawInput) planTasks.value = saved.rawInput;
    if (saved.budget) planTime.value = String(saved.budget);
  } else {
    planTodayList.innerHTML = "";
    planNextList.innerHTML = "";
    planTodayFocus.innerHTML = "";
    planMeta.textContent = "No plan yet. Build one to start.";
    if (planEcoSummary) planEcoSummary.style.display = "none";
  }

  updateImpactSnapshot();
}

if (planEcoToHome) {
  planEcoToHome.addEventListener("change", function() {
    savePlannerEcoToHomePref(planEcoToHome.checked);
    updateImpactSnapshot();
    if (planEcoToHome.checked) {
      toast("Planner counts toward Today");
    } else {
      toast("Planner removed from Today");
    }
  });
}

planGenerateBtn.addEventListener("click", () => {
  const text = (planTasks.value || "").trim();
  if (!text) {
    planStatus.textContent = "Add a few tasks first (one per line).";
    toast("Add tasks first");
    return;
  }

  const minutesPerDay = Number(planTime.value || 120);

  const parsed = parseTasksSimple(text);
  const tasks = parsed.tasks;

  if (!tasks.length) {
    planStatus.textContent = "Couldn’t detect any real tasks. Try lines like “bus to campus” or “study 60 min”.";
    toast("No tasks detected");
    return;
  }

  const built = buildTodayAndBacklog(tasks, minutesPerDay);

  const payload = {
    date: ymdToday(),
    rawInput: text,
    budget: minutesPerDay,
    used: built.used,
    today: built.today,
    next: built.next
  };

  if (planSave.checked) savePlannerSimple(payload);

  renderPlannerSimple(payload);

  const ignoredMsg = parsed.ignored > 0 ? ` (${parsed.ignored} line(s) ignored — too short/unclear)` : "";
  planStatus.textContent = (planSave.checked ? "Plan saved." : "Plan built (not saved).") + ignoredMsg;

  toast("Its built!");
});

planLoadBtn.addEventListener("click", () => {
  renderPlannerFromSavedIfAny();
  toast("Loaded");
});

planClearBtn.addEventListener("click", () => {
  planTasks.value = "";
  planTodayList.innerHTML = "";
  planNextList.innerHTML = "";
  planTodayFocus.innerHTML = "";
  planMeta.textContent = "No plan yet. Build one to start.";
  planStatus.textContent = "Cleared (saved plan unchanged).";
  if (planEcoSummary) planEcoSummary.style.display = "none";
  toast("Cleared");
});

planCopyBtn.addEventListener("click", () => {
  const saved = loadPlannerSavedSimple();
  let text = "Action Planner\n\n";
  if (!saved?.today && !saved?.next) {
    text += "(No plan saved)\n";
  } else {
    text += `Budget: ${saved.budget} min\nSaved: ${formatYMD(saved.date)}\n\n`;

text += "Today:\n";

if (!saved.today || saved.today.length === 0) {
  text += "- (none)\n";
} else {
  for (var i = 0; i < saved.today.length; i++) {
    var it = saved.today[i];
    var tags = [];

    if (it.priority) tags.push("Priority");
    if (it.dueIndex != null) tags.push("Due " + weekdayLabel(it.dueIndex));
    if (it.isEco) tags.push("Eco " + it.ecoKg + "kg");

    var done = "";
    if (it.done) done = " ✅";

    text += "- " + it.text + " (" + it.minutes + " min)";
    if (tags.length > 0) text += " [" + tags.join(", ") + "]";
    text += done + "\n";
  }
}
text += "\nNext Up:\n";

if (!saved.next || saved.next.length === 0) {
  text += "- (none)\n";
} else {
  for (var i = 0; i < saved.next.length; i++) {
    var it = saved.next[i];
    var tags = [];

    if (it.priority) tags.push("Priority");
    if (it.dueIndex != null) tags.push("Due " + weekdayLabel(it.dueIndex));
    if (it.isEco) tags.push("Eco " + it.ecoKg + "kg");

    text += "- " + it.text + " (" + it.minutes + " min)";
    if (tags.length > 0) text += " [" + tags.join(", ") + "]";
    text += "\n";
  }
}

navigator.clipboard.writeText(text)
  .then(function() { toast("Copied"); })
  .catch(function() { toast("Copy failed :("); });

tabs.forEach(tab => tab.addEventListener("click", () => setActiveTab(tab.dataset.tab)));

clearNormalOutput();
clearEcoOutput();
renderEcoHistory();
renderImpactHistory();

if (planEcoToHome) planEcoToHome.checked = loadPlannerEcoToHomePref();
setActiveTab("guidance");
refreshQuickButtons();
updateImpactSnapshot();
