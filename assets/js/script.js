function toggleMenu() {  // Affiche/masque la barre de navigation en mode mobile
    const headerNav = document.getElementById('header-nav')
    headerNav.classList.toggle('visible')
}

function remplirPageArticles() {  // HOMMES et FEMMES
    const main = document.querySelector('main')

    // Récupère le groupe de la page (c'est le titre de la bannière)
    const groupe = document.querySelector('#banniere h1').textContent
    console.log(groupe)

    // Filtre les articles du groupe
    const articlesGroupe = articles.filter(article => article.groupe === groupe)
    console.log(articlesGroupe)

    // Récupère les catégories de la page
    let categoriesPage = articlesGroupe.map(article => article.categorie)
    categoriesPage = categoriesPage.filter((categorie, i) => categoriesPage.indexOf(categorie) === i); /* Rend chaque catégorie unique */
    console.log(categoriesPage)

    // Pour chaque catégorie de la page
    categoriesPage.forEach(categorie => {
        // Ajout d'une section avec un titre et une div
        const section = document.createElement('section')
        section.classList.add('articles')
        section.innerHTML = `<h2>${categorie}</h2>
    <div></div>`
        main.appendChild(section)

        // Ajout des articles de la catégorie correspondante à la section dans la div
        const div = section.querySelector('div')
        articlesGroupe.filter(article => article.categorie === categorie).forEach(article => {
            div.innerHTML += `
            <a href="produit.html?id=${article.id}">
                <img src="${article.photo}" alt="${article.nom}" />
                <p>${article.nom}</p>
                <p><strong>${article.prix.toFixed(2)} €</strong></p>
            </a>`
        })
    })
}

function remplirPageProduit(id) {
    // Récupération de la fiche de l'article
    id = parseInt(id)  // Convertit l'id en type Number
    const article = articles.find(article => article.id === id)
    console.log(article)

    const sectionArticle = document.getElementById('article')
    sectionArticle.innerHTML = `
        <div id="article-image">
            <img src="${article.photo}" alt="${article.alt}" />
        </div>
        <div id="article-desc">
            <a href="javascript:history.back()">RETOUR</a>
            <h2>${article.nom}</h2>
            <p id="prix"><strong>${article.prix.toFixed(2)} €</strong></p>
            <p id="resume">${article.resume}</p>
            <button onclick="ajouterPanier(${id})">AJOUTER AU PANIER</button>
            <section>DESCRIPTION
                <p>${article.description}</p>
            </section>
            <section>CONSEILS
                <p>${article.conseils}</p>
            </section>
            <section>SERVICE-APRES-VENTE
                <p>${article.sav}</p>
            </section>
        </div>`
}

function ajouterPanier(id) {
    alert ('Votre article a bien été ajouté') // Message provisoire
}

// ============================================================================

// Récupération de l'url de la page courante
const url = new URL(window.location)  // https://developer.mozilla.org/en-US/docs/Web/API/URL_API
console.log(url)

// Si page produit, récupère l'id et remplit la page
if (url.pathname === '/produit.html') {
    const articleId = url.searchParams.get('id')  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    console.log(url.pathname, `id=${articleId}`)
    remplirPageProduit(articleId)
}

// Si page homme ou femme, remplit la page avec les articles associés
else if (url.pathname === '/femme.html' || url.pathname === '/homme.html') {
    console.log(url.pathname)
    remplirPageArticles()
}











