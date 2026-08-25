# Guide de Resolution des Exercices de Tests (Jest & Cypress)

Bienvenue dans cet atelier pratique d'apprentissage du test en JavaScript. Vous allez travailler sur trois niveaux de tests (Unitaires, Integration et E2E) pour valider et securiser une application web de panier d'achat : "Le Panier de Livres".

Votre objectif est de faire passer tous les tests de l'application au vert [OK]. Pour cela, vous devrez analyser les rapports d'erreur des suites de tests afin d'identifier les anomalies dans le code source de l'application et les corriger par vous-meme.

---

## Structure du Projet

Le projet est organise de la maniere suivante :
- `src/` : Le code source de l'application.
  - `cart.js` : Logique metier pure du panier (calculs de totaux, reductions, taxes).
  - `dom-cart.js` : Logique d'affichage DOM et de requete API.
  - `app.js` : Point d'entree qui orchestre l'application et gre les evenements.
- `tests/` : Les tests de developpement.
  - `unit/cart.test.js` : Suite de tests unitaires pour `cart.js`.
  - `integration/dom-cart.test.js` : Suite de tests d'integration pour `dom-cart.js`.
- `cypress/e2e/checkout.cy.js` : Tests End-to-End simulant le parcours client complet.
- `index.html` & `style.css` : L'interface utilisateur.
- `products.json` : Le catalogue de livres.

---

## Etape 1 : Les Tests Unitaires (Jest)

Les tests unitaires valident le comportement isole de fonctions pures (sans interaction DOM ou reseau).

### Lancer les tests unitaires
Executez la commande suivante dans votre terminal :
```bash
npm run test:unit
```
Vous constaterez que plusieurs tests echouent.

### Votre mission :
1. Examinez les echecs de tests affiches dans le terminal.
2. Ouvrez le fichier de tests unitaires `tests/unit/cart.test.js` pour comprendre les attentes de chaque cas de test (les assertions attendues).
3. Ouvrez le fichier `src/cart.js` et modifiez le code des fonctions concernees afin de corriger les ecarts et satisfaire toutes les assertions.

---

## Etape 2 : Les Tests d'Integration (Jest & jsdom)

Les tests d'integration valident l'interaction entre notre code et des composants ou systemes tiers (comme le DOM du navigateur via JSDOM ou les APIs reseau via des mocks).

### Lancer les tests d'integration
Executez la commande suivante dans votre terminal :
```bash
npm run test:integration
```

### Votre mission :
1. Examinez les echecs reportes par Jest dans la suite d'integration.
2. Ouvrez `tests/integration/dom-cart.test.js` pour analyser les interactions testees (le mock de `window.fetch` et les manipulations du DOM).
3. Ouvrez `src/dom-cart.js` et apportez les corrections necessaires pour que les modules s'integrent correctement avec le DOM et miment le bon comportement face aux APIs.

---

## Etape 3 : Les Tests End-to-End (E2E) (Cypress)

Les tests End-to-End lancent l'application reelle dans un navigateur controle et testent l'application complete selon le point de vue de l'utilisateur final.

### Lancer les tests E2E
Vous pouvez choisir l'un des deux modes suivants :

1. **Mode Headless (terminal)** :
   ```bash
   npm run test:e2e
   ```
   Lance le serveur de developpement en arriere-plan, execute Cypress puis nettoie l'environnement.

2. **Mode Graphique (interactif)** :
   ```bash
   npm run test:e2e:open
   ```
   Ouvre la console interactive de Cypress ou vous pouvez executer les tests pas-a-pas et visualiser les actions s'effectuer en direct dans le navigateur.

### Votre mission :
Une fois que vous pensez avoir resolu toutes les anomalies des etapes 1 et 2, executez les tests E2E. Si vos corrections de code sont completes et fideles au parcours utilisateur attendu, tous les tests Cypress passeront automatiquement au vert !

---

## Synthese du Statut des Tests

- `[FAIL]` : Etat initial du depot apres installation.
- `●` : Tests unitaires en echec -> A resoudre en corrigeant `src/cart.js`.
- `●` : Tests d'integration en echec -> A resoudre en corrigeant `src/dom-cart.js`.
- `●` : Tests E2E en echec -> Passeront au vert une fois toute l'application operationnelle.
- `[OK]` : Tous les tests passent au vert !
