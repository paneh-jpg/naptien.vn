// function load(selector, path, callback) {
//   const cached = localStorage.getItem(path);
//   if (cached) {
//     document.querySelector(selector).innerHTML = cached;
//     if (callback) callback();
//   }

//   fetch(path)
//     .then((res) => res.text())
//     .then((html) => {
//       if (html !== cached) {
//         document.querySelector(selector).innerHTML = html;
//         localStorage.setItem(path, html);
//         if (callback) callback();
//       }
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   // Lặp qua tất cả dropdown trong trang
//   document.querySelectorAll(".dropdown").forEach((dropdown) => {
//     const items = dropdown.querySelectorAll(".top-menu__item");
//     if (!items.length) return;

//     // 1️⃣ Mặc định active item đầu tiên
//     items[0].classList.add("top-menu__item--active");

//     // 2️⃣ Lắng nghe hover trên mỗi item
//     items.forEach((item) => {
//       item.addEventListener("mouseenter", () => {
//         const active = dropdown.querySelector(".top-menu__item--active");
//         if (active) active.classList.remove("top-menu__item--active");
//         item.classList.add("top-menu__item--active");
//       });
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   // Tất cả config dropdown bạn muốn dùng
//   const dropdownConfigs = [
//     {
//       wrapper: ".help-center",
//       toggle: ".help-center__toggle",
//       dropdown: ".help-center__dropdown",
//       activeClass: "help-center__dropdown--active",
//     },
//     {
//       wrapper: ".header__lang",
//       toggle: ".header__lang-current",
//       dropdown: ".header__lang-list",
//       activeClass: "header__lang-list--active",
//     },
//     // 👉 có thể thêm config khác ở đây
//   ];

//   // Đóng tất cả dropdown
//   function closeAll() {
//     dropdownConfigs.forEach(({ wrapper, dropdown, activeClass }) => {
//       const el = document.querySelector(wrapper + " " + dropdown);
//       if (el) el.classList.remove(activeClass);
//     });
//   }

//   // Click toàn trang
//   document.addEventListener("click", function (e) {
//     let clickedInsideDropdown = false;

//     dropdownConfigs.forEach(({ wrapper, toggle, dropdown, activeClass }) => {
//       const wrapperEl = document.querySelector(wrapper);
//       if (!wrapperEl) return;

//       const toggleEl = wrapperEl.querySelector(toggle);
//       const dropdownEl = wrapperEl.querySelector(dropdown);

//       if (!toggleEl || !dropdownEl) return;

//       // Nếu click vào toggle
//       if (toggleEl.contains(e.target)) {
//         e.preventDefault();
//         // Toggle trạng thái
//         const isActive = dropdownEl.classList.contains(activeClass);
//         closeAll(); // Đóng tất cả trước
//         if (!isActive) {
//           dropdownEl.classList.add(activeClass);
//         }
//         clickedInsideDropdown = true;
//       }

//       // Nếu click bên trong dropdown
//       if (dropdownEl.contains(e.target)) {
//         clickedInsideDropdown = true;
//       }
//     });

//     // Nếu click ra ngoài hoàn toàn thì đóng hết
//     if (!clickedInsideDropdown) {
//       closeAll();
//     }
//   });
// });

// function initTopMenuDropdown() {
//   document.querySelectorAll(".dropdown").forEach((dropdown) => {
//     if (dropdown.dataset.initialized) return; // 🔒 Chặn lặp
//     dropdown.dataset.initialized = "true";

//     const items = dropdown.querySelectorAll(".top-menu__item");
//     if (!items.length) return;

//     items[0].classList.add("top-menu__item--active");

//     items.forEach((item) => {
//       item.addEventListener("mouseenter", () => {
//         const active = dropdown.querySelector(".top-menu__item--active");
//         if (active) active.classList.remove("top-menu__item--active");
//         item.classList.add("top-menu__item--active");
//       });
//     });
//   });
// }

// /**
//  * JS toggle
//  *
//  * Cách dùng:
//  * <button class="js-toggle" toggle-target="#box">Click</button>
//  * <div id="box">Content show/hide</div>
//  */
// window.addEventListener("template-loaded", initJsToggle);

// function initJsToggle() {
//   $$(".js-toggle").forEach((button) => {
//     const target = button.getAttribute("toggle-target");
//     if (!target) {
//       document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
//     }
//     button.onclick = () => {
//       if (!$(target)) {
//         return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
//       }
//       const isHidden = $(target).classList.contains("hide");

//       requestAnimationFrame(() => {
//         $(target).classList.toggle("hide", !isHidden);
//         $(target).classList.toggle("show", isHidden);
//       });
//     };
//   });
// }

// const navbarItems = document.querySelectorAll(".navbar__item");
// const headerTop3 = document.querySelector(".header__top-3");

// navbarItems.forEach((item) => {
//   item.addEventListener("mouseenter", () =>
//     headerTop3.classList.add("is-hovered")
//   );
//   item.addEventListener("mouseleave", () =>
//     headerTop3.classList.remove("is-hovered")
//   );
// });

// ======================
// Load template + cache
// ======================
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

// ======================
// Dropdown hover (Desktop only)
// ======================
document.addEventListener("DOMContentLoaded", () => {
  // 🔸 Chỉ chạy khi màn hình > 991px (PC)
  if (window.innerWidth <= 991) return;

  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const items = dropdown.querySelectorAll(".top-menu__item");
    if (!items.length) return;

    // Mặc định active item đầu tiên (chỉ desktop)
    items[0].classList.add("top-menu__item--active");

    // Hover chuyển active
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const active = dropdown.querySelector(".top-menu__item--active");
        if (active) active.classList.remove("top-menu__item--active");
        item.classList.add("top-menu__item--active");
      });
    });
  });
});

// ======================
// Dropdown toggle (Header top)
// ======================
document.addEventListener("DOMContentLoaded", function () {
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
  ];

  function closeAll() {
    dropdownConfigs.forEach(({ wrapper, dropdown, activeClass }) => {
      const el = document.querySelector(wrapper + " " + dropdown);
      if (el) el.classList.remove(activeClass);
    });
  }

  document.addEventListener("click", function (e) {
    let clickedInsideDropdown = false;

    dropdownConfigs.forEach(({ wrapper, toggle, dropdown, activeClass }) => {
      const wrapperEl = document.querySelector(wrapper);
      if (!wrapperEl) return;

      const toggleEl = wrapperEl.querySelector(toggle);
      const dropdownEl = wrapperEl.querySelector(dropdown);
      if (!toggleEl || !dropdownEl) return;

      if (toggleEl.contains(e.target)) {
        e.preventDefault();
        const isActive = dropdownEl.classList.contains(activeClass);
        closeAll();
        if (!isActive) dropdownEl.classList.add(activeClass);
        clickedInsideDropdown = true;
      }

      if (dropdownEl.contains(e.target)) {
        clickedInsideDropdown = true;
      }
    });

    if (!clickedInsideDropdown) closeAll();
  });
});

// ======================
// initTopMenuDropdown (backup for template reloads)
// ======================
function initTopMenuDropdown() {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (dropdown.dataset.initialized) return;
    dropdown.dataset.initialized = "true";

    const items = dropdown.querySelectorAll(".top-menu__item");
    if (!items.length) return;

    // Chỉ desktop mới auto active
    if (window.innerWidth > 991) {
      items[0].classList.add("top-menu__item--active");
    }

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const active = dropdown.querySelector(".top-menu__item--active");
        if (active) active.classList.remove("top-menu__item--active");
        item.classList.add("top-menu__item--active");
      });
    });
  });
}

// ======================
// JS toggle generic
// ======================
window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
  $$(".js-toggle").forEach((button) => {
    const target = button.getAttribute("toggle-target");
    if (!target) {
      document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
    }
    button.onclick = () => {
      if (!$(target)) {
        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
      }
      const isHidden = $(target).classList.contains("hide");

      requestAnimationFrame(() => {
        $(target).classList.toggle("hide", !isHidden);
        $(target).classList.toggle("show", isHidden);
      });
    };
  });
}

// ======================
// Hover header effect
// ======================
const navbarItems = document.querySelectorAll(".navbar__item");
const headerTop3 = document.querySelector(".header__top-3");

navbarItems.forEach((item) => {
  item.addEventListener("mouseenter", () =>
    headerTop3.classList.add("is-hovered")
  );
  item.addEventListener("mouseleave", () =>
    headerTop3.classList.remove("is-hovered")
  );
});

// ======================
// Mobile / md behavior for submenus
// ======================
function initMobileSubmenus() {
  // Xóa logic cũ trước khi khởi tạo lại (tránh lỗi khi resize)
  document.querySelectorAll(".top-menu__item").forEach((item) => {
    const link = item.querySelector(".top-menu__link");
    if (link) {
      link.replaceWith(link.cloneNode(true)); // remove old events
    }
  });

  // 🔸 Chỉ chạy khi màn hình <= 991px
  if (window.innerWidth > 767) return;

  // Ẩn toàn bộ submenu mặc định
  document.querySelectorAll(".sub-menu").forEach((sub) => {
    sub.style.display = "none";
  });

  // Bấm để mở/đóng từng submenu
  document.querySelectorAll(".top-menu__item").forEach((item) => {
    const link = item.querySelector(".top-menu__link");
    if (!link) return;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const submenu = item.querySelector(".sub-menu");
      if (!submenu) return;

      const isOpen = submenu.style.display === "block";

      // Đóng tất cả submenu khác
      document
        .querySelectorAll(".sub-menu")
        .forEach((s) => (s.style.display = "none"));

      // Mở submenu hiện tại
      submenu.style.display = isOpen ? "none" : "block";
    });
  });
}

// ✅ Gọi 1 lần khi load
document.addEventListener("DOMContentLoaded", initMobileSubmenus);

// ✅ Lắng nghe resize để tự chuyển qua lại khi đổi kích thước
window.addEventListener("resize", () => {
  initMobileSubmenus();
});
