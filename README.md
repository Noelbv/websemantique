# 🎬 Semantic Web - Netfl’IF

## 🌟 Introduction

> This application is a web app designed to search and consult information about cinema and films. The goal of this Semantic Web project is to use a given source organized as a **knowledge graph**. To achieve this, we utilized the **Wikidata** database, on which we performed queries using the **SPARQL** language. On the web application side, the front-end was developed with **React.js** and the micro-services part with **Node.js**.

![Screnshot of the App](/Homepage.png)

---

## 🛠️ Technologies

This project is built around modern web development practices and semantic web technologies:

* **Front-End:** **React.js**
* **Back-End/Micro-Services:** **Node.js**
* **Data Source:** **Wikidata** (Knowledge Graph)
* **Query Language:** **SPARQL**

---

## ⚙️ Installation

To run the site locally, you must launch the Front-End and the Back-End in separate terminals.

### **1. Front-End Setup (`websemantique/app`)**

```bash
# Navigate to the app directory
cd app

# Install dependencies
yarn install

# Launch the Front-End (runs on http://localhost:3000 by default)
yarn start
````

### **2. Back-End Setup (`websemantique/api`)**

```bash
# Navigate to the API directory
cd api

# Install Node.js dependencies
yarn install

# Download necessary Python libraries for SPARQL queries
yarn python-setup

# Launch the Back-End
yarn start
```

-----

## ✨ Features

The application provides a comprehensive system for browsing and viewing detailed cinematic data:

### **Browsing & Search**

  * **Films by Genre:** Display of films categorized by genre for easy discovery.
  * **Film Search:** Search for a film by its name with a list of matching results.

### **Detailed Views (Knowledge Graph Navigation)**

| Page | Key Information | Inter-Connections |
| :--- | :--- | :--- |
| **Film Details** | Photo, Title, Description, Actors, Producers, Screenwriters, Rating/Reviews. | Links to associated **People** and the **Film Series** (if one exists). |
| **Person Details** | Detailed personal information. | Links to associated **Films**. |
| **Film Series Details** | Detailed series information. | Links to associated **Producers** and all associated **Films** in the series. |

-----

## 👥 Authors

  * Noé Le Blavec
  * Antoine Vraux
  * **Yanice Boady**
  * Maxime Brun
  * Jean Abou Moussa
  * Hugo Laface

