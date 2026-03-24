add_action('wp_head', function () {
    echo '<style id="feedus-multi-variation-fix">
    .variations_form .wc-multiple-variation-buttons { display: flex !important; gap: 10px; margin-top: 10px; }
    .variations_form .wc-locked-variations-container { display: block !important; margin-bottom: 15px; }
    .variations_form .wc-variation-mode-selector { display: none !important; }
    .variations_form .single_add_to_cart_button { display: none !important; }
    .variations_form .woocommerce-variation-add-to-cart > .quantity { display: none !important; }
    </style>';
});

add_action('wp_footer', function () {
    echo '<script>
    (function() {
        function fix() {
            var s = document.getElementById("wc_variation_mode");
            if (!s) return;
            s.value = "multiple";
            s.dispatchEvent(new Event("change", { bubbles: true }));
            var b = document.querySelector(".wc-multiple-variation-buttons");
            if (b) b.style.display = "flex";
            var c = document.querySelector(".wc-locked-variations-container");
            if (c) c.style.display = "block";
        }
        fix();
        if (typeof jQuery !== "undefined") {
            jQuery(function() { setTimeout(fix, 100); setTimeout(fix, 500); setTimeout(fix, 1000); });
        }
    })();
    </script>';
}, 999);
