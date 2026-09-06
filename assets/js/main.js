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
    var offres = (window.OFFRES || []).filter(function (o) {
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

  /* ---- Formulaire de contact (sans serveur : ouverture du client de messagerie) ---- */
  var form = document.querySelector('[data-contact-form]');
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
