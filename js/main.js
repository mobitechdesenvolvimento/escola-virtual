// Menu Mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  menuToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    this.innerHTML = mainNav.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Barra de acessibilidade
  const increaseFont = document.getElementById("increaseFont");
  const decreaseFont = document.getElementById("decreaseFont");
  const highContrast = document.getElementById("highContrast");

  increaseFont.addEventListener("click", function () {
    changeFontSize(1);
  });

  decreaseFont.addEventListener("click", function () {
    changeFontSize(-1);
  });

  highContrast.addEventListener("click", toggleHighContrast);

  function changeFontSize(direction) {
    const html = document.documentElement;
    const currentSize = parseFloat(
      window.getComputedStyle(html, null).getPropertyValue("font-size")
    );
    const newSize = direction > 0 ? currentSize * 1.1 : currentSize * 0.9;
    html.style.fontSize = newSize + "px";
  }

  function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
  }

  // Calendário
  renderCalendar();

  function renderCalendar() {
    const calendarDays = document.querySelector(".calendar-days");
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Dias do mês anterior
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Limpar calendário
    calendarDays.innerHTML = "";

    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("prev-month");
      dayElement.textContent = prevMonthDays - i;
      calendarDays.appendChild(dayElement);
    }

    // Dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.textContent = i;

      // Marcar dia atual
      if (
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
      ) {
        dayElement.classList.add("current-day");
      }

      // Marcar dias com eventos (exemplo: 10 e 25)
      if (i === 10 || i === 25) {
        dayElement.classList.add("event-day");
      }

      calendarDays.appendChild(dayElement);
    }

    // Dias do próximo mês para completar a grade
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells > 35 ? 42 - totalCells : 35 - totalCells;

    for (let i = 1; i <= remainingCells; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("next-month");
      dayElement.textContent = i;
      calendarDays.appendChild(dayElement);
    }
  }

  // Navegação suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Animação ao rolar
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".highlight-card, .news-card, .team-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Adiciona classes iniciais para animação
  window.addEventListener("load", function () {
    document
      .querySelectorAll(".highlight-card, .news-card, .team-card")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      });

    animateOnScroll();
  });

  window.addEventListener("scroll", animateOnScroll);
});
