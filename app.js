/* Renders the page from window.PORTFOLIO (content.js). You should not need to edit this file to add content. */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  if (!D) return;

  var $ = function (sel) { return document.querySelector(sel); };

  // Small DOM builder. Text always goes in as text, never as HTML.
  function h(tag, attrs) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k === "style") el.style.cssText = v;
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kid = arguments[i];
      if (kid == null) continue;
      (Array.isArray(kid) ? kid : [kid]).forEach(function (c) {
        if (c != null) el.append(c.nodeType ? c : document.createTextNode(String(c)));
      });
    }
    return el;
  }

  function clock(s) {
    s = Math.max(0, Math.round(s));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  function ratio(r) {
    var p = String(r || "16:9").split(":");
    return (parseFloat(p[0]) || 16) / (parseFloat(p[1]) || 9);
  }
  var cats = {};
  (D.categories || []).forEach(function (c) { cats[c.id] = c; });

  /* ---------- profile ---------- */
  var P = D.profile || {};
  $("#brand-name").textContent = P.name || "";
  $("#hero-name").textContent = P.name || "";
  $("#hero-role").textContent = P.role || "";
  $("#hero-lede").textContent = P.lede || "";
  $("#foot-name").textContent = [P.name, P.location].filter(Boolean).join(" · ");
  var photo = $("#about-photo");
  if (P.photo) photo.src = P.photo; else photo.hidden = true;
  (P.about || []).forEach(function (t) { $("#about-text").append(h("p", { text: t })); });

  /* ---------- 1. showreel with its cut list ---------- */
  var R = D.showreel || {};
  var video = $("#reel-video");
  var bar = $("#tl-bar"), head = $("#tl-head"), label = $("#tl-label"), time = $("#tl-time");
  if (R.src) {
    video.src = R.src;
    if (R.poster) video.poster = R.poster;
    $("#reel-note").textContent = R.note || "";
    var total = R.duration || 0;
    var chapters = (R.chapters || []).map(function (c, i, all) {
      var end = i + 1 < all.length ? all[i + 1].t : total;
      return { t: c.t, end: end, label: c.label, cat: c.cat };
    });
    var buttons = chapters.map(function (c) {
      var col = c.cat && cats[c.cat] ? cats[c.cat].color : null;
      var b = h("button", {
        class: "tl-clip", type: "button", title: c.label + " (" + clock(c.t) + ")",
        style: "flex-grow:" + Math.max(0.2, c.end - c.t) + (col ? ";--c:" + col : ""),
        onclick: function () { video.currentTime = c.t + 0.01; paint(); video.play().catch(function () {}); }
      }, c.label);
      bar.append(b);
      return b;
    });
    var paint = function () {
      var dur = video.duration || total || 1;
      var t = video.currentTime || 0;
      head.style.left = Math.min(100, (t / dur) * 100) + "%";
      time.textContent = clock(t) + " / " + clock(dur);
      var active = -1;
      chapters.forEach(function (c, i) { if (t >= c.t) active = i; });
      buttons.forEach(function (b, i) { b.classList.toggle("on", i === active); });
      label.textContent = active >= 0 ? chapters[active].label : "Showreel";
    };
    var raf = 0;
    var loop = function () { paint(); raf = requestAnimationFrame(loop); };
    video.addEventListener("play", function () { cancelAnimationFrame(raf); loop(); });
    ["pause", "ended"].forEach(function (e) { video.addEventListener(e, function () { cancelAnimationFrame(raf); paint(); }); });
    ["timeupdate", "loadedmetadata", "seeking", "seeked"].forEach(function (e) { video.addEventListener(e, paint); });
    paint();
  } else {
    document.querySelector(".reel").hidden = true;
  }

  /* ---------- 2. work by category ---------- */
  var tracks = $("#tracks");
  var dialog = $("#player"), media = $("#player-media");

  function openPlayer(item) {
    media.replaceChildren();
    var ar = ratio(item.ratio);
    media.classList.toggle("tall", ar < 1);
    media.style.setProperty("--ar", String(ar));
    if (item.youtube) {
      media.append(h("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(item.youtube) + "?autoplay=1&rel=0",
        title: item.title, allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: true
      }));
    } else if (item.src) {
      media.append(h("video", { src: item.src, poster: item.poster, controls: true, autoplay: true, playsinline: true }));
    }
    $("#player-title").textContent = item.title || "";
    $("#player-badge").textContent = item.badge || "";
    $("#player-badge").hidden = !item.badge;
    $("#player-desc").textContent = item.description || "";
    $("#player-made").textContent = item.made || "";
    $("#player-made").hidden = !item.made;
    if (video && !video.paused) video.pause();
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
  }
  function closePlayer() { if (dialog.open) dialog.close(); }
  dialog.addEventListener("close", function () { media.replaceChildren(); });
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closePlayer(); });
  $("#player-close").addEventListener("click", closePlayer);

  (D.categories || []).forEach(function (cat) {
    var items = (D.work || []).filter(function (w) { return w.category === cat.id; });
    if (!items.length && !D.showEmptySections) return;
    var row = h("div", { class: "clips" });
    items.forEach(function (item) {
      var poster = item.poster || (item.youtube ? "https://i.ytimg.com/vi/" + encodeURIComponent(item.youtube) + "/hqdefault.jpg" : null);
      row.append(h("button", { class: "clip", type: "button", style: "--ar:" + ratio(item.ratio), "aria-label": "Play " + item.title, onclick: function () { openPlayer(item); } },
        h("span", { class: "thumb" },
          poster ? h("img", { src: poster, alt: "", loading: "lazy" }) : null,
          h("span", { class: "play" }, item.duration ? clock(item.duration) : "Play")),
        h("b", { text: item.title }),
        h("span", { class: "meta" },
          h("span", { class: "mono", text: item.ratio || "" }),
          item.badge ? h("span", { class: "badge", text: item.badge }) : null)));
    });
    if (!items.length) row.append(h("div", { class: "empty", text: "No clips here yet. Add one to the work list in content.js with category \"" + cat.id + "\"." }));
    tracks.append(h("div", { class: "track", style: "--c:" + cat.color },
      h("div", { class: "track-head" },
        h("span", { class: "tag", text: cat.track }),
        h("h3", { text: cat.label }),
        h("span", { class: "mono", text: items.length + (items.length === 1 ? " clip" : " clips") }),
        h("p", { text: cat.blurb })),
      row));
  });

  /* ---------- 3. before / after ---------- */
  var BA = D.beforeAfter || [];
  var baSection = $("#before-after"), baGrid = $("#ba-grid");
  if (BA.length || D.showEmptySections) {
    baSection.hidden = false;
    BA.forEach(function (item) {
      var body;
      if (item.type === "audio") {
        body = h("div", { class: "ba-audio" },
          h("span", { class: "mono", text: "BEFORE" }), h("audio", { src: item.before, controls: true, preload: "none" }),
          h("span", { class: "mono", text: "AFTER" }), h("audio", { src: item.after, controls: true, preload: "none" }));
      } else {
        var isVideo = item.type === "video";
        var attrs = function (src, cls) {
          return isVideo ? { src: src, class: cls, muted: true, loop: true, playsinline: true, autoplay: true, preload: "metadata" }
                         : { src: src, class: cls, alt: cls === "after" ? "After" : "Before", loading: "lazy" };
        };
        var cmp = h("div", { class: "cmp" },
          h(isVideo ? "video" : "img", attrs(item.before, "before")),
          h(isVideo ? "video" : "img", attrs(item.after, "after")),
          h("span", { class: "line" }),
          h("span", { class: "lab l", text: "Before" }), h("span", { class: "lab r", text: "After" }));
        cmp.append(h("input", {
          type: "range", min: "0", max: "100", value: "50", "aria-label": "Compare before and after: " + (item.title || ""),
          oninput: function (e) { cmp.style.setProperty("--pos", e.target.value); }
        }));
        body = cmp;
      }
      baGrid.append(h("article", { class: "ba" },
        h("span", { class: "mono", text: (item.skill || "").toUpperCase() }),
        body,
        h("h3", { text: item.title || "" }),
        item.note ? h("p", { text: item.note }) : null));
    });
    if (!BA.length) baGrid.append(h("div", { class: "empty", text: "No comparisons yet. Add one to beforeAfter in content.js." }));
  } else {
    var nav = document.querySelector('[data-nav="before-after"]');
    if (nav) nav.hidden = true;
  }

  /* ---------- about, tools, projects, contact ---------- */
  (D.levels || []).forEach(function (l) {
    $("#levels").append(h("div", {}, h("span", { class: "mono", text: l.level }), h("strong", { text: l.title }), h("p", { text: l.text })));
  });
  (D.tools || []).forEach(function (t) { $("#tools").append(h("span", { text: t })); });
  (D.projects || []).forEach(function (p) {
    $("#projects").append(h("a", { href: p.url, target: "_blank", rel: "noopener" },
      h("b", { text: p.title }), h("span", { text: p.text }), h("span", { class: "mono", text: "CASE STUDY ↗" })));
  });
  (D.contact || []).forEach(function (c) {
    var ext = /^https?:/.test(c.url || "");
    $("#contact-list").append(h("a", { href: c.url, target: ext ? "_blank" : null, rel: ext ? "noopener" : null },
      h("span", { class: "mono", text: c.label.toUpperCase() }), h("span", { text: c.value })));
  });
})();
