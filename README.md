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

## Tout afficher sans barre de défilement

Le widget cherche à faire tenir la totalité des tuiles dans la hauteur du
panneau. Après chaque affichage, il mesure s'il déborde, et si c'est le cas il
essaie des configurations de plus en plus compactes jusqu'à ce que tout entre.
Le calcul est refait automatiquement à chaque redimensionnement du panneau.

Les sections ne sont pas empilées les unes sous les autres mais disposées en
colonnes juxtaposées. Sur un panneau large, deux Types se placent côte à côte au
lieu de laisser la moitié de la largeur inutilisée, ce qui évite de réduire le
texte alors que la place existe. Sur un panneau étroit, il ne reste qu'une seule
colonne et l'empilement revient naturellement.

Les compromis sont ensuite appliqués dans cet ordre. L'espacement et la taille du
picto diminuent d'abord. Le détail est ensuite limité à deux lignes, puis à une
seule, puis supprimé. Le nom trop long est à son tour limité à trois lignes puis
à deux. L'étiquette de Type est réduite à ses trois premières lettres. En dernier
recours, les titres de section disparaissent et les tuiles sont réunies en une
seule grille, rangées dans l'ordre des Types, la couleur du badge continuant de
porter cette information ; la place ainsi libérée permet alors de repartir de
tuiles plus grandes plutôt que de continuer à les rapetisser.

Les mots ne sont jamais coupés. Avant chaque affichage, le widget mesure le mot
le plus long parmi les noms affichés, dans la police du niveau retenu, et impose
aux tuiles une largeur minimale suffisante pour l'accueillir en entier. Seul un
mot dépassant 260 pixels de large, ce qui est rare, reste coupé faute de place
raisonnable.

Le texte intégral reste accessible au survol de la souris. L'infobulle d'une
tuile reprend toujours le nom complet, le détail complet, le Type complet et
l'adresse, quelle que soit la densité appliquée.

Cette troncature est une exception délibérée à la règle qui veut qu'un widget ne
masque jamais du texte utilisateur. Elle a été demandée explicitement, et elle
est acceptable parce que rien n'est perdu : le raccourcissement est visible
grâce aux points de suspension, et le texte complet est à un survol de distance.

Deux situations peuvent laisser subsister une barre de défilement. La première
est un panneau vraiment très bas, de l'ordre de 250 pixels de haut, alors qu'un
bandeau d'alerte occupe déjà une bonne part de la place. La seconde est un
nombre de raccourcis trop élevé pour la surface disponible. Dans ces cas, la
barre de défilement est préférable à du contenu devenu invisible.

Un espace vide peut rester en bas du panneau : le nombre de colonnes de la
grille est un nombre entier, et passer d'une colonne supplémentaire à la
suivante se fait par paliers.

## Revenir rapidement à cette page

Le widget ne peut pas installer de raccourci clavier global. Son code ne
s'exécute que dans le cadre de la page des raccourcis, et dès que vous êtes sur
une autre page de Grist, plus rien n'écoute le clavier. Deux moyens relèvent du
navigateur.

Le premier est le retour arrière. Les tuiles ouvrant la page cible dans l'onglet
courant, la combinaison Alt et flèche gauche ramène à la page précédente, donc
aux raccourcis. Il faut appuyer plusieurs fois si vous avez enchaîné plusieurs
pages.

Le second est un mot-clé dans la barre d'adresse. Dans les paramètres du
navigateur, section moteur de recherche, ajoutez un moteur dont l'adresse est
celle de la page Grist des raccourcis et dont le raccourci est une lettre. Il
suffit alors de Ctrl et L, de cette lettre, puis d'Entrée, depuis n'importe
quelle page.

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
