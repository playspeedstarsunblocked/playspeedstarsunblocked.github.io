const shareTitle = document.body.dataset.shareTitle || document.title;
const shareText = document.body.dataset.shareText || shareTitle;

document.querySelectorAll("[data-share-button]").forEach((button) => {
  button.dataset.defaultLabel = button.innerHTML;

  button.addEventListener("click", async () => {
    const shareData = {
      title: shareTitle,
      text: shareText,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled the share sheet.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      button.textContent = "Link copied";
      window.setTimeout(() => {
        button.innerHTML = button.dataset.defaultLabel;
      }, 1400);
    } catch {
      window.alert("Copy the URL from the address bar to share this page.");
    }
  });
});

const gameFrame = document.getElementById("game-frame");
const fullscreenButton = document.getElementById("fullscreen-button");

if (fullscreenButton && gameFrame) {
  fullscreenButton.addEventListener("click", async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await gameFrame.requestFullscreen();
  });
}

const backToGameButton = document.getElementById("back-to-game");
if (backToGameButton) {
  const toggleBackToGame = () => {
    backToGameButton.classList.toggle("is-visible", window.scrollY > 520);
  };

  toggleBackToGame();
  window.addEventListener("scroll", toggleBackToGame, { passive: true });
}
