# 브릭스빌더 - 상품 상세페이지 템플릿 세팅 가이드

레퍼런스: Redbrick Coffee 스타일 (이미지 좌측 + 정보 우측 2컬럼)

> 브릭스 엘리먼트 UI 설정 위주로 레이아웃을 잡고, CSS는 최소한만 사용

---

## 0단계: WooCommerce 싱글 프로덕트 템플릿 생성

1. **Bricks → Templates → Add New**
2. Template Type: **WooCommerce → Single Product**
3. Conditions: `Product (Single)` → 전체 상품에 적용
4. 에디터 열기

---

## 엘리먼트 구조

```
Section
└── Container (Grid 1fr 1fr)
    ├── Div                              ← 좌측: 이미지
    │   └── Product Gallery / Image
    │
    └── Div (Flex Column)                ← 우측: 상품 정보
        ├── Basic Text                   ← 카테고리 (Merch)
        ├── Heading H1                   ← 상품명
        ├── Basic Text                   ← 가격
        ├── Rich Text                    ← 상품 설명
        ├── Rich Text                    ← 스펙 (Material, Dimensions)
        ├── Add To Cart (우커머스)        ← 수량 + 장바구니 버튼
        └── Div                          ← 픽업/배송 정보
```

---

## 세팅 순서

### 1단계: Section

| 설정 항목 | 값 |
|-----------|-----|
| Layout → Content Width | `1200px` |
| Layout → Padding | 상하 `40px`, 좌우 `20px` |

### 2단계: Container (2컬럼)

| 설정 항목 | 값 |
|-----------|-----|
| Layout → Display | `Grid` |
| Grid Template Columns | `1fr 1fr` |
| Gap | `60px` |
| Align Items | `Start` |

> **반응형**: 태블릿 브레이크포인트에서 Columns를 `1fr`로 변경, Gap `30px`

### 3단계: 좌측 Div - 상품 이미지

1. Container 안에 **Div** 추가
2. 내부에 엘리먼트 배치:

| 방법 | 엘리먼트 | 설명 |
|------|----------|------|
| A (추천) | **Product Gallery** | 우커머스 갤러리 자동 연동, 썸네일 포함 |
| B | **Image** + Dynamic Data | Image 클릭 → Content에 `{featured_image}` 선택 |

Image 사용 시 설정:

| 설정 항목 | 값 |
|-----------|-----|
| Style → Width | `100%` |
| Style → Object Fit | `Cover` |

### 4단계: 우측 Div - 상품 정보

1. Container 안에 두 번째 **Div** 추가
2. 레이아웃 설정:

| 설정 항목 | 값 |
|-----------|-----|
| Layout → Display | `Flex` |
| Layout → Direction | `Column` |
| Layout → Gap | `16px` |

이 Div 안에 아래 엘리먼트들을 순서대로 배치:

---

#### 4-1. 카테고리 라벨

- 엘리먼트: **Basic Text**
- Content → Dynamic Data: `{woo_product_terms_product_cat}`

| 설정 항목 | 값 |
|-----------|-----|
| Typography → Size | `14px` |
| Typography → Transform | `Uppercase` |
| Typography → Letter Spacing | `1px` |
| Typography → Color | `#999` |

#### 4-2. 상품명

- 엘리먼트: **Heading** (H1)
- Content → Dynamic Data: `{post_title}`

| 설정 항목 | 값 |
|-----------|-----|
| Typography → Size | `42px` |
| Typography → Weight | `700` |
| Typography → Line Height | `1.1` |
| Typography → Transform | `Uppercase` |
| Typography → Color | `#000` |

> **반응형**: 모바일에서 `28px`로 변경

#### 4-3. 가격

- 엘리먼트: **Basic Text**
- Content → Dynamic Data: `{woo_product_price}`

| 설정 항목 | 값 |
|-----------|-----|
| Typography → Size | `18px` |
| Typography → Color | `#000` |

#### 4-4. 상품 설명

- 엘리먼트: **Rich Text**
- Content → Dynamic Data: `{woo_product_excerpt}`

| 설정 항목 | 값 |
|-----------|-----|
| Typography → Size | `16px` |
| Typography → Line Height | `1.6` |
| Typography → Color | `#333` |

#### 4-5. 스펙 정보 (Material, Dimensions 등)

- 엘리먼트: **Rich Text**
- Content: 직접 입력 또는 ACF 필드 연동 `{acf_material}` 등

| 설정 항목 | 값 |
|-----------|-----|
| Typography → Size | `15px` |
| Typography → Line Height | `1.8` |
| Typography → Color | `#333` |

#### 4-6. 수량 + Add to Cart

- 엘리먼트: **Add To Cart** (Bricks 우커머스 엘리먼트)
- 브릭스가 수량 입력 + 버튼을 자동 생성

버튼 스타일 설정:

| 설정 항목 | 값 |
|-----------|-----|
| Style → Background | `#e53935` |
| Style → Background (Hover) | `#c62828` |
| Style → Typography Color | `#fff` |
| Style → Width | `100%` |
| Style → Padding | `16px` |
| Style → Typography Size | `16px` |
| Style → Typography Weight | `600` |
| Style → Border | `none` |

#### 4-7. 픽업/배송 정보

- 엘리먼트: **Div** (Flex Row, Gap 8px)
  - **Icon** → 체크마크, Color `#4caf50`
  - **Rich Text** → 픽업 가능 매장 정보

---

## WooCommerce Dynamic Data 참고

| 용도 | Dynamic Data 태그 |
|------|-------------------|
| 상품 이미지 | `{featured_image}` |
| 상품 갤러리 | Product Gallery 엘리먼트 사용 |
| 상품명 | `{post_title}` |
| 가격 | `{woo_product_price}` |
| 짧은 설명 | `{woo_product_excerpt}` |
| 카테고리 | `{woo_product_terms_product_cat}` |

---

## 반응형 설정 (브릭스 UI에서 직접)

| 브레이크포인트 | 변경 사항 |
|---------------|-----------|
| 태블릿 (≤991px) | Container: Grid Columns → `1fr`, Gap → `30px` |
| 모바일 (≤768px) | 상품명: Font Size → `28px` |
| 모바일 (≤768px) | Section: Padding → `20px 16px` |

> 브릭스 에디터 상단의 반응형 아이콘 클릭 → 해당 브레이크포인트에서 값 변경
