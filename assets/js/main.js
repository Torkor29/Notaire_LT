/* Office notarial de Combrit — comportements de l'interface */
(function () {
  'use strict';

  /* ---- Menu mobile ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Fermer' : 'Menu';
    });
  }

  /* ---- Accordéon des domaines ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.domain__head'), function (head) {
    head.addEventListener('click', function () {
      var domain = head.closest('.domain');
      var open = domain.getAttribute('data-open') === 'true';
      domain.setAttribute('data-open', open ? 'false' : 'true');
      head.setAttribute('aria-expanded', String(!open));
    });
  });

  /* ---- Année du pied de page ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Offres d'emploi ---- */
  var container = document.getElementById('offres');
  if (container) {
    chargerDonnees('assets/data/offres.json', 'offres').then(afficherOffres, function () {
      container.innerHTML = messageErreur('les offres d’emploi');
    });
  }

  function afficherOffres(donnees) {
    var offres = donnees.filter(function (o) {
      return o && o.visible !== false && o.titre;
    });

    offres.sort(function (a, b) {
      return String(b.date || '').localeCompare(String(a.date || ''));
    });

    if (!offres.length) {
      container.innerHTML =
        '<div class="empty-state">' +
        '<h3>Aucun poste ouvert actuellement</h3>' +
        '<p>L’office ne recrute pas dans l’immédiat. Les candidatures spontanées restent toutefois étudiées : adressez votre CV et quelques lignes de motivation à ' +
        '<a href="mailto:marine.letreut@notaires.fr?subject=Candidature%20spontanee">marine.letreut@notaires.fr</a>.</p>' +
        '</div>';
    } else {
    var html = offres.map(function (o) {
      var meta = [o.contrat, o.lieu, o.temps, formatDate(o.date)]
        .filter(Boolean)
        .map(function (m) { return '<span>' + escapeHtml(m) + '</span>'; })
        .join('');

      var missions = Array.isArray(o.missions) && o.missions.length
        ? '<ul>' + o.missions.map(function (m) {
            return '<li>' + escapeHtml(m) + '</li>';
          }).join('') + '</ul>'
        : '';

      var profil = o.profil
        ? '<p style="margin-top:1rem"><strong style="font-weight:500">Profil :</strong> ' + escapeHtml(o.profil) + '</p>'
        : '';

      var sujet = encodeURIComponent('Candidature — ' + o.titre);

      return '<article class="offer">' +
        '<div>' +
          '<h3>' + escapeHtml(o.titre) + '</h3>' +
          '<div class="offer__meta">' + meta + '</div>' +
          (o.resume ? '<p>' + escapeHtml(o.resume) + '</p>' : '') +
          missions + profil +
        '</div>' +
        '<div class="offer__action">' +
          '<a class="btn" href="mailto:marine.letreut@notaires.fr?subject=' + sujet + '">Postuler</a>' +
        '</div>' +
      '</article>';
    }).join('');

    container.innerHTML = html;
    }
  }

  /* ---- Annonces immobilières ---- */
  var listingsEl = document.getElementById('annonces');
  if (listingsEl) {
    chargerDonnees('assets/data/annonces.json', 'annonces').then(afficherAnnonces, function () {
      listingsEl.innerHTML = messageErreur('les biens à vendre');
    });
  }

  function afficherAnnonces(donnees) {
    var biens = donnees.filter(function (a) {
      return a && a.visible !== false && a.titre;
    });

    biens.sort(trierBiens);

    var etat = { type: '', commune: '' };
    var countEl = document.querySelector('[data-count]');
    var selectEl = document.querySelector('[data-filter-commune]');

    if (selectEl) {
      var communes = [];
      biens.forEach(function (a) {
        if (a.commune && communes.indexOf(a.commune) === -1) { communes.push(a.commune); }
      });
      communes.sort(function (a, b) { return a.localeCompare(b, 'fr'); });
      communes.forEach(function (c) {
        var opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        selectEl.appendChild(opt);
      });
      selectEl.addEventListener('change', function () {
        etat.commune = selectEl.value;
        rendreAnnonces();
      });
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-filter-type]'), function (chip) {
      chip.addEventListener('click', function () {
        etat.type = chip.getAttribute('data-filter-type');
        Array.prototype.forEach.call(document.querySelectorAll('[data-filter-type]'), function (c) {
          c.setAttribute('aria-pressed', String(c === chip));
        });
        rendreAnnonces();
      });
    });

    rendreAnnonces();

    function rendreAnnonces() {
      var visibles = biens.filter(function (a) {
        return (!etat.type || a.type === etat.type)
          && (!etat.commune || a.commune === etat.commune);
      });

      if (countEl) {
        countEl.textContent = visibles.length === 0 ? 'Aucun bien'
          : visibles.length === 1 ? '1 bien' : visibles.length + ' biens';
      }

      if (!visibles.length) {
        listingsEl.innerHTML =
          '<div class="empty-state" style="grid-column:1/-1">' +
          '<h3>Aucun bien ne correspond à cette recherche</h3>' +
          '<p>Élargissez les critères, ou faites-nous part de votre projet : nous vous préviendrons dès qu’un bien correspondant nous sera confié. ' +
          '<a href="contact.html">Nous écrire</a>.</p>' +
          '</div>';
        return;
      }

      listingsEl.innerHTML = visibles.map(carteAnnonce).join('');
    }

  }

  function carteAnnonce(a) {
    var media = a.photo
      ? '<div class="listing__media"><img src="' + escapeHtml(a.photo) + '" alt="' + escapeHtml(a.titre) + ' à ' + escapeHtml(a.commune || '') + '" loading="lazy"></div>'
      : '<div class="listing__media listing__media--empty"><span>' + escapeHtml(a.type || 'Bien') + '</span></div>';

    var flag = '';
    if (a.statut && a.statut !== 'Disponible') {
      flag = '<span class="listing__flag' + (a.statut === 'Vendu' ? ' listing__flag--sold' : '') + '">' + escapeHtml(a.statut) + '</span>';
    }

    var specs = [];
    if (a.surface) { specs.push(a.surface + ' m² habitables'); }
    if (a.terrain) { specs.push('terrain ' + formatNombre(a.terrain) + ' m²'); }
    if (a.pieces) { specs.push(a.pieces + ' pièces'); }
    if (a.chambres) { specs.push(a.chambres + (a.chambres > 1 ? ' chambres' : ' chambre')); }
    var specsHtml = specs.length
      ? '<ul class="listing__specs">' + specs.map(function (s) { return '<li>' + escapeHtml(s) + '</li>'; }).join('') + '</ul>'
      : '';

    var prix = a.prix
      ? formatNombre(a.prix) + ' €'
      : 'Prix : nous consulter';

    var dpe = (a.dpe || a.ges)
      ? '<div class="dpe"><span>DPE</span><b data-c="' + escapeHtml(a.dpe || 'NS') + '">' + escapeHtml(a.dpe || 'NS') + '</b>' +
        '<span style="margin-left:.5rem">GES</span><b data-c="' + escapeHtml(a.ges || 'NS') + '">' + escapeHtml(a.ges || 'NS') + '</b></div>'
      : '';

    var copro = a.copropriete
      ? '<p style="font-size:.82rem;color:var(--ink-faint)">' + escapeHtml(a.copropriete) + '</p>'
      : '';

    var sujet = encodeURIComponent('Bien réf. ' + (a.ref || '') + ' — ' + a.titre);
    var action = a.statut === 'Vendu'
      ? '<span class="listing__ref" style="margin:0">Vendu par l’office</span>'
      : '<a class="listing__link" href="mailto:marine.letreut@notaires.fr?subject=' + sujet + '">Demander le dossier</a>';

    return '<article class="listing">' +
      '<div class="listing__media-wrap" style="position:relative">' + media + flag + '</div>' +
      '<div class="listing__body">' +
        '<p class="listing__ref">' + escapeHtml([a.ref ? 'Réf. ' + a.ref : '', a.commune].filter(Boolean).join(' · ')) + '</p>' +
        '<h3>' + escapeHtml(a.titre) + '</h3>' +
        '<p class="listing__price">' + escapeHtml(prix) +
          (a.honoraires ? '<small>' + escapeHtml(a.honoraires) + '</small>' : '') +
        '</p>' +
        specsHtml +
        (a.description ? '<p>' + escapeHtml(a.description) + '</p>' : '') +
        copro +
        '<div class="listing__foot">' + dpe + action + '</div>' +
      '</div>' +
    '</article>';
  }

  /* ---- Biens mis en avant sur la page d'accueil ---- */
  var accueilEl = document.getElementById('annonces-accueil');
  if (accueilEl) {
    chargerDonnees('assets/data/annonces.json', 'annonces').then(function (donnees) {
      var limite = Number(accueilEl.getAttribute('data-limite')) || 3;
      var biens = donnees
        .filter(function (a) { return a && a.visible !== false && a.titre && a.statut !== 'Vendu'; })
        .sort(trierBiens)
        .slice(0, limite);
      accueilEl.innerHTML = biens.length
        ? biens.map(carteAnnonce).join('')
        : '<div class="empty-state" style="grid-column:1/-1"><h3>Aucun bien disponible pour le moment</h3>' +
          '<p>Faites-nous part de votre projet : nous vous préviendrons dès qu’un bien correspondant nous sera confié. ' +
          '<a href="contact.html">Nous écrire</a>.</p></div>';
    }, function () {
      accueilEl.innerHTML = messageErreur('les biens à vendre');
    });
  }

  /* ---- Apparition au défilement ---- */
  var aReveler = document.querySelectorAll('.reveal');
  if (aReveler.length) {
    var anime = window.matchMedia('(prefers-reduced-motion: reduce)').matches === false
      && 'IntersectionObserver' in window;

    if (!anime) {
      Array.prototype.forEach.call(aReveler, function (el) { el.classList.add('is-in'); });
    } else {
      var observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (entree) {
          if (!entree.isIntersecting) { return; }
          entree.target.classList.add('is-in');
          observateur.unobserve(entree.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(aReveler, function (el) { observateur.observe(el); });
    }
  }

  /* ---- Formulaire de contact (sans serveur : ouverture du client de messagerie) ---- */
  var form = document.querySelector('[data-contact-fallback]');
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) { return; }
      event.preventDefault();

      var get = function (name) {
        var field = form.elements[name];
        return field ? String(field.value || '').trim() : '';
      };

      var corps = [
        'Nom : ' + get('nom'),
        'Courriel : ' + get('email'),
        'Téléphone : ' + (get('telephone') || 'non renseigné'),
        'Objet : ' + get('objet'),
        '',
        get('message')
      ].join('\n');

      window.location.href = 'mailto:marine.letreut@notaires.fr'
        + '?subject=' + encodeURIComponent('Demande via le site — ' + get('objet'))
        + '&body=' + encodeURIComponent(corps);
    });
  }

  /* Disponibles d'abord, puis sous compromis, puis vendus ; à statut égal,
     du plus récent au plus ancien. */
  function trierBiens(a, b) {
    var rang = { 'Disponible': 0, 'Sous compromis': 1, 'Vendu': 2 };
    var ra = rang[a.statut] === undefined ? 1 : rang[a.statut];
    var rb = rang[b.statut] === undefined ? 1 : rang[b.statut];
    if (ra !== rb) { return ra - rb; }
    return String(b.date || '').localeCompare(String(a.date || ''));
  }

  function chargerDonnees(url, cle) {
    if (window.fetch) {
      return fetch(url, { cache: 'no-cache' }).then(function (r) {
        if (!r.ok) { throw new Error(r.status); }
        return r.json();
      }).then(function (d) { return normaliser(d, cle); });
    }
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function () {
        try { resolve(normaliser(JSON.parse(xhr.responseText), cle)); } catch (e) { reject(e); }
      };
      xhr.onerror = reject;
      xhr.send();
    });
  }

  /* Le fichier peut être une liste, ou un objet { "annonces": [...] } tel que
     l'écrit l'interface de gestion. Les deux formes sont acceptées. */
  function normaliser(donnees, cle) {
    if (Array.isArray(donnees)) { return donnees; }
    if (donnees && Array.isArray(donnees[cle])) { return donnees[cle]; }
    return [];
  }

  function messageErreur(quoi) {
    return '<div class="empty-state" style="grid-column:1/-1">' +
      '<h3>Contenu momentanément indisponible</h3>' +
      '<p>Impossible de charger ' + quoi + '. Merci de réessayer dans un instant, ou de nous joindre au ' +
      '<a href="tel:+33279400212">02 79 40 02 12</a>.</p></div>';
  }

  function formatNombre(n) {
    return Number(n).toLocaleString('fr-FR');
  }

  function formatDate(value) {
    if (!value) { return ''; }
    var d = new Date(value);
    if (isNaN(d.getTime())) { return ''; }
    return 'Publiée le ' + d.toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
