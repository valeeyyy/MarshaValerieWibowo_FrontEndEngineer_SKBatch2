"use strict";

const ALL = "All";
const DEPARTMENTS = [ALL, "Engineering", "Design", "Marketing", "Product"];

const ROLES = [
  {
    id: "eng-001",
    title: "Frontend Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Jakarta, Indonesia",
    shortDescription: "Build accessible, fast interfaces for our learning platform used by thousands of students every day.",
  },
  {
    id: "eng-002",
    title: "Backend Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    shortDescription: "Design reliable APIs and data pipelines that power course enrollment, payments and progress tracking.",
  },
  {
    id: "eng-003",
    title: "QA Automation Intern",
    department: "Engineering",
    type: "Internship",
    location: "Bandung, Indonesia",
    shortDescription: "Write end-to-end tests, catch regressions early and help the team ship with confidence.",
  },
  {
    id: "des-001",
    title: "Product Designer",
    department: "Design",
    type: "Full-time",
    location: "Hybrid · Jakarta",
    shortDescription: "Own user flows from research to high-fidelity prototypes, working closely with engineers and PMs.",
  },
  {
    id: "des-002",
    title: "UX Researcher",
    department: "Design",
    type: "Contract",
    location: "Remote",
    shortDescription: "Plan and run interviews and usability tests, and turn the insights into clear design recommendations.",
  },
  {
    id: "mkt-001",
    title: "Content Marketing Specialist",
    department: "Marketing",
    type: "Full-time",
    location: "Jakarta, Indonesia",
    shortDescription: "Create stories, articles and campaigns that help learners discover the right career path.",
  },
  {
    id: "mkt-002",
    title: "Social Media Intern",
    department: "Marketing",
    type: "Internship",
    location: "Remote",
    shortDescription: "Plan weekly content, track engagement and experiment with new formats across our social channels.",
  },
];

const ICONS = {
  Location: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  "Employment type": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

const $ = (id) => document.getElementById(id);
const filterList = $("filter-list");
const roleGrid = $("role-grid");
const emptyState = $("empty-state");
const summary = $("results-summary");

let active = ALL;

const rolesFor = (dept) => (dept === ALL ? ROLES : ROLES.filter((r) => r.department === dept));
const plural = (n) => `${n} ${n === 1 ? "role" : "roles"}`;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderFilters() {
  filterList.replaceChildren(
    ...DEPARTMENTS.map((dept) => {
      const count = rolesFor(dept).length;
      const button = el("button", "filter-pill");
      button.type = "button";
      button.dataset.department = dept;
      button.setAttribute(
        "aria-label",
        `${dept === ALL ? "Show all departments" : `Filter by ${dept}`}, ${plural(count)}`
      );
      const badge = el("span", "filter-pill__count", count);
      badge.setAttribute("aria-hidden", "true");
      button.append(el("span", "", dept), badge);
      const li = el("li");
      li.append(button);
      return li;
    })
  );
}

function metaItem(label, value) {
  const dt = el("dt");
  dt.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[label]}</svg>`;
  dt.append(el("span", "visually-hidden", label));
  const item = el("div");
  item.append(dt, el("dd", "", value));
  return item;
}

function roleCard(role, index) {
  const titleId = `role-${role.id}-title`;
  const card = el("article", "role-card");
  card.dataset.department = role.department;
  card.style.setProperty("--i", index);
  card.setAttribute("aria-labelledby", titleId);

  const title = el("h3", "role-card__title", role.title);
  title.id = titleId;

  const meta = el("dl", "role-card__meta");
  meta.append(metaItem("Location", role.location), metaItem("Employment type", role.type));

  card.append(
    el("span", "role-card__dept", role.department),
    title,
    el("p", "role-card__desc", role.shortDescription),
    meta
  );

  const li = el("li");
  li.append(card);
  return li;
}

function render() {
  const roles = rolesFor(active);

  filterList.querySelectorAll(".filter-pill").forEach((button) => {
    const isActive = button.dataset.department === active;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });

  const scope = active === ALL ? "across all departments" : `in <strong>${active}</strong>`;
  summary.innerHTML = `Showing <strong>${roles.length}</strong> ${roles.length === 1 ? "role" : "roles"} ${scope}`;

  roleGrid.replaceChildren(...roles.map(roleCard));
  roleGrid.hidden = !roles.length;
  emptyState.hidden = !!roles.length;
  if (!roles.length) $("empty-state-title").textContent = `No open ${active} roles yet`;
}

function setActive(dept) {
  if (dept === active) return;
  active = dept;
  render();
}

filterList.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-pill");
  if (button) setActive(button.dataset.department);
});

$("empty-state-reset").addEventListener("click", () => {
  setActive(ALL);
  filterList.querySelector(".filter-pill").focus();
});

$("theme-toggle").addEventListener("click", (event) => {
  const isLight = document.documentElement.dataset.theme !== "light";
  document.documentElement.dataset.theme = isLight ? "light" : "dark";
  event.currentTarget.textContent = isLight ? "☾ Dark" : "☀ Light";
  event.currentTarget.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
});

renderFilters();
render();
