# Bricks Builder - Responsive Product Carousel

브릭스빌더 Products 요소를 반응형 캐러셀로 변환하는 CSS + JS 스니펫.

## 기능

- 반응형 썸네일 갯수 자동 조절 (항상 1줄 유지)
- 좌/우 화살표로 스크롤
- 터치 스와이프 지원 (모바일)
- 끝 도달 시 화살표 자동 숨김

## 반응형 브레이크포인트

| 화면 크기 | 표시 갯수 |
|-----------|-----------|
| 1200px+   | 5개       |
| 992~1199px| 4개       |
| 768~991px | 3개       |
| ~767px    | 2개       |

## 적용 방법

### 1단계: Products 요소에 클래스 추가

Bricks 편집기에서 Products 요소 선택 → Style → CSS Classes에 `product-carousel` 입력

### 2단계: CSS 추가

**방법 A** — Bricks > Settings > Custom Code > CSS:
`product-carousel.css` 내용 전체 붙여넣기

**방법 B** — 자식테마 `style.css`에 추가

### 3단계: JS 추가

**방법 A** — Bricks > Settings > Custom Code > Body (footer) Scripts:
```html
<script src="/wp-content/themes/your-child-theme/js/product-carousel.js"></script>
```

**방법 B** — `functions.php`에 등록:
```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'product-carousel',
        get_stylesheet_directory_uri() . '/js/product-carousel.js',
        [],
        '1.0',
        true
    );
});
```

## 커스터마이징

- **갯수 변경**: CSS 미디어쿼리의 `width: calc(...)` 분모 수정
- **간격 변경**: `.products`의 `gap` 값과 `calc()` 내 gap 합계 동시 수정
- **화살표 디자인**: `.carousel-arrow` 스타일 수정
- **브레이크포인트**: 미디어쿼리 값을 Bricks 설정에 맞게 조정
