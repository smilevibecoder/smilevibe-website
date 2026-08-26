const serviceHeaderHost = document.querySelector("[data-service-header]");
const serviceFooterHost = document.querySelector("[data-service-footer]");

if (serviceHeaderHost) {
  serviceHeaderHost.outerHTML = `
    <header class="site-header">
      <div class="utility"><a href="https://maps.app.goo.gl/LuY7jqMr9qu8vem67">19221 108th Ave SE Suite 2, Renton, WA 98055</a><span>New patients welcome</span><a href="tel:+14259880801">(425) 988-0801</a></div>
      <nav class="nav" aria-label="Main navigation">
        <a class="logo" href="/" aria-label="SmileVibe Dentistry home"><img src="/assets/brand/smilevibe-logo.svg" alt="SmileVibe Dentistry"></a>
        <button class="menu-button" type="button" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
        <div class="nav-links" id="nav-links">
          <div class="nav-services">
            <div class="nav-services-trigger"><a href="/#services">Services</a><button class="services-toggle" type="button" aria-expanded="false" aria-controls="services-menu" aria-label="Show dental services"><span aria-hidden="true">⌄</span></button></div>
            <div class="services-menu" id="services-menu">
              <div class="services-menu-heading"><p class="eyebrow">Care in Renton, WA</p><strong>Find the treatment that fits your needs.</strong><span>Explore clear, patient-friendly guides to each service.</span></div>
              <div class="services-menu-grid">
                <a class="featured-service" href="/services/dental-implants/?layout=compact-20260826">Dental Implants <span>Missing tooth replacement</span></a>
                <a class="featured-service" href="/services/root-canal-treatment/?layout=compact-20260826">Root Canal Treatment <span>Relieve pain, preserve a tooth</span></a>
                <a class="featured-service" href="/services/dental-crowns/?layout=compact-20260826">Dental Crowns <span>Protect weakened teeth</span></a>
                <a class="featured-service" href="/services/emergency-treatment/?layout=compact-20260826">Emergency Treatment <span>Help for urgent dental problems</span></a>
                <a href="/services/full-arch-therapy/?layout=compact-20260826">Full Arch Therapy <span>Rebuild a complete smile</span></a>
                <a href="/services/tooth-extraction/?layout=compact-20260826">Tooth Extraction <span>Remove a tooth that cannot be saved</span></a>
                <a href="/services/composite-fillings-bonding/?layout=compact-20260826">Composite Fillings/Bonding <span>Conservative tooth repair</span></a>
                <a href="/services/bone-grafting/?layout=compact-20260826">Bone Grafting <span>Restore jawbone support</span></a>
                <a href="/services/preventative-treatment/?layout=compact-20260826">Preventative Treatment <span>Keep small issues small</span></a>
                <a href="/services/porcelain-veneers/?layout=compact-20260826">Porcelain Veneers <span>Refine shape, color, and symmetry</span></a>
                <a href="/services/teeth-whitening/?layout=compact-20260826">Teeth Whitening <span>Professionally brighten your smile</span></a>
                <a href="/services/deep-cleaning-gum-disease/?layout=compact-20260826">Deep Cleaning/Gum Disease <span>Support healthier gums</span></a>
              </div>
            </div>
          </div>
          <a href="/about/">Meet Dr. Bhogal</a><a href="/#results">Results</a><a href="/#reviews">Reviews</a><a href="/#specials">Specials</a><a href="/#visit">Visit</a><a class="phone" href="tel:+14259880801">(425) 988-0801</a><a class="button button-outline" href="https://book2.getweave.com/fd40893f-7887-414e-9cbc-70cbc3812518/request-appointment">Book Now</a>
        </div>
      </nav>
    </header>`;
}

if (serviceFooterHost) {
  serviceFooterHost.outerHTML = `
    <footer class="footer"><img src="/assets/brand/smilevibe-logo.svg" alt="SmileVibe Dentistry"><p>SmileVibe Dentistry in Renton, WA</p><div><a href="tel:+14259880801">(425) 988-0801</a><a href="https://book2.getweave.com/fd40893f-7887-414e-9cbc-70cbc3812518/request-appointment">Book Online</a></div></footer>`;
}

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const servicesNav = document.querySelector(".nav-services");
const servicesToggle = document.querySelector(".services-toggle");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks?.classList.toggle("is-open", !open);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  });
});

servicesToggle?.addEventListener("click", () => {
  const open = servicesToggle.getAttribute("aria-expanded") === "true";
  servicesToggle.setAttribute("aria-expanded", String(!open));
  servicesNav?.classList.toggle("is-open", !open);
});

document.addEventListener("click", (event) => {
  if (!servicesNav?.contains(event.target)) {
    servicesToggle?.setAttribute("aria-expanded", "false");
    servicesNav?.classList.remove("is-open");
  }
});

const floatingEmergencyCta = document.querySelector(".implant-emergency-cta");

if (floatingEmergencyCta && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let actualScroll = window.scrollY;
  let trailingScroll = actualScroll;
  let followFrame = null;

  const animateEmergencyCta = () => {
    trailingScroll += (actualScroll - trailingScroll) * 0.075;
    const lag = Math.max(-110, Math.min(110, trailingScroll - actualScroll));
    floatingEmergencyCta.style.transform = `translate3d(0, ${lag}px, 0)`;

    if (Math.abs(actualScroll - trailingScroll) > 0.15) {
      followFrame = requestAnimationFrame(animateEmergencyCta);
    } else {
      trailingScroll = actualScroll;
      floatingEmergencyCta.style.transform = "translate3d(0, 0, 0)";
      followFrame = null;
    }
  };

  window.addEventListener("scroll", () => {
    actualScroll = window.scrollY;

    if (window.innerWidth <= 640) {
      trailingScroll = actualScroll;
      floatingEmergencyCta.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    if (followFrame === null) {
      followFrame = requestAnimationFrame(animateEmergencyCta);
    }
  }, { passive: true });
}

const initScrollingCarousel = ({
  trackSelector,
  setSelector,
  containerSelector,
  slideSelector,
  pixelsPerSecond,
  copiesNeeded,
  stateName,
  cloneMutator
}) => {
  const track = document.querySelector(trackSelector);
  const firstSet = document.querySelector(setSelector);
  const container = document.querySelector(containerSelector);

  if (!track || !firstSet || !container) {
    return;
  }

  const sourceSlides = Array.from(firstSet.children);
  const sourceCount = sourceSlides.length;
  let cycleWidth = 0;
  let offset = 0;
  let lastTime = null;
  let paused = false;
  let hovering = false;
  let dragging = false;
  let pointerId = null;
  let lastPointerX = 0;
  let dragDistance = 0;
  let suppressClick = false;
  let pressedLink = null;
  let wheelResumeTimer = null;

  for (let copyIndex = 1; copyIndex < copiesNeeded; copyIndex += 1) {
    sourceSlides.forEach((slide) => {
      const copy = slide.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      cloneMutator?.(copy);
      firstSet.appendChild(copy);
    });
  }

  const measureResults = () => {
    const firstSlide = firstSet.children[0];
    const firstRepeatedSlide = firstSet.children[sourceCount];

    if (!firstSlide || !firstRepeatedSlide) {
      return;
    }

    cycleWidth = firstRepeatedSlide.getBoundingClientRect().left - firstSlide.getBoundingClientRect().left;
    offset = ((offset % (cycleWidth || 1)) + (cycleWidth || 1)) % (cycleWidth || 1);
    window[stateName] = { cycleWidth, offset, paused, hovering, dragging };
  };

  const render = () => {
    if (cycleWidth <= 0) {
      return;
    }

    offset = ((offset % cycleWidth) + cycleWidth) % cycleWidth;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    window[stateName] = { cycleWidth, offset, paused, hovering, dragging };
  };

  const animateResults = (time) => {
    if (lastTime === null) {
      lastTime = time;
    }

    const elapsed = time - lastTime;
    lastTime = time;

    if (!paused && cycleWidth > 0) {
      offset = (offset + (elapsed / 1000) * pixelsPerSecond) % cycleWidth;
      render();
    }

    requestAnimationFrame(animateResults);
  };

  const beginDrag = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragging = true;
    paused = true;
    pointerId = event.pointerId;
    lastPointerX = event.clientX;
    dragDistance = 0;
    suppressClick = false;
    pressedLink = event.target.closest?.("a[href]") || null;
  };

  const drag = (event) => {
    if (!dragging || event.pointerId !== pointerId) {
      return;
    }

    const delta = event.clientX - lastPointerX;
    lastPointerX = event.clientX;
    dragDistance += Math.abs(delta);

    if (dragDistance <= 6) {
      return;
    }

    if (!container.classList.contains("is-dragging")) {
      container.classList.add("is-dragging");
      container.setPointerCapture?.(pointerId);
    }

    offset -= delta;
    render();
    event.preventDefault();
  };

  const endDrag = (event) => {
    if (!dragging || (event.pointerId !== undefined && event.pointerId !== pointerId)) {
      return;
    }

    const destination = dragDistance <= 6 ? pressedLink?.href : null;
    suppressClick = Boolean(destination) || dragDistance > 6;
    pressedLink = null;
    dragging = false;
    paused = hovering;
    lastTime = null;
    container.classList.remove("is-dragging");
    if (pointerId !== null && container.hasPointerCapture?.(pointerId)) {
      container.releasePointerCapture(pointerId);
    }
    pointerId = null;

    if (destination) {
      window.location.assign(destination);
    }
  };

  const preventClickAfterDrag = (event) => {
    if (suppressClick) {
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
      pressedLink = null;
      return;
    }

  };

  const scrollWithWheel = (event) => {
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
    if (!horizontalIntent) {
      return;
    }

    event.preventDefault();
    paused = true;
    offset += event.shiftKey && Math.abs(event.deltaX) < 1 ? event.deltaY : event.deltaX;
    render();
    window.clearTimeout(wheelResumeTimer);
    wheelResumeTimer = window.setTimeout(() => {
      paused = hovering;
      lastTime = null;
    }, 220);
  };

  const scrollWithKeys = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    paused = true;
    const step = Math.min(container.clientWidth * 0.35, 320);
    offset += event.key === "ArrowRight" ? step : -step;
    render();
    paused = hovering;
    lastTime = null;
  };

  const pauseOnHover = () => {
    hovering = true;
    paused = true;
  };

  const resumeAfterHover = () => {
    hovering = false;
    if (!dragging) {
      paused = false;
      lastTime = null;
    }
  };

  measureResults();
  window.addEventListener("resize", measureResults);
  window.addEventListener("load", measureResults);
  track.querySelectorAll("img").forEach((image) => {
    image.addEventListener("load", measureResults);
  });
  container.tabIndex = 0;
  container.addEventListener("pointerdown", beginDrag);
  container.addEventListener("pointermove", drag);
  container.addEventListener("pointerup", endDrag);
  container.addEventListener("pointercancel", endDrag);
  container.addEventListener("lostpointercapture", endDrag);
  container.addEventListener("click", preventClickAfterDrag, true);
  container.addEventListener("mouseenter", pauseOnHover);
  container.addEventListener("mouseleave", resumeAfterHover);
  container.addEventListener("wheel", scrollWithWheel, { passive: false });
  container.addEventListener("keydown", scrollWithKeys);
  requestAnimationFrame(animateResults);
};

initScrollingCarousel({
  trackSelector: ".results-track",
  setSelector: ".results-set",
  containerSelector: ".results-marquee",
  slideSelector: ".result-slide",
  pixelsPerSecond: 42,
  copiesNeeded: 7,
  stateName: "smileVibeResultsLoop",
  cloneMutator: (copy) => {
    copy.tabIndex = -1;
    copy.querySelectorAll("img").forEach((image) => {
      image.alt = "";
    });
  }
});

initScrollingCarousel({
  trackSelector: ".review-track",
  setSelector: ".review-set",
  containerSelector: ".review-marquee",
  slideSelector: ".review-card",
  pixelsPerSecond: 42,
  copiesNeeded: 8,
  stateName: "smileVibeReviewsLoop"
});
