# 브릭스빌더 - 상품 상세페이지 세팅 가이드

레퍼런스: Redbrick Coffee 스타일 (이미지 좌측 + 정보 우측 2컬럼)

---

## 브릭스빌더 엘리먼트 구조

```
Section (product-detail-section)
└── Container (product-detail-wrap)
    ├── Div (product-image-col)          ← 좌측 컬럼
    │   └── Image                        ← 상품 이미지
    │
    └── Div (product-info-col)           ← 우측 컬럼
        ├── Basic Text (product-category)    ← "Merch"
        ├── Heading (product-title)          ← "MUGSHOT TEA TOWEL"
        ├── Basic Text (product-price)       ← "₩27,000"
        ├── Rich Text (product-description)  ← 상품 설명
        ├── Rich Text (product-specs)        ← Material, Dimensions
        ├── Basic Text (product-quantity-label) ← "Quantity"
        ├── Div (product-quantity-wrap)       ← 수량 선택 영역
        │   ├── Button (-)
        │   ├── Input (number)
        │   └── Button (+)
        ├── Button (product-add-to-cart)     ← "Add to cart"
        └── Div (product-pickup-info)        ← 픽업 정보
```

---

## 세팅 순서

### 1단계: Section 추가
1. 브릭스 에디터에서 **Section** 추가
2. CSS 클래스: `product-detail-section`
3. Layout → Max Width: `1200px`, Margin: `0 auto`

### 2단계: Container (2컬럼 레이아웃)
1. Section 안에 **Container** 추가
2. CSS 클래스: `product-detail-wrap`
3. Layout → Display: `Grid`
4. Grid Template Columns: `1fr 1fr`
5. Gap: `60px`

### 3단계: 좌측 - 상품 이미지
1. Container 안에 **Div** 추가 → 클래스: `product-image-col`
2. Div 안에 **Image** 엘리먼트 추가
3. 이미지 설정:
   - Width: `100%`
   - Object Fit: `Cover`
   - WooCommerce 연동 시: Dynamic Data → Product Image

### 4단계: 우측 - 상품 정보
1. Container 안에 두 번째 **Div** 추가 → 클래스: `product-info-col`
2. Layout → Display: `Flex`, Direction: `Column`, Gap: `16px`

### 5단계: 상품 정보 요소들 (우측 Div 내부)

#### 카테고리
- **Basic Text** → 클래스: `product-category`
- Content: "Merch" (또는 Dynamic Data → Product Category)
- Typography: 14px, uppercase, color #999

#### 상품명
- **Heading (H1)** → 클래스: `product-title`
- Content: Dynamic Data → Product Title
- Typography: 42px, bold, uppercase

#### 가격
- **Basic Text** → 클래스: `product-price`
- Content: Dynamic Data → Product Price
- Typography: 18px

#### 상품 설명
- **Rich Text** → 클래스: `product-description`
- Content: Dynamic Data → Product Short Description
- Typography: 16px, line-height 1.6

#### 스펙 (Material, Dimensions)
- **Rich Text** → 클래스: `product-specs`
- 직접 입력 또는 ACF/메타필드 연동

#### 수량 선택
- **Basic Text** "Quantity" → 클래스: `product-quantity-label`
- **Div** → 클래스: `product-quantity-wrap`
  - 내부에 Button(-), Input(number), Button(+) 배치
  - 또는 WooCommerce 기본 수량 위젯 사용

#### Add to Cart 버튼
- **Button** → 클래스: `product-add-to-cart`
- Text: "Add to cart"
- Background: `#e53935`
- WooCommerce 연동 시: Add to Cart 엘리먼트 사용

#### 픽업 정보
- **Div** → 클래스: `product-pickup-info`
- 내부에 Icon(체크) + Text 배치

---

## CSS 적용 방법

### 방법 1: 브릭스 에디터 내 적용
1. 브릭스 에디터 → Page Settings (톱니바퀴)
2. Custom Code → CSS 탭
3. `bricks-product-detail.css` 내용 붙여넣기

### 방법 2: 전역 CSS로 적용
1. Bricks → Settings → Custom Code
2. CSS 섹션에 붙여넣기 (모든 상품 페이지에 적용)

### 방법 3: 자식 테마 style.css
```css
@import url('bricks-product-detail.css');
```

---

## WooCommerce 연동 팁

| 요소 | Dynamic Data 태그 |
|------|-------------------|
| 상품 이미지 | `{woo_product_image}` |
| 상품명 | `{post_title}` |
| 가격 | `{woo_product_price}` |
| 짧은 설명 | `{woo_product_excerpt}` |
| 카테고리 | `{woo_product_terms_product_cat}` |

---

## 반응형 설정

- **태블릿 (768px 이하)**: 1컬럼으로 전환, 이미지가 위 / 정보가 아래
- **모바일**: 타이틀 28px로 축소, 패딩 조정
- CSS에 미디어쿼리 포함되어 있으므로 별도 설정 불필요
