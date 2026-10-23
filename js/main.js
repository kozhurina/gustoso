(function () {
  "use strict";

  /* mobile navigation */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("primary-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var opened = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", opened ? "false" : "true");
      document.body.classList.toggle("nav-open", !opened);
    });

    menu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* pancake carousel: the arrows rotate the round previews */
  var list = document.querySelector(".carousel__list");

  if (list && list.children.length > 1) {
    var next = document.querySelector('[data-dir="next"]');
    var prev = document.querySelector('[data-dir="prev"]');

    if (next) {
      next.addEventListener("click", function () {
        list.appendChild(list.firstElementChild);
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        list.insertBefore(list.lastElementChild, list.firstElementChild);
      });
    }
  }

  /* five star rating on the pancake photo */
  var ratingBox = document.querySelector(".rating");

  if (ratingBox) {
    var stars = ratingBox.querySelectorAll(".rating__star");
    var rating = 0;

    var paint = function (value) {
      for (var i = 0; i < stars.length; i++) {
        stars[i].classList.toggle("is-active", i < value);
      }
    };

    for (var i = 0; i < stars.length; i++) {
      stars[i].addEventListener("click", function () {
        rating = Number(this.getAttribute("data-value"));
        paint(rating);
      });
      stars[i].addEventListener("mouseenter", function () {
        paint(Number(this.getAttribute("data-value")));
      });
    }

    ratingBox.addEventListener("mouseleave", function () {
      paint(rating);
    });
  }

  /* breakfast cards: three stacked leaves that can be flipped */
  var cards = document.querySelectorAll(".cards .card");

  if (cards.length > 1) {
    var current = 0;
    var total = cards.length;

    var renderCards = function () {
      for (var i = 0; i < total; i++) {
        var pos = (i - current + total) % total;
        cards[i].setAttribute("data-pos", String(pos));
        cards[i].setAttribute("aria-hidden", pos === 0 ? "false" : "true");
        var action = cards[i].querySelector(".btn");
        if (action) {
          action.tabIndex = pos === 0 ? 0 : -1;
        }
      }
    };

    var cardsPrev = document.querySelector('[data-cards="prev"]');
    var cardsNext = document.querySelector('[data-cards="next"]');

    if (cardsNext) {
      cardsNext.addEventListener("click", function () {
        current = (current + 1) % total;
        renderCards();
      });
    }

    if (cardsPrev) {
      cardsPrev.addEventListener("click", function () {
        current = (current - 1 + total) % total;
        renderCards();
      });
    }

    renderCards();
  }

  /* recipe dialog for the Read and Full recipe buttons */
  var modal = document.getElementById("recipe-modal");

  if (modal && typeof modal.showModal === "function") {
    var openers = document.querySelectorAll(".js-modal");

    for (var k = 0; k < openers.length; k++) {
      openers[k].addEventListener("click", function (event) {
        event.preventDefault();
        modal.showModal();
      });
    }

    var close = modal.querySelector(".modal__close");

    if (close) {
      close.addEventListener("click", function () {
        modal.close();
      });
    }

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });
  }
})();