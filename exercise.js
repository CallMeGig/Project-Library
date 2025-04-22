const myLibrary = [];
const showBtn = document.querySelector("#showDialog");
const dialog = document.querySelector(".dialog");
const closeDialog = document.querySelector("#closeDialog");

addBookToLibrary("Harry potter", "J.K. Rowling", 254, true);
addBookToLibrary("Atomic Habits", "James Clear", 256, false);

displayLibraryBookCards(myLibrary);

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read? "read": "not read yet";

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
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
    console.log(myLibrary);
}



function getBookDetails(form) {
    return [form.title.value, form.author.value, form.pages.value, form.read.checked];
}



function clearDialog(form) {
    form.title.value = '';
    form.author.value = '';
    form.pages.value = '';
    form.read.checked = false;

}

showBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", (e) => {
    const form = document.querySelector("#newBookForm");
    const [title, author, pages, read] = getBookDetails(form);

    addBookToLibrary(title, author, pages, read);
    displayLibraryBookCards(myLibrary);

    clearDialog(form);
    e.preventDefault();
    dialog.close();
});

function deleteBook(index, domBookCard) {
    myLibrary.splice(index, 1);
    domBookCard.remove();
    displayLibraryBookCards(myLibrary);

}




function createLibraryBookCard(book) {
    // creates a card with all the books
    const bookCard = document.createElement("div");
        
    const deleteCard = document.createElement("button");
    const deleteIcon = document.createElement("img");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const status = document.createElement("p");
    const idNum = document.createElement("p");
    const cardItems = [deleteCard, title, author, pages, status, idNum];

    bookCard.classList.add("bookCard");
    deleteCard.classList.add("deleteCard");
    deleteIcon.classList.add("deleteIcon");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    status.classList.add("status");
    idNum.classList.add("idNum");
    
    bookCard.setAttribute("id", book.id);
    deleteIcon.setAttribute("src", "assets/trash-can-outline.png");
    
    deleteCard.appendChild(deleteIcon);

    title.textContent = `${book.title}`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    status.textContent = `Status: ${book.read}`;
    // idNum.textContent = `ID: ${book.id}`;


    for (let item in cardItems) {
        bookCard.appendChild(cardItems[item]);
    }

    deleteCard.addEventListener("click", () => removeBookEntrys(deleteCard))
    
    return bookCard;
}

function removeBookEntrys(cardElement) {
    // 
    // function gets the id property from the given book card element,
    // finds the corresponding book object in the library array and,
    // calls deletebook() to delete both entries.
    //  

    const idToDel = cardElement.parentElement.id; 
    const bookInArr = myLibrary.find(book => book.id === idToDel); 
    const targetIndex = myLibrary.indexOf(bookInArr);

    deleteBook(targetIndex, cardElement);
    
}