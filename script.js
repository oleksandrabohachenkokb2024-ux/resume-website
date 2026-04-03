document.addEventListener("DOMContentLoaded", () => {
    
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        timestamp: new Date().toLocaleString()
    };

    localStorage.setItem('user_browser_data', JSON.stringify(info));
    
    const footerElement = document.getElementById('storage-info');
    if (footerElement) {
        const storedData = JSON.parse(localStorage.getItem('user_browser_data'));
        footerElement.innerText = `Дані системи: ${storedData.platform} | ${storedData.userAgent}`;
    }

    const variantId = 4; 
    fetch(`https://jsonplaceholder.typicode.com/posts/${variantId}/comments`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('comments-container');
            container.innerHTML = data.map(item => `
                <div class="comment-item">
                    <strong>${item.email}</strong>
                    <p>${item.body}</p>
                </div>
            `).join('');
        })
        .catch(err => console.error("Помилка при завантаженні коментарів:", err));

    setTimeout(() => {
        const modal = document.getElementById('modal-overlay');
        if (modal) modal.style.display = 'flex';
    }, 60000); 

    document.getElementById('close-modal').onclick = () => {
        document.getElementById('modal-overlay').style.display = 'none';
    };

    const themeBtn = document.getElementById('theme-toggle');
    const currentHour = new Date().getHours();

    if (currentHour < 7 || currentHour >= 21) {
        document.body.classList.add('dark-theme');
    }

    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-theme');
    };
});