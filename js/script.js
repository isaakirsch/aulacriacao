let addNote = document.querySelector('#add-note');   //Botão de para adicionar nota
let closeModalView =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal');   //Modal para edição das notas
let modalView = document.querySelector('#modal-view');  //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');   //Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note");  //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");  //icone para fechar modal de edição de nota.


// EVENTOS
addNote.addEventListener("click", (evt) => {
  evt.preventDefault(); //pra quando apertar não recarregar a página
  modal.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
});

btnCloseModal.addEventListener("click", (evt) =>{
  evt.preventDefault();
  modal.style.display = "none";
  addNote.style.display ="block";
  notes.style.display = "flex";    
});

btnSaveNote.addEventListener("click", (evt) =>{
  evt.preventDefault();
  data = {
  id : document.querySelector("#input-id").value,
  title: document.querySelector("#input-title").value,
  content: document.querySelector("#input-content").value
  }
  saveNote(data);
});



closeModalView.addEventListener('click', (evt) => {
  evt.preventDefault();
  console.log("Botão de fechar modal clicado");
  modalView.style.display = "none";
  notes.style.display = "flex";
  addNote.style.display = "block";
});



// FUNÇÕES

const saveNote = (note) => {

  let notes = loadNotes();
  note.lastTime = new Date().getTime();

  if(note.id.trim().length < 1){ //para remover espaços (sujeiras) usa-se o trim().
      note.id = new Date().getTime();
      notes.push(note);
      document.querySelector('#input-id').value = note.id;
  }else{
      notes.forEach( (item, i) => {
        if(item.id == note.id){
          notes[i] = note;
        }
      });
  } 
  notes = JSON.stringify(notes); //transformar objeto em texto novamente

  localStorage.setItem('notes', notes); //colocar o texto no local storage

  listNotes();
};


const loadNotes=() => {
let listNotes = localStorage.getItem('notes');
   
  if (!listNotes){
    listNotes = []; //outra declaração de array new Array ( ) forma de objeto, [] forma literal
  } else {
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
}




const showNote = (note) => {
  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
  document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>";
  document.querySelector('#title-note').innerHTML +=
  "<p> Ultima alteração "+new Date(note.lastTime).toLocaleDateString()+"<p>";
  document.querySelector('#controls-note').innerHTML = "";
  let aDelete = document.createElement('a');
  let i = document.createElement('i');
  i.style.color = "#F00";
  i.className = "bi";
  i.className = "bi-trash";
  aDelete.appendChild(i);
  document.querySelector('#controls-note').appendChild(aDelete);
  aDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    deleteNote(note.id);
  })


  // botão de editar
let divEdit = document.createElement("div");
let iEdit = document.createElement("i");
iEdit.className = 'bi bi-pencil';
divEdit.appendChild(iEdit);
document.querySelector("#controls-note").appendChild(divEdit);
divEdit.addEventListener("click", (evt) => {
    evt.preventDefault();
    editNote(note);
});


//função editNote
const editNote = (note) => {
    document.querySelector("#input-id").value = note.id;
    document.querySelector("#input-title").value = note.title;
    document.querySelector("#input-content").value = note.content;
    modalView.style.display = "none";
    modal.style.display = "block";
};


//botão de exclusão da nota
let divExcluir = document.createElement("div");
let iExcluir = document.createElement("i");
iExcluir.className = 'bi bi-trash3';
divExcluir.appendChild(iExcluir);
document.querySelector('#controls-note').appendChild(divExcluir);


divExcluir.addEventListener("click", (evt) => {
    evt.preventDefault();
     
        divExcluir.parentNode.parentNode.remove(); // Isso remove toda a div da nota, assumindo que divExcluir está dentro de outra div que envolve a nota

        deleteNote(note.id);

    listNotes();
});


  const deleteNote = (id) => {
    let listNotes = loadNotes();
    listNotes.forEach((note, i) => {
        if (note.id === id) {
            listNotes.splice(i, 1);
        }
    });
    listNotes = JSON.stringify(listNotes);
    localStorage.setItem('notes', listNotes);
};

  modalView.style.display = 'block';
  notes.style.display = 'none';
  addNote.style.display = 'none';
}


const listNotes = () => {
  notes.innerHTML="";
  let listNotes = loadNotes();
  listNotes.forEach((item) => {
    let divCard = document.createElement('div');
    divCard.className = "card";
    divCard.style.width = '18rem';
    notes.appendChild(divCard);
    let divCardBody = document.createElement('div');
    divCardBody.className="card-body";
    divCard.appendChild(divCardBody);
    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    let pContent = document.createElement('p');
    pContent.innerText = item.content;
    divCardBody.appendChild(pContent);
    pLastTime = document.createElement('p');
    pLastTime.innerText = new Date(item.lastTime).toLocaleDateString();
    divCardBody.appendChild(pLastTime);
    divCard.addEventListener('click',(evt) => {
      showNote(item);
    })
  });
};
