// ハンバーガーメニューの開閉
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".header__hamburger");
  const nav = document.querySelector(".header__nav");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("is-open");
  });

  // メニュー内のリンクをタップしたら閉じる
  nav.querySelectorAll(".header__nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-active");
      nav.classList.remove("is-open");
    });
  });
});
