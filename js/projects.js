/* Website project cards and their one reusable accessible detail dialog. */
(() => {
  const grid = document.querySelector("[data-project-grid]");
  const featuredContainer = document.querySelector("[data-featured-projects]");
  if (!grid && !featuredContainer) return;

  const projects = Array.isArray(websiteProjects) ? websiteProjects : [];
  const dialog = document.querySelector("[data-project-dialog]");
  const dialogTitle = document.querySelector("[data-dialog-title]");
  const dialogDescription = document.querySelector("[data-dialog-description]");
  const dialogLink = document.querySelector("[data-dialog-link]");
  const filters = document.querySelector("[data-project-filters]");
  const pagination = document.querySelector("[data-project-pagination]");
  const pageSize = 3;
  let activeFilter = "all";
  let currentPage = 0;

  if (grid && !featuredContainer) {
    renderProjectBrowser();
    return;
  }

  if (grid) {
    renderFilters();
    renderProjects();
  }
  if (featuredContainer) renderFeaturedProjects();

  function safeExternalUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch {
      return "";
    }
  }

  function renderFilters() {
    if (!filters) return;
    const categories = [...new Set(projects.map((project) => project.category || "Website Design"))];
    if (categories.length < 2) {
      filters.hidden = true;
      return;
    }
    filters.replaceChildren();
    ["All", ...categories].forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${category === "All" ? " is-active" : ""}`;
      button.textContent = category;
      button.setAttribute("aria-pressed", String(category === "All"));
      button.addEventListener("click", () => {
        activeFilter = category === "All" ? "all" : category;
        currentPage = 0;
        filters.querySelectorAll("button").forEach((filter) => {
          const isActive = filter === button;
          filter.classList.toggle("is-active", isActive);
          filter.setAttribute("aria-pressed", String(isActive));
        });
        renderProjects();
      });
      filters.append(button);
    });
  }

  function renderProjects() {
    grid.replaceChildren();
    const visibleProjects = projects.filter((project) => activeFilter === "all" || (project.category || "Website Design") === activeFilter);
    if (visibleProjects.length === 0) {
      const empty = document.createElement("div");
      empty.className = "project-empty";
      const title = document.createElement("h2");
      title.textContent = "Projects will be added here.";
      const description = document.createElement("p");
      description.textContent = "Once you add real project details in js/data.js, each project will have its own overview and optional live link.";
      empty.append(title, description);
      grid.append(empty);
      renderPagination(0);
      return;
    }
    const pageCount = Math.ceil(visibleProjects.length / pageSize);
    currentPage = Math.min(currentPage, pageCount - 1);
    const pageStart = currentPage * pageSize;
    visibleProjects.slice(pageStart, pageStart + pageSize).forEach((project) => grid.append(createProjectCard(project)));
    renderPagination(pageCount);
  }

  function renderPagination(pageCount) {
    if (!pagination) return;
    pagination.replaceChildren();
    pagination.hidden = pageCount <= 1;
    if (pageCount <= 1) return;

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "pagination-arrow";
    previous.textContent = "Previous";
    previous.disabled = currentPage === 0;
    previous.addEventListener("click", () => changePage(currentPage - 1));
    pagination.append(previous);

    for (let index = 0; index < pageCount; index += 1) {
      const pageButton = document.createElement("button");
      pageButton.type = "button";
      pageButton.className = "pagination-number";
      pageButton.textContent = String(index + 1);
      pageButton.setAttribute("aria-label", `Project page ${index + 1}`);
      if (index === currentPage) {
        pageButton.classList.add("is-active");
        pageButton.setAttribute("aria-current", "page");
      }
      pageButton.addEventListener("click", () => changePage(index));
      pagination.append(pageButton);
    }

    const next = document.createElement("button");
    next.type = "button";
    next.className = "pagination-arrow";
    next.textContent = "Next";
    next.disabled = currentPage === pageCount - 1;
    next.addEventListener("click", () => changePage(currentPage + 1));
    pagination.append(next);
  }

  function changePage(page) {
    currentPage = page;
    renderProjects();
  }

  function createProjectCard(project) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    card.setAttribute("aria-label", `View details for ${project.name || "untitled project"}`);
    const kicker = document.createElement("span");
    kicker.className = "card-kicker";
    kicker.textContent = project.category || "WEBSITE DESIGN";
    const title = document.createElement("h2");
    title.textContent = project.name || "[PROJECT NAME]";
    const description = document.createElement("p");
    description.textContent = project.description || "Project description to be added.";
    const openLabel = document.createElement("span");
    openLabel.className = "project-open";
    openLabel.append("VIEW PROJECT DETAILS", Object.assign(document.createElement("span"), { textContent: "↗", "aria-hidden": "true" }));
    card.append(kicker, title, description, openLabel);
    card.addEventListener("click", () => openProjectModal(project));
    return card;
  }

  function renderFeaturedProjects() {
    featuredContainer.replaceChildren();
    const featured = projects.slice(0, 3);
    if (featured.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-inline";
      empty.textContent = "Website projects will appear here once real project details are added.";
      featuredContainer.append(empty);
      return;
    }
    featured.forEach((project) => {
      const card = document.createElement("a");
      card.className = "featured-project-card";
      card.href = "projects.html";
      const category = document.createElement("span");
      category.textContent = project.category || "WEBSITE DESIGN";
      const title = document.createElement("h3");
      title.textContent = project.name || "[PROJECT NAME]";
      const description = document.createElement("p");
      description.textContent = project.description || "Project details to be added.";
      card.append(category, title, description);
      featuredContainer.append(card);
    });
  }

  function openProjectModal(project) {
    if (!dialog) return;
    dialogTitle.textContent = project.name || "[PROJECT NAME]";
    dialogDescription.textContent = project.description || "";
    dialogDescription.hidden = !project.description;
    const projectUrl = safeExternalUrl(project.link);
    dialogLink.hidden = !projectUrl;
    if (projectUrl) dialogLink.href = projectUrl;
    dialog.showModal();
    document.body.classList.add("modal-open");
    document.querySelector("[data-close-project]")?.focus();
  }

  if (dialog) {
    document.querySelector("[data-close-project]")?.addEventListener("click", closeProjectModal);
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProjectModal();
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeProjectModal();
    });
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
  }

  function closeProjectModal() {
    if (dialog?.open) dialog.close();
    document.body.classList.remove("modal-open");
  }

  function renderProjectBrowser() {
    const filterBar = document.querySelector("[data-project-filters]");
    const pagination = document.querySelector("[data-project-pagination]");
    const categoryLabel = document.querySelector("[data-dialog-category]");
    const lastFocused = { element: null };
    let activeType = "all";
    let activeImageItems = [];
    let activeImageIndex = 0;

    pagination?.remove();

    const websitePreview = document.createElement("iframe");
    websitePreview.className = "project-live-preview";
    websitePreview.title = "Live website preview";
    websitePreview.loading = "lazy";
    websitePreview.referrerPolicy = "strict-origin-when-cross-origin";
    websitePreview.hidden = true;
    dialogDescription.after(websitePreview);

    const previewNotice = document.createElement("p");
    previewNotice.className = "preview-notice";
    previewNotice.hidden = true;
    websitePreview.after(previewNotice);

    const imageViewer = document.createElement("figure");
    imageViewer.className = "project-image-viewer";
    imageViewer.hidden = true;
    const image = document.createElement("img");
    image.alt = "";
    const caption = document.createElement("figcaption");
    const previousImage = createImageControl("Previous image", "‹");
    const nextImage = createImageControl("Next image", "›");
    imageViewer.append(previousImage, image, nextImage, caption);
    previewNotice.after(imageViewer);

    const items = [
      ...(Array.isArray(websiteProjects) ? websiteProjects : []).map((project) => ({ ...project, type: "website" })),
      ...(Array.isArray(graphicDesignProjects) ? graphicDesignProjects : []).filter((project) => project.image).map((project) => ({ ...project, type: "graphic-design" })),
      ...(Array.isArray(photographyProjects) ? photographyProjects : []).filter((project) => project.image).map((project) => ({ ...project, type: "photography" }))
    ];

    const filters = [
      { id: "all", label: "All projects" },
      { id: "website", label: "Websites" },
      { id: "graphic-design", label: "Graphic design" },
      { id: "photography", label: "Photography" }
    ];

    filters.forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${filter.id === activeType ? " is-active" : ""}`;
      button.textContent = filter.label;
      button.dataset.filter = filter.id;
      button.setAttribute("aria-pressed", String(filter.id === activeType));
      button.addEventListener("click", () => {
        activeType = filter.id;
        filterBar.querySelectorAll("button").forEach((filterButton) => {
          const selected = filterButton === button;
          filterButton.classList.toggle("is-active", selected);
          filterButton.setAttribute("aria-pressed", String(selected));
        });
        renderCards();
      });
      filterBar.append(button);
    });

    renderCards();

    document.querySelector("[data-close-project]")?.addEventListener("click", closeBrowserDialog);
    previousImage.addEventListener("click", () => moveImage(-1));
    nextImage.addEventListener("click", () => moveImage(1));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeBrowserDialog();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeBrowserDialog();
      }
      if (imageViewer.hidden) return;
      if (event.key === "ArrowLeft") moveImage(-1);
      if (event.key === "ArrowRight") moveImage(1);
    });
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));

    function renderCards() {
      const visibleItems = items.filter((item) => activeType === "all" || item.type === activeType);
      grid.replaceChildren();

      if (visibleItems.length === 0) {
        const empty = document.createElement("div");
        empty.className = "project-empty";
        const title = document.createElement("h2");
        const description = document.createElement("p");
        title.textContent = activeType === "graphic-design" ? "Graphic design work will appear here." : "Photography will appear here.";
        description.textContent = activeType === "graphic-design"
          ? "Add your first image to assets/graphic-design and list it in js/data.js."
          : "Add your first image to assets/photography and list it in js/data.js.";
        empty.append(title, description);
        grid.append(empty);
        return;
      }

      visibleItems.forEach((item) => grid.append(createBrowserCard(item, visibleItems)));
    }

    function createBrowserCard(item, visibleItems) {
      const card = document.createElement("article");
      card.className = `project-card project-card--${item.type}`;

      if (item.type === "website") {
        const frameShell = document.createElement("span");
        frameShell.className = "website-thumbnail";
        const thumbnailUrl = safeExternalUrl(item.thumbnail);
        if (thumbnailUrl) {
          const thumbnail = document.createElement("img");
          thumbnail.src = thumbnailUrl;
          thumbnail.alt = "";
          thumbnail.loading = "lazy";
          thumbnail.decoding = "async";
          thumbnail.onerror = () => thumbnail.replaceWith(createThumbnailPlaceholder("Website thumbnail unavailable"));
          frameShell.append(thumbnail);
          const previewButton = document.createElement("button");
          previewButton.className = "website-preview-trigger";
          previewButton.type = "button";
          previewButton.setAttribute("aria-label", `Open live preview of ${item.name || "website project"}`);
          previewButton.addEventListener("click", () => openBrowserDialog(item));
          frameShell.append(previewButton);
        } else if (safeExternalUrl(item.link) && item.embedPreview !== false) {
          const frame = document.createElement("iframe");
          frame.src = safeExternalUrl(item.link);
          frame.title = `Live preview of ${item.name || "website project"}`;
          frame.loading = "lazy";
          frame.tabIndex = -1;
          frame.setAttribute("aria-hidden", "true");
          frame.referrerPolicy = "strict-origin-when-cross-origin";
          frameShell.append(frame);
          const previewButton = document.createElement("button");
          previewButton.className = "website-preview-trigger";
          previewButton.type = "button";
          previewButton.setAttribute("aria-label", `Open live preview of ${item.name || "website project"}`);
          previewButton.addEventListener("click", () => openBrowserDialog(item));
          frameShell.append(previewButton);
          const resizePreview = () => {
            const scale = frameShell.clientWidth / 1280;
            frame.style.transform = `scale(${scale})`;
          };
          const previewObserver = new ResizeObserver(resizePreview);
          previewObserver.observe(frameShell);
          resizePreview();
        } else {
          const message = item.embedPreview === false
            ? "Live preview restricted by site security"
            : "Website preview not available";
          frameShell.append(createThumbnailPlaceholder(message));
        }
        card.append(frameShell);
      } else {
        const frameShell = document.createElement("button");
        frameShell.type = "button";
        frameShell.className = "image-thumbnail";
        frameShell.setAttribute("aria-label", `Open ${item.images?.length > 1 ? "project" : "image"}: ${item.name || item.title || "portfolio image"}`);
        const thumbnail = document.createElement("img");
        thumbnail.src = item.image;
        thumbnail.alt = item.alt || item.title || "Portfolio image";
        thumbnail.loading = "lazy";
        thumbnail.decoding = "async";
        thumbnail.onerror = () => thumbnail.replaceWith(createThumbnailPlaceholder("Image unavailable"));
        if (item.objectFit === "contain") thumbnail.classList.add("contain-image");
        frameShell.append(thumbnail);
        frameShell.addEventListener("click", () => openBrowserDialog(item));
        card.append(frameShell);
      }

      const category = document.createElement("span");
      category.className = "card-kicker";
      category.textContent = item.type === "website" ? "WEBSITE DESIGN" : item.type === "graphic-design" ? "GRAPHIC DESIGN" : "PHOTOGRAPHY";
      const title = document.createElement("h2");
      title.textContent = item.name || item.title || "[PROJECT NAME]";
      const description = document.createElement("p");
      description.textContent = item.description || "";
      description.hidden = !item.description;
      const action = document.createElement("button");
      action.type = "button";
      action.className = "project-card-action";
      action.setAttribute("aria-label", `View ${item.type === "website" ? "website" : item.images?.length > 1 ? "project" : "image"}: ${item.name || item.title || "untitled project"}`);
      const actionLabel = document.createElement("span");
      actionLabel.className = "project-open";
      actionLabel.textContent = item.type === "website"
        ? item.embedPreview === false ? "VIEW LIVE SITE & DETAILS" : "OPEN LIVE PREVIEW"
        : item.images?.length > 1 ? "VIEW PROJECT" : "VIEW IMAGE";
      action.append(category, title, description, actionLabel);
      card.append(action);
      action.addEventListener("click", () => openBrowserDialog(item));
      return card;
    }

    function createThumbnailPlaceholder(text) {
      const placeholder = document.createElement("span");
      placeholder.className = "thumbnail-placeholder";
      placeholder.textContent = text;
      return placeholder;
    }

    function createImageControl(label, text) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "image-step";
      button.setAttribute("aria-label", label);
      button.textContent = text;
      return button;
    }

    function openBrowserDialog(item) {
      lastFocused.element = document.activeElement;
      dialogTitle.textContent = item.name || item.title || "[PROJECT NAME]";
      dialogDescription.textContent = item.description || "";
      dialogDescription.hidden = !item.description;
      categoryLabel.textContent = item.type === "website" ? "WEBSITE DESIGN & DEVELOPMENT" : item.type === "graphic-design" ? "GRAPHIC DESIGN" : "PHOTOGRAPHY";
      const projectUrl = safeExternalUrl(item.link);
      dialogLink.hidden = !projectUrl;

      if (item.type === "website") {
        imageViewer.hidden = true;
        const canEmbed = item.embedPreview !== false;
        websitePreview.hidden = !projectUrl || !canEmbed;
        previewNotice.hidden = !projectUrl || canEmbed;
        websitePreview.title = `Live preview of ${item.name || "website project"}`;
        if (projectUrl) {
          dialogLink.href = projectUrl;
          if (canEmbed) {
            websitePreview.src = projectUrl;
            dialogLink.textContent = "Open full website ↗";
          } else {
            previewNotice.textContent = "This Vercel site blocks embedded previews. Open the live site in a new tab to view it.";
            dialogLink.textContent = "Open ExecuDesk Global ↗";
          }
        }
      } else {
        websitePreview.hidden = true;
        previewNotice.hidden = true;
        imageViewer.hidden = false;
        const imageSources = Array.isArray(item.images) && item.images.length ? item.images : [item.image];
        activeImageItems = imageSources.map((source, index) => {
          const imageDetails = typeof source === "string" ? { src: source } : source;
          const imageType = item.type === "graphic-design" ? "page" : "photo";
          return {
            ...item,
            image: imageDetails.src || imageDetails.image,
            alt: imageDetails.alt || (imageSources.length > 1 ? `${item.name || item.title}, ${imageType} ${index + 1}` : item.alt),
            title: imageDetails.title || (imageSources.length > 1 ? `${imageType === "page" ? "Page" : "Photo"} ${index + 1} of ${imageSources.length}` : item.title || "")
          };
        }).filter((entry) => entry.image);
        activeImageIndex = 0;
        previousImage.hidden = activeImageItems.length < 2;
        nextImage.hidden = activeImageItems.length < 2;
        updateImageDialog();
      }

      dialog.showModal();
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
      document.querySelector("[data-close-project]")?.focus();
    }

    function updateImageDialog() {
      const item = activeImageItems[activeImageIndex];
      if (!item) return;
      image.classList.remove("image-missing");
      image.onerror = () => {
        image.classList.add("image-missing");
        caption.textContent = "Image unavailable. Check the file path in js/data.js.";
      };
      image.src = item.image;
      image.alt = item.alt || item.title || "Portfolio image";
      caption.textContent = item.title || "";
    }

    function moveImage(direction) {
      if (activeImageItems.length < 2) return;
      activeImageIndex = (activeImageIndex + direction + activeImageItems.length) % activeImageItems.length;
      updateImageDialog();
    }

    function closeBrowserDialog() {
      if (dialog.open) dialog.close();
      websitePreview.removeAttribute("src");
      image.removeAttribute("src");
      document.documentElement.classList.remove("modal-open");
      lastFocused.element?.focus();
    }
  }
})();
