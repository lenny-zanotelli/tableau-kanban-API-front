# Fiche récap Sécurité

## CORS (Cross Origin Resource Sharing)

Par défaut, la sécurité CORS existe déjà dans tous les servers et navigateur. Cela nous protège, et empêche une autre domaine que celui du server à effectuer des requêtes.
Par exemple, par défaut, localhost:3000 peut uniquement être requeté par localhost:3000. 
Autre exemple google.com ne peut pas être requeté par api.google.com.

Pour autoriser les requêtes de type CORS, il faudra utiliser un module npm : cors

cf documentation : https://expressjs.com/en/resources/middleware/cors.html

## Failles XSS

Le Cross Site Scripting permet d'éxecuter du code indésirable sur un site. On peut aller jusqu'à voler des cookies, télécharger des scripts, voler une session, etc...

Pour se prémunir des attaques XSS, on a deux possibilités :
- Côté front : On arrête d'utiliser "innerHTML" et on utilise "textContent"
- Côté back, on va transformer les caractères spéciaux en leur équivalent HTML => Les balises vont perdre tout leur sens. C'est ce qu'on appelle le nettoyage de variables (ou sanitizing).

Attention :
A choisir, on préfèrera prioriser le back, puisque on ne peut jamais faire confiance aux users. Par exemple, si on met une sécurité sur le front, rien n'empêche un user de (au choix) modifier le fonctionnement du js coté front, ou passer par insomnia par exemple

## Injections SQL

```
const query = `INSERT INTO student (first_name, last_name, github_username, promo_id)
VALUES ('${firstName}', '', '', 1);`

const firstName = `','','',1); DELETE FROM student; --`

// On se retrouve avec une requête qui ressemble à ça
/*
INSERT INTO student (first_name, last_name, github_username, promo_id)
VALUES ('','','',1); 
DELETE FROM student;
 --', '', '', 1);
*/

// Pour se prémunir de cette injection, on prépare notre requête
const query = `INSERT INTO student (first_name, last_name, github_username, promo_id)
VALUES ('$1', '$2', '$3', 1);`
const values = ["first_name", "last_name", "github_username];
```

Dans l'exemple ci-dessus, on a vu comment se prémunir d'une injection SQL via les requêtes préparées. 
On avait mis en application cette méthode dès la saison 05. 

Mais depuis qu'on utilise Sequelize, il se charge de préparer les requêtes pour nous !

=> Attention ! Il faut quand même être attentif et bien s'assurer que les packages qu'on utilise soient efficaces et n'aient pas de failles !

Par exemple : https://security.snyk.io/vuln/SNYK-JS-SEQUELIZE-450221

Une faille dans Sequelize (toutes versions !) trouvée en Juin 2019 (c'est proche !). elle concernait uniquement MySQL/MariaDB.

 ## CSRF

 CSRF : Cross Site Request Forgery


On a vu qu'un bouton innocent sur une page connectée à notre API pouvait en réalité cacher une action malicieuse !

Ici, ce bouton qui nous invitait à voir des chatons mignons avait une fonction jeSuisMéchant(), qui effectuait des requêtes DELETE sur notre route /lists/:id
 
Ici, un système d'authentification n'aurait ABSOLUMENT rien changé ! 
Admettons qu'on s'authentifie, on accède ensuite au bouton... On a un cookie qui identifie notre session + potentiellement notre role. Donc, on est déjà autorisé a faire des actions sur cette API. Donc le bouton "voir des chatons" va se lancer sans problème.

Une solution assez simple à mettre en place dans les applis "monolithiques" : https://www.npmjs.com/package/csurf


Sur les applications "front + API", ça nécessite un peu plus de travail => On ne va pas faire la mise en place


# Checklist Sécurité !

## Never trust User

Ce n'est pas parce que j'attends des données sous un format particulier que mes utilisateurs m'enverront des données à ce format (ex: on attend un integer, et le user nous envoie "coucou")

Je dois toujours contrôler / sécuriser ce que m'envoient mes utilisateurs.

Mots clés : Sanitize, validation, validators

## Mot de passe 

### Complexité

Pour mes mots de passe ET celui des utilisateurs, je dois m'assurer d'une certaine complexité.

Minimum 8 caractères avec majuscules, minuscules, chiffres, et caractères spéciaux. C'est un bon début.

Pour valider la complexité des mots de passe des utilisateurs lorsqu'ils créent un compte, on utilisera soit une librairie style password-validator, soit du regex.

### Hash

Je ne dois JAMAIS stocker en clair dans ma BDD les mots de passe de mes utilisateurs.

Pour ça, je vais leur appliquer une transformation (un hashage). Et pour l'authentification, je vais comparer la version hashé de ce que m'envoie l'utilisateur, avec ce que j'ai en BDD.

Je dois utiliser des algos de hashage **fiables** (et je ne dois pas les refaire moi-même). 

Aujourd'hui des algos fiables de hashage sont :

1. Argon2
2. Scrypt
3. Bcrypt

En plus de hasher les mots de passe, il faut aussi les saler.

Globalement, ou pour chaque utilisateur(c'est encore mieux), on va générer une longue chaîne de caractères aléatoire, qu'on va concaténer au mot de passe avant le hashage.

Process :
(pour la création de compte)
- Lors de la création d'un utilisateur, on génère une longue chaine aléatoire : le salt
- On stock ce salt dans une colonne de la base de données (colonne password)
- on récupère le mdp. On concatène le mdp et le salt
- On hash le tout
- On stocke dans la BDD le hash généré

(pour le login)
- On récupère la ligne associée au mail
- On récupère la valeur du salt pour cette ligne
- On concatène le mdp envoyé par l'utilisateur et le salt
- On hash le tout
- On compare ce qu'on a obtenu avec le hash stocké en BDD
  
## Anti brute force

Sur un formulaire d'authentification, il est très fortement recommandé de bloquer pendant un certain temps (quelques minutes) la connexion à un compte utilisateur qui a reçu plusieurs tentatives échouées.
On peut aussi utiliser un rate limiter, qui va faire ce job pour nous (coté backend

## Ne pas faire

- Les master passwords : Il ne faut jamais mettre en place un mot de passe qui marche sur tous les comptes.
- Envoyer les mdp par mail : Si l'utilisateur demande un nouveau mdp, il ne faut pas le renvoyer dans le mail. On va préférer générer un lien vers un formulaire de changement de mdp.
- Sur un formulaire login, en cas d'echec : je ne dois pas préciser si l'utilisateur s'est trompé d'email ou de mdp.


## Injection SQL

Je **ne dois jamais** intégrer directement dans mes requêtes SQL des données envoyer par l'utilisateur.

Si je veux utiliser une données de l'utilisateur comme valeur (par ex, `id = valeurDuUser`), l faut utiliser les fonctions / paramètres indiqué dans la doc de mon outil pour sécuriser ces éléments (le système avec les `$` du connecteur pg).

Si je veux utiliser une données de l'utilisateur comme nom de champs (ex: `WHERE field = valeur`). Je dois vérifier que la saisie utilisateur est bien dans une liste de valeur autorisé.

Sinon on laisse la possibilité à n'importe qui d'effectuer n'importe quel requête sur notre base de données.

## CORS

Par défaut du JS dans un navigateur ne peut accéder, avec `fetch`, qu'aux API sur le même domaine.

Par exemple : si j'ai mon front sur `www.oclock.com` il ne pourra pas faire de requête vers `api.oclock.io`. Ceci pour protéger / empêcher des fuites de données.

Si j'ai besoin d'autoriser cette communication il faudra que les réponses de `api.oclock.io` comporte le header `Access-Control-Allow-Origin` avec pour valeur : `www.oclock.com`. La valeur spéciale `*` autorise tout le monde à faire des requêtes vers cette API.

:warning: Cette sécurité n'est valable que dans les navigateurs.


## XSS

Pour Cross-site scripting. L'idée c'est de stocker du HTML / JS / CSS dans une variable qui sera restitué par le back.

Par exemple : `<script>alert('toto');</script>` dans un commentaire pour déclencher l'apparition d'une popup chaque fois que le commentaire est affiché.

Pour sécuriser notre site l'objectif est d'être sur que le contenu de nos variable sera considéré comme du texte et pas comme des noeuds HTML.

Pour ça, plusieurs option :
- Dans EJS : on évite d'utiliser `<%-` avec des choses saisies par l'utilisateur
- En JS Front : on évite d'utiliser `node.innerHTML` on privilégie `node.textContent`
- Dans le back : on "sanitize" les données reçu de l'utilisateur à l'aide de package approprié (ex: https://www.npmjs.com/package/xss)

## Service direct de fichiers

*(Par exemple avec le module public)*

Il faut toujours faire très attention dès qu'une URL permet de récupérer (télécharger) des fichiers sur le serveur (via `sendFile` ou via le middleware `static`).

Par exemple je dois absolument éviter que mes sauvegardes de base de données soit accessible.

## Sécurité Front Ou Back

Les mesures de sécurité doivent être si possible des deux cotés. Mais à choisir ce sera coté back.

En effet, avec Insomnia par exemple, je peux m'affranchir de tous les contrôles qu'il pourrait y avoir coté front.

Les contrôles sécurité coté front servent surtout à indiquer précisément à l'utilisateur où il fait des erreurs.

## HTTPS

Depuis les scandales Snowden, Lustre, etc... Il est impératif de chiffrer les communication entre le serveur et le navigateur.

Pour cela on utilisera HTTPS à la place du protocole HTTP.

*(voir fiche récap associé)*