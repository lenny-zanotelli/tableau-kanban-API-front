//Un objet Javascript

const personne = {
    nom: "Norris",
    prenom: "Chuck",
    age: "82"
}


/*Un objet JSON

{
    "nom": "Norris",
    "prenom": "Chuck",
    "age": "82"
}
*/


//On veut tester JSON.stringify

const result = JSON.stringify(personne)
//console.log(result); // => '{"nom":"Norris","prenom":"Chuck","age":"82"}'


//On veut tester JSON.parse

const result2 = JSON.parse(result);
console.log(result2); // => { nom: 'Norris', prenom: 'Chuck', age: '82' }