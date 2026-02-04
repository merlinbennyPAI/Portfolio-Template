fetch("portfolio.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("name").innerText = data.hero.name;
    document.getElementById("headline").innerText = data.hero.headline;
    document.getElementById("summary").innerText = data.hero.summary;

    document.getElementById("about").innerText = data.about;

    const skillsList = document.getElementById("skills-list");
    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.innerText = skill;
      skillsList.appendChild(li);
    });

    const projectsSection = document.getElementById("projects");
    data.projects.forEach(project => {
      const div = document.createElement("div");
      div.innerHTML = `<h4>${project.title}</h4><p>${project.description}</p>`;
      projectsSection.appendChild(div);
    });

    document.getElementById("experience").innerText = data.experience;
    document.getElementById("contact").innerText = JSON.stringify(data.contact);
  });
