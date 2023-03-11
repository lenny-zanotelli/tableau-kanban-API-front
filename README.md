# oKanban backend

## API Endpoints

### Listes

|Méthode|Route|Description|
|---|---|---|
|GET|`/lists`|renvoie toutes les listes avec leurs cards|
|GET|`/lists/:id`|renvoie une liste|
|POST|`/lists`|crée une nouvelle liste|
|PUT|`/lists/:id`|modifie une liste (ou 404)|
|DELETE|`/lists/:id`|supprimer une liste (ou 404)|

### Cartes
|Méthode|Route|Description|
|---|---|---|
|GET|`/lists/:id/cards`|renvoie toutes les cartes d'une liste. Chaque carte doit porter les tags qui lui sont associés.|
|GET|`/cards/:id`|renvoie les détails de la carte demandée, avec les tags qui lui sont associés.|
|POST|`/cards`|crée une nouvelle carte (attention à bien valider les paramètres)|
|PUT|`/cards/:id`|modifie une carte (ou 404)|
|DELETE|`/cards/:id`|supprimer ou carte (ou 404)|


### Tags
|Méthode|Route|Description|
|---|---|---|
|GET|`/tags`|renvoie tous les tags||
|POST|`/tags`|crée un nouveau tag (attention aux paramètres)||
|PATCH|`/tags/:id`|modifie le tag ciblé (ou 404, ou 400, bref on commence à avoir l'habitude)||
|DELETE|`/tags/:id`|supprime un tag. (Pas besoin de toucher à la table de liaison, on en reparlera en cockpit!)||
|POST|`/cards/:id/tag`|associe un tag à la carte ciblée. L'id du tag doit se trouver dans les paramètres POST (sous le nom "tag_id")||
|DELETE|`/cards/:card_id/tag/:tag_id`|supprime l'association entre le tag et la carte.||