document.addEventListener('DOMContentLoaded', () => {
    // Cargar jugadores al iniciar
    cargarJugadores();
    
    // Manejar el formulario
    const form = document.getElementById('formJugador');
    form.addEventListener('submit', manejarEnvioFormulario);
});

async function cargarJugadores() {
    try {
        const response = await fetch('http://localhost:3001/api/jugadores');
        if (!response.ok) throw new Error('Error al cargar los datos');
        
        const jugadores = await response.json();
        const tbody = document.querySelector('#tablaJugadores tbody');
        tbody.innerHTML = '';
        
        jugadores.forEach(jugador => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${jugador.ID_Jugador}</td>
                <td>${jugador.Nombre}</td>
                <td>${jugador.edad}</td>
                <td>${jugador.position}</td>
                <td>${jugador.nacionalidad}</td>
                <td>
                    <button class="btn-editar" data-id="${jugador._id}">Editar</button>
                    <button class="btn-eliminar" data-id="${jugador._id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        // Agregar eventos a los botones
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', editarJugador);
        });
        
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', eliminarJugador);
        });
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al cargar los jugadores', 'error');
    }
}

async function manejarEnvioFormulario(e) {
    e.preventDefault();
    
    const form = e.target;
    const jugador = {
        ID_Jugador: parseInt(form.idJugador.value),
        Nombre: form.nombre.value,
        edad: parseInt(form.edad.value),
        position: form.position.value,
        nacionalidad: form.nacionalidad.value
    };
    
    try {
        const response = await fetch('http://localhost:3001/api/jugadores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jugador)
        });
        
        if (!response.ok) throw new Error('Error al guardar el jugador');
        
        form.reset();
        await cargarJugadores();
        mostrarMensaje('Jugador agregado con éxito', 'exito');
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al guardar el jugador', 'error');
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje ${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    document.body.appendChild(mensajeDiv);
    
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}

// Funciones para editar y eliminar (puedes implementarlas después)
function editarJugador(e) {
    console.log('Editar jugador con ID:', e.target.dataset.id);
    // Implementar lógica de edición
}

async function eliminarJugador(e) {
    if (!confirm('¿Estás seguro de eliminar este jugador?')) return;
    
    try {
        const id = e.target.dataset.id;
        const response = await fetch(`http://localhost:3001/api/jugadores/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Error al eliminar el jugador');
        
        await cargarJugadores();
        mostrarMensaje('Jugador eliminado con éxito', 'exito');
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error al eliminar el jugador', 'error');
    }
}