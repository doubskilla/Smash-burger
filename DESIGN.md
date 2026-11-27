# Smash Burger — Direction de conception

Version 1.0 · 25 novembre 2026

## 1. Rôle de ce document

Référence commune pour l’accueil, le catalogue et les pages produit du projet fictif Smash Burger. Le site doit démontrer aux prospects de NextStep. la qualité de la direction artistique, la clarté du parcours et la maîtrise des interactions.

Ce document remplace les anciennes consignes de petites listes de burgers et de séparateurs. Il décrit la cible de conception. Le site actuel comporte encore des écarts à corriger. Les réglages numériques ci-dessous constituent des propositions de travail à vérifier sur écran réel. Chaque nouvelle décision validée met à jour ce document avant son application aux sections suivantes.

## 2. Objectif et parcours

Le visiteur comprend l’offre, repère un produit, ouvre sa fiche, choisit sa formule et ses suppléments, puis accède au récapitulatif de sa commande. L’identité du restaurant et les animations soutiennent cette progression.

Le mode final de commande reste à choisir avec le porteur du projet. La future page produit peut déjà préparer une sélection et un récapitulatif fonctionnels côté interface. Chaque bouton doit avoir une destination réelle et explicite.

## 3. Décisions acquises et décisions ouvertes

### Acquis dans les échanges

- Priorité au mobile, puis adaptation de la composition à l’ordinateur.
- Univers crème, bordeaux et jaune, lettrages expressifs, annotations manuscrites et photographies réalistes.
- Hero « Simple ou double ? », annotation « Le Double », courte description avant le CTA.
- Bandeau continu suffisamment espacé du CTA, étiquettes animées et texte de préparation révélé au défilement.
- Grandes cartes comme signature commune aux burgers et aux suppléments.
- Carte burger entièrement cliquable vers sa fiche produit.
- CTA après la sélection, « Voir les autres smashs ».
- Prix dans une étiquette contrastée, forme dérivée de l’aplat incliné du hero.
- Animations chorégraphiées, retour à zéro après sortie complète de la section.
- Espacements structurés entre les groupes de contenu.

### À valider visuellement

- Fond définitif des grandes cartes. La combinaison bloc jaune et bandeau bordeaux a été rejetée. La dernière version claire bordée reste une proposition.
- Composition des grandes cartes de suppléments et leur nombre sur l’accueil.
- Page produit, récapitulatif et mode final de commande.
- Identité finale de marque, catalogue, prix et coordonnées de référence.

Les recettes ajoutées pour démonstration, dont Le Smash Oignons et Le Poivré, restent provisoires. Les captures fournies par l’utilisateur servent de références de composition. Leur présence dans la conversation ne vaut pas validation d’une maquette du projet.

## 4. Direction visuelle commune

| Élément | Règle |
|---|---|
| Fond principal | Crème #FFF6E8 |
| Encre principale | Bordeaux #860B12 |
| Accent | Jaune #FFD437, texte foncé |
| Informations secondaires | Brun sombre lisible, distinct des titres |
| Titres | Lettrage expressif cohérent avec le hero, hiérarchie claire |
| Informations et boutons | Une famille sans-serif commune, corps mobile de référence 16 px |
| Annotations | Courtes, manuscrites, attachées à un détail utile |
| Photos | Réalistes, couleur naturelle, même recette sur l’accueil et sa fiche |
| Boutons | Même forme et mêmes états à travers le parcours |

Conserver les photographies dans leurs couleurs originales. Vérifier leur fond intégré avant de choisir la couleur de la carte. Les modes de fusion qui jaunissent le pain ou modifient une boisson doivent être corrigés. L’eau est représentée en bouteille. Les jus validés peuvent être montrés en verre. Les sodas utilisent des contenants réalistes. Les fruits décoratifs autour des boissons sont exclus de la direction retenue.

## 5. Grandes cartes

La carte constitue une composition complète avec un grand visuel, un nom, une différence produit courte et un prix identifiable. La surface doit se distinguer clairement du fond du site tout en gardant une composition unifiée.

Sur mobile, utiliser une colonne, environ 90 % de la largeur disponible. Sur ordinateur, ajuster le nombre de colonnes pour conserver la taille et l’impact des produits. La hauteur découle du contenu et de la photographie. Une grande carte doit rester lisible sur un petit écran et avec un texte agrandi.

| Partie | Organisation |
|---|---|
| Visuel | Zone dominante, cadrage constant dans une même catégorie |
| Nom et prix | Même groupe de décision, prix sur étiquette inclinée avec chiffres horizontaux |
| Composition | Courte, placée sous le nom, contraste suffisant |
| Interaction | Surface entière activable pour les produits disposant d’une fiche |
| Clavier | Focus visible, lien sémantique, nom accessible explicite |

Appliquer ces principes aux suppléments. L’échelle des boissons dans leur image doit rester crédible. L’unité de forme, de marges et d’animation relie les catégories. Les avis conservent leur concept de ticket dans un espace généreux.

## 6. Espacements et rythme de lecture

| Relation | Repère mobile initial |
|---|---|
| Nom, prix et ingrédients | 8–16 px |
| Marges intérieures d’une carte | 24–32 px |
| Titre de section vers contenu | 32–56 px |
| Deux grandes cartes | 40–64 px |
| Dernière carte vers CTA | 24–40 px |
| Transition entre sections | 72–112 px de séparation visible totale |

Ces plages se règlent selon les dimensions réelles des images et titres. Mesurer l’espace total entre contenus, en tenant compte des marges déjà présentes dans les images et des paddings des deux sections. Éviter leur addition involontaire.

Le passage du texte de préparation aux burgers doit montrer une progression continue. À la fin de la lecture, le titre suivant arrive naturellement. Un long défilement vide pour déclencher le prochain contenu constitue un défaut. Garder une hauteur stable avant et après les animations et pendant le chargement des images.

## 7. Grammaire d’animation

### Intention

Chaque mouvement doit aider à identifier un élément, comprendre une relation ou repérer une action. La lecture suit le titre, le produit, ses informations puis le CTA. Le contenu doit demeurer accessible lors d’un défilement rapide ou d’une arrivée directe sur une ancre.

### Familles retenues

| Famille | Usage | Réglage initial proposé |
|---|---|---|
| Dévoilement du lettrage | Titres de section | 550–700 ms, masque progressif, déplacement court |
| Pose d’une surface | Grandes cartes et supports | 550–700 ms, déplacement 8–16 px, rotation maximale proche de 1° |
| Accent secondaire | Produit ou étiquette utile | 350–500 ms, démarrage 80–140 ms après la carte |
| Apparition fonctionnelle | CTA et informations complémentaires | 250–400 ms, fondu et déplacement très court |
| Mouvement d’ambiance | Annotation Le Double, étiquettes | Cycle lent de 5–8 s, amplitude faible, pauses |
| Défilement continu | Bandeau | Vitesse constante, boucle sans saut |
| Lecture liée au scroll | Paragraphe de préparation | Progression proportionnelle au défilement, réversible |
| Impression du ticket | Avis | Variante liée à l’objet, mouvement calme et court |

Courbe commune proposée pour les entrées, cubic-bezier(.22,.8,.24,1). Elle ralentit progressivement en fin de mouvement. Les rebonds restent discrets et réservés aux éléments dont la matière le justifie.

### Chorégraphie d’une section de cartes

1. Le titre entre lorsque sa zone devient lisible dans l’écran.
2. La première carte commence à se poser vers le milieu du dévoilement du titre si elle est déjà visible.
3. L’accent du produit suit légèrement. Nom, prix et composition sont traités ensemble pour comparer immédiatement.
4. Chaque carte suivante entre lorsqu’elle approche la zone de lecture.
5. Le CTA devient lisible à son arrivée dans l’écran, avec une entrée brève.

Calculer les décalages depuis le début réel de la séquence. Une carte qui entre longtemps après le titre se déclenche immédiatement. Le temps d’attente déjà écoulé ne doit pas être rejoué.

### Défilement et réinitialisation

Le scroll déclenche les entrées des cartes. Leur mouvement se termine ensuite dans une durée courte. Le paragraphe de préparation suit directement la progression du scroll.

Réinitialiser une section seulement après sa sortie complète de l’écran. Un léger aller-retour pendant la lecture garde les éléments stables. Au retour par le bas, animer les éléments réellement visibles dans l’ordre de rencontre. Une navigation par ancre ou au clavier rend immédiatement accessibles les cibles concernées.

### Accessibilité et robustesse

Avec prefers-reduced-motion, afficher le contenu directement et arrêter les boucles et déplacements. Garder les actions disponibles pendant les animations. Prévoir un état visible si le JavaScript échoue. Préserver le scroll natif et le focus clavier. Animer principalement transform et opacity, limiter les masques coûteux. Suspendre les boucles hors écran. Les contrôles d’arrêt des animations continues doivent être accessibles.

## 8. Application par section

| Section | Information prioritaire | Mouvement et action |
|---|---|---|
| Hero | Produit vedette, promesse courte | Composition progressive existante comme référence, puis Voir la carte |
| Préparation | Comprendre le smash | Bandeau, étiquettes, lecture progressive puis relais vers le titre suivant |
| Burgers | Choisir une recette | Grandes cartes, séquence commune, fiche produit puis Voir les autres smashs |
| Formule | Comprendre ce que le menu ajoute | Grande composition cohérente avec les cartes, prix lisible, Composer mon menu |
| Suppléments | Comparer boissons et ajouts | Grandes cartes, même cadence que les burgers, choix relié au parcours produit |
| Restaurant | Savoir où et quand venir | Photo, informations pratiques groupées, accès identifiable |
| Avis | Donner un signal de confiance | Ticket, navigation discrète, lien Google seulement avec destination vérifiée |
| Footer | Retrouver les destinations utiles | Entrée légère, liens facilement accessibles |

Les témoignages de démonstration restent identifiables. Toute note ou quantité d’avis affichée doit correspondre à une source réelle vérifiée.

## 9. Page produit à concevoir

Reprendre le visuel maître, le nom, le prix et les ingrédients de la carte. Permettre de revenir à la sélection en conservant autant que possible la position de lecture.

Ordre proposé sur mobile, visuel et identification, composition, choix burger seul ou formule, suppléments, quantité, total et action principale. Mettre à jour le total immédiatement après un choix. L’action proposée « Ajouter à ma commande » doit ouvrir ou alimenter un récapitulatif concret. Son libellé définitif dépendra du parcours de commande retenu.

La sélection des options donne un retour visuel court. Les contrôles restent stables pendant la lecture. Un éventuel bouton fixe doit respecter la zone de sécurité du téléphone et laisser le contenu entièrement accessible.

Partager les données entre catalogue, fiches et récapitulatif pour garantir le même prix, la même composition et la même disponibilité. Prévoir les noms longs, produits indisponibles et options sélectionnées. Le front-end doit pouvoir démontrer le parcours complet avec des données de démonstration cohérentes.

## 10. Ton rédactionnel

Ton direct, chaleureux, familier et précis. Employer les mots de l’offre et les différences utiles entre recettes. Le « Kaay » validé reste un signe local. Chaque description apporte une information concrète. Chaque CTA annonce sa destination ou son résultat.

Libellés acquis, « Voir la carte », « Voir les autres smashs », « Composer mon menu ». Utiliser des noms de produits cohérents dans toutes les pages et formater les prix comme « 3 500 FCFA ».

## 11. Vérification avant validation

- Observer le parcours complet sur mobile à scroll lent, rapide et inversé.
- Vérifier le relais préparation, titre des burgers, première carte et CTA.
- Contrôler que chaque carte est visible, lisible et cliquable au moment utile.
- Vérifier la réinitialisation après sortie complète et la stabilité pendant un petit aller-retour.
- Comparer titres, cartes et boutons de toutes les sections côte à côte.
- Vérifier les photos sans teinte artificielle, les étiquettes de prix et la distinction des surfaces.
- Tester les liens, les totaux et la conservation des choix sur les fiches produit.
- Tester petits écrans, texte agrandi, clavier et réduction des animations.
- Contrôler ordinateur et tablette après validation de la composition mobile.
- Relever précisément les écarts. Une vérification du code seule ne valide pas le ressenti visuel.

## 12. Gestion des évolutions

Avant chaque intervention, lire ce document et la dernière décision utilisateur. Limiter les changements à l’objectif demandé, vérifier leurs effets sur les sections voisines, puis actualiser les règles communes si nécessaire.

Une nouvelle couleur de carte, une nouvelle famille de mouvement ou une nouvelle structure se présente sur un exemple représentatif avant sa généralisation. Consigner la décision, sa date et les composants concernés. Les consignes plus récentes de l’utilisateur priment.

### Journal

25 novembre 2026 — Formalisation de la direction. Grandes cartes étendues aux suppléments, animation orientée vers la lecture et l’action, réinitialisation commune et parcours produit à préparer. Réglages de mouvement et espacements proposés pour la prochaine validation visuelle.

26 novembre 2026 — Reprise du travail sur mobile. Le commit `ccf8170` ajuste les cartes burgers et leur transition depuis la préparation. Cette version est une proposition à revoir avec l’utilisateur, pas une validation finale.

Retours de l’utilisateur à reproduire et traiter en priorité :

- Sur téléphone, la photo du burger du hero semble s’agrandir pendant le swipe vers le bas. Identifier la cause réelle sur mobile avant de la corriger. Le fondu `leave-menu-hero` agit sur l’opacité ; sa responsabilité dans un changement d’échelle n’est pas établie.
- Les animations de la sélection des burgers semblent avoir disparu ou être trop discrètes. Vérifier le titre, les cartes et le CTA au défilement lent et rapide, ainsi qu’au retour dans la section.
- Les sections après le hero semblent resserrées. Évaluer le rythme de l’ensemble, notamment le bandeau, les étiquettes, le texte de préparation et le titre des burgers. La capture mobile [image (4).png](image%20%284%29.png) montre ce passage. Ajuster les espacements selon le rendu, sans multiplier les marges mécaniquement.
- Un comportement de défilement irrégulier apparaît parfois lorsqu’on revient vers une section précédente ou qu’on continue vers la suivante. Reproduire les allers-retours et identifier précisément le déclencheur avant de corriger.

Le concept de grandes cartes concerne aussi les suppléments. La sélection burgers est déjà une première application ; la perfectionner avant d’étendre le principe aux suppléments. Les références fournies se trouvent dans [image.png](image.png), [image (1).png](image%20%281%29.png) et [image (2).png](image%20%282%29.png). Elles servent à guider la composition et ne constituent pas une maquette validée.

Continuer section par section, d’abord sur mobile puis sur ordinateur. Vérifier visuellement le résultat et les animations, y compris les allers-retours et la réduction des mouvements. Le ressenti sur un téléphone réel reste à confirmer avec l’utilisateur. Un aperçu ngrok temporaire a été utilisé ; le relancer si nécessaire.

27 novembre 2026 — Première grande carte de complément proposée pour le bissap. Le visuel précède un bloc qui réunit nom, prix et description. L’entrée des boissons reprend le déclenchement des burgers et se rejoue après la sortie complète de la section. Valider cette carte sur téléphone avant de décliner la présentation sur les autres boissons.

27 novembre 2026 — À la demande de l’utilisateur, les cinq boissons à la carte adoptent la présentation du bissap et la même séquence d’entrée. Une colonne sur mobile, deux sur tablette et trois sur grand écran facilitent la comparaison.
