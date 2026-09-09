/* Otra Conversacion - JS del sitio. Sin dependencias, sin cookies, sin trackers. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ── enlaces antiguos con almohadilla (#/episodios) ─ */
  (function () {
    var map = {
      'inicio': '/', 'episodios': '/episodios/', 'glosario': '/glosario/',
      'publicita': '/publicita/', 'se-invitado': '/se-invitado/', 'blog': '/blog/',
      'contacto': '/contacto/', 'newsletter': '/contacto/', 'invitados': '/episodios/',
      'temporadas': '/episodios/'
    };
    var go = function () {
      var m = /^#\/([a-z0-9-]+)/i.exec(location.hash);
      if (m && map[m[1]] && location.pathname !== map[m[1]]) {
        location.replace(map[m[1]]);
      }
    };
    window.addEventListener('hashchange', go);
    go();
  })();

  /* ── navegación móvil ─────────────────────────────── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    var setOpen = function (open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('open', open);
      document.body.style.overflow = open && window.innerWidth <= 1180 ? 'hidden' : '';
    };
    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1180) setOpen(false);
    });
  }

  /* ── barra superior al hacer scroll ───────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── marquesinas ──────────────────────────────────── */
  document.querySelectorAll('.mq .track').forEach(function (el) {
    var txt = el.getAttribute('data-mq') || '';
    var h = '';
    for (var i = 0; i < 4; i++) h += '<span' + (i % 2 ? ' class="o"' : '') + '>' + txt + '</span>';
    el.innerHTML = h + h;
  });

  /* ── titulares partidos en palabras ───────────────── */
  if (!reduce) {
    document.querySelectorAll('.ws').forEach(function (el) {
      var idx = 0;
      var split = function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (part) {
            if (part === '' || /^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'w';
            s.style.setProperty('--wi', idx++);
            s.textContent = part;
            frag.appendChild(s);
          });
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1 && !node.classList.contains('w')) {
          Array.prototype.slice.call(node.childNodes).forEach(split);
        }
      };
      Array.prototype.slice.call(el.childNodes).forEach(split);
    });
  }

  /* ── apariciones al hacer scroll ──────────────────── */
  var animated = document.querySelectorAll('.rv, .ws');
  if (!('IntersectionObserver' in window) || reduce) {
    animated.forEach(function (e) { e.classList.add('in'); });
  } else {
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('in'); ob.unobserve(x.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });
    /* Red de seguridad: si algo no llega a intersecar, se muestra igualmente. */
    setTimeout(function () { animated.forEach(function (e) { e.classList.add('in'); }); }, 2500);
    animated.forEach(function (e) { ob.observe(e); });
  }

  /* ── contadores ───────────────────────────────────── */
  var counters = document.querySelectorAll('.cnt');
  var runCounter = function (el) {
    var n = parseFloat(el.getAttribute('data-n')), t0 = null, d = 1400;
    var step = function (t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / d, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))).toLocaleString(document.documentElement.lang === 'en' ? 'en-GB' : 'es-ES');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window) || reduce) {
    counters.forEach(function (e) { e.textContent = e.getAttribute('data-n'); });
  } else {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (e) { co.observe(e); });
  }

  /* ── fachada de YouTube: nada se carga hasta el clic ─ */
  document.querySelectorAll('[data-yt]').forEach(function (wrap) {
    var load = function () {
      var id = wrap.getAttribute('data-yt');
      var list = wrap.getAttribute('data-list');
      var f = document.createElement('iframe');
      f.src = list
        ? 'https://www.youtube-nocookie.com/embed/videoseries?list=' + list + '&autoplay=1'
        : 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = wrap.getAttribute('data-title') || 'Otra Conversación';
      f.loading = 'lazy';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.setAttribute('allowfullscreen', '');
      wrap.innerHTML = '';
      wrap.appendChild(f);
    };
    var btn = wrap.querySelector('.playbtn');
    if (btn) btn.addEventListener('click', load);
  });

  /* ── formularios ──────────────────────────────────── */
  document.querySelectorAll('form[data-api]').forEach(function (form) {
    var status = form.querySelector('.formstatus');
    var button = form.querySelector('button[type="submit"]');
    var say = function (kind, msg) {
      if (!status) return;
      status.className = 'formstatus on ' + kind;
      status.textContent = msg;
      status.setAttribute('role', 'status');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var en = document.documentElement.lang === 'en';
      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = typeof v === 'string' ? v : ''; });
      data.form = form.getAttribute('data-form') || 'contacto';
      data.lang = document.documentElement.lang || 'es';
      data.page = location.pathname;
      if (button) { button.disabled = true; }
      var original = button ? button.textContent : '';
      if (button) button.textContent = en ? 'Sending…' : 'Enviando…';
      fetch(form.getAttribute('data-api'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        return r.json().catch(function () { return { ok: r.ok }; });
      }).then(function (res) {
        if (res && res.ok) {
          form.reset();
          say('ok', en
            ? 'Thank you. Your message is with us and we reply within 48 hours.'
            : 'Gracias. Tu mensaje ya está con nosotros y respondemos en menos de 48 horas.');
        } else {
          throw new Error((res && res.error) || 'failed');
        }
      }).catch(function () {
        say('err', en
          ? 'Something went wrong. Write to us directly at jesus@otraconversacion.com.'
          : 'Algo ha fallado. Escríbenos directamente a jesus@otraconversacion.com.');
      }).then(function () {
        if (button) { button.disabled = false; button.textContent = original; }
      });
    });
  });
})();
