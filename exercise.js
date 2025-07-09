const myLibrary = [];
const showBtn = document.querySelector(".showDialog");
const dialog = document.querySelector(".dialog");
const closeDialog = document.querySelector("#closeDialog");
const cancelDialog = document.querySelector("#cancelDialog");
const exampleBtn = document.querySelector(".loadMockBooks");

displayLibraryBookCards(myLibrary);

exampleBtn.addEventListener("click", () => {
    addBookToLibrary("Harry potter and the philosophers stone", "J.K. Rowling", 254, true);
    addBookToLibrary("Atomic Habits", "James Clear", 256, false);
    addBookToLibrary("The Artist's Way", "Julia Cameron", 123, false);
    addBookToLibrary("Clean Code", "Robert C. Martin", 321, false);
    addBookToLibrary("Ficciones", "Jorge Louis Borges", 123, false);
    
    displayLibraryBookCards(myLibrary);
})

class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${genReadStatus(this.read)}`;
    }
}

function genReadStatus(readBool) {
    
    return readBool? "READ": "UNREAD";
}

function addBookToLibrary(title, author, pages, read) {
    // Generate random unique book identifier
    const id =  crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);

    myLibrary.push(book);

}

function displayLibraryBookCards(library) {
    const container = document.querySelector(".display");

    container.innerHTML="";
    
    for (let index in library) {
        const book = library[index];
        const bookCard = createLibraryBookCard(book);
        // DOM
        container.appendChild(bookCard)
    }

    const newCard = document.createElement('div');
    const plusImg = document.createElement('img');
    plusImg.setAttribute('src', 'assets/plus.png');
    plusImg.classList.add('plusImg');
    newCard.appendChild(plusImg);
    newCard.classList.add('newCard');
    newCard.addEventListener("click", () => {
        dialog.showModal();
    });
    container.appendChild(newCard);
}



function getBookDetails(form) {
    return [form.title.value, form.author.value, form.pages.value, form.read.checked];
}



function clearDialog() {
    const form = document.querySelector("#newBookForm");

    form.title.value = '';
    form.author.value = '';
    form.pages.value = '';
    form.read.checked = false;

}

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelDialog.addEventListener("click", () => {
    clearDialog();
    dialog.close();

})

closeDialog.addEventListener("click", (e) => {
    const form = document.querySelector("#newBookForm");
    

    if (form.reportValidity()) {
        const [title, author, pages, read] = getBookDetails(form);

        addBookToLibrary(title, author, pages, read);
        displayLibraryBookCards(myLibrary);
        dialog.close();
        e.preventDefault();
        clearDialog();
    }

});

function deleteBook(index, domBookCard) {
    myLibrary.splice(index, 1);
    domBookCard.remove();
    displayLibraryBookCards(myLibrary);

}




function createLibraryBookCard(book) {
    // creates a card with all the books details
    const bookCard = document.createElement("div");
        
    const deleteCard = document.createElement("button");
    const deleteIcon = document.createElement("img");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    // const status = document.createElement("p");
    const idNum = document.createElement("p");
    const statusToggle = document.createElement("button");
    const cardItems = [deleteCard, title, author, pages, /*status,*/ idNum,statusToggle];

    bookCard.classList.add("bookCard");
    deleteCard.classList.add("deleteCard");
    deleteIcon.classList.add("deleteIcon");
    title.classList.add("title");
    author.classList.add("author", "detail");
    pages.classList.add("pages", "detail");
    // status.classList.add("status", "detail");
    idNum.classList.add("idNum");
    statusToggle.classList.add("statusToggle");
    
    bookCard.setAttribute("id", book.id);
    deleteIcon.setAttribute("src", "assets/trash-can-outline.png");
    
    deleteCard.appendChild(deleteIcon);

    title.textContent = `${book.title.toUpperCase()}`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    // status.textContent = `Status: ${genReadStatus(book.read)}`;
    statusToggle.textContent = `${genReadStatus(book.read)}`;
    // idNum.textContent = `ID: ${book.id}`;


    for (let item in cardItems) {
        bookCard.appendChild(cardItems[item]);
    }

    deleteCard.addEventListener("click", () => removeBookEntrys(deleteCard))
    statusToggle.addEventListener("click", function() {
        const bookToToggle = getBookObjFromCardElement(statusToggle);
        bookToToggle.toggleReadStatus();
    })
    return bookCard;
}

function getBookObjFromCardElement(element) {
    // 
    // finds and returns the book obj with a matching id 
    // of the given element 
    // 

    const bookId = element.parentElement.id;
    return myLibrary.find(book => book.id === bookId);
}

function removeBookEntrys(cardElement) {
    // 
    // function gets the id property from the given book card element,
    // finds the corresponding book object in the library array and,
    // calls deletebook() to delete both entries.
    //  

    
    const bookInArr = getBookObjFromCardElement(cardElement); 
    const targetIndex = myLibrary.indexOf(bookInArr);

    deleteBook(targetIndex, cardElement);  
}

Book.prototype.toggleReadStatus = function() {
    const status = this.read;
    this.read = status? false : true;
    displayLibraryBookCards(myLibrary);
}
