document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior

      // Remove the active class from all menu items
      menuItems.forEach((el) => el.classList.remove("active"));

      // Add the active class to the clicked menu item
      item.classList.add("active");
    });
  });
});
