fetch("portfolio.json")
  .then(res => res.json())
  .then(data => {

    // HERO (mandatory)
    document.getElementById("name").innerText = data.hero.name;
    document.getElementById("headline").innerText = data.hero.headline;
    document.getElementById("summary").innerText = data.hero.summary;

    // ABOUT (mandatory)
    document.getElementById("about-section").innerHTML = `
      <h2>About</h2>
      <p>${data.about}</p>
    `;

    // SKILLS (mandatory)
    const skillsSection = document.getElementById("skills-section");
    skillsSection.innerHTML = "<h2>Skills</h2><ul></ul>";
    const skillsList = skillsSection.querySelector("ul");

    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.innerText = skill;
      skillsList.appendChild(li);
    });

    // PROJECTS (mandatory)
    const projectsSection = document.getElementById("projects-section");
    projectsSection.innerHTML = "<h2>Projects</h2>";

    data.projects.forEach(project => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      projectsSection.appendChild(div);
    });

    // EXPERIENCE (optional)
    if (data.experience) {
      document.getElementById("experience-section").innerHTML = `
        <h2>Experience</h2>
        <p>${data.experience}</p>
      `;
    }

    // EDUCATION (mandatory)
    document.getElementById("education-section").innerHTML = `
      <h2>Education</h2>
      <p>${data.education}</p>
    `;

    // CONTACT (mandatory)
    document.getElementById("contact-section").innerHTML = `
      <h2>Contact</h2>
      <pre>${JSON.stringify(data.contact, null, 2)}</pre>
    `;
  });

