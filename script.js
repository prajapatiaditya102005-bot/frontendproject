

const internships = [
    {
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        domain: "Web Development",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹8,000/month",
        applyLink: "https://example.com"
    },
    {
        title: "Python Developer Intern",
        company: "CodeWorks",
        domain: "Python",
        location: "Bangalore",
        duration: "6 Months",
        stipend: "₹12,000/month",
        applyLink: "https://example.com"
    },
    {
        title: "Data Analyst Intern",
        company: "DataHub",
        domain: "Data Science",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹10,000/month",
        applyLink: "https://example.com"
    },
    {
        title: "UI/UX Designer Intern",
        company: "Creative Studio",
        domain: "UI/UX Design",
        location: "Mumbai",
        duration: "2 Months",
        stipend: "₹7,000/month",
        applyLink: "https://example.com"
    },
    {
        title: "Java Developer Intern",
        company: "Software Labs",
        domain: "Java",
        location: "Remote",
        duration: "4 Months",
        stipend: "₹9,000/month",
        applyLink: "https://example.com"
    },
    {
        title: "React Developer Intern",
        company: "WebTech",
        domain: "Web Development",
        location: "Pune",
        duration: "3 Months",
        stipend: "₹11,000/month",
        applyLink: "https://example.com"
    }
];



const searchInput = document.getElementById("search");
const domainSelect = document.getElementById("domain");
const internshipList = document.getElementById("internshipList");
const status = document.getElementById("status");
const filterForm = document.getElementById("filterForm");  

function displayInternships(data) {

    internshipList.innerHTML = "";

    if (!Array.isArray(data)) {
        internshipList.innerHTML =
            '<p class="message error">Something went wrong. Please try again.</p>';
        status.textContent = "Unable to load internships.";
        return;
    }

    if (data.length === 0) {
        internshipList.innerHTML =
            '<p class="message">No internships found. Try another search.</p>';
        status.textContent = "No matching internships found.";
        return;
    }

    data.forEach(internship => {

        const card = document.createElement("article");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = internship.title;

        const company = document.createElement("p");
        company.className = "company";
        company.textContent = internship.company;

        const domain = document.createElement("span");
        domain.className = "domain";
        domain.textContent = internship.domain;

        const details = document.createElement("p");
        details.className = "details";
        details.textContent =
            `Location: ${internship.location} | Duration: ${internship.duration} | Stipend: ${internship.stipend}`;

        const apply = document.createElement("a");
        apply.className = "apply-btn";
        apply.href = internship.applyLink;
        apply.textContent = "Apply Now";
        apply.target = "_blank";
        apply.rel = "noopener noreferrer";
        apply.setAttribute(
            "aria-label",
            `Apply for ${internship.title} at ${internship.company}`
        );

        card.append(title, company, domain, details, apply);

        internshipList.appendChild(card);
    });

    status.textContent = `${data.length} internship(s) found.`;
}

// Search and filter function

function filterInternships() {

    try {

        const searchValue = searchInput.value.toLowerCase().trim();
        const selectedDomain = domainSelect.value;

        const filtered = internships.filter(internship => {

            const matchesSearch =
                internship.title.toLowerCase().includes(searchValue) ||
                internship.company.toLowerCase().includes(searchValue);

            const matchesDomain =
                selectedDomain === "all" ||
                internship.domain === selectedDomain;

            return matchesSearch && matchesDomain;
        });

        displayInternships(filtered);

    } catch (error) {

        internshipList.innerHTML =
            '<p class="message error">Unable to display internships. Please try again.</p>';

        status.textContent = "An error occurred.";

        console.error(error);
    }
}

// Event listeners

searchInput.addEventListener("input", filterInternships);
domainSelect.addEventListener("change", filterInternships);

// Reset filters

filterForm.addEventListener("reset", () => {
    setTimeout(filterInternships, 0);
});

// Initial display

displayInternships(internships);
