<?php
/**
 * WordPress 유지보수 모드 (Maintenance Mode)
 *
 * 사용법: functions.php 또는 Code Snippets 플러그인에 추가
 *
 * - 로그인한 사용자(관리자)는 정상적으로 사이트 이용 가능
 * - 비로그인 사용자는 /maintenance 페이지로 리디렉션
 * - wp-login.php, wp-admin, REST API, AJAX는 리디렉션 제외
 */

add_action('template_redirect', function() {
    // 로그인한 사용자는 통과
    if (is_user_logged_in()) {
        return;
    }

    // maintenance 페이지 자체는 통과 (무한 루프 방지)
    if (is_page('maintenance')) {
        return;
    }

    // 로그인 페이지, 관리자 페이지, REST API, AJAX 요청은 통과
    if (
        is_admin() ||
        (defined('DOING_AJAX') && DOING_AJAX) ||
        (defined('REST_REQUEST') && REST_REQUEST)
    ) {
        return;
    }

    // 나머지는 maintenance 페이지로 리디렉션
    wp_redirect(home_url('/maintenance'));
    exit;
});
