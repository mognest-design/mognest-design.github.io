// 見出しを1文字ずつフェードで表示させる(汎用版)
// class="js-heading-split" が付いた見出しなら、いくつでも同じ動きを適用できる
document.addEventListener("DOMContentLoaded", () => {
  // 文字ごとの「出現方向」パターン。文字数が多くても、このパターンを繰り返し使う
  const directionPatterns = [
    { x: 0, y: 20 },   // 下から
    { x: 50, y: 0 },   // 右から
    { x: 0, y: 0 },    // その場でふわっと
    { x: -50, y: 0 },  // 左から
    { x: 0, y: 20 },   // 下から
  ];

  const headings = document.querySelectorAll(".js-heading-split");

  headings.forEach((heading) => {
    const text = heading.textContent.trim();
    // section が無いページ(works.htmlなど)では main、それも無ければ親要素にフォールバック
    const target =
      heading.closest("section") ||
      heading.closest("main") ||
      heading.parentElement;

    heading.textContent = "";

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("split-char");

      // 文字数がdirectionPatternsより多くても、余りで繰り返し割り当てる
      const dir = directionPatterns[index % directionPatterns.length];
      span.style.setProperty("--char-x", `${dir.x}px`);
      span.style.setProperty("--char-y", `${dir.y}px`);
      span.style.animationDelay = `${index * 0.1}s`;

      heading.appendChild(span);
    });

    if (!target) return;

    // この見出しを含む要素が画面に入ったら再生する(早めに反応するようthresholdを下げる)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            target.classList.add("is-visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 150px 0px" }
    );

    observer.observe(target);
  });
});