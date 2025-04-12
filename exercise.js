const myLibrary = [];

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
    var id =  crypto.randomUUID();
    var book = new Book(id, title, author, pages, read);

    myLibrary.push(book);

}


addBookToLibrary("Harry potter", "J.K. Rowling", 254, false);
console.log(myLibrary);
for (let book in myLibrary) {
    console.log(myLibrary[book]);
}