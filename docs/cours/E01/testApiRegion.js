const url = "https://geo.api.gouv.fr/regions";

function testFetch(url){
    fetch(url)
        .then((response) => console.log(response))
}

testFetch(url);