function createProcessosCards(data, container, filter) {

    data.forEach(item => {
        if (filter === null || item.aprovado === filter) {
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
            cardTitle.textContent = item.edital.titulo;
            cardLink.setAttribute('href', '');
            cardLink.setAttribute('class', 'btn');
            cardIcon.setAttribute('class', 'bx bx-show-alt nav_icon');
            cardBody.setAttribute('class', 'card-body');
            cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-body-secondary');
            cardSubtitle.textContent = item.edital.demanda.user.nome;
            cardButton.setAttribute('href', 'inscricoes/' + item.edital.id);
            cardButton.setAttribute('class', 'btn btn-primary');
            let statusText;
            let buttonClass;
            switch (item.aprovado) {
                case 0:
                    statusText = "Pendente";
                    buttonClass = "btn btn-warning";
                    break;
                case 1:
                    statusText = "Aprovado";
                    buttonClass = "btn btn-primary";
                    break;
                case 2:
                    statusText = "Reprovado";
                    buttonClass = "btn btn-danger";
                    break;
                default:
                    statusText = "Unknown";
                    buttonClass = "btn btn-secondary";
            }
            cardButton.textContent = statusText;
            cardButton.setAttribute('class', buttonClass);
            // Append elements
            // cardLink.appendChild(cardIcon);
            cardHeader.appendChild(cardTitle);
            cardHeader.appendChild(cardLink);
            cardBody.appendChild(cardSubtitle);
            cardBody.appendChild(cardButton);
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            // Append card to the container
            container.appendChild(card);
        }
    });
}

fetch('http://localhost:3000/inscricao/', {
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
})
    .then(response => response.json())
    .then(data => {
        const processosContainer = document.querySelector('#processosContainer');
        createProcessosCards(data, processosContainer, null);
    })
    .catch(error => console.error('Error:', error));