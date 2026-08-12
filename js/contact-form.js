// Contactフォームの送信をGoogleフォームへ送る(no-cors経由)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/1FAIpQLSdejsBSCDLkiFnld3nu-hHv5-hGcPY8k1tJZ8URhrxAOLmsug/formResponse";

  const statusEl = document.getElementById("contactStatus");
  const submitBtn = form.querySelector(".contact__submit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    submitBtn.disabled = true;
    statusEl.textContent = "送信中です…";
    statusEl.classList.remove("is-error");

    fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      mode: "no-cors", // Googleフォームの仕様上、no-corsでしかアクセスできない
      body: formData,
    })
      .then(() => {
        // no-corsのためレスポンス内容は確認できない。
        // fetchが例外を投げなければ成功とみなす
        statusEl.textContent = "送信しました。ありがとうございます。";
        form.reset();
      })
      .catch(() => {
        statusEl.textContent =
          "送信に失敗しました。時間をおいて再度お試しください。";
        statusEl.classList.add("is-error");
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
});