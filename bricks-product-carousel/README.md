# Bricks Builder - Splide Product Carousel

Splide.js 기반 반응형 상품 캐러셀. Products 요소에 클래스만 추가하면 동작.

## 왜 Splide?

- **~12KB gzip** (Swiper 40KB의 1/3)
- 의존성 제로 (jQuery 불필요)
- 반응형 breakpoints, 화살표, 드래그 내장
- WAI-ARIA 접근성 기본 지원

## 반응형 브레이크포인트

| 화면 크기 | 표시 갯수 |
|-----------|-----------|
| 1200px+   | 5개       |
| 992~1199px| 4개       |
| 768~991px | 3개       |
| ~767px    | 2개       |

## 적용 방법

### 1단계: Splide CDN 로드

Bricks > Settings > Custom Code > **Header Scripts**:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/css/splide-core.min.css">
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/js/splide.min.js"></script>
```

> `splide-core.min.css`는 최소한의 기능 CSS만 포함 (~2KB). 화살표/페이지네이션 디자인은 `product-carousel.css`에서 커스텀.

### 2단계: Products 요소에 클래스 추가

Bricks 편집기 → Products 요소 선택 → CSS Classes에 `product-carousel` 입력

### 3단계: 커스텀 CSS/JS 추가

**CSS** → Bricks > Settings > Custom Code > CSS에 `product-carousel.css` 붙여넣기

**JS** → Body (footer) Scripts 또는 `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script(
        'product-carousel',
        get_stylesheet_directory_uri() . '/js/product-carousel.js',
        ['splide'],  // Splide 로드 후 실행
        '1.0',
        true
    );
});
```

## 커스터마이징

- **갯수 변경**: JS의 `perPage` 및 `breakpoints` 값 수정
- **간격 변경**: JS의 `gap` 값 수정
- **화살표 디자인**: CSS의 `.splide__arrow` 수정
- **자동 재생**: JS 옵션에 `autoplay: true, interval: 3000` 추가
- **무한 루프**: JS 옵션에서 `type: "loop"` 으로 변경
