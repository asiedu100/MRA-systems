document.addEventListener("DOMContentLoaded", () => {
  const DEMO_EMAIL_URL = "mailto:asieduyamoah150@gmail.com?subject=MRA%20Systems%20Demo%20Request";
  const DEMO_WHATSAPP_URL = "https://wa.me/233502013000?text=Hello%20MRA%20Systems%2C%20I%20want%20to%20book%20a%20demo.";

  const nav = document.getElementById("nav");
  const hbg = document.getElementById("hbg");
  const drawer = document.getElementById("drawer");
  const drawerLinks = document.querySelectorAll(".dl");
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const modalCloseButtons = document.querySelectorAll("[data-close-modal]");
  const modalBackdrops = document.querySelectorAll(".modal-backdrop");
  const signupPlan = document.getElementById("signupPlan");
  const loginForm = document.getElementById("landingLoginForm");
  const signupForm = document.getElementById("signupForm");
  const loginStatus = document.getElementById("loginStatus");
  const googleLogin = document.getElementById("googleLogin");
  const productStage = document.getElementById("productStage");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeModal = null;

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle("stuck", window.scrollY > 40);
  }

  function setMenu(open) {
    if (!drawer || !hbg) return;

    drawer.classList.toggle("open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    hbg.classList.toggle("open", open);
    nav?.classList.toggle("menu-active", open);
    document.body.classList.toggle("menu-open", open || Boolean(activeModal));
    hbg.setAttribute("aria-expanded", String(open));
    hbg.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function setLoginStatus(message, type = "") {
    if (!loginStatus) return;

    loginStatus.textContent = message;
    loginStatus.className = `form-status${message ? " show" : ""}${type ? ` ${type}` : ""}`;
  }

  function closeModals() {
    modalBackdrops.forEach((modal) => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });

    activeModal = null;
    document.body.classList.toggle("menu-open", drawer?.classList.contains("open") || false);
  }

  function selectSignupPlan(plan) {
    if (!signupPlan || !plan) return;

    const planMatch = Array.from(signupPlan.options).find((option) => {
      return option.text.toLowerCase().includes(plan.toLowerCase());
    });

    if (planMatch) {
      signupPlan.value = planMatch.value;
    }
  }

  function openModal(modalId, plan) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    setMenu(false);
    closeModals();
    selectSignupPlan(plan);

    activeModal = modal;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    const firstInput = modal.querySelector("input, select, button");
    firstInput?.focus();
  }

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  hbg?.addEventListener("click", () => {
    setMenu(!drawer?.classList.contains("open"));
  });

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const modalId = trigger.dataset.modal;
      if (!modalId) return;

      event.preventDefault();
      openModal(modalId, trigger.dataset.plan);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeModals);
  });

  modalBackdrops.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModals();
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    setMenu(false);
    closeModals();
  });

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      setLoginStatus("Opening the demo request email...");
      window.location.href = DEMO_EMAIL_URL;
    });
  }

  googleLogin?.addEventListener("click", () => {
    setLoginStatus("Opening WhatsApp so you can request a demo...");
    window.location.href = DEMO_WHATSAPP_URL;
  });

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      setLoginStatus("Opening the demo request email...");
      window.location.href = DEMO_EMAIL_URL;
    });
  }

  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px"
      }
    );

    reveals.forEach((reveal) => observer.observe(reveal));
  } else {
    reveals.forEach((reveal) => reveal.classList.add("on"));
  }

  if (productStage && !reduceMotion.matches) {
    productStage.addEventListener("pointermove", (event) => {
      const rect = productStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      productStage.style.setProperty("--ry", `${x * 8}deg`);
      productStage.style.setProperty("--rx", `${y * -8}deg`);
    });

    productStage.addEventListener("pointerleave", () => {
      productStage.style.setProperty("--ry", "0deg");
      productStage.style.setProperty("--rx", "0deg");
    });
  }

  /* ---- FAQ ACCORDION ---- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      /* Close all other items first */
      faqItems.forEach((other) => {
        const otherBtn = other.querySelector(".faq-q");
        const otherAns = other.querySelector(".faq-a");
        if (otherBtn && otherAns && other !== item) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherAns.hidden = true;
        }
      });

      /* Toggle clicked item */
      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.hidden = isOpen;
    });
  });

  /* ---- MODULE TOUR ---- */
  const moduleTabs = document.querySelectorAll(".module-tab");
  const moduleTag = document.getElementById("moduleTag");
  const moduleTitle = document.getElementById("moduleTitle");
  const moduleText = document.getElementById("moduleText");
  const moduleImage = document.getElementById("moduleImage");

  const moduleContent = {
    inventory: {
      tag: "Inventory control",
      title: "Know what is in stock before customers ask",
      text: "Track products, quantities, low-stock items and stock movement from one clean workspace.",
      image: "inventory.jpg",
      alt: "Inventory management preview"
    },
    invoices: {
      tag: "Fast invoicing",
      title: "Create invoices without slowing down sales",
      text: "Generate invoices, record customer details and keep every sale connected to your stock.",
      image: "accounting1.jpg",
      alt: "Invoice and accounting preview"
    },
    reports: {
      tag: "Business reports",
      title: "See sales, stock and performance clearly",
      text: "Use dashboard reports to understand daily activity, stock movement and business performance.",
      image: "analysis2.jpg",
      alt: "Business reports preview"
    },
    branches: {
      tag: "Branch management",
      title: "Manage multiple shops from one account",
      text: "Separate stock, users and activity per branch while still seeing the full business picture.",
      image: "warehouse2.jpg",
      alt: "Warehouse and branch management preview"
    }
  };

  moduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.module;
      const content = moduleContent[key];
      if (!content || !moduleTag || !moduleTitle || !moduleText || !moduleImage) return;

      moduleTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });

      moduleTag.textContent = content.tag;
      moduleTitle.textContent = content.title;
      moduleText.textContent = content.text;
      moduleImage.src = content.image;
      moduleImage.alt = content.alt;
    });
  });

  /* ---- BILLING TOGGLE ---- */
  const billingSwitch = document.getElementById("billingSwitch");
  const billingMonthlyLabel = document.getElementById("billingMonthlyLabel");
  const billingYearlyLabel = document.getElementById("billingYearlyLabel");
  const priceEls = document.querySelectorAll(".price[data-monthly][data-yearly]");

  function setBilling(yearly) {
    billingSwitch?.setAttribute("aria-checked", String(yearly));
    billingMonthlyLabel?.classList.toggle("active", !yearly);
    billingYearlyLabel?.classList.toggle("active", yearly);

    priceEls.forEach((price) => {
      const monthly = Number(price.dataset.monthly);
      const yearlyTotal = Number(price.dataset.yearly);
      const amount = price.querySelector(".price-amount");
      const note = price.querySelector(".price-note");
      if (!amount || !note) return;

      if (yearly) {
        const perMonth = Math.round(yearlyTotal / 12);
        amount.textContent = `GHS ${perMonth}/mo`;
        note.textContent = `billed GHS ${yearlyTotal.toLocaleString()}/year`;
        note.hidden = false;
      } else {
        amount.textContent = `GHS ${monthly}/mo`;
        note.hidden = true;
      }
    });
  }

  if (billingSwitch) {
    setBilling(false);
    billingSwitch.addEventListener("click", () => {
      setBilling(billingSwitch.getAttribute("aria-checked") !== "true");
    });
  }
});
