// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

/*********************************************************************************************************************************/
//DOM : CREATION OF THE ARTICLES
/*********************************************************************************************************************************/

for (let i = 0; i < pieces.length; i++) {
    // Manipulation du DOM
    const article = pieces[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");

    const imageElement = document.createElement("img");
    imageElement.src = article.image;

    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    const descriptionElement = document.createElement("p"); 
    descriptionElement.innerText = article.description ?? " ";

    // Si la machine n'apprtient à aucune catégorie
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "[En stock]" : "[Rupture de stock]"   

    // Affiliation à un parent
    sectionFiches.appendChild(pieceElement);
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement)

}

/*********************************************************************************************************************************/
//FONCTIONS SORT & FILTER
/**********************************************************************************************************************************/
// SORT : 
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
   piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(pieces);
});

/*************************************************************** */
// FILTER
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
});

/*************************************************************** */
//ORDRE DECROISSANT
const boutonDecroissnt = document.querySelector(".btn-decroissant");
boutonDecroissnt.addEventListener("click", function () {
    const piecesDecroissnt = Array.from(pieces);
   piecesDecroissnt.sort(function (a, b) {
        return b.prix - a.prix;
    });
    console.log(piecesDecroissnt);
});

/*************************************************************** */
//FAIT DISPARAITRE CONTENU SANS DESCRIPTION  
const boutonNoDesc = document.querySelector(".btn-noDesc");
boutonNoDesc.addEventListener("click", function () {
   const piecesNoDesc = pieces.filter(function (piece) {
       return piece.description
   });
   console.log(piecesNoDesc)
});
