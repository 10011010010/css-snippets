/**
 * Bricks Builder - Splide Product Carousel
 *
 * 사용법:
 * 1. Bricks에서 Products 요소에 CSS 클래스 "product-carousel" 추가
 * 2. Splide CDN + 이 JS/CSS 로드
 *
 * Splide가 요구하는 DOM 구조를 JS가 자동으로 만들어줌
 * (기존 .products > .product 구조를 splide__list > splide__slide로 래핑)
 *
 * Slick처럼 고정 픽셀 너비 계산 방식 사용 (퍼센트 계산 오차 방지)
 */
(function () {
  "use strict";

  var GAP = 20;
  var BREAKPOINTS = [
    { max: 767,  perPage: 2, gap: 15 },
    { max: 991,  perPage: 3, gap: GAP },
    { max: 1199, perPage: 4, gap: GAP },
    { max: Infinity, perPage: 5, gap: GAP },
  ];

  function getPerPage() {
    var w = window.innerWidth;
    for (var i = 0; i < BREAKPOINTS.length; i++) {
      if (w <= BREAKPOINTS[i].max) return BREAKPOINTS[i];
    }
    return BREAKPOINTS[BREAKPOINTS.length - 1];
  }

  function calcFixedWidth(containerWidth) {
    var bp = getPerPage();
    return Math.floor((containerWidth - bp.gap * (bp.perPage - 1)) / bp.perPage);
  }

  function initCarousel(el) {
    if (el.dataset.splideInit) return;
    el.dataset.splideInit = "true";

    var productList = el.querySelector(".products");
    if (!productList) return;

    var products = productList.querySelectorAll(":scope > .product");
    if (!products.length) return;

    var splideRoot = document.createElement("div");
    splideRoot.className = "splide";

    var track = document.createElement("div");
    track.className = "splide__track";

    var list = document.createElement("ul");
    list.className = "splide__list";

    products.forEach(function (product) {
      var slide = document.createElement("li");
      slide.className = "splide__slide product " + product.className;
      while (product.firstChild) {
        slide.appendChild(product.firstChild);
      }
      list.appendChild(slide);
    });

    track.appendChild(list);
    splideRoot.appendChild(track);
    productList.replaceWith(splideRoot);

    // 컨테이너 실제 너비 기반 고정 픽셀 계산 (Slick 방식)
    var containerWidth = el.clientWidth;
    var bp = getPerPage();

    var splide = new Splide(splideRoot, {
      type: "slide",
      fixedWidth: calcFixedWidth(containerWidth) + "px",
      gap: bp.gap + "px",
      pagination: false,
      arrows: true,
      drag: true,
      snap: true,
    }).mount();

    // 리사이즈 시 재계산
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var newWidth = el.clientWidth;
        var newBp = getPerPage();
        splide.options = {
          fixedWidth: calcFixedWidth(newWidth) + "px",
          gap: newBp.gap + "px",
        };
        splide.refresh();
      }, 150);
    });
  }

  function init() {
    document
      .querySelectorAll(".product-carousel")
      .forEach(initCarousel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // AJAX 등 동적 로딩 대응
  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length) {
        init();
        break;
      }
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
