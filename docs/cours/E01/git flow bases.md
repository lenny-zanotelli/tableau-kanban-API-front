## Git flow

ATTENTION (très important):

    - On va créer une branche chaque jour, sans la fusionner au master (ou main). Celle-ci sera réservée à la correction fournie par le prof chaque jour


        - Pour créer une branche : `git branch <nomDeLaBranche>`
        - Pour voir sur quelle branche vous êtes : `git branch`
        - Pour changer de branche : `git checkout <nomDeLaBranche>`

Après avoir cloné le repo du prof, ajouter un remote nommé "prof"

	- git remote add prof <lien_repo_du_prof>

Ensuite, on met à jour la branche master pour qu'elle matche celle du repo "prof" :

	- git pull prof main --allow-unrelated-histories --no-edit -X theirs

			- `allow-unrelated-histories` : permet le pull de commit qui viennent d'un autre repo

			- `no-edit` : éviter de demander confirmation en ouvrant VIM

			- `X theirs` : en cas de conflit (exemple : je commit des choses sur master qui sont antagonistes avec ce qu'à fait le prof) => garder la version du prof

    - git push origin master 

        Va permettre de push la correction du prof sur votre branche master


Par exemple pour le jour 1 :
- on clone via le lien du ochallenge
- git clone lienDuRepoCrééParLeOChallenge
- git remote add prof <lien_repo_du_prof> //On ajoute le github du prof dans notre projet (on ajoute un remote)
  
- git pull prof main --allow-unrelated-histories --no-edit -X theirs
- git branch jour-1      // on créé une branche "jour-1"
- git branch             // on vérifie sur quelle branche on est
- git checkout jour-1    // on switch sur la branche jour-1
- git branch             // on vérifie que le switch s'est bien passé
- (on fait nos tâches)
- git branch             // on vérifie encore qu'on est sur la bonne branche
- git add .              // on stage les modifications
- git commit -m "message" //on commit
- git push origin jour-1 / on push vers la branche du jour sur votre remote