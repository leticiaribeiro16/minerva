const TurnoValuesReverse = {
    'MANHA': 1,
    'TARDE': 2,
    'NOITE': 3,
    'FLEXIVEL': 4
  };
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscricaoForm');
    const submitBtn = document.getElementById('submitBtn');
  
    submitBtn.addEventListener('click', function(event) {
      event.preventDefault();
  
      const id_edital = form.elements['id_edital'].value;
      let turno = form.elements['turno'].value;
      turno = TurnoValuesReverse[turno.toUpperCase()];
  
      fetch(`http://localhost:3000/inscricao?id_edital=${id_edital}&turno=${turno}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
      })
      .then(response => {
        if (!response.ok && response.status !== 409) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        window.location.href = '/Aluno/inscricoes';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });