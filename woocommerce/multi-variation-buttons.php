<?php
/**
 * Fix: "Add Multiple Variations to Cart" 플러그인 - 모바일 버튼 표시 문제
 *
 * 문제: 모바일에서 싱글 버튼(장바구니담기)은 CSS로 숨겼는데,
 *       멀티플 버튼(Add to List / Add All to Cart)은 플러그인 JS가
 *       Bricks Builder 환경에서 렌더링하지 못해 버튼이 아예 없음.
 *
 * 해결:
 *   1. 싱글 버튼을 무조건 숨기지 않음 (폴백으로 항상 보이게)
 *   2. JS가 멀티플 버튼 존재를 확인한 후에만 싱글 버튼을 숨김
 *   3. 멀티플 버튼이 없으면 싱글 버튼이 그대로 표시됨
 *
 * 적용 위치: functions.php 또는 Code Snippets 플러그인
 */

// 모드 셀렉터 숨김 CSS (wp_head)
add_action('wp_head', function () {
    if (!is_singular('product')) return;
    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-variation-mode-selector { display: none !important; }
    </style>';
});

// 멀티플 모드 강제 활성화 + 버튼 존재 확인 (wp_footer)
add_action('wp_footer', function () {
    if (!is_singular('product')) return;
    ?>
    <script id="feedus-multi-variation-js">
    jQuery(function($) {
        function initMultiVariation() {
            var $form = $("form.variations_form");
            if (!$form.length) return;

            var $mode = $form.find("#wc_variation_mode");
            if (!$mode.length) return;

            // 멀티플 모드로 전환
            if ($mode.val() !== "multiple") {
                $mode.val("multiple").trigger("change");
            }

            // 멀티플 버튼이 존재하고 보이는지 확인
            var $multiBtns = $form.find(".wc-multiple-variation-buttons");
            if ($multiBtns.length && $multiBtns.children().length > 0) {
                // 멀티플 버튼이 있으면 싱글 버튼 숨김
                $("body").addClass("has-multi-variation-btns");
                $multiBtns.css("display", "flex");
            } else {
                // 멀티플 버튼이 없으면 싱글 버튼 표시 (폴백)
                $("body").removeClass("has-multi-variation-btns");
                $form.find(".single_add_to_cart_button").css("display", "");
            }

            // 숨겨진 멀티플 버튼 재시도
            if ($multiBtns.length && $multiBtns.is(":hidden")) {
                $form.trigger("check_variations");
                $form.trigger("wc_variation_form");
                setTimeout(function() {
                    $mode.val("multiple").trigger("change");
                    // 재시도 후 다시 확인
                    if ($multiBtns.children().length > 0) {
                        $("body").addClass("has-multi-variation-btns");
                        $multiBtns.css("display", "flex");
                    }
                }, 300);
            }
        }

        // 점진적 재시도 (Bricks Builder 비동기 렌더링 대응)
        setTimeout(initMultiVariation, 500);
        setTimeout(initMultiVariation, 1500);
        setTimeout(initMultiVariation, 3000);
        setTimeout(initMultiVariation, 5000);

        // WooCommerce 이벤트 리스너
        $(document.body).on("wc_variation_form added_to_cart", initMultiVariation);
    });
    </script>
    <?php
}, 999);
