import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis, afficherGraphiqueAvis } from "./avis.js";

await afficherGraphiqueAvis();
/*********************************************************************************************************************************/
//LOCAL STORAGE
/**********************************************************************************************************************************/
let pieces = window.localStorage.getItem('pieces');

//Récupération des pièces eventuellement stockées dans le localStorage
if (pieces === null){
    // Récupération des pièces depuis l'API
    const reponse = await fetch('http://localhost:8081/pieces/');
    pieces = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
 }else{
     pieces = JSON.parse(pieces);
 }

// function called to sent avis
ajoutListenerEnvoyerAvis()
 /*********************************************************************************************************************************/
//DOM : CREATION OF THE ARTICLES
/*********************************************************************************************************************************/
// Fonction qui génère toute la page web
function genererPieces(pieces) {
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

        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
    
        // Affiliation à un parent
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        pieceElement.appendChild(avisBouton);
    
    }

    ajoutListenersAvis();
    
}
 
// Premier affichage de la page
genererPieces(pieces);

for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id; 
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`); 
    const avis = JSON.parse(avisJSON); 

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}]`); 
        afficherAvis(pieceElement, avis)
    }
    
}
/*********************************************************************************************************************************/
//FONCTIONS SORT & FILTER
/**********************************************************************************************************************************/
// SORT : 
// Ajout du listener pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
   const piecesOrdonnees = Array.from(pieces)
   piecesOrdonnees.sort(function (a, b) {
       return b.prix - a.prix;
   });
  // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
});
 
/*************************************************************** */
// FILTER
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.disponibilite;
   });
   // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

/*************************************************************** */
//ORDRE DECROISSANT
const boutonDecroissnt = document.querySelector(".btn-decroissant");
boutonDecroissnt.addEventListener("click", function () {
    const piecesDecroissnt = Array.from(pieces);
   piecesDecroissnt.sort(function (a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesDecroissnt);
});

/*************************************************************** */
//FAIT DISPARAITRE CONTENU SANS DESCRIPTION  
const boutonNoDesc = document.querySelector(".btn-noDesc");
boutonNoDesc.addEventListener("click", function () {
   const piecesNoDesc = pieces.filter(function (piece) {
       return piece.description
   });
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesNoDesc);
});

/*************************************************************** */
//INPUT RANGE VALUE
const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
});

/*********************************************************************************************************************************/
//LISTE DE NOMS POUR FILTRES
/**********************************************************************************************************************************/
const noms = pieces.map(piece => piece.nom);
const dispo = pieces.map(piece => piece.disponibilite) ? "[En stock]" : "[Rupture de stock]";

//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = `${noms[i]} - ${dispo};`
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
.appendChild(abordablesElements);


/*********************************************************************************************************************************/
//BOUTON METTRE A JOUR
/**********************************************************************************************************************************/
 // Ajout du listener pour mettre à jour des données du localStorage
 const boutonMettreAJour = document.querySelector(".btn-maj");
 boutonMettreAJour.addEventListener("click", function () {
   window.localStorage.removeItem("pieces");
 });

 await afficherGraphiqueAvis()