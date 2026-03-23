# 브릭스빌더 - 상품 상세페이지 템플릿 세팅 가이드

레퍼런스: [Redbrick Coffee](https://redbrick.coffee/products/rebrick-canta-ranas-so)
좌측 이미지 Sticky + 우측 정보 스크롤 → 모바일 1컬럼 풀페이지 반응형

> 폰트, 컬러, 버튼 등 기본 스타일은 **FEEDUS 글로벌 CSS** 그대로 사용
> 브릭스 WooCommerce 전용 엘리먼트 적극 활용
> 이 가이드의 CSS는 상세페이지 전용 보조 스타일만

---

## 0단계: 템플릿 생성

1. **Bricks → Templates → Add New**
2. Template Type: **Single**
3. Conditions: `Product (Single)`
4. 에디터 열기

---

## 전체 페이지 구조

```
Section 1: 상품 메인 (2컬럼)
├── Container (Grid 1fr 1fr, feedus-no-padding)
│   ├── Div (좌측 - Sticky)
│   │   └── Product Gallery          ← 브릭스 우커머스 엘리먼트
│   │
│   └── Div (우측 - 스크롤)
│       ├── Product Meta              ← 카테고리 표시
│       ├── Product Title             ← 상품명 (H1)
│       ├── Product Price             ← 가격
│       ├── Product Short Description ← 짧은 설명
│       ├── Product Add to Cart       ← 옵션 + 수량 + 버튼 (올인원)
│       └── Div                       ← 픽업/배송 정보

Section 2: Origin 정보 (feedus-line)
└── Container (Grid 5컬럼)
    └── Producer / Region / Varietal / Processing / Altitude

Section 3: Related Products
└── Container
    ├── Heading + Shop 버튼
    └── Product Related               ← 브릭스 우커머스 엘리먼트

Section 4: Newsletter (bg-primary)
└── Container
    └── Form (이메일 + 버튼)
```

---

## Section 1: 상품 메인

### 1-1. Section

| 설정 | 값 |
|------|-----|
| Content Width | `100%` |
| Padding | `0` |
| CSS 클래스 | (없음 — 글로벌 `.brxe-section` 자동 적용) |

### 1-2. Container (2컬럼)

| 설정 | 값 |
|------|-----|
| Display | `Grid` |
| Grid Template Columns | `1fr 1fr` |
| Gap | `0px` |
| CSS 클래스 | `feedus-no-padding` (컨테이너 패딩 제거) |

> **반응형 태블릿 (≤991px)**: Grid Columns → `1fr`

### 1-3. 좌측 Div - 이미지 (Sticky)

| 설정 | 값 |
|------|-----|
| CSS 클래스 | `product-image-sticky` |

내부 엘리먼트:

| 엘리먼트 | **Product Gallery** |
|----------|---------------------|
| 설명 | 우커머스 갤러리 + 썸네일 슬라이더 자동 연동 |

> Sticky 동작은 CSS로 처리 (아래 CSS 파일 참고)
> 이미지에 `border-radius: 25px` 글로벌 스타일 자동 적용됨

### 1-4. 우측 Div - 상품 정보

| 설정 | 값 |
|------|-----|
| Display | `Flex` |
| Direction | `Column` |
| Padding | `40px` |
| CSS 클래스 | `product-info-col` |

이 Div 안에 **브릭스 WooCommerce 엘리먼트**들을 순서대로 배치:

---

#### 1. Product Meta (카테고리)

| 엘리먼트 | **Product Meta** |
|----------|-----------------|
| 표시 항목 | 카테고리만 ON (SKU, 태그 OFF) |

> 글로벌 CSS에서 `p, .brxe-text-basic` 스타일 자동 적용

#### 2. Product Title

| 엘리먼트 | **Product Title** |
|----------|------------------|
| HTML Tag | `H1` |

> 글로벌 h1 스타일 자동 적용:
> - 모바일 `40px` → 태블릿 `56px` → 데스크탑 `74px`
> - 색상: `var(--feedus-primary)` (#007D51)
> - Weight: `500`, Letter Spacing: `-0.05em`

상세페이지용으로 사이즈 조정 필요시 CSS 클래스 추가

#### 3. Product Price

| 엘리먼트 | **Product Price** |
|----------|------------------|

> 할인가 있으면 자동 취소선 표시
> 글로벌 `.woocommerce .price` → `color: var(--feedus-primary); font-weight: 600;`

#### 4. Product Short Description

| 엘리먼트 | **Product Short Description** |
|----------|------------------------------|

> 글로벌 `p` 스타일 자동: `18px, line-height: 150%, letter-spacing: -0.03em`

#### 5. Product Add to Cart (핵심!)

| 엘리먼트 | **Product Add to Cart** |
|----------|------------------------|

**자동 처리 항목:**
- 가변 상품 → Weight, Grind 등 **옵션 드롭다운 자동 생성**
- 수량 선택 (+/- 버튼)
- Add to Cart 버튼

> 글로벌 우커머스 오버라이드 자동 적용:
> - 버튼: `var(--feedus-primary)` 배경, pill 모양 (`50px` radius)
> - Input/Select: pill 스타일, 녹색 border
> - Hover: 배경 투명 + 녹색 텍스트

#### 6. 픽업/배송 정보 (수동)

- **Div** (Flex Row, Gap `8px`, Align Center)
  - **Icon**: 체크마크, Color `var(--feedus-primary)`
  - **Rich Text**: "Pickup available at **매장명**"

---

## Section 2: Origin 정보

커피 원두 상품 전용 — Producer / Region / Varietal / Processing / Altitude

### 2-1. Section

| 설정 | 값 |
|------|-----|
| CSS 클래스 | `feedus-line` (상단/하단 구분선) |

### 2-2. Container (5컬럼)

| 설정 | 값 |
|------|-----|
| Display | `Grid` |
| Grid Template Columns | `1fr 1fr 1fr 1fr 1fr` |
| Gap | `16px` |

또는 유틸리티 클래스 `feedus-grid feedus-grid-5` 사용

> **반응형**: 태블릿 `repeat(3, 1fr)`, 모바일 `1fr`

### 2-3. 각 컬럼

각각 **Div** (Flex Column):
- **Heading (H3)**: 라벨 (Producer, Region 등)
- **Basic Text**: 값 (ACF 필드 연동)

> 글로벌 h3 스타일: `20px, font-weight: 500, letter-spacing: -0.03em`
> 데스크탑에서만 H3 헤더 행 표시 → 모바일 숨김: `d-none d-md-block`

---

## Section 3: Related Products

### 3-1. 타이틀 영역

- **Div** (`feedus-section-title` 클래스)
  - **Heading H3**: "You may also like"
  - **Button** (`feedus-btn-arrow`): "shop [category]" → 링크

> `feedus-section-title` 글로벌 스타일 자동: flex space-between + 하단 border

### 3-2. 상품 영역

| 엘리먼트 | **Product Related** |
|----------|---------------------|

| 설정 | 값 |
|------|-----|
| Columns | `5` (데스크탑) |
| Posts per page | `8` |

> 글로벌 `.feedus-product-grid` 반응형 자동: 모바일 2컬럼, 태블릿 3컬럼, 데스크탑 5컬럼
> 상품 카드 이미지: `.feedus-image-product` → 1:1 정사각, contain, 25px radius

---

## Section 4: Newsletter

| 설정 | 값 |
|------|-----|
| CSS 클래스 | `bg-primary` 또는 `feedus-green-section` |

> 글로벌 녹색 섹션 스타일 자동 적용: 흰색 텍스트, 흰색 버튼

- **Heading**: "Subscribe to get 10% off."
- **Form**: 이메일 Input + Button (`feedus-btn-white`)

> 글로벌 Form 스타일 + `.feedus-btn-white` 자동 적용

---

## CSS 적용

`bricks-product-detail.css` — **글로벌에 없는 상세페이지 전용 스타일만**

적용 방법:
1. **브릭스 에디터** → Page Settings → Custom Code → CSS
2. **Bricks → Settings → Custom Code** (전역)
3. **자식 테마 style.css**에 `@import`

---

## 브릭스 WooCommerce 엘리먼트 요약

| 엘리먼트 | 용도 | 사용 |
|----------|------|------|
| Product Title | 상품명 | O |
| Product Price | 가격 (할인가 자동) | O |
| Product Short Description | 짧은 설명 | O |
| Product Description | 상세 설명 | △ |
| **Product Add to Cart** | **옵션+수량+버튼** | **O (핵심)** |
| **Product Gallery** | **이미지+갤러리** | **O** |
| Product Rating | 별점 | △ |
| Product Stock | 재고 상태 | △ |
| Product Meta | SKU, 카테고리, 태그 | O |
| Product Tabs | 설명/추가정보/리뷰 탭 | X |
| **Product Related** | **관련 상품** | **O** |
| Product Upsells | 업셀 상품 | △ |

---

## 글로벌 CSS에서 자동 적용되는 항목 (별도 설정 불필요)

| 항목 | 글로벌 값 |
|------|-----------|
| 폰트 | `omnigothic` (Adobe Fonts) |
| 브랜드 컬러 | `#007D51` |
| 버튼 | pill 스타일, 녹색 배경 + hover 투명 |
| Input/Select | pill 스타일, 녹색 border |
| 이미지 radius | `25px` |
| h1 크기 | `40px → 56px → 74px` (반응형) |
| 본문 크기 | `18px` |
| Line Height | `1.6` (body), `150%` (p) |
| Letter Spacing | `-0.03em` (body), `-0.05em` (headings) |
| Section 간격 | `0px` (풀페이지) |
| 컨테이너 패딩 | `20px → 30px → 40px` (반응형) |
| 우커머스 버튼 | 녹색 pill, hover 투명 |
