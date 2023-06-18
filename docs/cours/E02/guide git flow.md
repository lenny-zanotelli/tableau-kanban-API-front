# Guide du Git Flow

Git Flow est un workflow, c'est-à-dire une façon de travailler. On push sur des branches, et on ne touche jamais à la branche master. 

Ici, la branche master servira à récupérer la correction du prof

Pourquoi on travaille en git flow ?

C'est pour garder un historique jour par jour !
On peut aussi l'utiliser en mode feature par feature, mais ce qui va nous intéresser cette saison c'est l'historicité quotidienne.


## Pré requis 

- J'ai cloné un repo distant (par exemple le repo créé via le lien o'Challenge)


## Première étape, le multi-remote

Le multi remote, c'est lorsqu'un projet local git est lié à plusieurs repo distants (remotes) (cf [Schéma vu en cockpit](./)

Ici, notre repo local a été créé grâce à `git clone`.

Il est donc automatiquement lié avec le repo distant source (le repo généré avec le lien du o'Challenge par exemple)

Si on veut rajouter un deuxième repo distant (remote), il va falloir faire :

`git remote add nomDuRemote LienVersLeRemote`

Par exemple, si je veux lier le remote du prof à mon projet local :

`git remote add prof git@github.com:O-clock-Ohm/S06-oKanban-BLUE.git`

On peut vérifier qu'il a bien été ajouté à notre repo local avec la commande `git remote -v`


## Deuxième étape, on travaille en Git Flow !

Avant de commencer à travailler :

- `git branch` => Je vérifie dans quelle branche je me trouve actuellement
- `git checkout master` => Je me place sur la branche master
- `git pull prof main --allow-unrelated-histories --no-edit -X theirs` => Je pull la correction du prof dans ma branche courante

On répètera cette étape chaque jour avant de démarrer l'atelier pour que vous ayez bien la correction du prof !

Une fois fait :
- `git branch` => Je vérifie que je suis bien dans la branche master 
- Je créé ma branche du jour (par exemple jour-1) : `git branch jour-1`. On fait cette commande dans la branche master pour commencer la nouvelle branche à partir de la correction du prof
- En cas d'erreur, vous pouvez supprimer la nouvelle branche avec ` git branch --delete nomDeLaBranche`
- `git branch` => Je vérifie sur quelle branche je suis actuellement
- `git checkout brancheCible` => Je vais sur la brancheCible (par exemple jour-1)
- J'effectue mes tâches (code, mcd, user_stories, etc...)

Une fois que j'ai terminé de travailler

- `git add .` => J'ajoute mes modifs dans la zone de staging
- `git commit -m "message"` => Je commit mes modifs
- `git push origin jour-1` => Je push ce commit dans le remote "origin", à la branche "jour-1"




Quelques précisions sur la commande qui récupère la correction du prof :

`git pull prof main --allow-unrelated-histories --no-edit -X theirs` 

Cette commande va récupérer la branche main du remote prof.
Voici un détail de chaque paramètre passés dans cette commande:

- `allow-unrelated-histories` : permet le pull de commits qui viennent d'un autre repo

- `no-edit` : éviter de demander confirmation en ouvrant VIM

- `X theirs` : en cas de conflit (exemple : je commit des choses sur master qui sont antagonistes avec ce qu'a fait le prof) => garder la version du prof







