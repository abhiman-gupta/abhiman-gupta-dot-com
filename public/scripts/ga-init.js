// Google Analytics 4 bootstrap. Loaded only in production builds with a measurement ID (see src/layouts/Base.astro).
// Kept as a file so the Content-Security-Policy doesn't need 'unsafe-inline'.
(function () {
  var id = document.currentScript && document.currentScript.getAttribute("data-ga-id");
  if (!id) return;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  gtag("set", "ads_data_redaction", true);
  gtag("js", new Date());
  gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });
})();
