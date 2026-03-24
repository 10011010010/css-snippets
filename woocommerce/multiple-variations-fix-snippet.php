add_action('wp_head', function () {
    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-multiple-variation-buttons { display: flex !important; gap: 10px; margin-top: 10px; }
    .variations_form .wc-locked-variations-container { display: block !important; margin-bottom: 15px; }
    .variations_form .wc-variation-mode-selector { display: none !important; }
    .variations_form .single_add_to_cart_button { display: none !important; }
    </style>';
});

add_action('wp_footer', function () {
    echo '<script>
    (function() {
        function fix() {
            if (typeof jQuery === "undefined") return;
            var $ = jQuery;
            var $mode = $("#wc_variation_mode");
            if (!$mode.length || $mode.val() === "multiple") return;
            $mode.val("multiple").trigger("change");
        }
        if (typeof jQuery !== "undefined") {
            jQuery(function() {
                setTimeout(fix, 200);
                setTimeout(fix, 600);
                setTimeout(fix, 1200);
                jQuery("form.variations_form").on("wc_variation_form show_variation", fix);
            });
        }
    })();
    </script>';
}, 999);
