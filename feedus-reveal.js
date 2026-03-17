/* ============================================
   FEEDUS - Scroll Reveal (IntersectionObserver)
   -------------------------------------------
   Bricks > 코드 스니펫 (JavaScript)에 추가

   사용법:
   요소에 클래스 추가:
   - .reveal        : 아래→위 떠오름 (기본)
   - .reveal-left   : 왼쪽→오른쪽
   - .reveal-right  : 오른쪽→왼쪽
   - .reveal-fade   : 페이드인만
   - .reveal-d1~d5  : 지연 (순차 등장)
   - .reveal-stagger: 부모에 추가 시 자식 .reveal 순차 등장
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  var targets = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-fade"
  );

  if (!targets.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // 한 번만 실행
        }
      });
    },
    {
      threshold: 0.15,  // 15% 보이면 트리거
      rootMargin: "0px 0px -60px 0px" // 하단 60px 여유
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
});
