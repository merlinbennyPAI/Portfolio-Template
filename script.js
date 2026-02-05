fetch("portfolio.json")
  .then(res => res.json())
  .then(data => {

    /* ========= HERO ========= */
    document.getElementById("name").innerText = data.hero.name;
    document.getElementById("headline").innerText = data.hero.headline;
    document.getElementById("summary").innerText = data.hero.summary;

    /* ========= ABOUT ========= */
    const aboutSection = document.getElementById("about-section");
    aboutSection.innerHTML = `
      <h2>About</h2>
      <p>${data.about}</p>
    `;

    /* ========= SKILLS ========= */
    const skillsSection = document.getElementById("skills-section");
    skillsSection.innerHTML = `<h2>Skills</h2>`;
    const skillsList = document.createElement("ul");

    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.innerText = skill;
      skillsList.appendChild(li);
    });

    skillsSection.appendChild(skillsList);

    /* ========= PROJECTS (MANDATORY) ========= */
    const projectsSection = document.getElementById("projects-section");
    projectsSection.innerHTML = `<h2>Projects</h2>`;

    data.projects.forEach(project => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectsSection.appendChild(div);
    });

    /* ========= EXPERIENCE (OPTIONAL) ========= */
    const experienceSection = document.getElementById("experience-section");

    if (data.experience && data.experience.trim() !== "") {
      experienceSection.innerHTML = `
        <h2>Experience</h2>
        <p>${data.experience}</p>
      `;
    } else {
      experienceSection.style.display = "none";
    }

    /* ========= EDUCATION ========= */
    const educationSection = document.getElementById("education-section");
    educationSection.innerHTML = `
      <h2>Education</h2>
      <p>${data.education}</p>
    `;

    /* ========= CONTACT ========= */
    /* ========= CONTACT ========= */
const contactSection = document.getElementById("contact-section");
contactSection.innerHTML = `<h2>Contact</h2>`;

let contactData = data.contact;

// If contact comes as string, parse it
if (typeof contactData === "string") {
  try {
    contactData = JSON.parse(contactData);
  } catch (e) {
    contactSection.innerHTML += `<p>${contactData}</p>`;
    return;
  }
}

if (contactData.email) {
  contactSection.innerHTML += `
    <p>Email: 
      <a href="mailto:${contactData.email}">
        ${contactData.email}
      </a>
    </p>
  `;
}

if (contactData.phone) {
  contactSection.innerHTML += `<p>Phone: ${contactData.phone}</p>`;
}

if (contactData.linkedin) {
  contactSection.innerHTML += `
    <p>
      LinkedIn:
      <a href="${contactData.linkedin}" target="_blank">
        ${contactData.linkedin}
      </a>
    </p>
  `;
}

    

  })
  .catch(err => {
    console.error("Failed to load portfolio data:", err);
  });
