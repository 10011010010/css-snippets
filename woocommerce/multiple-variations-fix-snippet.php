// 1) 플러그인 JS/CSS 강제 로드 (조건 체크 없이)
add_action('wp_enqueue_scripts', function () {
    $plugin_url = content_url('/plugins/add-multiple-variations-to-cart/front/');

    if (!wp_style_is('wc-variation-lock-style', 'enqueued')) {
        wp_enqueue_style('wc-variation-lock-style', $plugin_url . 'wc-variation-lock.css');
    }

    if (!wp_script_is('elt_datatables121212', 'enqueued')) {
        wp_enqueue_script('elt_datatables121212', $plugin_url . 'datatables.min.js', array('jquery'), '1.0', true);
    }

    if (!wp_script_is('wc-variation-lock-script', 'enqueued')) {
        wp_enqueue_script('wc-variation-lock-script', $plugin_url . 'wc-variation-lock.js', array('jquery', 'wc-add-to-cart-variation'), '1.0', true);
        wp_localize_script('wc-variation-lock-script', 'wc_variation_lock_params', array(
            'ajax_url'          => admin_url('admin-ajax.php'),
            'check_stock_nonce' => wp_create_nonce('check_stock_nonce'),
            'max_allowed'       => '20',
            'currency_symbol'   => get_woocommerce_currency_symbol(),
        ));
    }
}, 20);

// 2) CSS + JS
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
        function switchMode() {
            var $mode = $("#wc_variation_mode");
            if ($mode.length && $mode.val() !== "multiple") {
                $mode.val("multiple").trigger("change");
            }
        }
        $form.on("wc_variation_form", switchMode);
        setTimeout(switchMode, 500);
        setTimeout(switchMode, 1500);
        setTimeout(switchMode, 3000);
    });
    </script>';
}, 999);
