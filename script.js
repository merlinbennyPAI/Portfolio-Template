fetch("portfolio.json")
  .then(response => response.json())
  .then(data => {

    /* ========= HERO ========= */
    document.getElementById("name").textContent = data.hero.name || "";
    document.getElementById("headline").textContent = data.hero.headline || "";
    document.getElementById("summary").textContent = data.hero.summary || "";

    /* ========= ABOUT ========= */
    if (data.about && data.about.trim() !== "") {
      document.getElementById("about-section").innerHTML = `
        <h2>About</h2>
        <p>${data.about}</p>
      `;
    }

    /* ========= SKILLS ========= */
    const skillsSection = document.getElementById("skills-section");
    if (Array.isArray(data.skills) && data.skills.length > 0) {
      skillsSection.innerHTML = `<h2>Skills</h2>`;
      const ul = document.createElement("ul");

      data.skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        ul.appendChild(li);
      });

      skillsSection.appendChild(ul);
    }

    /* ========= PROJECTS (MANDATORY) ========= */
    const projectsSection = document.getElementById("projects-section");
    projectsSection.innerHTML = `<h2>Projects</h2>`;

    data.projects.forEach(project => {
      const div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectsSection.appendChild(div);
    });

    /* ========= EXPERIENCE (OPTIONAL) ========= */
    if (data.experience && data.experience.trim() !== "") {
      document.getElementById("experience-section").innerHTML = `
        <h2>Experience</h2>
        <p>${data.experience}</p>
      `;
    }

    /* ========= EDUCATION ========= */
    if (data.education && data.education.trim() !== "") {
      document.getElementById("education-section").innerHTML = `
        <h2>Education</h2>
        <p>${data.education}</p>
      `;
    }

    /* ========= CONTACT (STRING OR OBJECT SAFE) ========= */
    const contactSection = document.getElementById("contact-section");
    contactSection.innerHTML = `<h2>Contact</h2>`;

    let contactData = data.contact;

    // Handle stringified JSON
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
  .catch(error => {
    console.error("Error loading portfolio:", error);
  });
