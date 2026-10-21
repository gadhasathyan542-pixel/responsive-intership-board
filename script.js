// Sample data is stored locally so this beginner project works without an API.
const internships = [
  { title: "Python Developer Intern", company: "BrightByte Labs", domain: "Development", type: "Remote", duration: "8 weeks", stipend: "₹8,000/month", description: "Build small Python features, write readable code, and learn from developer reviews." },
  { title: "Frontend Development Intern", company: "PixelCraft Studio", domain: "Development", type: "Hybrid", duration: "3 months", stipend: "₹10,000/month", description: "Create responsive web pages with HTML, CSS, JavaScript, and accessible components." },
  { title: "UI/UX Design Intern", company: "Northstar Creative", domain: "Design", type: "Remote", duration: "10 weeks", stipend: "₹7,000/month", description: "Help research user needs, create wireframes, and improve digital product experiences." },
  { title: "Data Analytics Intern", company: "InsightSpring", domain: "Data & AI", type: "Hybrid", duration: "12 weeks", stipend: "₹9,000/month", description: "Clean datasets, prepare simple reports, and explore trends using spreadsheets and Python." },
  { title: "Digital Marketing Intern", company: "MangoTree Media", domain: "Marketing", type: "On-site", duration: "2 months", stipend: "₹6,000/month", description: "Support content planning, campaign tracking, and social media performance reports." },
  { title: "Cybersecurity Intern", company: "SecurePath Systems", domain: "Cybersecurity", type: "Remote", duration: "8 weeks", stipend: "₹8,500/month", description: "Learn security fundamentals, review checklists, and document safe testing practices." },
  { title: "HR Operations Intern", company: "PeopleFirst Co.", domain: "Business", type: "Hybrid", duration: "3 months", stipend: "₹7,500/month", description: "Assist with onboarding, candidate coordination, and maintaining organized records." },
  { title: "Java Backend Intern", company: "CodeHarbor", domain: "Development", type: "On-site", duration: "12 weeks", stipend: "₹11,000/month", description: "Practice Java fundamentals, REST concepts, testing, and collaborative development." },
  { title: "AI Research Intern", company: "NeuralNest", domain: "Data & AI", type: "Remote", duration: "10 weeks", stipend: "₹10,000/month", description: "Explore introductory machine-learning ideas and summarize experiments for the team." }
];

const list = document.querySelector("#internship-list");
const searchInput = document.querySelector("#search-input");
const domainFilter = document.querySelector("#domain-filter");
const form = document.querySelector("#filters-form");
const emptyState = document.querySelector("#empty-state");
const errorMessage = document.querySelector("#error-message");
const resultsCount = document.querySelector("#results-count");
const totalCount = document.querySelector("#total-count");

function populateDomains() {
  const domains = [...new Set(internships.map((item) => item.domain))].sort();
  domains.forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    domainFilter.append(option);
  });
}

function makeCard(internship) {
  const card = document.createElement("article");
  card.className = "internship-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const avatar = document.createElement("div");
  avatar.className = "company-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = internship.company.charAt(0);
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = internship.domain;
  top.append(avatar, tag);

  const title = document.createElement("h3");
  title.textContent = internship.title;
  const company = document.createElement("p");
  company.className = "company-name";
  company.textContent = internship.company;
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = internship.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  [internship.type, internship.duration, internship.stipend].forEach((value) => {
    const item = document.createElement("span");
    item.textContent = value;
    meta.append(item);
  });
  card.append(top, title, company, description, meta);
  return card;
}

function renderInternships() {
  try {
    const query = searchInput.value.trim().toLowerCase();
    const domain = domainFilter.value;
    const filtered = internships.filter((item) => {
      const searchable = `${item.title} ${item.company} ${item.domain} ${item.description} ${item.type}`.toLowerCase();
      const matchesQuery = searchable.includes(query);
      const matchesDomain = domain === "all" || item.domain === domain;
      return matchesQuery && matchesDomain;
    });

    list.replaceChildren();
    filtered.forEach((item) => list.append(makeCard(item)));
    list.setAttribute("aria-busy", "false");
    errorMessage.hidden = true;
    emptyState.hidden = filtered.length !== 0;
    resultsCount.textContent = `Showing ${filtered.length} of ${internships.length} opportunities`;
  } catch (error) {
    list.replaceChildren();
    list.setAttribute("aria-busy", "false");
    errorMessage.hidden = false;
    emptyState.hidden = true;
    resultsCount.textContent = "Unable to show opportunities";
    console.error("Could not render internships:", error);
  }
}

form.addEventListener("submit", (event) => event.preventDefault());
searchInput.addEventListener("input", renderInternships);
domainFilter.addEventListener("change", renderInternships);
form.addEventListener("reset", () => {
  // Wait for the browser to reset the controls before filtering again.
  window.setTimeout(renderInternships, 0);
});
document.querySelector("#empty-reset").addEventListener("click", () => {
  form.reset();
  searchInput.value = "";
  domainFilter.value = "all";
  renderInternships();
});

document.querySelector("#year").textContent = new Date().getFullYear();
totalCount.textContent = internships.length;
populateDomains();
renderInternships();
