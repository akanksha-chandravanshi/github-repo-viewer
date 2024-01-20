async function getRepos() {
    const username = document.getElementById("username").value;
    const repoList = document.getElementById("repoList");

    // Clear previous results
    repoList.innerHTML = "";

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        if (response.ok) {
            data.forEach(repo => {
                const listItem = document.createElement("li");
                listItem.className = "repoItem";
                listItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "No description available."}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                repoList.appendChild(listItem);
            });
        } else {
            throw new Error(data.message || "Failed to fetch repositories.");
        }
    } catch (error) {
        console.error(error);
        alert("Error: " + error.message);
    }
}