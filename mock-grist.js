/*
 * Mock minimal de l'API Grist, charge uniquement par index.html?demo=1.
 * Il sert a verifier le rendu du widget (tuiles, badges de couleur, recherche,
 * regroupement, bandeaux) sans avoir besoin d'un document Grist reel.
 * Ce fichier n'est jamais utilise dans Grist.
 */
(function () {
  "use strict";

  const TABLE_ID = `BDD_Raccourcis`;

  const CHOIX = [`Suivi énergie`, `Patrimoine`, `Travaux`, `Référentiel`];

  const OPTIONS_TYPE = {
    choices: CHOIX,
    choiceOptions: {
      "Suivi énergie": { fillColor: `#1a73c7`, textColor: `#ffffff` },
      "Patrimoine": { fillColor: `#2e7d52`, textColor: `#ffffff` },
      "Travaux": { fillColor: `#f2c744`, textColor: `#262633` },
      "Référentiel": { fillColor: `#6b4fbb`, textColor: `#ffffff` },
    },
  };

  const LIGNES = [
    { id: 1, Nom: `Consommations électriques`, Detail: `Relevés mensuels par bâtiment`, Picto: `⚡`, Type: `Suivi énergie`, Lien: `https://docs.getgrist.com/exemple/p/2` },
    { id: 2, Nom: `Eau`, Detail: `Index des compteurs`, Picto: `💧`, Type: `Suivi énergie`, Lien: `https://docs.getgrist.com/exemple/p/3` },
    { id: 3, Nom: `Gaz`, Detail: `Suivi des chaufferies`, Picto: `🔥`, Type: `Suivi énergie`, Lien: `https://docs.getgrist.com/exemple/p/4` },
    { id: 4, Nom: `Bâtiments`, Detail: `Fiche descriptive et surfaces`, Picto: `🏢`, Type: `Patrimoine`, Lien: `https://docs.getgrist.com/exemple/p/5` },
    { id: 5, Nom: `Salles`, Detail: `Occupation et usages`, Picto: `🚪`, Type: `Patrimoine`, Lien: `https://docs.getgrist.com/exemple/p/6` },
    { id: 6, Nom: `Diagnostics et audits énergétiques réglementaires`, Detail: `Simulations thermiques dynamiques et rapports associés`, Picto: `📊`, Type: `Patrimoine`, Lien: `https://docs.getgrist.com/exemple/p/7` },
    { id: 7, Nom: `Programmation`, Detail: `Opérations et échéances`, Picto: `🛠️`, Type: `Travaux`, Lien: `https://docs.getgrist.com/exemple/p/8` },
    { id: 8, Nom: `Financements`, Detail: `Dossiers déposés et notifiés`, Picto: `💶`, Type: `Travaux`, Lien: `https://docs.getgrist.com/exemple/p/9` },
    { id: 9, Nom: `GTB`, Detail: `Points de supervision`, Picto: `🖥️`, Type: `Référentiel`, Lien: `https://docs.getgrist.com/exemple/p/10` },
    { id: 10, Nom: `Plan de comptage`, Detail: `Inventaire des compteurs`, Picto: `🔌`, Type: `Référentiel`, Lien: `https://docs.getgrist.com/exemple/p/11` },
    { id: 11, Nom: `Notes de version`, Detail: `Historique des évolutions du document`, Picto: `📝`, Type: ``, Lien: `https://docs.getgrist.com/exemple/p/12` },
    { id: 12, Nom: `Tableau de bord`, Detail: `Lien à renseigner`, Picto: `📈`, Type: `Suivi énergie`, Lien: `` },
  ];

  const MAPPINGS = { Nom: `Nom`, Detail: `Detail`, Picto: `Picto`, Type: `Type`, Lien: `Lien` };

  function colonnes(lignes, cles) {
    const sortie = { id: lignes.map(function (l) { return l.id; }) };
    cles.forEach(function (cle) {
      sortie[cle] = lignes.map(function (l) { return l[cle]; });
    });
    return sortie;
  }

  const META_TABLES = { id: [7], tableId: [TABLE_ID] };

  const META_COLONNES = {
    id: [70, 71, 72, 73, 74],
    parentId: [7, 7, 7, 7, 7],
    colId: [`Nom`, `Detail`, `Picto`, `Type`, `Lien`],
    widgetOptions: [`{}`, `{}`, `{}`, JSON.stringify(OPTIONS_TYPE), `{}`],
  };

  window.grist = {
    ready: function () { /* rien a faire hors de Grist */ },
    onOptions: function () { /* rien a faire hors de Grist */ },
    onRecords: function (rappel) {
      setTimeout(function () { rappel(LIGNES, MAPPINGS); }, 0);
    },
    selectedTable: {
      getTableId: function () { return Promise.resolve(TABLE_ID); },
    },
    getTable: function () {
      return { getTableId: function () { return Promise.resolve(TABLE_ID); } };
    },
    docApi: {
      fetchTable: function (nom) {
        if (nom === `_grist_Tables`) { return Promise.resolve(META_TABLES); }
        if (nom === `_grist_Tables_column`) { return Promise.resolve(META_COLONNES); }
        if (nom === TABLE_ID) {
          return Promise.resolve(colonnes(LIGNES, [`Nom`, `Detail`, `Picto`, `Type`, `Lien`]));
        }
        return Promise.reject(new Error(`table inconnue : ` + nom));
      },
    },
  };
})();
