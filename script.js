const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function createRepositoryCard(repository) {
    const item = document.createElement("li");
    item.className = "repository-card";

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repository.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${repository.owner}/${repository.name}`;
    title.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const language = document.createElement("span");
    language.className = "repository-language";
    language.textContent = repository.language;

    item.append(title, description, language);
    return item;
}

async function loadRepositories() {
    try {
        const response = await fetch("./events.json");
        if (!response.ok) {
            throw new Error(`Impossible de charger les dépôts (HTTP ${response.status}).`);
        }

        const repositories = await response.json();
        if (!Array.isArray(repositories)) {
            throw new Error("Le fichier des dépôts doit contenir une liste.");
        }

        repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
        statusMessage.textContent = repositories.length
            ? `${repositories.length} dépôts favoris`
            : "Aucun dépôt favori pour le moment.";
    } catch (error) {
        statusMessage.textContent = "Les dépôts n’ont pas pu être chargés. Vérifiez le fichier events.json et réessayez.";
        console.error("Erreur lors du chargement des dépôts favoris :", error);
    }
}

loadRepositories();
