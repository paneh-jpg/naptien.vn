function load(selector, path, callback) {
  const cached = localStorage.getItem(path);
  if (cached) {
    document.querySelector(selector).innerHTML = cached;
    if (callback) callback();
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        document.querySelector(selector).innerHTML = html;
        localStorage.setItem(path, html);
        if (callback) callback();
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // Lặp qua tất cả dropdown trong trang
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const items = dropdown.querySelectorAll(".top-menu__item");
    if (!items.length) return;

    // 1️⃣ Mặc định active item đầu tiên
    items[0].classList.add("top-menu__item--active");

    // 2️⃣ Lắng nghe hover trên mỗi item
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const active = dropdown.querySelector(".top-menu__item--active");
        if (active) active.classList.remove("top-menu__item--active");
        item.classList.add("top-menu__item--active");
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Tất cả config dropdown bạn muốn dùng
  const dropdownConfigs = [
    {
      wrapper: ".help-center",
      toggle: ".help-center__toggle",
      dropdown: ".help-center__dropdown",
      activeClass: "help-center__dropdown--active",
    },
    {
      wrapper: ".header__lang",
      toggle: ".header__lang-current",
      dropdown: ".header__lang-list",
      activeClass: "header__lang-list--active",
    },
    // 👉 có thể thêm config khác ở đây
  ];

  // Đóng tất cả dropdown
  function closeAll() {
    dropdownConfigs.forEach(({ wrapper, dropdown, activeClass }) => {
      const el = document.querySelector(wrapper + " " + dropdown);
      if (el) el.classList.remove(activeClass);
    });
  }

  // Click toàn trang
  document.addEventListener("click", function (e) {
    let clickedInsideDropdown = false;

    dropdownConfigs.forEach(({ wrapper, toggle, dropdown, activeClass }) => {
      const wrapperEl = document.querySelector(wrapper);
      if (!wrapperEl) return;

      const toggleEl = wrapperEl.querySelector(toggle);
      const dropdownEl = wrapperEl.querySelector(dropdown);

      if (!toggleEl || !dropdownEl) return;

      // Nếu click vào toggle
      if (toggleEl.contains(e.target)) {
        e.preventDefault();
        // Toggle trạng thái
        const isActive = dropdownEl.classList.contains(activeClass);
        closeAll(); // Đóng tất cả trước
        if (!isActive) {
          dropdownEl.classList.add(activeClass);
        }
        clickedInsideDropdown = true;
      }

      // Nếu click bên trong dropdown
      if (dropdownEl.contains(e.target)) {
        clickedInsideDropdown = true;
      }
    });

    // Nếu click ra ngoài hoàn toàn thì đóng hết
    if (!clickedInsideDropdown) {
      closeAll();
    }
  });
});

function initTopMenuDropdown() {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (dropdown.dataset.initialized) return; // 🔒 Chặn lặp
    dropdown.dataset.initialized = "true";

    const items = dropdown.querySelectorAll(".top-menu__item");
    if (!items.length) return;

    items[0].classList.add("top-menu__item--active");

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const active = dropdown.querySelector(".top-menu__item--active");
        if (active) active.classList.remove("top-menu__item--active");
        item.classList.add("top-menu__item--active");
      });
    });
  });
}
