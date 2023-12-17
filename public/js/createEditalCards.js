function createCards(data, container) {

    data.forEach(item => {
        // Create card elements
        const card = document.createElement('div');
        const cardHeader = document.createElement('div');
        const cardTitle = document.createElement('h5');
        const cardLink = document.createElement('a');
        const cardIcon = document.createElement('i');
        const cardBody = document.createElement('div');
        const cardSubtitle = document.createElement('h6');
        const cardButton = document.createElement('a');

        // Set attributes and content
        card.setAttribute('class', 'card');
        card.setAttribute('style', 'width: 18rem;');
        cardHeader.setAttribute('class', 'card-header');
        cardTitle.setAttribute('class', 'card-title');
        cardTitle.textContent = item.disciplina;
        cardLink.setAttribute('href', '');
        cardLink.setAttribute('class', 'btn');
        cardIcon.setAttribute('class', 'bx bx-show-alt nav_icon');
        cardBody.setAttribute('class', 'card-body');
        cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-body-secondary');
        cardSubtitle.textContent = item.orientador;
        cardButton.setAttribute('href', '');
        cardButton.setAttribute('class', 'btn btn-primary');
        cardButton.textContent = 'Infoweb';

        // Append elements
        cardLink.appendChild(cardIcon);
        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(cardLink);
        cardBody.appendChild(cardSubtitle);
        cardBody.appendChild(cardButton);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        // Append card to the container
        container.appendChild(card);
    });
}

// c:\Minerva\public\js\createCards.js

fetch('http://localhost:3000/edital/', {
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const editaisContainer = document.querySelector('#editaisContainer');
        console.log(editaisContainer);
        createCards(data, editaisContainer);
    })
    .catch(error => console.error('Error:', error));