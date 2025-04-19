function toggleMenu() {  // Affiche/masque la barre de navigation en mode mobile
    const headerNav = document.getElementById('header-nav')
    headerNav.classList.toggle('visible')
}

function toggleDarkMode() {  // Switch entre le mode dark ou light
    const darkMode = document.documentElement.classList.toggle('dark')
    console.log(darkMode)
    localStorage.setItem('dark-mode', darkMode) /* enregistre le mode dans le localstorage */
    console.log(localStorage)
}

function ajouterSectionArticles(parent, titre, articles) {  // Articles par catégorie
    // Creation d'une section avec un titre et une div
    const section = document.createElement('section')
    section.classList.add('articles')
    section.innerHTML = `
        <h2>${titre}</h2>
        <div></div>
    `

    // Ajout des fiches articles
    const div = section.querySelector('div')
    articles.forEach(article => {
        div.innerHTML += `
            <a href="produit.html?id=${article.id}">
            <img src="${article.photo}" alt="${article.alt}" />
            <p>${article.nom}</p>
            <p><strong>${article.prix.toFixed(2)} €</strong></p>
            </a>
        `
    })

    // Ajout de la section dans le parent
    parent.appendChild(section)
}

function ajouterSectionArticle(parent, article) {  // Fiche produit
    // Création d'une section article
    const section = document.createElement('section')
    section.id = 'article'

    // Ajout des infos de la fiche
    section.innerHTML = `
        <div id="article-image">
            <img src="${article.photo}" alt="${article.alt}" />
        </div>
        <div id="article-desc">
            <a href="javascript:history.back()">RETOUR</a>
            <h2>${article.nom}</h2>
            <p id="prix"><strong>${article.prix.toFixed(2)} €</strong></p>
            <p id="resume">${article.resume}</p>
            <button onclick="ajouterPanier(${article.id})">AJOUTER AU PANIER</button>
            <section>DESCRIPTION
                <p>${article.description}</p>
            </section>
            <section>CONSEILS
                <p>${article.conseils}</p>
            </section>
            <section>SERVICE-APRES-VENTE
                <p>${article.sav}</p>
            </section>
        </div>
    `

    // Ajout de la section dans le parent
    parent.appendChild(section)
}

function ajouterPanier(id) {
    alert('Votre article a bien été ajouté') // Message provisoire
}

// ============================================================================
// Récupération de la valeur du dark mode dans le localstorage
console.log(localStorage)
if (localStorage.getItem('dark-mode') === 'true') {  /* booléen stocké sous forme de chaine */
    document.documentElement.classList.add('dark')
}

// Récupération de l'url de la page courante
const url = new URL(window.location)  // https://developer.mozilla.org/en-US/docs/Web/API/URL_API
console.log(url)

// Si page produit
if (url.pathname.endsWith('produit.html')) {
    // Récupère l'id de l'article (le convertit en number car get retourne un string)
    const id = parseInt(url.searchParams.get('id'))  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    console.log(url.pathname, `id=${id}`)

    // Récupération de l'élément main
    const main = document.querySelector('main')
  
    // Ajout de la fiche article corespondante
    const article = articles.find(article => article.id === id)
    console.log(article)
    ajouterSectionArticle(main, article)
    
    // Ajout des recommandations (même groupe, même catégorie)
    const groupe = article.groupe
    const categorie = article.categorie
    const selection = articles.filter(article => article.groupe === groupe && article.categorie === categorie)
    console.log(selection)
    ajouterSectionArticles(main, 'Vous aimerez aussi', selection)
}

// Si page homme ou femme, remplit la page avec les articles associés
else if (url.pathname.endsWith('femme.html') || url.pathname.endsWith('homme.html')) {
    console.log(url.pathname)

    // Récupération de l'élément main
    const main = document.querySelector('main')

    // Récupère le groupe correspondant à la page (c'est le titre de la bannière)
    const groupe = document.querySelector('#banniere h1').textContent
    console.log(groupe)

    // Filtre les articles corespondants au groupe
    const articlesGroupe = articles.filter(article => article.groupe === groupe)
    console.log(articlesGroupe)

    // Récupère toutes les catégories du groupe
    let categoriesGroupe = articlesGroupe.map(article => article.categorie)
    categoriesGroupe = categoriesGroupe.filter((categorie, i) => categoriesGroupe.indexOf(categorie) === i); /* Rend chaque catégorie unique */
    console.log(categoriesGroupe)

    // Pour chaque catégorie de la page, ajoute la section correspondante
    categoriesGroupe.forEach(categorie => {
        const selectionArticles = articlesGroupe.filter(article => article.categorie === categorie)
        ajouterSectionArticles(main, categorie, selectionArticles)
    })
}

else {
    console.log(url.pathname)
}











