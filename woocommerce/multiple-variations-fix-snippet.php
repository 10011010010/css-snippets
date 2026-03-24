<?php
/**
 * Fix: "Add Multiple Variations to Cart" 플러그인 버튼 표시
 * 적용: Code Snippets 플러그인에 붙여넣기 (프론트엔드에서만 실행)
 */
add_action('wp_footer', function () {
    if (!is_product()) return;
    ?>
    <style>
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

    /* 싱글 장바구니 버튼 숨김 */
    .variations_form .single_add_to_cart_button {
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

    <script>
    jQuery(function ($) {
        var $form = $('form.variations_form');
        if (!$form.length) return;

        var $modeSelect = $form.find('#wc_variation_mode');
        if (!$modeSelect.length) return;

        $modeSelect.val('multiple').trigger('change');
    });
    </script>
    <?php
});
