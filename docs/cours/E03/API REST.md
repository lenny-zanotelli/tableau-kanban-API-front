# API REST

## Késako ?

API REST : Application Programming Interface Representational State Transfer

C'est un type de protocole qui permet de faire des requêtes HTTP pour interagir avec une application ou un service. 

On utilise des URL (routes) pour récupérer et interagir avec des données. Le plus souvent, elles seront sous forme de JSON, mais on peut très bien retrouver du XML, YAML...

 C'est un moyen pour les développeurs de faire communiquer différentes applications entre elles.

## Principes

### Client-server

Un programme (client) demande des informations, un serveur lui fournit 

### Ressources

Les informations sont stockées sous forme de "ressources", qui peuvent être trouvées à des addresses spécifiques (URL)

### Méthodes HTTP

Pour demander ou changer ces informations, on utilise des méthodes simples (GET, POST, DELETE, etc...)

### Format de données

Les informations sont transmises sous forme de texte : JSON, XML, etc...

### Stateless

Comme HTTP, chaque requête contient toutes les informations nécessaires pour être traitées, sans avoir besoin de se rappeler ce qui s'est passé avant.

### Cacheable

Certaines réponses peuvent être sauvegardées pour une utilisation future

### Codes d'erreurs

Si quelque chose ne fonctionne pas, on renvoie un code HTTP spécifique pour indiquer le type d'erreur.


Ces principes sont importants pour garantir que les API REST soient fiables, performantes et faciles à utiliser.
