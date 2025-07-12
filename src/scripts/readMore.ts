export function setupReadMoreLogic() {
  const articles = document.querySelectorAll(".content");
  articles.forEach((article, index) => {
    const advantagesText = article.querySelector(".content-advantages-text");
    const advantagesBlock = article.querySelector(".content-advantages");

    if (!advantagesText) {
      return;
    }

    if (!advantagesBlock) {
      return;
    }

    const blockId = advantagesBlock.id || `no-id-${index}`;
    const scrollHeight = advantagesText.scrollHeight;
    const clientHeight = advantagesText.clientHeight;
    const isClamped = scrollHeight - clientHeight > 1;

    if (isClamped) {
      const readMoreBtn = document.createElement("button");
      readMoreBtn.type = "button";
      readMoreBtn.className = "read-more font-semibold text-black";
      readMoreBtn.id = `readMore-${blockId}`;
      readMoreBtn.textContent = "читати більше >";

      readMoreBtn.addEventListener("click", () => {
        if (advantagesText.classList.contains("line-clamp-6")) {
          advantagesText.classList.remove("line-clamp-6");
        }
        readMoreBtn.remove();
      });

      advantagesBlock.appendChild(readMoreBtn);
    }
  });
}
