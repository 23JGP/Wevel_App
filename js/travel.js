document.addEventListener("DOMContentLoaded", function () {
    var menuItems = document.querySelectorAll(".menu-item");

    // Add event listener to each menu item
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener("mouseover", function () {
            // Remove the hover class from all menu items
            menuItems.forEach(function (item) {
                item.classList.remove("menu-item-hover");
            });

            // Add the hover class to the hovered menu item
            menuItem.classList.add("menu-item-hover");
        });
    });
});