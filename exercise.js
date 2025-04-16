const myLibrary = [];
const showBtn = document.querySelector("#showDialog");
const dialog = document.querySelector(".dialog");
const closeDialog = document.querySelector("#closeDialog");


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

        // console
        // console.log(`
        //     -----------------------------
        //     book ${parseInt(index) + 1}
        //     -----------------------------
        //     Title: ${book.title}
        //     Author: ${book.author}
        //     Pages: ${book.pages}
        //     Status: ${book.read}
            
        //     ID: ${book.id}
        //     ------------------------------`);
}

function createLibraryBookCard(book) {
    // creates a card with all the books
    const bookCard = document.createElement("div");
        
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const status = document.createElement("p");
    const idNum = document.createElement("p");
    const cardItems = [title, author, pages, status, idNum];

    bookCard.classList.add("bookCard");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    status.classList.add("status");
    idNum.classList.add("idNum");
    
    title.textContent = `Title: ${book.title}`;
    author.textContent = `Author: ${book.author}`;
    pages.textContent = `Pages: ${book.pages}`;
    status.textContent = `Status: ${book.read}`;
    idNum.textContent = `ID: ${book.id}`;


    for (let item in cardItems) {
        bookCard.appendChild(cardItems[item]);
    }

    return bookCard;
}

function getBookDetails(form) {
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;

    return [title, author, pages, read];
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
    const newBookArray = getBookDetails(form);


    addBookToLibrary(newBookArray[0], newBookArray[1], newBookArray[2], newBookArray[3]);
    displayLibraryBookCards(myLibrary);

    clearDialog(form);
    e.preventDefault();
    dialog.close();
});

addBookToLibrary("Harry potter", "J.K. Rowling", 254, true);
addBookToLibrary("Atomic Habits", "James Clear", 256, false);

displayLibraryBookCards(myLibrary);