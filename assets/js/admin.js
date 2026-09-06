/* Espace de gestion — prépare les fichiers de données du site.
   Tout se passe dans le navigateur : rien n'est envoyé en ligne. */
(function () {
  'use strict';

  var CLE = 'office-combrit-brouillon';

  var SCHEMAS = {
    annonces: {
      titreSingulier: 'bien',
      fichier: 'annonces.json',
      cle: 'annonces',
      champs: [
        { cle: 'titre', label: 'Intitulé du bien', type: 'text', large: true, requis: true, aide: 'Ex. : Maison de pêcheur, à deux pas du port' },
        { cle: 'ref', label: 'Référence du mandat', type: 'text' },
        { cle: 'commune', label: 'Commune', type: 'text', requis: true },
        { cle: 'type', label: 'Type de bien', type: 'select', options: ['Maison', 'Appartement', 'Terrain', 'Local', 'Autre'] },
        { cle: 'statut', label: 'Statut', type: 'select', options: ['Disponible', 'Sous compromis', 'Vendu'] },
        { cle: 'prix', label: 'Prix en euros', type: 'number', aide: 'Sans espace ni symbole. Laisser vide pour « nous consulter ».' },
        { cle: 'honoraires', label: 'Mention des honoraires', type: 'text', large: true, aide: 'Obligatoire : prix honoraires inclus et qui les supporte.' },
        { cle: 'surface', label: 'Surface habitable (m²)', type: 'number' },
        { cle: 'terrain', label: 'Terrain (m²)', type: 'number' },
        { cle: 'pieces', label: 'Pièces', type: 'number' },
        { cle: 'chambres', label: 'Chambres', type: 'number' },
        { cle: 'dpe', label: 'Classe DPE', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'NS'] },
        { cle: 'ges', label: 'Classe GES', type: 'select', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'NS'] },
        { cle: 'description', label: 'Description', type: 'textarea', large: true },
        { cle: 'copropriete', label: 'Mentions de copropriété', type: 'textarea', large: true, aide: 'Nombre de lots, charges annuelles prévisionnelles, procédure en cours. À laisser vide si le bien n\'est pas en copropriété.' },
        { cle: 'photo', label: 'Photo', type: 'text', large: true, aide: 'Chemin du fichier, ex. assets/img/2026-021.jpg' },
        { cle: 'date', label: 'Date de mise en ligne', type: 'date' },
        { cle: 'visible', label: 'Afficher ce bien sur le site', type: 'checkbox' }
      ],
      defauts: function () {
        return {
          ref: '', titre: '', commune: 'Combrit Sainte-Marine', type: 'Maison',
          statut: 'Disponible', prix: '', honoraires: "Honoraires de négociation inclus, à la charge de l'acquéreur : 4,5 % TTC du prix hors honoraires",
          surface: '', terrain: '', pieces: '', chambres: '', dpe: 'D', ges: 'B',
          description: '', photo: '', copropriete: '', date: aujourdhui(), visible: true
        };
      },
      resume: function (a) {
        return [a.commune, a.type, a.statut].filter(Boolean).join(' · ');
      }
    },
    offres: {
      titreSingulier: 'poste',
      fichier: 'offres.json',
      cle: 'offres',
      champs: [
        { cle: 'titre', label: 'Intitulé du poste', type: 'text', large: true, requis: true },
        { cle: 'contrat', label: 'Contrat', type: 'select', options: ['CDI', 'CDD', 'Alternance', 'Stage', 'Autre'] },
        { cle: 'lieu', label: 'Lieu', type: 'text' },
        { cle: 'temps', label: 'Temps de travail', type: 'text' },
        { cle: 'date', label: 'Date de publication', type: 'date' },
        { cle: 'resume', label: 'Présentation', type: 'textarea', large: true },
        { cle: 'missions', label: 'Missions', type: 'lignes', large: true, aide: 'Une mission par ligne.' },
        { cle: 'profil', label: 'Profil recherché', type: 'textarea', large: true },
        { cle: 'visible', label: 'Afficher cette offre sur le site', type: 'checkbox' }
      ],
      defauts: function () {
        return {
          titre: '', contrat: 'CDI', lieu: 'Combrit Sainte-Marine', temps: 'Temps plein',
          date: aujourdhui(), resume: '', missions: [], profil: '', visible: true
        };
      },
      resume: function (o) {
        return [o.contrat, o.lieu].filter(Boolean).join(' · ');
      }
    }
  };

  var etat = { annonces: [], offres: [] };
  var selection = { annonces: 0, offres: 0 };
  var ongletActif = 'annonces';

  /* ---- Onglets ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (tab) {
    tab.addEventListener('click', function () {
      ongletActif = tab.getAttribute('data-tab');
      Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) {
        t.setAttribute('aria-selected', String(t === tab));
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-pane]'), function (pane) {
        pane.hidden = pane.getAttribute('data-pane') !== ongletActif;
      });
    });
  });

  /* ---- Boutons globaux ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-new]'), function (b) {
    b.addEventListener('click', function () {
      var type = b.getAttribute('data-new');
      etat[type].unshift(SCHEMAS[type].defauts());
      selection[type] = 0;
      enregistrer();
      rendre(type);
    });
  });

  document.querySelector('[data-export]').addEventListener('click', function () {
    exporter(ongletActif === 'offres' ? 'offres' : 'annonces');
  });

  document.querySelector('[data-reset]').addEventListener('click', function () {
    if (!window.confirm('Abandonner toutes les modifications non publiées et revenir au contenu actuellement en ligne ?')) { return; }
    try { window.localStorage.removeItem(CLE); } catch (e) {}
    window.location.reload();
  });

  /* ---- Rendu ---- */
  function rendre(type) {
    rendreListe(type);
    rendreFormulaire(type);
    majBandeau();
  }

  function rendreListe(type) {
    var cible = document.querySelector('[data-list="' + type + '"]');
    var items = etat[type];
    if (!items.length) {
      cible.innerHTML = '<p style="padding:1.1rem;margin:0;color:var(--ink-faint);font-size:.9rem">Aucun ' + SCHEMAS[type].titreSingulier + ' pour le moment.</p>';
      return;
    }
    cible.innerHTML = items.map(function (item, i) {
      return '<button class="admin-item" type="button" data-index="' + i + '"' +
        (i === selection[type] ? ' aria-current="true"' : '') +
        (item.visible === false ? ' data-hidden="true"' : '') + '>' +
        '<strong>' + echapper(item.titre || 'Sans titre') + '</strong>' +
        '<span>' + echapper(SCHEMAS[type].resume(item) || '') + (item.visible === false ? ' · masqué' : '') + '</span>' +
        '</button>';
    }).join('');
    Array.prototype.forEach.call(cible.querySelectorAll('.admin-item'), function (b) {
      b.addEventListener('click', function () {
        selection[type] = Number(b.getAttribute('data-index'));
        rendre(type);
      });
    });
  }

  function rendreFormulaire(type) {
    var panneau = document.querySelector('[data-form="' + type + '"]');
    var item = etat[type][selection[type]];

    if (!item) {
      panneau.innerHTML = '<h2>Rien à modifier</h2><p class="hint">Cliquez sur « Ajouter » pour créer un ' + SCHEMAS[type].titreSingulier + '.</p>';
      majApercu(null);
      return;
    }

    var champs = SCHEMAS[type].champs.map(function (c) {
      return '<div class="field"' + (c.large ? ' style="grid-column:1/-1"' : '') + '>' + champHtml(c, item[c.cle]) + '</div>';
    }).join('');

    panneau.innerHTML =
      '<h2>' + echapper(item.titre || 'Nouveau ' + SCHEMAS[type].titreSingulier) + '</h2>' +
      '<form style="grid-template-columns:1fr 1fr" data-edit>' + champs + '</form>' +
      '<div class="btn-row" style="margin-top:1.8rem">' +
        '<button class="btn btn--ghost btn--small" type="button" data-duplicate>Dupliquer</button>' +
        '<button class="btn btn--ghost btn--danger btn--small" type="button" data-delete>Supprimer</button>' +
      '</div>';

    var form = panneau.querySelector('[data-edit]');
    form.addEventListener('input', function (e) {
      var cle = e.target.name;
      if (!cle) { return; }
      var champ = trouverChamp(type, cle);
      item[cle] = lireValeur(champ, e.target);
      enregistrer();
      rendreListe(type);
      panneau.querySelector('h2').textContent = item.titre || 'Nouveau ' + SCHEMAS[type].titreSingulier;
      if (type === 'annonces') { majApercu(item); }
    });

    panneau.querySelector('[data-duplicate]').addEventListener('click', function () {
      var copie = JSON.parse(JSON.stringify(item));
      copie.titre = (copie.titre || '') + ' (copie)';
      copie.ref = '';
      etat[type].splice(selection[type] + 1, 0, copie);
      selection[type] = selection[type] + 1;
      enregistrer();
      rendre(type);
    });

    panneau.querySelector('[data-delete]').addEventListener('click', function () {
      if (!window.confirm('Supprimer définitivement « ' + (item.titre || 'cet élément') + ' » ?')) { return; }
      etat[type].splice(selection[type], 1);
      selection[type] = Math.max(0, selection[type] - 1);
      enregistrer();
      rendre(type);
    });

    if (type === 'annonces') { majApercu(item); }
  }

  function champHtml(c, valeur) {
    var id = 'f-' + c.cle;
    var aide = c.aide ? '<p class="hint" style="margin:.2rem 0 0">' + echapper(c.aide) + '</p>' : '';

    if (c.type === 'checkbox') {
      return '<label class="consent" style="margin-top:.5rem">' +
        '<input type="checkbox" name="' + c.cle + '"' + (valeur === false ? '' : ' checked') + '>' +
        '<span>' + echapper(c.label) + '</span></label>' + aide;
    }

    var label = '<label for="' + id + '">' + echapper(c.label) + (c.requis ? ' *' : '') + '</label>';
    var v = valeur === undefined || valeur === null ? '' : valeur;

    if (c.type === 'select') {
      return label + '<select id="' + id + '" name="' + c.cle + '">' +
        c.options.map(function (o) {
          return '<option' + (String(v) === o ? ' selected' : '') + '>' + echapper(o) + '</option>';
        }).join('') + '</select>' + aide;
    }
    if (c.type === 'textarea') {
      return label + '<textarea id="' + id + '" name="' + c.cle + '">' + echapper(v) + '</textarea>' + aide;
    }
    if (c.type === 'lignes') {
      return label + '<textarea id="' + id + '" name="' + c.cle + '">' + echapper((v || []).join('\n')) + '</textarea>' + aide;
    }
    return label + '<input id="' + id + '" name="' + c.cle + '" type="' + (c.type === 'number' ? 'number' : c.type) + '" value="' + echapper(v) + '">' + aide;
  }

  function lireValeur(champ, el) {
    if (!champ) { return el.value; }
    if (champ.type === 'checkbox') { return el.checked; }
    if (champ.type === 'lignes') {
      return el.value.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    }
    if (champ.type === 'number') {
      return el.value === '' ? '' : Number(el.value);
    }
    return el.value;
  }

  function trouverChamp(type, cle) {
    var trouve = null;
    SCHEMAS[type].champs.forEach(function (c) { if (c.cle === cle) { trouve = c; } });
    return trouve;
  }

  function majApercu(item) {
    var bloc = document.querySelector('[data-preview]');
    var cible = document.querySelector('[data-preview-target]');
    if (!bloc || !cible || !window.OfficeUI) { return; }
    if (!item) { bloc.hidden = true; return; }
    bloc.hidden = false;
    cible.innerHTML = window.OfficeUI.carteAnnonce(nettoyer(item));
  }

  /* ---- Export ---- */
  function exporter(type) {
    var schema = SCHEMAS[type];
    var enveloppe = {};
    enveloppe[schema.cle] = etat[type].map(nettoyer);
    telecharger(schema.fichier, JSON.stringify(enveloppe, null, 2) + '\n');
    toast('Fichier ' + schema.fichier + ' téléchargé. Remplacez assets/data/' + schema.fichier + ' chez votre hébergeur.');
  }

  function nettoyer(item) {
    var copie = {};
    Object.keys(item).forEach(function (k) {
      var v = item[k];
      if (typeof v === 'string') { v = v.trim(); }
      if (v === '' || v === undefined || v === null) { return; }
      if (Array.isArray(v) && !v.length) { return; }
      copie[k] = v;
    });
    return copie;
  }

  function telecharger(nom, contenu) {
    var blob = new Blob([contenu], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nom;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  /* ---- Brouillon local ---- */
  function brouillon() {
    try {
      var brut = window.localStorage.getItem(CLE);
      if (!brut) { return null; }
      var sauvegarde = JSON.parse(brut);
      if (sauvegarde && sauvegarde.annonces && sauvegarde.offres) {
        return { annonces: sauvegarde.annonces, offres: sauvegarde.offres, date: sauvegarde.date };
      }
    } catch (e) {}
    return null;
  }

  function lireFichier(url, cle) {
    return fetch(url, { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) { throw new Error(r.status); } return r.json(); })
      .then(function (d) { return Array.isArray(d) ? d : (d && d[cle]) || []; });
  }

  /* Charge les fichiers publiés, sauf si un brouillon local plus récent existe.
     Si les fichiers ne sont pas lisibles (page ouverte sans serveur web),
     l'import manuel prend le relais. */
  function initialiser() {
    var local = brouillon();
    if (local) {
      etat = local;
      demarrer();
      return;
    }
    Promise.all([
      lireFichier('assets/data/annonces.json', 'annonces'),
      lireFichier('assets/data/offres.json', 'offres')
    ]).then(function (res) {
      etat = { annonces: res[0], offres: res[1] };
      demarrer();
    }, function () {
      etat = { annonces: [], offres: [] };
      demarrer();
      var zone = document.querySelector('[data-import]');
      if (zone) { zone.hidden = false; }
    });
  }

  function demarrer() {
    rendre('annonces');
    rendre('offres');
  }

  function enregistrer() {
    etat.date = new Date().toISOString();
    try {
      window.localStorage.setItem(CLE, JSON.stringify({
        annonces: etat.annonces, offres: etat.offres, date: etat.date
      }));
    } catch (e) {}
    majBandeau();
  }

  function majBandeau() {
    var bandeau = document.querySelector('[data-draft]');
    if (!bandeau) { return; }
    bandeau.hidden = !etat.date;
    bandeau.classList.add('notice--draft');
    var quand = document.querySelector('[data-draft-date]');
    if (quand && etat.date) {
      var d = new Date(etat.date);
      quand.textContent = 'Dernière modification le ' + d.toLocaleDateString('fr-FR') +
        ' à ' + d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + '.';
    }
  }

  /* ---- Divers ---- */
  function toast(message) {
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 5000);
  }

  function aujourdhui() {
    return new Date().toISOString().slice(0, 10);
  }

  function echapper(v) {
    return String(v === undefined || v === null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ---- Import manuel (secours) ---- */
  var importEl = document.querySelector('[data-import-input]');
  if (importEl) {
    importEl.addEventListener('change', function () {
      var fichier = importEl.files && importEl.files[0];
      if (!fichier) { return; }
      var lecteur = new FileReader();
      lecteur.onload = function () {
        try {
          var d = JSON.parse(lecteur.result);
          var type = /offre/i.test(fichier.name) ? 'offres' : 'annonces';
          etat[type] = Array.isArray(d) ? d : (d[type] || []);
          selection[type] = 0;
          enregistrer();
          rendre(type);
          toast(fichier.name + ' importé.');
        } catch (e) {
          window.alert('Ce fichier n’a pas pu être lu : ' + e.message);
        }
      };
      lecteur.readAsText(fichier);
    });
  }

  initialiser();
})();
