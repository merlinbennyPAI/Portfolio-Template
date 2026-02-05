fetch("portfolio.json")
  .then(res => res.json())
  .then(data => {

    // HERO
    document.getElementById("name").innerText = data.hero.name;
    document.getElementById("headline").innerText = data.hero.headline;
    document.getElementById("summary").innerText = data.hero.summary;

    // ABOUT
    if (data.about && data.about.trim() !== "") {
      document.getElementById("about").innerText = data.about;
    }

    // SKILLS
    if (Array.isArray(data.skills) && data.skills.length > 0) {
      const skillsSection = document.getElementById("skills-section");
      const heading = document.createElement("h2");
      heading.innerText = "Skills";
      skillsSection.appendChild(heading);

      const ul = document.createElement("ul");
      data.skills.forEach(skill => {
        const li = document.createElement("li");
        li.innerText = skill;
        ul.appendChild(li);
      });
      skillsSection.appendChild(ul);
    }

    // PROJECTS (MANDATORY TITLE + DESCRIPTION)
    const projectsSection = document.getElementById("projects-section");
    const validProjects = data.projects.filter(
      p => p.title && p.description
    );

    if (validProjects.length > 0) {
      const heading = document.createElement("h2");
      heading.innerText = "Projects";
      projectsSection.appendChild(heading);

      validProjects.forEach(project => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        `;
        projectsSection.appendChild(div);
      });
    }

    // EXPERIENCE (OPTIONAL)
    if (data.experience && data.experience.trim() !== "") {
      const expSection = document.getElementById("experience-section");
      const heading = document.createElement("h2");
      heading.innerText = "Experience";
      expSection.appendChild(heading);

      const p = document.createElement("p");
      p.innerText = data.experience;
      expSection.appendChild(p);
    }

    // EDUCATION (OPTIONAL)
    if (data.education && data.education.trim() !== "") {
      const eduSection = document.getElementById("education-section");
      const heading = document.createElement("h2");
      heading.innerText = "Education";
      eduSection.appendChild(heading);

      const p = document.createElement("p");
      p.innerText = data.education;
      eduSection.appendChild(p);
    }

    // CONTACT
    if (data.contact && data.contact.email) {
      const contactSection = document.getElementById("contact-section");
      const heading = document.createElement("h2");
      heading.innerText = "Contact";
      contactSection.appendChild(heading);

      const p = document.createElement("p");
      p.innerText = `Email: ${data.contact.email}`;
      contactSection.appendChild(p);
    }
  });

