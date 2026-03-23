/**
 * WooCommerce Single Product - Multi-option Cart Accumulator
 * 피더스 상품 상세페이지: 옵션 선택 시 누적 추가, 개별 삭제 가능
 *
 * 기본 WooCommerce variation 동작을 오버라이드하여
 * 사이즈를 선택할 때마다 리스트에 추가되게 합니다.
 */
(function () {
  "use strict";

  // 페이지가 single product가 아니면 종료
  if (!document.querySelector(".single-product .variations_form")) return;

  const form = document.querySelector(".variations_form");
  const variationData = JSON.parse(form.dataset.product_variations || "[]");
  const summary = document.querySelector(".summary.entry-summary");

  // 선택된 아이템 저장소: { variationId: { name, price, qty, variationId } }
  let selectedItems = {};

  // UI 컨테이너 생성
  const listContainer = document.createElement("div");
  listContainer.className = "feedus-selected-items";
  listContainer.style.display = "none";

  const totalContainer = document.createElement("div");
  totalContainer.className = "feedus-selected-total";
  totalContainer.style.display = "none";

  // Add to cart 버튼 아래에 삽입
  const variationWrap = form.querySelector(".single_variation_wrap");
  if (variationWrap) {
    variationWrap.after(listContainer, totalContainer);
  }

  // variation 선택 이벤트 감지
  const selects = form.querySelectorAll(".variations select");

  selects.forEach(function (select) {
    select.addEventListener("change", function () {
      const val = this.value;
      if (!val) return;

      // 매칭되는 variation 찾기
      const attrName = this.dataset.attribute_name;
      const matched = variationData.find(function (v) {
        return v.attributes[attrName] === val;
      });

      if (!matched) return;

      // 이미 선택된 항목이면 수량 +1
      if (selectedItems[matched.variation_id]) {
        selectedItems[matched.variation_id].qty += 1;
      } else {
        selectedItems[matched.variation_id] = {
          name: val,
          price: matched.display_price,
          qty: 1,
          variationId: matched.variation_id,
        };
      }

      renderList();

      // 드롭다운을 초기값으로 리셋 (다음 선택을 위해)
      setTimeout(function () {
        select.value = "";
        // WooCommerce variation 이벤트 트리거
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }, 100);
    });
  });

  function renderList() {
    const keys = Object.keys(selectedItems);

    if (keys.length === 0) {
      listContainer.style.display = "none";
      totalContainer.style.display = "none";
      return;
    }

    listContainer.style.display = "flex";
    totalContainer.style.display = "flex";

    listContainer.innerHTML = "";

    keys.forEach(function (id) {
      var item = selectedItems[id];
      var el = document.createElement("div");
      el.className = "feedus-selected-item";

      el.innerHTML =
        '<div class="feedus-selected-item__info">' +
        '<span class="feedus-selected-item__name">' +
        escapeHtml(item.name) +
        "</span>" +
        '<span class="feedus-selected-item__price">' +
        formatPrice(item.price) +
        "</span>" +
        "</div>" +
        '<div class="feedus-selected-item__qty">' +
        '<button type="button" data-action="minus" data-id="' +
        id +
        '">-</button>' +
        "<span>" +
        item.qty +
        "</span>" +
        '<button type="button" data-action="plus" data-id="' +
        id +
        '">+</button>' +
        "</div>" +
        '<button type="button" class="feedus-selected-item__remove" data-id="' +
        id +
        '">&times;</button>';

      listContainer.appendChild(el);
    });

    // 이벤트 바인딩 (수량 +/-)
    listContainer.querySelectorAll("[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var id = this.dataset.id;
        var action = this.dataset.action;

        if (action === "plus") {
          selectedItems[id].qty += 1;
        } else if (action === "minus") {
          selectedItems[id].qty -= 1;
          if (selectedItems[id].qty <= 0) {
            delete selectedItems[id];
          }
        }

        renderList();
      });
    });

    // 이벤트 바인딩 (삭제)
    listContainer
      .querySelectorAll(".feedus-selected-item__remove")
      .forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          delete selectedItems[this.dataset.id];
          renderList();
        });
      });

    // 총합 계산
    var total = 0;
    var totalQty = 0;
    keys.forEach(function (id) {
      if (selectedItems[id]) {
        total += selectedItems[id].price * selectedItems[id].qty;
        totalQty += selectedItems[id].qty;
      }
    });

    totalContainer.innerHTML =
      "<span>" +
      totalQty +
      "\uac1c \uc0c1\ud488</span><span>" +
      formatPrice(total) +
      "</span>";
  }

  // Add to cart 오버라이드: 선택된 아이템들을 모두 장바구니에 추가
  form.addEventListener("submit", function (e) {
    var keys = Object.keys(selectedItems);
    if (keys.length === 0) return; // 기본 동작 유지

    e.preventDefault();

    var productId = form.querySelector('input[name="product_id"]').value;
    var promises = [];

    keys.forEach(function (id) {
      var item = selectedItems[id];
      var formData = new FormData();
      formData.append("add-to-cart", productId);
      formData.append("product_id", productId);
      formData.append("variation_id", item.variationId);
      formData.append("quantity", item.qty);

      // attribute 추가
      selects.forEach(function (select) {
        var attrName = select.name;
        formData.append(attrName, item.name);
      });

      promises.push(
        fetch(form.action, {
          method: "POST",
          body: formData,
          credentials: "same-origin",
        })
      );
    });

    Promise.all(promises)
      .then(function () {
        // 장바구니 추가 완료 후 페이지 새로고침 (WooCommerce 기본 동작 유지)
        window.location.reload();
      })
      .catch(function (err) {
        console.error("Cart add error:", err);
        window.location.reload();
      });
  });

  function formatPrice(price) {
    return (
      "\u20a9" + Number(price).toLocaleString("ko-KR")
    );
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
})();
