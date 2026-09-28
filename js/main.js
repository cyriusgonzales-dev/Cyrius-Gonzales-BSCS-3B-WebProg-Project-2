/* Shared page behavior: active navigation, project-page scrolling, and small fallbacks. */
(() => {
  const pageName = window.location.pathname.split("/").pop() || "index.html";
  const pageKey = pageName === "index.html" ? "home" : pageName.replace(".html", "");
  const pageNumbers = {
    home: "01 / PERSONAL PORTFOLIO",
    projects: "02 / WEBSITE DESIGN & DEVELOPMENT",
    services: "03 / SERVICES",
    about: "04 / ABOUT",
    contact: "05 / FAQS / CONTACT"
  };
  const pageNumberLabel = document.querySelector(".page-topline > span:first-child");
  if (pageNumberLabel && pageNumbers[pageKey]) pageNumberLabel.textContent = pageNumbers[pageKey];
  if (pageKey === "about") {
    const aboutIntro = document.querySelector(".page-intro > p:last-child");
    if (aboutIntro) aboutIntro.textContent = "From websites to photographs, I’m drawn to how thoughtful structure and visual choices can make an idea clearer.";
  }

  if (pageKey === "projects") {
    document.documentElement.classList.add("project-browser");
    document.body.classList.add("project-browser");
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-home-project-count]").forEach((element) => {
    const projectCount = Array.isArray(websiteProjects) ? websiteProjects.length : 0;
    element.textContent = `${projectCount} website projects`;
  });

  const homeProjectList = document.querySelector("[data-home-project-list]");
  if (homeProjectList && Array.isArray(websiteProjects)) {
    websiteProjects.slice(0, 3).forEach((project) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "projects.html";
      link.textContent = project.name || "[PROJECT NAME]";
      item.append(link);
      homeProjectList.append(item);
    });
  }

  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === pageKey) link.setAttribute("aria-current", "page");
  });

  const navigationIconPaths = {
    home: "M3 10.5 12 3l9 7.5M5.5 9.25V21h13V9.25M9.5 21v-7h5v7",
    projects: "M3 5h7l2 2h9v12H3zM3 10h18",
    services: "M12 3v5m0 8v5M3 12h5m8 0h5M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
    about: "M20 21a8 8 0 0 0-16 0m8-11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
    contact: "M4 5h16v12H8l-4 4zM8 9h8m-8 4h6"
  };
  const svgNamespace = "http://www.w3.org/2000/svg";
  document.querySelectorAll(".sidebar-nav [data-page]").forEach((link) => {
    const symbol = link.querySelector(".nav-symbol");
    const pathData = navigationIconPaths[link.dataset.page];
    if (!symbol || !pathData) return;
    const icon = document.createElementNS(svgNamespace, "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(svgNamespace, "path");
    path.setAttribute("d", pathData);
    icon.append(path);
    symbol.replaceChildren(icon);
  });

  const mobileHeader = document.querySelector(".mobile-header");
  const socialLinks = [...document.querySelectorAll(".sidebar-social a")];
  if (mobileHeader && socialLinks.length) {
    const mobileSocial = document.createElement("div");
    mobileSocial.className = "mobile-social";
    mobileSocial.setAttribute("role", "group");
    mobileSocial.setAttribute("aria-label", "Social media links");
    socialLinks.forEach((link) => mobileSocial.append(link.cloneNode(true)));
    mobileHeader.append(mobileSocial);
  }

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    const targetPage = link.getAttribute("href");
    if (targetPage === pageName || (pageName === "index.html" && targetPage === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll(".profile-photo img").forEach((image) => {
    image.addEventListener("error", () => image.classList.add("image-missing"));
    if (image.complete && image.naturalWidth === 0) image.classList.add("image-missing");
  });

  if (pageKey !== "services") {
    renderServices();
  }
  renderToolMarquee();
  renderAboutToolkit();
  bindServiceImageModal();

  function bindServiceImageModal() {
    const modal = document.querySelector(".image-modal");
    const modalImage = modal ? modal.querySelector("img") : null;
    const closeButton = modal ? modal.querySelector(".image-modal-close") : null;
    const serviceImages = document.querySelectorAll(".service-gallery img");
    if (!modal || !modalImage || !closeButton || !serviceImages.length) return;

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    };

    serviceImages.forEach((image) => {
      image.addEventListener("click", () => {
        modalImage.src = image.src;
        modalImage.alt = image.alt || "Expanded service preview";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
      });
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function renderServices() {
    const serviceList = document.querySelector(".service-list");
    if (!serviceList || !Array.isArray(services)) return;
    serviceList.replaceChildren();

    services.forEach((service) => {
      const row = document.createElement("article");
      row.className = "service-row";
      const number = document.createElement("span");
      number.className = "service-number";
      number.textContent = service.number || "";
      const details = document.createElement("div");
      const name = document.createElement("h2");
      name.textContent = service.name || "[SERVICE NAME]";
      const description = document.createElement("p");
      description.textContent = service.description || "[Add a short description of this service.]";
      details.append(name, description);
      const contactLink = document.createElement("a");
      contactLink.className = "service-link";
      contactLink.href = "contact.html";
      contactLink.setAttribute("aria-label", `Ask about ${service.name || "this service"}`);
      contactLink.textContent = "↗";
      row.append(number, details, contactLink);
      serviceList.append(row);
    });

    const galleryWrap = document.createElement("div");
    galleryWrap.className = "service-gallery-wrap";

    const label = document.createElement("p");
    label.className = "service-gallery-label";
    label.textContent = "PRICE LIST";

    const gallery = document.createElement("div");
    gallery.className = "service-gallery";
    gallery.setAttribute("aria-label", "Service pricing samples");

    [
      { src: "assets/services%20price%20list/1.%20Website%20Design.png", alt: "Website design pricing sample" },
      { src: "assets/services%20price%20list/2.%20Graphic%20Design.png", alt: "Graphic design pricing sample" },
      { src: "assets/services%20price%20list/3.%20Photography.png", alt: "Photography pricing sample" }
    ].forEach((imageData) => {
      const image = document.createElement("img");
      image.src = imageData.src;
      image.alt = imageData.alt;
      image.loading = "lazy";
      gallery.append(image);
    });

    galleryWrap.append(label, gallery);
    serviceList.append(galleryWrap);
  }

  function renderToolMarquee() {
    const track = document.querySelector("[data-tool-marquee-track]");
    if (!track || !Array.isArray(tools) || tools.length === 0) return;

    const createItem = (tool) => {
      const item = document.createElement("div");
      item.className = "tool-marquee-item";
      const image = document.createElement("img");
      image.src = tool.logo;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      const label = document.createElement("span");
      label.textContent = tool.name;
      item.append(image, label);
      return item;
    };

    const group = document.createElement("div");
    group.className = "tool-marquee-group";
    tools.forEach((tool) => group.append(createItem(tool)));
    const visualClone = group.cloneNode(true);
    visualClone.setAttribute("aria-hidden", "true");
    track.replaceChildren(group, visualClone);
  }

  function renderAboutToolkit() {
    const toolkit = document.querySelector("[data-about-toolkit]");
    if (!toolkit || !Array.isArray(tools) || tools.length === 0) return;

    const groups = {
      Web: tools.filter((tool) => tool.category === "web"),
      Design: tools.filter((tool) => tool.category === "design"),
      Development: tools.filter((tool) => tool.category === "development")
    };

    toolkit.replaceChildren();
    Object.entries(groups).forEach(([label, items]) => {
      if (!items.length) return;
      const row = document.createElement("div");
      const title = document.createElement("dt");
      title.textContent = label;
      const content = document.createElement("dd");

      items.forEach((tool) => {
        const badge = document.createElement("span");
        badge.className = "tool-badge";

        const image = document.createElement("img");
        image.src = tool.logo;
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";

        const name = document.createElement("span");
        name.textContent = tool.name;

        badge.append(image, name);
        content.append(badge);
      });

      row.append(title, content);
      toolkit.append(row);
    });
  }

})();
