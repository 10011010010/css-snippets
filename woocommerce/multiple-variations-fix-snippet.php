/**
 * Fix: "Add Multiple Variations to Cart" 플러그인 버튼 표시
 *
 * Code Snippets 플러그인에 붙여넣기
 * 실행 위치: "Only run on the front-end" 선택
 *
 * 주의: <?php 태그 없이 이 내용만 붙여넣으세요
 */

add_action('wp_footer', function () {
    if (!is_product()) return;
    ?>
    <style id="feedus-multi-variation-fix">
    /* 멀티플 버튼 강제 표시 */
    .variations_form .wc-multiple-variation-buttons {
        display: flex !important;
        gap: 10px;
        margin-top: 10px;
    }

    /* 선택된 변형 목록 영역 표시 */
    .variations_form .wc-locked-variations-container {
        display: block !important;
        margin-bottom: 15px;
    }

    /* 모드 셀렉터 숨김 (항상 멀티플 모드) */
    .variations_form .wc-variation-mode-selector {
        display: none !important;
    }

    /* 싱글 장바구니 버튼 + 수량 숨김 */
    .variations_form .single_add_to_cart_button,
    .variations_form .woocommerce-variation-add-to-cart > .quantity {
        display: none !important;
    }

    /* 멀티플 버튼 공통 스타일 */
    .variations_form .wc-lock-variation-btn,
    .variations_form .wc-add-locked-to-cart {
        flex: 1;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        border-radius: var(--feedus-border-radius, 25px);
        cursor: pointer;
        transition: all var(--feedus-duration-default, 0.2s) ease;
    }

    /* Add to List 버튼 */
    .variations_form .wc-lock-variation-btn {
        background-color: var(--feedus-gray-light, #f2f2f2);
        color: var(--feedus-black, #1a1a1a);
        border: 1px solid var(--bricks-border-color, #dddedf);
    }
    .variations_form .wc-lock-variation-btn:hover {
        background-color: var(--bricks-border-color, #dddedf);
    }

    /* Add All to Cart 버튼 */
    .variations_form .wc-add-locked-to-cart {
        background-color: var(--feedus-primary, #007D51);
        color: var(--feedus-white, #ffffff);
        border: none;
    }
    .variations_form .wc-add-locked-to-cart:hover {
        background-color: var(--feedus-primary-hover, rgba(0, 125, 81, 0.8));
    }
    </style>

    <script id="feedus-multi-variation-fix-js">
    (function() {
        function forceMultipleMode() {
            var modeSelect = document.getElementById('wc_variation_mode');
            if (!modeSelect) return;

            // 모드를 multiple로 강제 변경
            modeSelect.value = 'multiple';

            // change 이벤트 발생 (플러그인 JS가 감지하도록)
            modeSelect.dispatchEvent(new Event('change', { bubbles: true }));

            // 플러그인 JS가 이벤트를 무시할 경우 직접 DOM 조작
            var btns = document.querySelector('.wc-multiple-variation-buttons');
            if (btns) btns.style.display = 'flex';

            var container = document.querySelector('.wc-locked-variations-container');
            if (container) container.style.display = 'block';
        }

        // 즉시 실행
        forceMultipleMode();

        // DOM 로드 후 실행
        document.addEventListener('DOMContentLoaded', forceMultipleMode);

        // jQuery ready 후 실행 (플러그인 JS보다 늦게)
        if (typeof jQuery !== 'undefined') {
            jQuery(function($) {
                setTimeout(forceMultipleMode, 100);
                setTimeout(forceMultipleMode, 500);
                setTimeout(forceMultipleMode, 1000);

                // WooCommerce variations loaded 이벤트 감지
                $('form.variations_form').on('wc_variation_form', forceMultipleMode);
                $('form.variations_form').on('show_variation', forceMultipleMode);
            });
        }
    })();
    </script>
    <?php
}, 999);
