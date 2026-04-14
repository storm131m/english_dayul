/* ===== English Dayul Landing — app.js =====
 * 역할:
 *  1) data/content.json 로드 → data-key 바인딩 (텍스트 교체 용이)
 *  2) QR 채널 추적(UTM) — URL 파라미터 세션 저장
 *
 * 상담은 전화·카카오톡으로 직접 연결하므로 폼/백엔드 없음.
 */

(function () {
  "use strict";

  // ---------- 1. JSON 콘텐츠 바인딩 ----------
  function applyContent(data) {
    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      const value = key.split(".").reduce((o, k) => (o ? o[k] : null), data);
      if (value != null) el.textContent = value;
    });
  }

  fetch("data/content.json")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => { if (data) applyContent(data); })
    .catch(() => { /* JSON 없어도 HTML 기본값으로 동작 */ });

  // ---------- 2. UTM / QR 채널 추적 ----------
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source") || "",
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
  };
  if (utm.source) {
    console.log("[QR channel]", utm);
    try { sessionStorage.setItem("ed_utm", JSON.stringify(utm)); } catch (e) {}
  }
})();
