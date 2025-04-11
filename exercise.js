function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read? "read": "not read yet";

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
}

const book1 = new Book("Harry potter", "J.K. Rowling", 254, false);
