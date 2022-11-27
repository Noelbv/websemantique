# Web Sémantique - Netfl’IF

## Introduction 

> Cette application est une app web conçue pour rechercher et consulter des informations sur le sujet du cinéma et des films. Le but de ce projet Web Sémantique est d'utiliser une source donnée organisée en graphe de connaissance. Pour cela, nous avons utilisé la base de données Wikidata sur laquelle nous avons effectué des requêtes avec le language SPARQL. Côté application web, le front-end à été développé en React.js et la partie micro-services en Node.js.

## installation 

- Pour faire fonctionner le site, lancer 2 terminaux dans websemantique/.
- Dans le premier terminal, initialier le Front-End avec : _cd app_ puis _yarn install_.
- Pour le lancer, entrer _yarn start_.
- Dans le second terminal, initialiser le Back-End avec : _cd api_ puis _yarn install_ et _yarn python-setup_ (qui télécharge les bibliothèques python nécessaire au bon fonctionnement des requêtes SPARQL).
- Pour le lancer, entrer _yarn start_.

_Noe à remplir_

## Fonctionnalités

**Films par genre :**
- Affichage des films par catégories 

**Recherche de film :**
- Recherche d’un film par son nom 
- Affichage d’une liste de films (nom, durée, image) qui correspondent à une recherche
- Clicker sur un film pour avoir plus d’informations 

**Fiche de film :**
- Affichage de la photo d’un film et son titre 
- Détails du film (description, acteurs, producteurs, scénaristes, note/avis)
- Lien vers les personnes associé au film et la série de film si existante 

**Fiche Personne :**
- Détails des infos personne
- lien vers les films associés 

**Fiche Série de Film :** 
- Détails des infos série
- lien vers les producteurs associés
- lien vers les films associés


## Auteurs 
Noé Le Blavec - Antoine Vraux - Yanice Boady - Maxime Brun - Jean Abou Moussa - Hugo Laface
