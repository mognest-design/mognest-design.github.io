// クリックした画像を、モーダルで拡大表示する
document.addEventListener("DOMContentLoaded", () => {
  const zoomableImage = document.getElementById("zoomableImage");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");

  // このページに拡大対象の画像がなければ、何もしない
  if (!zoomableImage || !modal) return;

  // 画像をクリックしたらモーダルを開く
  zoomableImage.addEventListener("click", () => {
    modalImage.src = zoomableImage.src; // 同じ画像を大きく表示
    modal.classList.add("is-open");
  });

  // ×ボタンで閉じる
  modalClose.addEventListener("click", () => {
    modal.classList.remove("is-open");
  });

  // 背景(黒い部分)をクリックしても閉じる
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("is-open");
    }
  });
});