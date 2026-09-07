# Widget Grist : raccourcis de navigation

Widget personnalisé pour Grist qui affiche une table de raccourcis sous forme de
tuiles cliquables. Chaque tuile porte un picto, un nom en gras, un détail en
italique, et un badge de Type coloré en haut à droite. Les tuiles se
réorganisent automatiquement selon la largeur du panneau et le nombre de
lignes.

Le widget est un fichier HTML autonome, sans étape de construction et sans
dépendance externe autre que l'API Grist elle-même.

## Adresse du widget

```
https://bigorneau15652.github.io/grist-raccourcis/
```

## Table attendue

Le widget ne travaille pas sur des noms de colonnes imposés : vous désignez
vos colonnes dans le panneau de configuration du widget. Cinq rôles existent.

| Rôle dans le widget | Type de colonne conseillé | Obligatoire | Contenu |
|---|---|---|---|
| Nom | Texte | Oui | Titre affiché en gras au centre de la tuile |
| Détail | Texte | Non | Ligne de précision affichée en italique sous le nom |
| Picto | Texte | Non | Un emoji, par exemple un bâtiment, un éclair, une goutte |
| Type | Choix unique | Non | Détermine la couleur du badge et le regroupement des tuiles |
| Lien URL | Texte | Oui | Adresse complète de la page à ouvrir, commençant par `https://` |

Pour récupérer l'adresse d'une page Grist, ouvrez la page concernée et copiez
l'adresse affichée dans la barre du navigateur.

## Couleur des Types

La couleur des badges n'est pas définie dans le widget : elle est lue dans la
configuration de la colonne Choix unique, celle que vous réglez dans Grist en
cliquant sur la colonne puis en attribuant une couleur à chaque choix. L'ordre
des sections reprend également l'ordre des choix défini dans cette colonne.

Grist ne transmet pas ces couleurs avec les données. Le widget doit donc lire
les métadonnées du document, ce qui suppose que son accès est réglé sur
« Accès total au document » dans le panneau de droite. Si l'accès est plus
restreint, les badges restent gris et un bandeau le signale.

Si vous modifiez une couleur dans Grist, le bouton Actualiser relit la
configuration de la colonne sans recharger la page.

## Installation dans Grist

1. Ouvrez la page où vous voulez le menu, puis Ajouter, Ajouter une vue à la table.
2. Choisissez Personnalisée, et sélectionnez la table des raccourcis.
3. Dans le panneau de droite, collez l'adresse du widget dans le champ prévu.
4. Réglez l'accès sur « Accès total au document ».
5. Dans la section Colonnes du même panneau, associez Nom, Détail, Picto, Type et Lien URL aux colonnes de votre table.

## Comportement du clic

Le widget tourne dans une iframe. Un clic tente d'abord de remplacer la page
courante par la page cible, ce qui donne le comportement d'un vrai menu de
navigation. Si le navigateur refuse cette navigation depuis l'iframe, le widget
ouvre la page dans un nouvel onglet au bout d'une seconde environ. Un clic avec
la touche Ctrl ou Commande enfoncée ouvre directement un nouvel onglet, comme
sur n'importe quel lien.

Les adresses ne commençant ni par `https://`, ni par `http://`, ni par
`mailto:` sont refusées. La tuile correspondante reste affichée, en grisé, avec
la mention « Adresse manquante », et un bandeau indique quelles lignes sont à
corriger.

## Test hors de Grist

Ouvrir `index.html?demo=1` charge `mock-grist.js`, un jeu de données de
démonstration qui remplace l'API Grist. Cela permet de vérifier le rendu, les
couleurs, la recherche et le regroupement sans document Grist. Ce fichier n'est
jamais utilisé dans Grist.
