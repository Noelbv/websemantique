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

**Fiche de film : **
- Affichage de la photo d’un film et son titre 
- Détails du film (description, acteurs, producteurs, scénaristes, note/avis)
- Lien vers les personnes associé au film et la série de film si existante 

**Fiche Personne : **
- Détails des infos personne
- lien vers les films associés 

**Fiche Série de Film :** 
- Détails des infos série
- lien vers les producteurs associés
- lien vers les films associés

## Technologies

### SPARQL

Afin de récupérer les infos concernant les films, les séries de films et même les personnes (acteur, producteur, scénaristes…), nous avons réaliser des **requêtes SPARQL** sur la base de données **Wikidata**. Afin de simplifier la recherche et s’assurer que l’ensemble des informations seraient dans la même langue (anglais), nous avons réalisé nos requêtes en filtrant uniquement les films américains. 
Nous allons vous présenter ci-bas certaines requêtes que nous avons créés pour répondre aux fonctionnalités de l’app

_Vraux et Hugo_ 
- _donner des exemples de code _

### Back-end

La partie Back-end a été réalisé en **Python** et permet le traitement des requêtes SPARQL et envoie la **réponse sous forme de fichiers JSON** à la partie micro-service de l’application. C’est aussi avec Python que l’on va chercher des informations complémentaires	sur un film sur Wikipédia. Cela est utile par exemple pour avoir la photo du film.
Par ailleurs, nous avons découpé notre application en **micro-services** grâce à **Node.js**. Lorsque que la partie front-end a besoin d’informations elle fait requête au back-end en appelant l’un des services suivant : SearchFilm, GetFilm, GetPerson ou GetSeries. Ce sont ces services qui lancent un à un des exécutions de fichiers python différentes.

_Jean ABOUUUU à toi de compléter_

### Front-end

Concernant le front-end, il a été réalisé en javascript en utilisant la **bibliothèque React.js**.
Il est découpé en différentes routes/pages qui permettent à l’utilisateur de naviguer dans l’application. On utilise un fichier _AppService.js_ qui appelle les différents services applicatifs lorsqu’on en a besoin. 
De chaque click ou recherche sur l’application résulte un appel au back-end à travers les services et qui à leur tour récupère les données issues des requêtes SPARQL
Par ailleurs, le dossier _components_ contient l’ensemble des composants réutilisables que nous avons créés pour l’application (Button, input, navigation bar, preview d’un film, catégorie…).
On utilise également les routes/url pour stocker les paramètres d’une recherche de film et les passer d’une page à une autre. Cela permet également de retourner en arrière si l’on tombe sur un objet dont la page Wikipédia n’existe pas. Dans ce cas, aucune données n’est à afficher. 




### Auteurs 
Noé Le Blavec - Antoine Vraux - Yanice Boady - Maxime Brun - Jean Abou Moussa - Hugo Laface
