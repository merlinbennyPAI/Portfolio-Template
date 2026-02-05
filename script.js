fetch("portfolio.json")
  .then(response => response.json())
  .then(data => {
    /* ========= HERO ========= */
    document.getElementById("name").innerText = data.hero.name;
    document.getElementById("headline").innerText = data.hero.headline;
    document.getElementById("summary").innerText = data.hero.summary;

    /* ========= ABOUT ========= */
    if (data.about && data.about.trim() !== "") {
      document.getElementById("about-section").innerHTML = `
        <h2>About</h2>
        <p>${data.about}</p>
      `;
    }

    /* ========= SKILLS ========= */
    if (Array.isArray(data.skills) && data.skills.length > 0) {
      const skillsList = data.skills
        .map(skill => `<li>${skill}</li>`)
        .join("");

      document.getElementById("skills-section").innerHTML = `
        <h2>Skills</h2>
        <ul>${skillsList}</ul>
      `;
    }

    /* ========= PROJECTS (MANDATORY) ========= */
    if (!Array.isArray(data.projects) || data.projects.length === 0) {
      throw new Error("Projects are mandatory but missing.");
    }

    let projectsHTML = "<h2>Projects</h2>";

    data.projects.forEach(project => {
      if (!project.title || !project.description) {
        throw new Error("Each project must have a title and description.");
      }

      projectsHTML += `
        <div class="project">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `;
    });

    document.getElementById("projects-section").innerHTML = projectsHTML;

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

    /* ========= CONTACT ========= */
    const contactSection = document.getElementById("contact-section");
    let contact = data.contact;

    // Normalize contact (string → object if needed)
    if (typeof contact === "string") {
      try {
        contact = JSON.parse(contact);
      } catch {
        contact = {};
      }
    }

    if (contact && Object.keys(contact).length > 0) {
      contactSection.innerHTML = "<h2>Contact</h2>";

      if (contact.email) {
        contactSection.innerHTML += `
          <p>Email:
            <a href="mailto:${contact.email}">
              ${contact.email}
            </a>
          </p>
        `;
      }

      if (contact.phone) {
        contactSection.innerHTML += `<p>Phone: ${contact.phone}</p>`;
      }

      if (contact.linkedin) {
        contactSection.innerHTML += `
          <p>
            LinkedIn:
            <a href="${contact.linkedin}" target="_blank">
              ${contact.linkedin}
            </a>
          </p>
        `;
      }
    }
  })
  .catch(error => {
    console.error("Portfolio load error:", error);
    document.body.innerHTML = `
      <h2 style="color:red; text-align:center;">
        Portfolio failed to load. Check required fields.
      </h2>
    `;
  });
