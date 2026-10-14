(function () {
  'use strict';

  var CFG = window.SOLARA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var uid = 0;

  /* ---------- Görsel yuvası: dosya varsa yükle, yoksa yer tutucuyu bırak ---------- */
  function tryImage(slot, candidates, alt) {
    var list = candidates.slice();
    (function next() {
      if (!list.length) return;
      var img = new Image();
      img.alt = alt || '';
      img.decoding = 'async';
      img.onload = function () { slot.innerHTML = ''; slot.appendChild(img); slot.classList.add('has-img'); };
      img.onerror = next;
      img.src = list.shift();
    })();
  }

  /* ---------- Yer tutucu çizimleri ---------- */
  function bottleSVG(c1, c2, label) {
    var id = 'g' + (++uid);
    return '<svg viewBox="0 0 200 340" role="img" aria-label="' + label + ' şişe (görsel bekleniyor)">' +
      '<defs><linearGradient id="' + id + '" x1="0" x2="1"><stop offset="0" stop-color="' + c2 + '"/><stop offset=".45" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect x="78" y="4" width="44" height="30" rx="8" fill="#2a1a08"/>' +
      '<path d="M82 34h36v34c0 14 40 26 40 62v186c0 14-10 20-22 20H64c-12 0-22-6-22-20V130c0-36 40-48 40-62z" fill="url(#' + id + ')"/>' +
      '<rect x="42" y="150" width="116" height="110" fill="#fff" opacity=".92"/>' +
      '<circle cx="100" cy="186" r="14" fill="' + c1 + '"/>' +
      '<text x="100" y="228" text-anchor="middle" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="15" fill="#2a1a08">' + label + '</text>' +
      '<text x="100" y="246" text-anchor="middle" font-family="DM Sans,sans-serif" font-weight="700" font-size="8" fill="#2a1a08" opacity=".6">SOLARA · 330 ML</text>' +
      '<rect x="56" y="80" width="10" height="200" rx="5" fill="#fff" opacity=".25"/></svg>';
  }
  function shapeSVG(kind, color) {
    var s = {
      slice: '<circle cx="50" cy="50" r="44" fill="' + color + '"/><circle cx="50" cy="50" r="36" fill="#fff" opacity=".35"/><path d="M50 14v72M14 50h72M24 24l52 52M76 24L24 76" stroke="#fff" stroke-width="3" opacity=".6"/>',
      drop: '<path d="M50 6C70 34 82 50 82 64a32 32 0 0 1-64 0C18 50 30 34 50 6z" fill="' + color + '"/><ellipse cx="38" cy="62" rx="8" ry="14" fill="#fff" opacity=".35"/>',
      leaf: '<path d="M10 90C10 40 40 10 90 10c0 50-30 80-80 80z" fill="' + color + '"/><path d="M14 86L70 30" stroke="#fff" stroke-width="3" opacity=".6"/>',
      berry: '<circle cx="50" cy="56" r="34" fill="' + color + '"/><path d="M40 28l10 6 10-6-4 12H44z" fill="#fff" opacity=".7"/><circle cx="40" cy="48" r="7" fill="#fff" opacity=".3"/>'
    };
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + (s[kind] || s.slice) + '</svg>';
  }

  /* ---------- Logo (yoksa wordmark kalır) ---------- */
  $$('[data-logo]').forEach(function (el) { tryImage(el, CFG.brand.logo, CFG.brand.name); });

  /* ---------- Hero ---------- */
  var heroSlot = $('[data-slot="hero"]');
  heroSlot.innerHTML = bottleSVG('#FFB627', '#F08A00', 'SOLARA');
  tryImage(heroSlot, CFG.hero.bottle, 'SOLARA şişe');
  (function () {
    var bg = $('#heroBg');
    var list = CFG.hero.bg.slice();
    (function next() {
      if (!list.length) return;
      var src = list.shift(), im = new Image();
      im.onload = function () { bg.style.backgroundImage = 'url("' + src + '")'; };
      im.onerror = next; im.src = src;
    })();
  })();

  /* ---------- Şerit ---------- */
  var names = CFG.products.map(function (p) { return p.title; });
  var chunk = names.map(function (n) { return '<span>' + n + '</span>'; }).join('');
  $('#marqueeTrack').innerHTML = chunk + chunk + chunk + chunk;

  /* ---------- Lezzet sahneleri ---------- */
  var host = $('#flavors');
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
  var prev = '#FFF1DA';
  var floatPos = [
    { l: '12%', t: '16%', d: 26, fy: 30, r: '-20deg', dl: '0s' },
    { l: '78%', t: '20%', d: -34, fy: 40, r: '25deg', dl: '-2s' },
    { l: '70%', t: '66%', d: 22, fy: 25, r: '-8deg', dl: '-4s' }
  ];
  CFG.products.forEach(function (p, i) {
    var sec = document.createElement('section');
    sec.className = 'flavor';
    sec.id = p.id;
    sec.dataset.section = '';
    sec.dataset.theme = isDark(p.bg) ? 'dark' : 'light';
    sec.style.cssText = '--bg:' + p.bg + ';--ink-s:' + p.ink + ';--accent:' + p.accent + ';--prev:' + prev;
    prev = p.bg;

    var floaties = p.floaties.map(function (src, k) {
      var f = floatPos[k % floatPos.length];
      return '<div class="floaty" style="left:' + f.l + ';top:' + f.t + ';--d:' + f.d + 'px;--fy:' + f.fy + ';--r:' + f.r + ';--dl:' + f.dl + '">' +
        '<div data-fl="' + k + '">' + shapeSVG(p.shape, p.accent) + '</div></div>';
    }).join('');

    sec.innerHTML =
      '<div class="wipe"></div>' +
      '<div class="giant" aria-hidden="true">' + p.name + '</div>' +
      '<div class="floaties">' + floaties + '</div>' +
      '<div class="bottle"><div class="tilt" data-bottle>' + bottleSVG(p.accent, shade(p.accent), p.title.toUpperCase()) + '</div></div>' +
      '<div class="f-info f-main">' +
        '<div class="f-num"><b>' + pad(i + 1) + '</b>/ ' + pad(CFG.products.length) + '</div>' +
        '<h2>' + p.title + '</h2><p class="f-sub">' + p.sub + '</p>' +
        '<p class="f-text">' + p.text + '</p>' +
        '<div class="chips">' + p.notes.map(function (n) { return '<span>' + n + '</span>'; }).join('') + '</div>' +
        '<a class="btn" href="#bul" data-go="bul">Satın Al</a>' +
      '</div>' +
      '<div class="f-info f-facts">' +
        '<div><strong>' + p.facts.kcal + '</strong><span>kcal</span></div>' +
        '<div><strong>' + p.facts.ml + '</strong><span>ml</span></div>' +
        '<div><strong>' + p.facts.fruit + '</strong><span>meyve</span></div>' +
      '</div>';
    host.appendChild(sec);

    tryImage($('[data-bottle]', sec), p.bottle, p.title + ' şişe');
    $$('[data-fl]', sec).forEach(function (el, k) { tryImage(el, [p.floaties[k]], ''); });
  });

  function isDark(hex) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 < 140;
  }
  function shade(hex) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.round((n >> 16) * .72), g = Math.round(((n >> 8) & 255) * .72), b = Math.round((n & 255) * .72);
    return '#' + [r, g, b].map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join('');
  }

  /* ---------- Nerede: mağaza logo yuvaları ---------- */
  $('#stores').innerHTML = CFG.stores.map(function (s, i) {
    return '<div class="store" data-store="' + i + '">' + s[1] + '</div>';
  }).join('');
  $$('[data-store]').forEach(function (el, i) { tryImage(el, [CFG.stores[i][0]], CFG.stores[i][1]); });

  /* ---------- Hikâye metni: kelime kelime dolum ---------- */
  var story = $('#storyText');
  story.innerHTML = story.textContent.trim().split(/\s+/).map(function (w) { return '<span>' + w + '</span>'; }).join(' ');
  var words = $$('span', story);

  /* ---------- Sağ ray ---------- */
  var sections = $$('[data-section]');
  var rail = $('#rail');
  rail.innerHTML = sections.filter(function (s) { return !('norail' in s.dataset); }).map(function (s) {
    return '<li><a href="#' + s.id + '" data-go="' + s.id + '" aria-label="' + s.id + '"></a></li>';
  }).join('');

  /* ---------- Yumuşak kaydırma + menü ---------- */
  var overlay = $('#overlay'), burger = $('#burger');
  function closeMenu() {
    overlay.classList.remove('show'); overlay.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
  }
  burger.addEventListener('click', function () {
    var open = !overlay.classList.contains('show');
    overlay.classList.toggle('show', open); overlay.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open); document.body.classList.toggle('menu-open', open);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]');
    if (!a) return;
    var el = document.getElementById(a.dataset.go === 'lezzetler' ? CFG.products[0].id : a.dataset.go);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });

  /* ---------- Aktif bölüm: menü rengi, ray, pill ---------- */
  var topbar = $('#topbar');
  var activeIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var s = en.target, dark = s.dataset.theme === 'dark';
      var inkVar = s.classList.contains('flavor') ? getComputedStyle(s).getPropertyValue('--ink-s').trim() : null;
      var col = inkVar || (dark ? '#fff3e0' : '#2a1a08');
      topbar.style.setProperty('--c', col);
      rail.style.setProperty('--c', col);
      rail.classList.toggle('show', s.id !== 'hero');
      $$('.rail a').forEach(function (a) { a.classList.toggle('active', a.dataset.go === s.id); });
      var group = s.classList.contains('flavor') ? 'lezzetler' : s.id;
      $$('.pill a').forEach(function (a) { a.classList.toggle('active', a.dataset.go === group); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { activeIO.observe(s); });

  /* ---------- Scroll'a bağlı animasyonlar ---------- */
  var flavors = $$('.flavor');
  var hero = $('#hero');
  var lastY = window.scrollY, velocity = 0, marqueeAnim = null, ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;

    // Hero: şişe ve kelime scroll ile süzülür
    var hr = hero.getBoundingClientRect();
    if (hr.bottom > 0) {
      var hp = clamp(-hr.top / vh, 0, 1);
      hero.style.setProperty('--by', (hp * -12) + 'vh');
      hero.style.setProperty('--br', (hp * 14) + 'deg');
      hero.style.setProperty('--wy', (hp * 18) + 'vh');
      hero.style.setProperty('--sunS', 1 + hp * 1.2);
      var hb = $('#heroBottle');
      hb.style.setProperty('--by', (hp * -12) + 'vh');
      hb.style.setProperty('--br', (hp * 14) + 'deg');
      $('.hw').style.setProperty('--wy', (hp * 18) + 'vh');
    }

    // Lezzet sahneleri: giriş (--t) ve çıkış (--l) ilerlemesi
    flavors.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -vh * 0.1 || r.top > vh * 1.1) return;
      s.style.setProperty('--t', ease(clamp(1 - r.top / vh, 0, 1)).toFixed(4));
      s.style.setProperty('--l', clamp(-r.top / vh, 0, 1).toFixed(4));
    });

    // Hikâye metni
    var sr = story.getBoundingClientRect();
    if (sr.top < vh && sr.bottom > 0) {
      var p = clamp((vh * .85 - sr.top) / (vh * .55), 0, 1);
      var upto = Math.floor(p * words.length);
      words.forEach(function (w, i) { w.classList.toggle('on', i < upto); });
    }

    // Şerit hızı scroll hızına bağlı
    if (!marqueeAnim) {
      var anims = $('#marqueeTrack').getAnimations();
      marqueeAnim = anims[0] || null;
    }
    if (marqueeAnim) marqueeAnim.playbackRate = 1 + clamp(Math.abs(velocity) / 12, 0, 6) * (velocity < 0 ? -1 : 1);
  }
  function onScroll() {
    velocity = window.scrollY - lastY; lastY = window.scrollY;
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  if (!reduce) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    // Hız sönümü
    setInterval(function () { if (Math.abs(velocity) > .1) { velocity *= .6; update(); } else if (velocity) { velocity = 0; update(); } }, 90);
  } else {
    flavors.forEach(function (s) { s.style.setProperty('--t', 1); s.style.setProperty('--l', 0); });
    words.forEach(function (w) { w.classList.add('on'); });
  }
  update();

  /* ---------- Fare ile eğilme + malzeme parallax ---------- */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      var nx = e.clientX / window.innerWidth - .5, ny = e.clientY / window.innerHeight - .5;
      document.documentElement.style.setProperty('--mx', (nx * 18) + 'deg');
      document.documentElement.style.setProperty('--my', (-ny * 14) + 'deg');
      document.documentElement.style.setProperty('--mx2', nx);
      document.documentElement.style.setProperty('--my2', ny);
    });
    // Manyetik butonlar
    $$('.magnetic').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .25) + 'px,' + ((e.clientY - r.top - r.height / 2) * .35) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- Kademeli belirme (.rv) ---------- */
  var rvIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); rvIO.unobserve(en.target); }
    });
  }, { threshold: .15 });
  $$('.rv').forEach(function (el) { reduce ? el.classList.add('in') : rvIO.observe(el); });

  /* ---------- Sayaçlar ---------- */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      cio.unobserve(en.target);
      var el = en.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
      (function tick(now) {
        var k = clamp((now - t0) / 1400, 0, 1);
        el.textContent = Math.round(end * ease(k)) + suf;
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------- Bülten formu (sunucu yok: demo) ---------- */
  var form = $('#newsForm'), box = $('#formAlert');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    box.hidden = false; box.textContent = 'Teşekkürler! Kaydınız alındı.';
    form.reset();
    setTimeout(function () { box.hidden = true; }, 5000);
  });

  /* ---------- Açılış perdesi ---------- */
  window.addEventListener('load', function () {
    setTimeout(function () { document.body.classList.remove('is-loading'); }, reduce ? 0 : 1100);
  });
})();
