document.addEventListener("DOMContentLoaded", async () => {
  // Fetch the list of posts dynamically
  const response = await fetch("/posts/posts.json");
  const posts = await response.json();
  const postsContainer = document.getElementById("posts");

  // Display the 3 latest posts
  const latestPosts = posts.slice(0, 3);
  for (const postUrl of latestPosts) {
    const postResponse = await fetch(postUrl);
    const data = await postResponse.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const title = doc.querySelector("h1").innerText;
    const content = doc.querySelector("p").innerText;

    const postElement = document.createElement("div");
    postElement.classList.add("post-preview");
    postElement.innerHTML = `
      <h2><a href="${postUrl}">${title}</a></h2>
      <p>${content}</p>
    `;
    postsContainer.appendChild(postElement);
  }
});
