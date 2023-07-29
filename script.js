let myLibrary = [];

const container = document.querySelector(".container");

/*clearStorage()*/

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages. Read?: ${this.read}`;
  };
}

function addBook() {
  event.preventDefault();
  if (localStorage.getItem("book") !== null) {
    let bookStored = localStorage.getItem("book");
    myLibrary = [...JSON.parse(bookStored)];
  }
  let title = document.getElementById("titleInp").value;
  let author = document.getElementById("authorInp").value;
  let pageNr = document.getElementById("pagesInp").value;
  let read = document.getElementById("readInp").value;
  let addition = new Book(title, author, pageNr, read);
  myLibrary.push(addition);
  localStorage.setItem("book", JSON.stringify(myLibrary));
  renderBooks();
  return myLibrary;
}

function removeCards() {
  for (i >= myLibrary.length; i < 12; i++) {
    if (document.getElementById(`bc${i + 1}`) !== null) {
      let bookCard = document.getElementById(`bc${i + 1}`);
      bookCard.style.opacity = 0;
    }
  }
}

function bookForm() {
  let form = document.getElementById("form");
  form.style.opacity = 1;
}

function clearStorage() {
  localStorage.clear("book");
}

document.getElementById("addBook").addEventListener("click", bookForm);
document.getElementById("submit").addEventListener("click", addBook);

function deleteBook(index) {
  myLibrary.splice(index, 1);
  localStorage.setItem("book", JSON.stringify(myLibrary));
  renderBooks();
}

function readSt(index) {
  if (myLibrary[index].read !== "yes") {
    myLibrary[index].read = "yes";
  } else if (myLibrary[index].read == "yes") {
    myLibrary[index].read = "no";
  }
  localStorage.setItem("book", JSON.stringify(myLibrary));
  renderBooks();
}

function createBooks(book, index) {
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("id", index);
  bookDiv.setAttribute("class", "bookCards");
  bookDiv.appendChild(createBookElements("h1", book.title, "title"));
  bookDiv.appendChild(createBookElements("p", "Author:", "authorT"));
  bookDiv.appendChild(createBookElements("h2", book.author, "author"));
  bookDiv.appendChild(createBookElements("h3", book.pages, "pageNr"));
  bookDiv.appendChild(createBookElements("p", "pages", "pageNrT"));
  bookDiv.appendChild(createBookElements("p", "Finished?", "readT"));
  bookDiv.appendChild(createBookElements("p", book.read, "read"));
  bookDiv.appendChild(createBookElements("button", "X", "deleteBook"));
  bookDiv.appendChild(createBookElements("button", "Read?", "readButton"));
  bookDiv.querySelector(".deleteBook").addEventListener("click", () => {
    deleteBook(index);});
  bookDiv.querySelector(".readButton").addEventListener("click", () => {
      readSt(index);
  });
  container.insertAdjacentElement("afterbegin", bookDiv);
}

function createBookElements(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute("class", className);
  return element;
}

function renderBooks() {
  if (localStorage.getItem("book") !== null) {
    let bookStored = localStorage.getItem("book");
    myLibrary = [...JSON.parse(bookStored)];
  }
  /*let container = document.getElementById(`container`);*/
  container.textContent = " ";
  myLibrary.map((book, index) => {
    createBooks(book, index);
  });
}

renderBooks();
