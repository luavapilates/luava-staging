window.LUAVA_SOCIALS = {
  instagram: "",
  tiktok: ""
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-social]").forEach(link => {
    const key = link.getAttribute("data-social");
    const url = window.LUAVA_SOCIALS[key];
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
});
