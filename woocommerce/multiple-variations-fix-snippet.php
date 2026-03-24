/**
 * Fix: "Add Multiple Variations to Cart" 플러그인 버튼 표시
 *
 * Code Snippets 플러그인에 이 내용만 붙여넣기 (<?php 태그 없이)
 * 실행 위치: "Only run on the front-end" 선택
 */

add_action('wp_footer', function () {
    if (!is_product()) return;

    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-multiple-variation-buttons {
        display: flex !important;
        gap: 10px;
        margin-top: 10px;
    }
    .variations_form .wc-locked-variations-container {
        display: block !important;
        margin-bottom: 15px;
    }
    .variations_form .wc-variation-mode-selector {
        display: none !important;
    }
    .variations_form .single_add_to_cart_button,
    .variations_form .woocommerce-variation-add-to-cart > .quantity {
        display: none !important;
    }
    .variations_form .wc-lock-variation-btn,
    .variations_form .wc-add-locked-to-cart {
        flex: 1;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        border-radius: var(--feedus-border-radius, 25px);
        cursor: pointer;
    }
    .variations_form .wc-lock-variation-btn {
        background-color: var(--feedus-gray-light, #f2f2f2);
        color: var(--feedus-black, #1a1a1a);
        border: 1px solid var(--bricks-border-color, #dddedf);
    }
    .variations_form .wc-add-locked-to-cart {
        background-color: var(--feedus-primary, #007D51);
        color: var(--feedus-white, #ffffff);
        border: none;
    }
    </style>';

    echo '<script id="feedus-multi-variation-fix-js">
    (function() {
        function forceMultipleMode() {
            var modeSelect = document.getElementById("wc_variation_mode");
            if (!modeSelect) return;
            modeSelect.value = "multiple";
            modeSelect.dispatchEvent(new Event("change", { bubbles: true }));
            var btns = document.querySelector(".wc-multiple-variation-buttons");
            if (btns) btns.style.display = "flex";
            var container = document.querySelector(".wc-locked-variations-container");
            if (container) container.style.display = "block";
        }
        forceMultipleMode();
        document.addEventListener("DOMContentLoaded", forceMultipleMode);
        if (typeof jQuery !== "undefined") {
            jQuery(function($) {
                setTimeout(forceMultipleMode, 100);
                setTimeout(forceMultipleMode, 500);
                setTimeout(forceMultipleMode, 1000);
                $("form.variations_form").on("wc_variation_form show_variation", forceMultipleMode);
            });
        }
    })();
    </script>';
}, 999);
