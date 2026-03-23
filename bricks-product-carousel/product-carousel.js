/**
 * Bricks Builder - Responsive Product Carousel
 * Products 요소에 .product-carousel 클래스 추가 시 자동 초기화
 *
 * 사용법:
 * 1. Bricks에서 Products 요소에 CSS 클래스 "product-carousel" 추가
 * 2. 이 JS와 CSS를 로드 (Bricks > Settings > Custom Code 또는 자식테마)
 */
(function () {
  "use strict";

  function initCarousel(wrapper) {
    if (wrapper.dataset.carouselInit) return;
    wrapper.dataset.carouselInit = "true";

    const list = wrapper.querySelector(".products");
    if (!list) return;

    // 화살표 생성
    const prevBtn = document.createElement("button");
    prevBtn.className = "carousel-arrow carousel-arrow--prev";
    prevBtn.setAttribute("aria-label", "이전 상품");
    prevBtn.textContent = "이전";

    const nextBtn = document.createElement("button");
    nextBtn.className = "carousel-arrow carousel-arrow--next";
    nextBtn.setAttribute("aria-label", "다음 상품");
    nextBtn.textContent = "다음";

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(nextBtn);

    // 한 카드의 너비 + gap 만큼 스크롤
    function getScrollAmount() {
      const card = list.querySelector(".product");
      if (!card) return 300;
      const style = getComputedStyle(list);
      const gap = parseFloat(style.gap) || 20;
      return card.offsetWidth + gap;
    }

    // 화살표 활성/비활성 상태 업데이트
    function updateArrows() {
      const tolerance = 2;
      prevBtn.disabled = list.scrollLeft <= tolerance;
      nextBtn.disabled =
        list.scrollLeft + list.offsetWidth >= list.scrollWidth - tolerance;
    }

    prevBtn.addEventListener("click", function () {
      list.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", function () {
      list.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    list.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    // 초기 상태
    updateArrows();
  }

  // DOM 로드 후 초기화
  function init() {
    document.querySelectorAll(".brxe-products.product-carousel").forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Bricks AJAX/Infinite Scroll 등으로 동적 추가 대응
  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length) {
        init();
        break;
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
