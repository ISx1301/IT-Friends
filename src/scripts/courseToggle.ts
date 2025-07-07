export function setupCourseToggle(): void {
  const courseContainer = document.getElementById("course-select");
  const arrow = document.getElementById("course-arrow");
  const menu = document.getElementById("course-menu");

  if (!courseContainer || !arrow || !menu) {
    return;
  }

  courseContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
    arrow.classList.toggle("-rotate-180");
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (target && !courseContainer.contains(target)) {
      menu.classList.add("hidden");
      arrow.classList.remove("-rotate-180");
    }
  });
}