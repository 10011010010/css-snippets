/**
 * Bricks Builder - Splide Product Carousel
 *
 * 사용법:
 * 1. Bricks에서 Products 요소에 CSS 클래스 "product-carousel" 추가
 * 2. Splide CDN + 이 JS/CSS 로드
 *
 * Splide가 요구하는 DOM 구조를 JS가 자동으로 만들어줌
 * (기존 .products > .product 구조를 splide__list > splide__slide로 래핑)
 */
(function () {
  "use strict";

  function initCarousel(el) {
    if (el.dataset.splideInit) return;
    el.dataset.splideInit = "true";

    var productList = el.querySelector(".products");
    if (!productList) return;

    var products = productList.querySelectorAll(":scope > .product");
    if (!products.length) return;

    // Splide DOM 구조 생성
    // <div class="splide">
    //   <div class="splide__track">
    //     <ul class="splide__list">
    //       <li class="splide__slide">...product...</li>
    //     </ul>
    //   </div>
    // </div>

    var splideRoot = document.createElement("div");
    splideRoot.className = "splide";

    var track = document.createElement("div");
    track.className = "splide__track";

    var list = document.createElement("ul");
    list.className = "splide__list";

    products.forEach(function (product) {
      var slide = document.createElement("li");
      slide.className = "splide__slide";
      slide.appendChild(product);
      list.appendChild(slide);
    });

    track.appendChild(list);
    splideRoot.appendChild(track);

    // 기존 .products를 Splide 구조로 교체
    productList.replaceWith(splideRoot);

    // Splide 초기화
    new Splide(splideRoot, {
      type: "slide",
      perPage: 5,
      gap: "20px",
      pagination: false,
      arrows: true,
      drag: true,
      snap: true,
      breakpoints: {
        1199: { perPage: 4 },
        991:  { perPage: 3 },
        767:  { perPage: 2, gap: "15px" },
      },
    }).mount();
  }

  function init() {
    document
      .querySelectorAll(".brxe-products.product-carousel")
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
