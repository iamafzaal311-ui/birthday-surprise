document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const hasGSAP = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (hasGSAP && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function select(selector) {
    return document.querySelector(selector);
  }

  function selectAll(selector) {
    return document.querySelectorAll(selector);
  }

  function showElement(element) {
    if (!element) return;
    element.classList.remove("hidden");
  }

  function refreshScrollTrigger() {
    if (
      hasGSAP &&
      hasScrollTrigger &&
      typeof ScrollTrigger.refresh === "function"
    ) {
      ScrollTrigger.refresh();
    }
  }

  const intro = byId("intro");
  const beginBtn = byId("beginBtn");
  const mainContent = byId("mainContent");

  const particles = byId("particles");

  const blowBtn = byId("blowBtn");
  const candles = selectAll(".candle");
  const wishMessage = byId("wishMessage");
  const cutCakeBtn = byId("cutCakeBtn");
  const cake = byId("cake");
  const cakeStage = select(".cake-stage");

  const giftBox = byId("giftBox");
  const openGiftBtn = byId("openGiftBtn");
  const giftReveal = byId("giftReveal");

  const hero = select(".hero");
  const heroGlows = selectAll(".hero-glow");

  if (hasGSAP) {
    const introItems = selectAll(".intro-content > *");


    if (introItems.length > 0) {
      gsap.from(introItems, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }


  }

  if (beginBtn && intro && mainContent) {
    beginBtn.addEventListener("click", function () {
      if (beginBtn.dataset.started === "true") return;


      beginBtn.dataset.started = "true";

      function openWebsite() {
        intro.style.display = "none";
        mainContent.classList.remove("hidden");
        window.scrollTo(0, 0);

        requestAnimationFrame(function () {
          refreshScrollTrigger();

          if (hasGSAP) {
            const heroContent = select(".hero-content");

            if (heroContent) {
              gsap.fromTo(
                heroContent,
                {
                  opacity: 0,
                  y: 50
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1.1,
                  ease: "power3.out"
                }
              );
            }
          }
        });
      }

      if (hasGSAP) {
        gsap.to(intro, {
          opacity: 0,
          scale: 1.03,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: openWebsite
        });
      } else {
        openWebsite();
      }
    });


  }

  if (particles && hasGSAP) {
    const particleCount = window.innerWidth <= 768 ? 20 : 35;


    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("span");

      particle.textContent = Math.random() > 0.5 ? "✦" : "♡";
      particle.style.position = "absolute";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.fontSize = 8 + Math.random() * 10 + "px";
      particle.style.pointerEvents = "none";
      particle.style.opacity = 0.2 + Math.random() * 0.5;

      particles.appendChild(particle);

      gsap.to(particle, {
        y: -(60 + Math.random() * 120),
        x: -30 + Math.random() * 60,
        opacity: 0,
        duration: 6 + Math.random() * 5,
        delay: Math.random() * 4,
        repeat: -1,
        ease: "sine.inOut"
      });
    }


  }

  function createScrollAnimations() {
    if (!hasGSAP || !hasScrollTrigger) return;


    const sections = selectAll(".section");

    sections.forEach(function (section) {
      const tag = section.querySelector(".section-tag");
      const heading = section.querySelector("h2");
      const description = section.querySelector(".section-description");

      const animationItems = [];

      if (tag) animationItems.push(tag);
      if (heading) animationItems.push(heading);
      if (description) animationItems.push(description);

      if (animationItems.length > 0) {
        gsap.from(animationItems, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
          }
        });
      }
    });

    const storyCards = selectAll(".story-card");

    if (storyCards.length > 0) {
      gsap.from(storyCards, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-grid",
          start: "top 80%",
          once: true
        }
      });
    }

    const futureItems = selectAll(".future-item");

    if (futureItems.length > 0) {
      gsap.from(futureItems, {
        opacity: 0,
        scale: 0.7,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".future-path",
          start: "top 82%",
          once: true
        }
      });
    }

    const letterPaper = select(".letter-paper");

    if (letterPaper) {
      gsap.from(letterPaper, {
        opacity: 0,
        y: 70,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".letter-section",
          start: "top 80%",
          once: true
        }
      });
    }
}

if (hasGSAP && hasScrollTrigger && mainContent) {
const observer = new MutationObserver(function () {
if (!mainContent.classList.contains("hidden")) {
createScrollAnimations();
refreshScrollTrigger();
observer.disconnect();
}
});

    observer.observe(mainContent, {
      attributes: true,
      attributeFilter: ["class"]
    });

    if (!mainContent.classList.contains("hidden")) {
      createScrollAnimations();
      refreshScrollTrigger();
      observer.disconnect();
    }
}

if (blowBtn && candles.length > 0) {
  blowBtn.addEventListener("click", function () {
    if (blowBtn.dataset.used === "true") return;

    blowBtn.dataset.used = "true";

    candles.forEach(function (candle, index) {
      setTimeout(function () {
        candle.classList.add("blown");
      }, index * 180);
    });

    if (wishMessage) {
      if (hasGSAP) {
        gsap.to(wishMessage, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.8,
          ease: "power3.out"
        });
      } else {
        wishMessage.style.opacity = "1";
        wishMessage.style.transform = "translateY(0)";
      }
    }

    if (cutCakeBtn) {
      setTimeout(function () {
        showElement(cutCakeBtn);

        if (hasGSAP) {
          gsap.fromTo(
            cutCakeBtn,
            {
              opacity: 0,
              scale: 0.7
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)"
            }
          );
        }
      }, 1100);
    }

    if (hasGSAP) {
      gsap.to(blowBtn, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        onComplete: function () {
          blowBtn.style.display = "none";
        }
      });
    } else {
      blowBtn.style.display = "none";
    }
  });
}




if (cutCakeBtn && cake && cakeStage) {
  cutCakeBtn.addEventListener("click", function () {
    if (cutCakeBtn.dataset.used === "true") return;


    cutCakeBtn.dataset.used = "true";
    cutCakeBtn.disabled = true;
    cutCakeBtn.textContent = "🎉 Cake Cut Successfully!";

    if (hasGSAP) {
      gsap.to(cake, {
        x: -50,
        rotation: -2,
        duration: 0.7,
        ease: "power2.out"
      });
    }

    const existingSlice = cakeStage.querySelector(".cake-slice");

    if (existingSlice) return;

    const slice = document.createElement("div");

    slice.className = "cake-slice";
    slice.textContent = "🍰";
    slice.style.position = "absolute";
    slice.style.left = "58%";
    slice.style.bottom = "40px";
    slice.style.fontSize = "90px";
    slice.style.opacity = "0";
    slice.style.zIndex = "20";

    cakeStage.appendChild(slice);

    if (hasGSAP) {
      gsap.fromTo(
        slice,
        {
          opacity: 0,
          scale: 0.4,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          y: -30,
          duration: 0.8,
          ease: "back.out(1.8)"
        }
      );
    } else {
      slice.style.opacity = "1";
    }
  });


}

if (giftBox && openGiftBtn && giftReveal) {
  function openGift() {
    if (giftBox.dataset.opened === "true") return;

    giftBox.dataset.opened = "true";
    giftBox.classList.add("open");

    if (hasGSAP) {
      gsap.to(giftBox, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });

      gsap.to(openGiftBtn, {
        opacity: 0,
        duration: 0.3,
        onComplete: function () {
          openGiftBtn.style.display = "none";
        }
      });
    } else {
      openGiftBtn.style.display = "none";
    }

    setTimeout(function () {
      showElement(giftReveal);

      if (hasGSAP) {
        gsap.fromTo(
          giftReveal,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out"
          }
        );

        const teddy = giftReveal.querySelector(".teddy");
        const ring = giftReveal.querySelector(".ring-reveal");

        if (teddy) {
          gsap.from(teddy, {
            opacity: 0,
            scale: 0,
            rotation: -20,
            duration: 0.9,
            ease: "back.out(1.7)"
          });
        }

        if (ring) {
          gsap.from(ring, {
            opacity: 0,
            scale: 0,
            rotation: 120,
            duration: 1,
            delay: 0.2,
            ease: "back.out(1.5)"
          });
        }
      }

      refreshScrollTrigger();
    }, 850);
  }

  openGiftBtn.addEventListener("click", openGift);
  giftBox.addEventListener("click", openGift);


}

if (hero && heroGlows.length > 0 && hasGSAP) {
  hero.addEventListener("mousemove", function (event) {
    const rect = hero.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const x = (mouseX / rect.width - 0.5) * 35;
    const y = (mouseY / rect.height - 0.5) * 35;

    gsap.to(heroGlows, {
      x: x,
      y: y,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto"
    });
  });


}

window.addEventListener("resize", function () {
  refreshScrollTrigger();
});

});

