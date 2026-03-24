add_action('wp_head', function () {
    if (!is_singular('product')) return;
    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-variation-mode-selector { display: none !important; }
    .variations_form .single_add_to_cart_button { display: none !important; }
    </style>';
});

add_action('wp_footer', function () {
    if (!is_singular('product')) return;
    echo '<script>
    jQuery(function($) {
        function init() {
            var $form = $("form.variations_form");
            var $mode = $("#wc_variation_mode");
            if (!$form.length || !$mode.length) return;

            if ($mode.val() !== "multiple") {
                $mode.val("multiple").trigger("change");
            }

            var $btns = $(".wc-multiple-variation-buttons");
            if ($btns.length && $btns.is(":hidden")) {
                $form.trigger("check_variations");
                $form.trigger("wc_variation_form");
                setTimeout(function() {
                    $("#wc_variation_mode").val("multiple").trigger("change");
                }, 300);
            }
        }

        setTimeout(init, 1000);
        setTimeout(init, 2000);
        setTimeout(init, 4000);
        setTimeout(init, 6000);

        $(document.body).on("wc_variation_form added_to_cart", init);
    });
    </script>';
}, 999);
