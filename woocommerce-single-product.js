/**
 * WooCommerce Single Product - Multi-option Cart Accumulator
 * 피더스 상품 상세페이지
 *
 * 핵심 동작:
 * 1. 드롭다운에서 사이즈를 선택하면 아래 리스트에 추가됨
 * 2. 같은 옵션을 다시 선택하면 수량 +1
 * 3. 리스트에서 각 아이템의 수량 조절 (+/-) 및 개별 삭제 (X) 가능
 * 4. "장바구니 담기" 버튼으로 선택된 모든 아이템을 WooCommerce 장바구니에 추가
 *
 * 별도 플러그인 불필요 - WooCommerce wc-ajax 엔드포인트 활용
 */
(function () {
  "use strict";

  // DOM 준비 대기
  function init() {
    var form = document.querySelector(".single-product .variations_form");
    if (!form) return;

    var variationData;
    try {
      variationData = JSON.parse(form.getAttribute("data-product_variations") || "[]");
    } catch (e) {
      return;
    }
    if (!variationData.length) return;

    var productId = form.querySelector('input[name="product_id"]');
    if (!productId) return;
    productId = productId.value;

    var selects = form.querySelectorAll(".variations select");
    if (!selects.length) return;

    // 상태 저장소
    var selectedItems = {};
    var isAdding = false;
    var skipNextChange = false;

    // --- UI 구성 ---
    var cartSection = document.createElement("div");
    cartSection.className = "feedus-cart-section";

    var listEl = document.createElement("div");
    listEl.className = "feedus-selected-items";
    listEl.style.display = "none";

    var totalEl = document.createElement("div");
    totalEl.className = "feedus-selected-total";
    totalEl.style.display = "none";

    var addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "feedus-add-to-cart-btn";
    addBtn.textContent = "\uc7a5\ubc14\uad6c\ub2c8 \ub2f4\uae30";
    addBtn.disabled = true;

    var emptyMsg = document.createElement("div");
    emptyMsg.className = "feedus-empty-msg";
    emptyMsg.textContent = "\uc0ac\uc774\uc988\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694";

    cartSection.appendChild(emptyMsg);
    cartSection.appendChild(listEl);
    cartSection.appendChild(totalEl);
    cartSection.appendChild(addBtn);

    // form 뒤에 삽입 (summary 안에)
    form.parentNode.insertBefore(cartSection, form.nextSibling);

    // --- 드롭다운 이벤트 ---
    selects.forEach(function (select) {
      select.addEventListener("change", function () {
        if (skipNextChange) {
          skipNextChange = false;
          return;
        }

        var val = this.value;
        if (!val) return;

        // attribute name
        var attrName = this.getAttribute("data-attribute_name") || this.name;

        // 매칭 variation 찾기
        var matched = null;
        for (var i = 0; i < variationData.length; i++) {
          var v = variationData[i];
          if (v.attributes[attrName] === val) {
            matched = v;
            break;
          }
        }
        if (!matched) return;

        var vid = String(matched.variation_id);

        // 이미 있으면 수량 +1, 아니면 새로 추가
        if (selectedItems[vid]) {
          selectedItems[vid].qty += 1;
        } else {
          selectedItems[vid] = {
            name: val,
            price: matched.display_price,
            qty: 1,
            variationId: matched.variation_id,
            attrName: attrName
          };
        }

        renderList();

        // 드롭다운 리셋 (다음 선택 가능하도록)
        var self = this;
        skipNextChange = true;
        setTimeout(function () {
          self.value = "";
          // jQuery 기반 WooCommerce 이벤트 트리거
          if (window.jQuery) {
            window.jQuery(self).trigger("change");
          }
          skipNextChange = false;
        }, 50);
      });
    });

    // --- 렌더링 ---
    function renderList() {
      var keys = Object.keys(selectedItems);

      if (keys.length === 0) {
        listEl.style.display = "none";
        totalEl.style.display = "none";
        emptyMsg.style.display = "block";
        addBtn.disabled = true;
        return;
      }

      emptyMsg.style.display = "none";
      listEl.style.display = "flex";
      totalEl.style.display = "flex";
      addBtn.disabled = false;

      // 리스트 렌더
      listEl.innerHTML = "";
      var grandTotal = 0;
      var grandQty = 0;

      keys.forEach(function (vid) {
        var item = selectedItems[vid];
        var subtotal = item.price * item.qty;
        grandTotal += subtotal;
        grandQty += item.qty;

        var row = document.createElement("div");
        row.className = "feedus-selected-item";

        row.innerHTML =
          '<div class="feedus-selected-item__info">' +
            '<span class="feedus-selected-item__name">' + escapeHtml(item.name) + '</span>' +
            '<span class="feedus-selected-item__price">' + formatPrice(item.price) + '</span>' +
          '</div>' +
          '<div class="feedus-selected-item__qty">' +
            '<button type="button" data-action="minus" data-vid="' + vid + '">-</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" data-action="plus" data-vid="' + vid + '">+</button>' +
          '</div>' +
          '<span class="feedus-selected-item__subtotal">' + formatPrice(subtotal) + '</span>' +
          '<button type="button" class="feedus-selected-item__remove" data-vid="' + vid + '">\u00d7</button>';

        listEl.appendChild(row);
      });

      // 이벤트 위임으로 처리
      listEl.onclick = function (e) {
        var target = e.target;
        if (target.tagName !== "BUTTON") return;

        e.preventDefault();
        var vid = target.getAttribute("data-vid");
        if (!vid || !selectedItems[vid]) return;

        if (target.classList.contains("feedus-selected-item__remove")) {
          delete selectedItems[vid];
        } else {
          var action = target.getAttribute("data-action");
          if (action === "plus") {
            selectedItems[vid].qty += 1;
          } else if (action === "minus") {
            selectedItems[vid].qty -= 1;
            if (selectedItems[vid].qty <= 0) {
              delete selectedItems[vid];
            }
          }
        }
        renderList();
      };

      // 총합
      totalEl.innerHTML =
        '<span>\ucd1d ' + grandQty + '\uac1c \uc0c1\ud488</span>' +
        '<span>' + formatPrice(grandTotal) + '</span>';
    }

    // --- 장바구니 담기 ---
    addBtn.addEventListener("click", function () {
      var keys = Object.keys(selectedItems);
      if (keys.length === 0 || isAdding) return;

      isAdding = true;
      addBtn.disabled = true;
      addBtn.textContent = "\ucd94\uac00 \uc911...";

      // WooCommerce AJAX URL
      var ajaxUrl = (typeof wc_add_to_cart_variation_params !== "undefined" &&
                     wc_add_to_cart_variation_params.wc_ajax_url)
        ? wc_add_to_cart_variation_params.wc_ajax_url.replace("%%endpoint%%", "add_to_cart")
        : "/?wc-ajax=add_to_cart";

      // 순차적으로 아이템 추가 (동시 요청 시 세션 충돌 방지)
      var queue = keys.slice();

      function processNext() {
        if (queue.length === 0) {
          // 완료 - 페이지 새로고침
          window.location.reload();
          return;
        }

        var vid = queue.shift();
        var item = selectedItems[vid];

        var formData = new FormData();
        formData.append("product_id", productId);
        formData.append("variation_id", String(item.variationId));
        formData.append("quantity", String(item.qty));
        formData.append(item.attrName, item.name);

        fetch(form.action || window.location.href, {
          method: "POST",
          body: new URLSearchParams({
            "add-to-cart": productId,
            "product_id": productId,
            "variation_id": String(item.variationId),
            "quantity": String(item.qty)
          }).toString() + "&" + encodeURIComponent(item.attrName) + "=" + encodeURIComponent(item.name),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          credentials: "same-origin"
        })
        .then(function () {
          processNext();
        })
        .catch(function () {
          processNext();
        });
      }

      processNext();
    });

    // 기본 form submit 차단 (커스텀 버튼으로 대체)
    form.addEventListener("submit", function (e) {
      if (Object.keys(selectedItems).length > 0) {
        e.preventDefault();
      }
    });
  }

  // --- 유틸 ---
  function formatPrice(price) {
    return "\u20a9" + Number(price).toLocaleString("ko-KR");
  }

  function escapeHtml(str) {
    var el = document.createElement("span");
    el.textContent = str;
    return el.innerHTML;
  }

  // DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
