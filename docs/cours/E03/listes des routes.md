# Routes

## List

|VERBE|ROUTE|DESCRIPTION|
|------|------|------|  
|GET | `/lists`| récupérer toutes les listes |
|GET | `/lists/:id`| récupérer une liste |
|POST | `/lists`| créer une liste |
|PUT | `/lists/:id`| modifier une liste |
|DELETE | `/lists/:id`| supprimer une liste |

## Card

|VERBE|ROUTE|DESCRIPTION|
|------|------|------|  
|GET | `/lists/:id/cards`| récupérer toutes les cartes d'une liste |
|GET | `/cards/:id`| récupérer une carte |
|POST | `/cards`| créer une carte |
|PUT | `/cards/:id`| modifier une carte |
|DELETE | `/cards/:id`| supprimer une carte |

## Tag

|VERBE|ROUTE|DESCRIPTION|
|------|------|------|  
|GET | `/tags`| récupérer toutes les tags |
|GET | `/tags/:id`| récupérer un tag |
|POST | `/tags`| créer un tag |
|PUT | `/tags/:id`| modifier un tag |
|DELETE | `/tags/:id`| supprimer un tag |
|POST | `/cards/:id/tags`| ajouter un tag à une carte |
|DELETE | `/cards/:cardId/tags/:tagId`| supprimer un tag d'une carte |