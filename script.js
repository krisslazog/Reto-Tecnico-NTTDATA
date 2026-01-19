// Reto Tecnico
document.addEventListener('DOMContentLoaded', () => {
    
    const lista = document.getElementById('usuarios-lista');
    const API = 'https://randomuser.me/api/?results=10';

    // Petición al servicio de datos
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const personas = data.results;
            lista.innerHTML = ''; // Limpiar mensaje de carga

            personas.forEach(p => {
                const card = document.createElement('div');
                card.className = 'registro-usuario';
                
                //FORMATO DE FECHA
                const fechaRaw = new Date(p.dob.date);
                const dia = String(fechaRaw.getDate()).padStart(2, '0');
                const mes = String(fechaRaw.getMonth() + 1).padStart(2, '0'); 
                const anio = fechaRaw.getFullYear();
                const fechaNormal = `${dia}/${mes}/${anio}`;

                // Inyección de los 6 campos solicitados: Nombre, Género, Correo, Ciudad, País, Nacimiento y Foto
                card.innerHTML = `
                    <img src="${p.picture.large}" alt="user">
                    <div class="datos">
                        <h3>${p.name.first} ${p.name.last}</h3>
                        <p><strong>Género:</strong> ${p.gender === 'male' ? 'M' : 'F'}</p>
                        <p><strong>Correo:</strong> ${p.email}</p>
                        <p><strong>Ubicación:</strong> ${p.location.city}, ${p.location.country}</p>
                        <p><strong>Nacimiento:</strong> ${fechaNormal}</p>
                    </div>
                `;
                lista.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Fallo en la carga:", err);
            lista.innerHTML = '<p class="error-msg">Error: No se pudo conectar con el servicio.</p>';
        });
});