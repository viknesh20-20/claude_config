const canvas = document.querySelector("#signal-canvas");
const ctx = canvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let width = 0;
let height = 0;
let nodes = [];
let pointer = { x: -9999, y: -9999 };

const palette = ["#4ee6a6", "#70a7ff", "#f4c46a", "#ff7ea8"];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(92, Math.max(34, Math.floor((width * height) / 18000)));
  nodes = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    size: Math.random() * 1.9 + 0.8,
    color: palette[index % palette.length]
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";

  nodes.forEach((node, index) => {
    if (!reducedMotion) {
      node.x += node.vx;
      node.y += node.vy;
    }

    if (node.x < -20) node.x = width + 20;
    if (node.x > width + 20) node.x = -20;
    if (node.y < -20) node.y = height + 20;
    if (node.y > height + 20) node.y = -20;

    const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
    if (pointerDistance < 140 && !reducedMotion) {
      node.x += (node.x - pointer.x) * 0.003;
      node.y += (node.y - pointer.y) * 0.003;
    }

    for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
      const other = nodes[otherIndex];
      const distance = Math.hypot(node.x - other.x, node.y - other.y);
      if (distance < 132) {
        ctx.strokeStyle = `rgba(112, 167, 255, ${0.18 * (1 - distance / 132)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = node.color;
    ctx.save();
    ctx.translate(node.x, node.y);
    ctx.rotate(Math.PI / 4);
    ctx.fillRect(-node.size, -node.size, node.size * 2, node.size * 2);
    ctx.restore();

    ctx.strokeStyle = `${node.color}55`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(node.x - 5, node.y - 5, 10, 10);
    ctx.stroke();
  });

  if (!reducedMotion) requestAnimationFrame(draw);
}

const archetypes = {
  web: {
    title: "Premium web bundle armed.",
    body: "Design fluency, GSAP motion, Three.js, Figma, Playwright, SEO, and compliance launch gates."
  },
  saas: {
    title: "SaaS operating layer ready.",
    body: "Web stack plus superpowers, ruflo, gstack, databases, payments, monitoring, security, and test generation."
  },
  ai: {
    title: "AI systems bundle online.",
    body: "Agent orchestration, RAG memory, vector stores, knowledge graphs, Claude context, Firecrawl, and model tooling."
  },
  all: {
    title: "Full toolkit unlocked.",
    body: "The union of web, SaaS, and AI bundles for teams that want every specialist, command, MCP, and plugin path."
  }
};

function initArchetypePicker() {
  const output = document.querySelector("#archetype-output");
  document.querySelectorAll(".choice").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".choice").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const choice = archetypes[button.dataset.choice];
      output.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 260, easing: "ease-out" }
      );
      output.innerHTML = `<strong>${choice.title}</strong><span>${choice.body}</span>`;
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const end = Number(target.dataset.count);
      const duration = 1100;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        target.textContent = Math.floor(eased * end).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(target);
    });
  }, { threshold: 0.55 });

  counters.forEach((counter) => observer.observe(counter));
}

function initReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach((item) => observer.observe(item));
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        const original = button.textContent;
        button.textContent = "Copied";
        setTimeout(() => {
          button.textContent = original;
        }, 1400);
      } catch {
        button.textContent = "Select text";
      }
    });
  });
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY };
});
window.addEventListener("pointerleave", () => {
  pointer = { x: -9999, y: -9999 };
});

resizeCanvas();
draw();
initArchetypePicker();
initCounters();
initReveal();
initCopyButtons();
