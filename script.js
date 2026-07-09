const PORTFOLIO = {
  name: "Satya Keerthi Dara",
  email: "Satyakeerthidara7@gmail.com",
  phone: "940-277-9720",
  linkedin: "https://www.linkedin.com/in/satyakeerthidara2/",
  demo: "https://zippy-quokka-0cd1c3.netlify.app/",
  resume: "assets/Satya_Keerthi_Dara_Resume.pdf"
};

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function initVideo() {
  const video = document.querySelector("#heroVideo");
  const control = document.querySelector("#videoControl");
  const note = document.querySelector("#soundNote");
  if (!video || !control) return;

  const pauseIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5.5h3.5v13H7zM13.5 5.5H17v13h-3.5z"></path>
    </svg>`;
  const playIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.25v13.5L18.5 12 8 5.25z"></path>
    </svg>`;

  function syncButton() {
    const paused = video.paused;
    control.innerHTML = paused ? playIcon : pauseIcon;
    control.setAttribute("aria-label", paused ? "Resume introduction video with sound" : "Pause introduction video");
  }

  control.addEventListener("click", async () => {
    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
        if (note) note.textContent = "Video resumed with sound.";
      } catch (error) {
        video.muted = true;
        try {
          await video.play();
          if (note) note.textContent = "Your browser blocked sound. Tap resume again to allow audio.";
        } catch (secondError) {
          console.warn("Video playback was blocked.", secondError);
        }
      }
    } else {
      video.pause();
      if (note) note.textContent = "Resume to continue with sound.";
    }
    syncButton();
  });

  video.addEventListener("play", syncButton);
  video.addEventListener("pause", syncButton);
  syncButton();
}

function initProjectDetails() {
  const button = document.querySelector("#projectDetailsButton");
  const details = document.querySelector("#projectDetails");
  if (!button || !details) return;

  button.addEventListener("click", () => {
    const open = details.classList.toggle("open");
    button.textContent = open ? "Hide functionality" : "View functionality";
    button.setAttribute("aria-expanded", String(open));
    if (open) setTimeout(() => details.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  });
}

function initContactForm() {
  const form = document.querySelector("#contactForm");
  const note = document.querySelector("#formNote");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      if (note) note.textContent = "Please complete all three fields.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Satya,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${PORTFOLIO.email}?subject=${subject}&body=${body}`;
    if (note) note.textContent = "Opening your email app...";
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach((item) => observer.observe(item));
}

function getAssistantResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("project") || q.includes("demo") || q.includes("job tracker")) {
    return `Satya built an AI Powered Job Tracker with resume parsing, job retrieval, embeddings, semantic search, RAG, and AI recommendations. The project went through 7 deployment iterations and 12+ resume tests. <a href="${PORTFOLIO.demo}" target="_blank" rel="noopener noreferrer">Open the live demo</a>.`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach")) {
    return `Reach Satya at <a href="mailto:${PORTFOLIO.email}">${PORTFOLIO.email}</a>, call <a href="tel:+19402779720">${PORTFOLIO.phone}</a>, or open <a href="${PORTFOLIO.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>.`;
  }

  if (q.includes("experience") || q.includes("work") || q.includes("hirello") || q.includes("cisco") || q.includes("sak")) {
    return `Satya has 3+ years of experience across AI applications, backend services, APIs, Python, SQL, and workflow automation. At Hirello.AI, Satya built and tested 25 REST API endpoints and fixed 20+ backend issues.`;
  }

  if (q.includes("about") || q.includes("who") || q.includes("summary")) {
    return `Satya Keerthi Dara is an AI Engineer focused on AI applications, LLM workflows, RAG, semantic search, backend APIs, and working products.`;
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech")) {
    return `Core skills include LLMs, RAG, LangChain, OpenAI APIs, embeddings, semantic search, Python, Node.js, FastAPI, React, PostgreSQL, Supabase, MongoDB, AWS, Docker, and REST APIs.`;
  }

  if (q.includes("education") || q.includes("degree") || q.includes("university")) {
    return `Satya completed a Master of Science in Computer Science at Southeast Missouri State University and a Bachelor of Technology in Computer Science at Jawaharlal Nehru Technological University.`;
  }

  if (q.includes("resume") || q.includes("cv")) {
    return `You can <a href="${PORTFOLIO.resume}" target="_blank" rel="noopener noreferrer">open Satya's resume here</a>.`;
  }

  return `I can answer questions about Satya's projects, experience, skills, education, resume, or contact details. Try one of the quick buttons.`;
}

function initAssistant() {
  const launcher = document.querySelector("#aiLauncher");
  const panel = document.querySelector("#aiPanel");
  const close = document.querySelector("#aiClose");
  const form = document.querySelector("#aiForm");
  const input = document.querySelector("#aiInput");
  const messages = document.querySelector("#aiMessages");
  const quickButtons = document.querySelectorAll("[data-ai-query]");
  if (!launcher || !panel || !messages) return;

  function setOpen(open) {
    panel.classList.toggle("open", open);
    launcher.setAttribute("aria-expanded", String(open));
    panel.setAttribute("aria-hidden", String(!open));
    if (open && input) setTimeout(() => input.focus(), 100);
  }

  function addMessage(text, role) {
    const bubble = document.createElement("div");
    bubble.className = `ai-message ${role}`;
    if (role === "bot") bubble.innerHTML = text;
    else bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function ask(query) {
    const cleaned = query.trim();
    if (!cleaned) return;
    addMessage(cleaned, "user");
    setTimeout(() => addMessage(getAssistantResponse(cleaned), "bot"), 160);
  }

  launcher.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
  close?.addEventListener("click", () => setOpen(false));

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => ask(button.dataset.aiQuery || button.textContent || ""));
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input?.value || "");
    if (input) input.value = "";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("open")) setOpen(false);
  });
}

function updateYear() {
  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initVideo();
  initProjectDetails();
  initContactForm();
  initReveal();
  initAssistant();
  updateYear();
});
