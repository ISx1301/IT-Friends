export function setupCourseToggle(): void {
  const courseContainer = document.querySelector(".course-select") as HTMLElement;
  const arrow = courseContainer?.querySelector(".course-arrow") as HTMLElement;
  const menu = courseContainer?.querySelector(".course-menu") as HTMLElement;

  if (!courseContainer || !arrow || !menu) return;

  courseContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
    arrow.classList.toggle("-rotate-180");
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!courseContainer.contains(target)) {
      menu.classList.add("hidden");
      arrow.classList.remove("-rotate-180");
    }
  });
}
