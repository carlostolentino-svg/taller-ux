// Selección de elementos del DOM
const noteForm = document.getElementById('note-form');
const noteText = document.getElementById('note-text');
const submitBtn = document.getElementById('submit-btn');
const notesList = document.getElementById('notes-list');
const toastContainer = document.getElementById('toast-container');

// Estado de la aplicación
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let lastDeletedNote = null; // Almacena temporalmente la nota eliminada para la función deshacer
let toastTimeout = null;

// Prevención de errores: Habilitar/Deshabilitar botón si el campo está vacío
noteText.addEventListener('input', () => {
    submitBtn.disabled = noteText.value.trim() === '';
});

// Renderizar la lista de notas en pantalla
function renderNotes() {
    notesList.innerHTML = '';
    
    if (notes.length === 0) {
        notesList.innerHTML = '<li style="color: #6b7280;">No tienes notas guardadas actualmente.</li>';
        return;
    }

    notes.forEach((note) => {
        const li = document.createElement('li');
        li.className = 'note-item';
        
        li.innerHTML = `
            <span class="note-text">${escapeHTML(note.text)}</span>
            <button class="delete-btn" data-id="${note.id}" aria-label="Eliminar nota">Eliminar</button>
        `;
        
        notesList.appendChild(li);
    });

    // Guardar cambios en el almacenamiento local
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Escapar texto para prevenir vulnerabilidades XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Agregar nueva nota
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteText.value.trim();
    
    if (text === '') return; // Doble validación de seguridad

    const newNote = {
        id: Date.now().toString(),
        text: text
    };

    notes.push(newNote);
    renderNotes();
    
    // Limpieza e inicialización de controles
    noteForm.reset();
    submitBtn.disabled = true;
    
    showToast('«Nota agregada con éxito»');
});

// Capturar clics de eliminación en la lista (Delegación de eventos)
notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idToDelete = e.target.getAttribute('data-id');
        
        // Encontrar y respaldar la nota por si el usuario decide deshacer la acción
        const index = notes.findIndex(note => note.id === idToDelete);
        if (index !== -1) {
            lastDeletedNote = { note: notes[index], index: index };
            
            // Eliminar del arreglo principal
            notes.splice(index, 1);
            renderNotes();
            
            // Mostrar mensaje con opción de revertir la acción destructiva
            showToast('«Nota eliminada»', true);
        }
    }
});

// Mostrar feedback visual e interactivo (Toast)
function showToast(message, showUndo = false) {
    // Limpiar alertas previas vigentes
    if (toastTimeout) clearTimeout(toastTimeout);
    toastContainer.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let htmlContent = `<span>${message}</span>`;
    if (showUndo) {
        htmlContent += `<button class="undo-btn" id="undo-action-btn">Deshacer</button>`;
    }
    
    toast.innerHTML = htmlContent;
    toastContainer.appendChild(toast);

    // Asignar evento al botón de deshacer si está presente
    if (showUndo) {
        document.getElementById('undo-action-btn').addEventListener('click', () => {
            if (lastDeletedNote) {
                // Insertar de vuelta la nota en su posición original
                notes.splice(lastDeletedNote.index, 0, lastDeletedNote.note);
                lastDeletedNote = null;
                renderNotes();
                showToast('«Acción deshecha con éxito»');
            }
        });
    }

    // El mensaje desaparece automáticamente tras 5 segundos
    toastTimeout = setTimeout(() => {
        toast.remove();
        if (!showUndo) lastDeletedNote = null; // Limpiar respaldo si expira el tiempo
    }, 5000);
}

// Inicialización de la app al cargar la página
renderNotes();
