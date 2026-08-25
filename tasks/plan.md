# Plan d'implementation : Exercices de Resolution de Tests JS (Jest & Cypress)

## Overview
Ce projet fournit un ensemble d'exercices pratiques pour apprendre la resolution de tests en JavaScript. Il couvre trois types de tests essentiels :
1. **Tests Unitaires (Jest)** : Validation d'algorithmes et de logique métier pure sans effets de bord.
2. **Tests d'Integration (Jest & jsdom)** : Validation d'interactions DOM complexes, de gestion d'evenements, et d'appels API mockes.
3. **Tests End-to-End (Cypress)** : Simulation de parcours utilisateur complets sur une application web reelle.

L'application support est une boutique en ligne simplifiee ("Le Panier de Livres") comprenant un catalogue, un panier interactif, un systeme de code promo, et un tunnel d'achat.

## Decisions d'Architecture
- **Jest & Babel** : Utilisation de Babel pour compiler les modules ES (import/export) dans Jest, garantissant une syntaxe moderne et coherente dans tout le projet.
- **jsdom** : Jest sera configure avec l'environnement `jest-environment-jsdom` pour isoler les tests d'integration du navigateur tout en simulant l'API DOM.
- **Vite** : Utilisation de Vite pour servir l'application locale rapidement et simplement.
- **Cypress** : E2E teste sur l'application servie par Vite. `start-server-and-test` orchestrera le demarrage du serveur Vite et l'execution des tests Cypress.
- **Respect de la regle Zero Emojis** : Aucun emoji ne sera utilise dans les fichiers source, la console, les scripts ou la documentation. Des indicateurs clairs comme `[OK]`, `[FAIL]` ou des icônes SVG seront utilises pour le visuel.

## Structure du Projet
```
CT-JS-TEST/
├── package.json
├── jest.config.js
├── babel.config.json
├── cypress.config.js
├── index.html
├── style.css
├── src/
│   ├── cart.js            (Logique metier - Exercice 1)
│   ├── dom-cart.js        (Logique DOM & API - Exercice 2)
│   └── app.js             (Point d'entree application)
├── tests/
│   ├── unit/
│   │   └── cart.test.js   (Tests unitaires a completer/corriger)
│   └── integration/
│       └── dom-cart.test.js (Tests d'integration a completer)
├── cypress/
│   ├── e2e/
│   │   └── checkout.cy.js (Tests E2E Cypress a completer)
│   └── support/
└── tasks/
    ├── plan.md
    └── todo.md
```

## Liste des Taches

### Phase 1 : Configuration et Squelette du Projet
- Tache 1 : Creer le fichier `package.json` et installer les dependances de test (Jest, Cypress, Babel, Vite, start-server-and-test).
- Tache 2 : Configurer Babel (`babel.config.json`), Jest (`jest.config.js`) et Cypress (`cypress.config.js`).

### Phase 2 : Developpement de l'Application et Logique Metier
- Tache 3 : Creer `src/cart.js` (logique de calcul du panier, avec des bugs intentionnels ou des parties manquantes pour l'exercice).
- Tache 4 : Creer `src/dom-cart.js` (logique d'affichage et de requete reseau, avec des lacunes structurelles a combler).
- Tache 5 : Creer l'interface utilisateur `index.html` (sans emojis, avec des SVG purs), le fichier de style `style.css` et le fichier de liaison principal `src/app.js`.

### Checkpoint : Application Fonctionnelle
- L'application se lance localement via Vite et fonctionne manuellement.

### Phase 3 : Creation des Exercices de Tests
- Tache 6 : Rediger le fichier de tests unitaires `tests/unit/cart.test.js` avec des instructions d'exercices (tests casses, assertions manquantes).
- Tache 7 : Rediger le fichier de tests d'integration `tests/integration/dom-cart.test.js` (mocking API fetch, simulation d'evenements click, assertions DOM).
- Tache 8 : Configurer l'environnement Cypress et rediger `cypress/e2e/checkout.cy.js` (instructions d'exercices E2E).

### Checkpoint : Validation des Tests
- Tous les scripts de tests sont configurables et lancent des erreurs instructives pour l'etudiant.
- Creation d'un guide detaille `INSTRUCTIONS.md` pour guider l'etudiant sur la maniere de resoudre chaque etape.

## Risques et Mitigations
| Risque | Impact | Mitigation |
|:---|:---|:---|
| Probleme de compatibilite ESM / Babel avec Jest | Eleve | Utiliser une configuration Babel simple et robuste avec `@babel/preset-env` ciblee sur la version courante de Node.js. |
| Cypress met du temps a demarrer ou echoue dans l'environnement CI/conteneur | Moyen | Configurer `start-server-and-test` correctement et s'assurer que le port est libere apres chaque run. |
| Incomprehension de l'etudiant face aux tests a resoudre | Moyen | Fournir des `README.md` et `INSTRUCTIONS.md` extremement clairs, ainsi qu'un repertoire de correction `solutions/` optionnel ou des commentaires explicitant les attentes de chaque exercice. |
