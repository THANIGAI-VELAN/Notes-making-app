const addNoteButton = document.querySelector('.add-note');
const notesContainer = document.querySelector('.notes-container');
document.addEventListener('DOMContentLoaded', loadNotes);
addNoteButton.addEventListener('click', () => addNewNote( "Write a new note...." ));

function addNewNote( content ) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.style.backgroundColor = getRandomColor();
    notesContainer.appendChild(note);
    note.innerHTML = `
         <textarea>${content}</textarea>
        <button class="delete-note">X</button>
    `;
    const textarea = note.querySelector('textarea');
    const deleteButton = note.querySelector('.delete-note');
    textarea.addEventListener('focus', () => {
      if (textarea.value === "Write a new note....") {
        textarea.value = "";
      }
    });
    deleteButton.addEventListener('click', () => {
      notesContainer.removeChild(note);
      saveNotes();
    });
    textarea.addEventListener('input', saveNotes);

}
function saveNotes() {
  const notes = [...document.querySelectorAll('.note textarea')].map(note => note.value);
  localStorage.setItem('notes', JSON.stringify(notes));
}
function loadNotes() {
  JSON.parse(localStorage.getItem('notes')) || [].forEach(addNewNote);
}



function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 20);
  const lightness = 75 + Math.floor(Math.random() * 15);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
