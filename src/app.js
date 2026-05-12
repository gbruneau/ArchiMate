document.addEventListener("DOMContentLoaded", function () {
  // === Tabs for #layers ===
  const layers = document.getElementById("layers");
  if (layers) {
    // Simple vertical tabs implementation
    layers.classList.add("ui-tabs-vertical");
    const tabLinks = layers.querySelectorAll("li");
    tabLinks.forEach(li => {
      li.classList.remove("ui-corner-top");
      li.classList.add("ui-corner-left");
      li.addEventListener("click", function () {
        tabLinks.forEach(l => l.classList.remove("active"));
        li.classList.add("active");
        const tabPanels = layers.querySelectorAll(".tab-panel");
        tabPanels.forEach(panel => panel.style.display = "none");
        const tabId = li.querySelector("a").getAttribute("href").replace("#", "");
        const activePanel = document.getElementById(tabId);
        if (activePanel) activePanel.style.display = "block";
      });
    });
    // Activate first tab by default
    if (tabLinks.length > 0) tabLinks[0].click();
  }

  // === Tabs for .gbTabs ===
  document.querySelectorAll(".gbTabs").forEach(tabContainer => {
    const tabLinks = tabContainer.querySelectorAll("li");
    tabLinks.forEach(li => {
      li.addEventListener("click", function () {
        tabLinks.forEach(l => l.classList.remove("active"));
        li.classList.add("active");
        const tabPanels = tabContainer.querySelectorAll(".tab-panel");
        tabPanels.forEach(panel => panel.style.display = "none");
        const tabId = li.querySelector("a").getAttribute("href").replace("#", "");
        const activePanel = tabContainer.querySelector("#" + tabId);
        if (activePanel) activePanel.style.display = "block";
      });
    });
    if (tabLinks.length > 0) tabLinks[0].click();
  });

  // === Tooltip ===
  document.querySelectorAll("[title]").forEach(el => {
    el.addEventListener("mouseenter", function (e) {
      let tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.textContent = el.getAttribute("title");
      document.body.appendChild(tooltip);
      const rect = el.getBoundingClientRect();
      tooltip.style.position = "absolute";
      tooltip.style.left = rect.right + 10 + "px";
      tooltip.style.top = rect.bottom + "px";
      el._tooltip = tooltip;
    });
    el.addEventListener("mouseleave", function () {
      if (el._tooltip) {
        el._tooltip.remove();
        el._tooltip = null;
      }
    });
  });

  // === Dialog box functions for references ===
  document.querySelectorAll(".gbDialog").forEach(dialog => {
    dialog.style.display = "none";
    dialog.style.position = "fixed";
    dialog.style.left = "50%";
    dialog.style.top = "10%";
    dialog.style.transform = "translateX(-50%)";
    dialog.style.minWidth = "700px";
    dialog.style.background = "#fff";
    dialog.style.zIndex = 1000;
    dialog.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    dialog.style.padding = "1em";
    dialog.style.transition = "opacity 0.5s";
    dialog.setAttribute("tabindex", "-1");
    dialog.close = function () {
      dialog.style.opacity = 0;
      setTimeout(() => dialog.style.display = "none", 500);
    };
    dialog.open = function () {
      dialog.style.display = "block";
      dialog.style.opacity = 1;
      dialog.focus();
    };
  });

  document.querySelectorAll(".gbHelp").forEach(helpBtn => {
    helpBtn.addEventListener("click", function () {
      const diagRef = document.getElementById("diagRef");
      if (diagRef && diagRef.open) diagRef.open();
    });
  });

  // === Full Screen ===
  function toggleFull(targetelement) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      if (targetelement.requestFullscreen) {
        targetelement.requestFullscreen();
      } else if (targetelement.webkitRequestFullscreen) {
        targetelement.webkitRequestFullscreen();
      } else if (targetelement.mozRequestFullScreen) {
        targetelement.mozRequestFullScreen();
      } else if (targetelement.msRequestFullscreen) {
        targetelement.msRequestFullscreen();
      }
    }
  }

  function addFullScreen(obj) {
    obj.addEventListener("click", function () {
      toggleFull(obj);
    });
  }

  // === Add Zoom ===
  function addZoom(obj) {
    const src = obj.getAttribute('src');
    const container = document.createElement("div");
    container.className = "container";
    const zoomDiv = document.createElement("div");
    zoomDiv.className = "zoom";
    const img = document.createElement("img");
    img.src = src;
    zoomDiv.appendChild(img);
    container.appendChild(zoomDiv);
    obj.parentNode.insertBefore(container, obj.nextSibling);
    obj.style.display = "none";
  }

  document.querySelectorAll(".arcExample, .arcBigDiagram").forEach(function (el) {
    addZoom(el);
  });

  document.querySelectorAll(".zoom img").forEach(function (el) {
    addFullScreen(el);
  });

  // Dummy zoom function (implement as needed)
  function zoom() {}
  zoom();
});

// === Language update ===
function updateLanguage() {
  const selectedLang = document.getElementById('langSelector').value;
  fetch('data/' + selectedLang + '.json')
    .then(response => response.json())
    .then(t9ntable => {
      document.querySelectorAll('[data-t9n]').forEach(el => {
        const key = el.getAttribute('data-t9n');
        el.innerHTML = t9ntable[key] || '';
      });
      document.querySelectorAll('[data-t9n-t]').forEach(el => {
        const key = el.getAttribute('data-t9n-t');
        el.title = t9ntable[key] || '';
      });
      document.querySelectorAll('[data-t9n-img]').forEach(el => {
        const imgBaseFileName = el.getAttribute('data-t9n-img');
        const imgFileName = `images/${selectedLang}/${imgBaseFileName}-${selectedLang}.png`;
        el.src = imgFileName;
        const zoomImg = el.nextElementSibling?.querySelector('img');
        if (zoomImg) zoomImg.src = imgFileName;
      });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch('data/languages.json')
    .then(response => response.json())
    .then(languages => {
      const langSelector = document.getElementById('langSelector');
      languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.textContent = language.name;
        langSelector.appendChild(option);

        let sl = "";
        language.contributors.forEach(contrib => {
          sl += `<a target="_blank" href="${contrib.url}">${contrib.translator}</a>&nbsp;`;
        });
        const s = `<tr><td>${language.name}</td><td>${sl}</td></tr>`;
        document.getElementById("tContrib").insertAdjacentHTML("beforeend", s);
      });

      langSelector.addEventListener("change", updateLanguage);

      // Retrieve the selected language from the cookie or default to 'en'
      const selectedLang = document.cookie.replace(/(?:(?:^|.*;\s*)selectedLang\s*=\s*([^;]*).*$)|^.*$/, "$1") || 'en';
      langSelector.value = selectedLang;
      updateLanguage();
    });
});