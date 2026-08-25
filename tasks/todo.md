# Liste des Taches : Exercices de Resolution de Tests JS

## Phase 1 : Configuration et Squelette du Projet

### Task 1 : Initialisation de package.json et installation des dependances
**Description :** Initialise le projet Node.js et installe Jest, Cypress, Babel, Vite, et start-server-and-test.
**Acceptance criteria :**
- [x] `package.json` est cree avec les scripts de test appropries.
- [x] Toutes les dependances requises (jest, jest-environment-jsdom, cypress, vite, start-server-and-test, babel, etc.) sont installees.
**Verification :**
- [x] Verifier que `node_modules` est present et que `npm run` liste les scripts.
**Dependencies :** None
**Files likely touched :**
- `package.json`
**Estimated scope :** Small (1 file)

### Task 2 : Configuration de Babel, Jest et Cypress
**Description :** Configure Babel pour le support ESM, configure Jest pour utiliser jsdom et Babel, et configure Cypress.
**Acceptance criteria :**
- [x] `babel.config.json` compile les modules ES pour Node.
- [x] `jest.config.js` est configure pour utiliser Babel et jsdom pour les tests d'integration.
- [x] `cypress.config.js` est configure avec la bonne baseUrl.
**Verification :**
- [x] Lancer `npx jest --version` et `npx cypress info` sans erreur de configuration.
**Dependencies :** Task 1
**Files likely touched :**
- `babel.config.json`
- `jest.config.js`
- `cypress.config.js`
**Estimated scope :** Small (3 files)

---

## Phase 2 : Developpement de l'Application et Logique Metier

### Task 3 : Creation du module de panier d'achat
**Description :** Implemente la logique metier pure dans `src/cart.js`. Certaines parties seront incompletes ou contiendront des bugs documentes afin que l'etudiant puisse les resoudre grace aux tests unitaires.
**Acceptance criteria :**
- [x] `src/cart.js` contient les fonctions : `addToCart`, `removeFromCart`, `calculateSubtotal`, `applyDiscountCode`, `calculateTotal`.
- [x] Le code contient des bugs documentes (ex: mauvaise application de la taxe, pas de validation sur les quantites negatives).
**Verification :**
- [x] Inspecter le fichier pour s'assurer que la structure et les bugs intentionnels y sont.
**Dependencies :** Task 2
**Files likely touched :**
- `src/cart.js`
**Estimated scope :** Small (1 file)

### Task 4 : Creation du module d'interaction DOM et API
**Description :** Implemente la logique d'integration DOM et requetes reseau dans `src/dom-cart.js`. Le fichier contiendra des methodes incompletes pour l'exercice.
**Acceptance criteria :**
- [x] `src/dom-cart.js` contient les fonctions : `fetchProducts`, `renderProducts`, `updateCartDOM`.
- [x] La gestion d'erreur reseau ou l'evenementiel DOM contient des lacunes a completer.
**Verification :**
- [x] Le fichier exporte correctement les fonctions pour Jest.
**Dependencies :** Task 3
**Files likely touched :**
- `src/dom-cart.js`
**Estimated scope :** Small (1 file)

### Task 5 : Creation de l'interface HTML/CSS et application principale
**Description :** Assemble les composants avec `index.html` (sans emojis, avec des icônes SVG), `style.css` et `src/app.js` pour avoir une application web pleinement fonctionnelle dans le navigateur.
**Acceptance criteria :**
- [x] `index.html` affiche une boutique de livres propre, avec un design moderne (sans aucun emoji).
- [x] `style.css` stylise la boutique de facon elegante.
- [x] `src/app.js` relie l'interface DOM et la logique de panier.
**Verification :**
- [x] Lancer `npm run dev` et manipuler l'application dans le navigateur (ajouter au panier, appliquer un code, etc.).
**Dependencies :** Task 4
**Files likely touched :**
- `index.html`
- `style.css`
- `src/app.js`
**Estimated scope :** Medium (3 files)

### Checkpoint : Application Fonctionnelle
- [x] L'application tourne localement et permet d'ajouter/supprimer des articles et d'entrer un code promo.

---

## Phase 3 : Creation des Exercices de Tests et Instructions

### Task 6 : Redaction des tests unitaires
**Description :** Ecrit la suite de tests unitaires Jest dans `tests/unit/cart.test.js` pour la logique de panier de `src/cart.js`.
**Acceptance criteria :**
- [x] Les tests couvrent tous les cas nominaux et aux limites (quantites negatives, codes promos inconnus, taxes a zero).
- [x] Plusieurs tests sont casses ou a completer (ex: assertions manquantes, placeholders `test.todo`).
**Verification :**
- [x] Lancer `npm run test:unit` et verifier qu'au moins 2 tests echouent avec des messages clairs sur ce qui doit etre corrige.
**Dependencies :** Task 3
**Files likely touched :**
- `tests/unit/cart.test.js`
**Estimated scope :** Small (1 file)

### Task 7 : Redaction des tests d'integration
**Description :** Ecrit la suite de tests d'integration Jest + jsdom dans `tests/integration/dom-cart.test.js` pour simuler le DOM et moker les appels API de `src/dom-cart.js`.
**Acceptance criteria :**
- [x] Le test mocke `window.fetch` pour simuler des produits renvoyes par le serveur.
- [x] Le test verifie que les clics utilisateur sur "Ajouter au panier" mettent a jour le DOM et le total.
- [x] Des portions de test sont a completer par l'etudiant.
**Verification :**
- [x] Lancer `npm run test:integration` et s'assurer que les tests echouent avec des instructions explicites.
**Dependencies :** Task 4, Task 5
**Files likely touched :**
- `tests/integration/dom-cart.test.js`
**Estimated scope :** Small (1 file)

### Task 8 : Redaction des tests E2E Cypress et guide de resolution
**Description :** Ecrit les tests Cypress dans `cypress/e2e/checkout.cy.js` et documente l'ensemble des exercices dans `INSTRUCTIONS.md`.
**Acceptance criteria :**
- [x] `cypress/e2e/checkout.cy.js` contient un test de flux d'achat complet avec des etapes a completer (ex: saisir le code promo `LIVRE10`, verifier que la reduction est de 10%, cliquer sur checkout, verifier le modal final).
- [x] `INSTRUCTIONS.md` explique clairement les objectifs pedagogiques, la structure du projet, et comment faire passer les tests au vert pas-a-pas.
**Verification :**
- [x] Executer les tests Cypress via `npm run test:e2e` pour s'assurer du bon lancement du serveur et de l'echec attendu des tests incomplets.
**Dependencies :** Task 5, Task 6, Task 7
**Files likely touched :**
- `cypress/e2e/checkout.cy.js`
- `INSTRUCTIONS.md`
**Estimated scope :** Small (2 files)

### Checkpoint : Complete
- [x] Tout le projet de test est configure.
- [x] L'etudiant dispose d'un depot operationnel pret a l'emploi pour s'entrainer.
- [x] Un repertoire `solutions/` est optionnellement fourni pour reference.
