/**
 * Fix: "Add Multiple Variations to Cart" 플러그인 - 기본 모드를 Multiple로 설정
 *
 * 적용 위치: Bricks Builder > 페이지 설정 > Custom Scripts (Footer)
 * 또는 functions.php에서 wp_enqueue_script로 로드
 */
jQuery(function ($) {
    var $form = $('form.variations_form');
    if (!$form.length) return;

    var $modeSelect = $form.find('#wc_variation_mode');
    if (!$modeSelect.length) return;

    // 기본값을 "multiple"로 변경하고 change 이벤트 발생
    $modeSelect.val('multiple').trigger('change');
});
