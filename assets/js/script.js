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
    // Creation d'une section avec un titre et une div, ajout au parent
    const section = document.createElement('section')
    section.classList.add('articles')
    section.innerHTML = `
        <h2>${titre}</h2>
        <div></div>
    `
    parent.appendChild(section)

    //Ajout dans la div des fiches articles
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
}


function ajouterSectionArticle(parent, article) {  // Fiche produit
    parent.innerHTML += `
        <section id="article">
            <div id="article-image">
                <img src="${article.photo}" alt="${article.alt}" />
            </div>
            <div id="article-desc">
                <a href="javascript:history.back()">RETOUR</a>
                <h2>${article.nom}</h2>
                <p id="prix"><strong>${article.prix.toFixed(2)} €</strong></p>
                <p id="resume">${article.resume}</p>
                <button onclick="ajouterPanier(${article.id})">AJOUTER AU PANIER</button>
                <section>
                    <h3>DESCRIPTION</h3>
                    <p>${article.description}</p>
                </section>
                <section>
                    <h3>CONSEILS</h3>
                    <p>${article.conseils}</p>
                </section>
                <section>
                    <h3>SERVICE-APRES-VENTE</h3>
                    <p>${article.sav}</p>
                </section>
            </div>
        </section>
    `
}


function ajouterBanniere(parent, groupe) { // Titre et bannière de la page
    parent.innerHTML += `
        <div id="banniere">
            <img src="${groupe.banniere}" alt="${groupe.alt}">
            <h1>${groupe.titre}</h1>
        </div>
    `
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
    
    // Ajout des recommandations (même groupe, même catégorie, différent de l'article affiché)
    const groupe = article.groupe
    const categorie = article.categorie
    const selection = articles.filter(article =>
        article.groupe === groupe &&
        article.categorie === categorie  &&
        article.id !== id)
    console.log(selection)
    ajouterSectionArticles(main, 'Vous aimerez aussi', selection)
}

// Si page produits (au pluriel), récupére la sélection demandée
else if (url.pathname.endsWith('produits.html')) {
    // Récupère l'id du groupe depuis l'url
    const id = url.searchParams.get('id')
    console.log(url.pathname, `id=${id}`)

    // Récupération de l'élément main dans la page
    const main = document.querySelector('main')

    // Ajout de la bannière et du titre
    const groupe = groupes.find(groupe => groupe.id === id)
    console.log(groupe)
    ajouterBanniere(main, groupe)

    // Récupère les articles du groupe
    const articlesGroupe = groupe.selection
    console.log(articlesGroupe)

    // Liste toutes les catégories du groupe
    let categoriesGroupe = articlesGroupe.map(article => article.categorie)
    categoriesGroupe = categoriesGroupe.filter((categorie, i) => categoriesGroupe.indexOf(categorie) === i); /* Rend chaque catégorie unique */
    console.log(categoriesGroupe)

    // Pour chaque catégorie du groupe, ajoute la section correspondante
    categoriesGroupe.forEach(categorie => {
        const selectionArticles = articlesGroupe.filter(article => article.categorie === categorie)
        ajouterSectionArticles(main, categorie, selectionArticles)
    })
}

else {
    console.log(url.pathname)
}
