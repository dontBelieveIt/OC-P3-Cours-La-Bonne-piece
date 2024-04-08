for (let i = 0; i < pieces.length; i++) {
    
    // Récupération des pièces depuis le fichier JSON
    const reponse = await fetch("pieces-autos.json");
    const pieces = await reponse.json();

    // Manipulation du DOM
    const article = pieces[0];
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    // Si la machine n'apprtient à aucune catégorie
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock"   

    // Affiliation à un parent
    const sectionFiches = document.querySelector(".fiches");
    sectionFiches.appendChild(imageElement);
    sectionFiches.appendChild(nomElement);
    sectionFiches.appendChild(prixElement);
    sectionFiches.appendChild(categorieElement);
    document.body.appendChild(prixElement);

}