add_action('wp_head', function () {
    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-multiple-variation-buttons { display: flex !important; gap: 10px; margin-top: 10px; }
    .variations_form .wc-locked-variations-container { display: block !important; margin-bottom: 15px; }
    .variations_form .single_add_to_cart_button { display: none !important; }
    </style>';
});

add_action('wp_footer', function () {
    echo '<script>
    jQuery(function($) {
        var $form = $("form.variations_form");
        if (!$form.length) return;

        function switchMode() {
            var $mode = $("#wc_variation_mode");
            if (!$mode.length) return;
            if ($mode.val() !== "multiple") {
                $mode.val("multiple").trigger("change");
            }
        }

        $form.on("wc_variation_form", switchMode);
        setTimeout(switchMode, 300);
        setTimeout(switchMode, 1000);
        setTimeout(switchMode, 2000);
        setTimeout(switchMode, 3000);
    });
    </script>';
}, 999);
