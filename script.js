const getPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    displayPosts(posts);
  };
  
  const displayPosts = (posts) => {
    const postContainer = document.getElementById('posts');
    postContainer.innerHTML = posts
      .slice(0, 10)
      .map(
        (post) => `
          <div class="post" data-id="${post.id}">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        `
      )
      .join('');
  };
  
  document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
  
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  
    const newPost = await response.json();
    const postContainer = document.getElementById('posts');
    postContainer.innerHTML += `
      <div class="post" data-id="${newPost.id}">
        <h2>${newPost.title}</h2>
        <p>${newPost.body}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
  
    document.getElementById('postForm').reset();
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const posts = document.getElementById('posts');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    let currentPostId = null;
  
    posts.addEventListener('click', (e) => {
        const postElement = e.target.closest('.post');
        if (postElement) {
            currentPostId = postElement.dataset.id;
        }
  
        if (e.target.classList.contains('edit-btn')) {
            const title = postElement.querySelector('h2').textContent;
            const body = postElement.querySelector('p').textContent;
            document.getElementById('editTitle').value = title;
            document.getElementById('editBody').value = body;
            editModal.classList.remove('hidden');
        } else if (e.target.classList.contains('delete-btn')) {
            deleteModal.classList.remove('hidden');
        }
    });
  
    document.getElementById('saveEdit').addEventListener('click', () => {
        const updatedTitle = document.getElementById('editTitle').value;
        const updatedBody = document.getElementById('editBody').value;
        const post = document.querySelector(`.post[data-id="${currentPostId}"]`);
        post.querySelector('h2').textContent = updatedTitle;
        post.querySelector('p').textContent = updatedBody;
        editModal.classList.add('hidden');
    });
  
    document.getElementById('cancelEdit').addEventListener('click', () => {
        editModal.classList.add('hidden');
    });
  
    document.getElementById('confirmDelete').addEventListener('click', () => {
        document.querySelector(`.post[data-id="${currentPostId}"]`).remove();
        deleteModal.classList.add('hidden');
    });
  
    document.getElementById('cancelDelete').addEventListener('click', () => {
        deleteModal.classList.add('hidden');
    });
  
    getPosts();
  });

 
const container = document.getElementById('emojiContainer');
const emojis = ['🤎', '🧸', '🥨'];

function createFloatingEmoji() {
    
    const emoji = document.createElement('div');
    emoji.classList.add('floating-emoji');
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)]; 
    const containerRect = container.getBoundingClientRect();
    const randomX = Math.random() * containerRect.width; 
    emoji.style.left = `${randomX}px`;
    emoji.style.top = `${containerRect.height}px`;
    const randomSize = Math.random() * 2 + 1; 
    emoji.style.fontSize = `${randomSize}rem`;
    container.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 4000); 
}

function startFloatingEmojis() {
    setInterval(createFloatingEmoji, 500); 
}

startFloatingEmojis();
