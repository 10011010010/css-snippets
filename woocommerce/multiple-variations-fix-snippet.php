add_action('wp_head', function () {
    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-variation-mode-selector { display: none !important; }
    .variations_form .single_add_to_cart_button { display: none !important; }
    </style>';
});

add_action('wp_footer', function () {
    echo '<script>
    jQuery(function($) {
        var $form = $("form.variations_form");
        if (!$form.length) return;

        $form.on("wc_variation_form", function() {
            var $mode = $("#wc_variation_mode");
            if ($mode.length && $mode.val() !== "multiple") {
                $mode.val("multiple").trigger("change");
            }
        });

        // fallback
        setTimeout(function() {
            var $mode = $("#wc_variation_mode");
            if ($mode.length && $mode.val() !== "multiple") {
                $mode.val("multiple").trigger("change");
            }
        }, 2000);
    });
    </script>';
}, 999);
