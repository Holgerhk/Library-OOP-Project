// Dom Elements
const libraryBtn = document.querySelector(".library-btn");
const blurContainer = document.querySelector(".blur");
const libraryBox = document.querySelector(".library-container");
const libraryContainer = document.querySelector(".library-books");
const bookContainer = document.querySelector(".book-container");
const bottomContainer = document.querySelector(".bottom-container");

// Book Class
class Book {
    constructor(author, title, gerne, pageNr, publisher, imgUrl, bg_Color, id) {
        this.author = author;
        this.title = title;
        this.gerne = gerne.split(",");
        this.pageNr = pageNr;
        this.publisher = publisher;
        this.imgUrl = imgUrl;
        this.bg_Color = bg_Color;
        this.id = id;
    }

    getSingleBookCard() {
        let innerHTML = ""
        innerHTML = `
        <div id="book${this.id}" class="book" style="background-color: #${this.bg_Color}; box-shadow: 10px 10px 30px 5px #${this.bg_Color};">
            <h3>${this.author}: ${this.title}</h3>
            <div class="img-container">
                <img src="${this.imgUrl}" alt="">
                <button data-bookId="${this.id}">Add</button>
            </div>
            <div class="info">
                <div class="gerne-container">
                    <p>Gerne:</p>
                <div class="span-container">
                    <span>${this.gerne[0]}</span>
                    <span>${this.gerne[1]}</span>
                    <span>${this.gerne[2]}</span>
                </div>
                </div>
                <div class="lastP">
                    <p>Pages: ${this.pageNr}</p>
                    <p>Publisher: ${this.publisher}</p>
                </div>
            </div>
        </div>
        `;
        return innerHTML;
    }

    getSingleLibraryBookCard() {
        let innerHTML = `
            <div class="library-book">
                <img src="${this.imgUrl}" alt="">
                <div class="library-info">
                    <p>Author: ${this.author}</p>
                    <p>Title: ${this.title}</p>
                    <p>Publisher: ${this.publisher}</p>
                    <p>Pages: ${this.pageNr}</p>
                </div>
                <div class="library-gernes">
                    <p>Gernes:</p>
                    <div>
                        <span>${this.gerne[0]}</span>
                        <span>${this.gerne[0]}</span>
                        <span>${this.gerne[0]}</span>
                    </div>
                </div>
                <img src="/Images/remove (1).png" data-bookId="${this.id}" alt="">
            </div>
        `;
        return innerHTML;
    }
}

// BookList Class
class BookList {
    booksArr = [
        new Book(
            "Andrzej Sapkowski",
            "The Last Wish",
            "Fantasy,Fiction,High Fantasy",
            400,
            "Gollancz",
            "/Images/last wish.jpg",
            "882322",
            1
        ),
        new Book(
            "Brandon Sanderson",
            "The Final Empire",
            "Fantasy,Fiction,High Fantasy",
            650,
            "Gollancz",
            "/Images/final empire.jpg",
            "564E87",
            2
        ),
        new Book(
            "Robin Hobb",
            "Assassin's Apprentice",
            "Fantasy,Fiction,High Fantasy",
            400,
            "Harper Voyager",
            "/Images/assassins apprentice.jpg",
            "3E5DA0",
            3
        ),
        new Book(
            "Stephen King",
            "The Shining",
            "Horror,Fiction,Classic",
            497,
            "Hodder",
            "/Images/shining.jpg",
            "32984E",
            4
        ),
        new Book(
            "Neil Gaiman",
            "Norse Mythology",
            "Fantasy,Fiction,Mythology",
            279,
            "Bloomsbury",
            "/Images/norse.jpg",
            "8E6F33",
            5
        ),
        new Book(
            "James Patterson",
            "1st to Die",
            "Mystery,Fiction,Thriller",
            424,
            "Grand Central",
            "/Images/1st to die.jpg",
            "F4483A",
            6
        ),
        new Book(
            "Stephen Fry",
            "Heroes",
            "Mytholgy,Nonfiction,History",
            415,
            "Penguin Books",
            "/Images/heroes.jpg",
            "7A7A7A",
            7
        ),
        new Book(
            "James Clear",
            "Atomic Habit",
            "Self Help,Nonfiction,Psychology",
            319,
            "Avery",
            "/Images/habits.jpg",
            "DDAD86",
            8
        ),
        new Book(
            "Jason Fung",
            "The Obesity Code",
            "Self Help,Nonfiction,Health",
            315,
            "Greystone Books",
            "/Images/code.jpg",
            "C71C2E",
            9
        )
    ];
    libraryArr = [];

    getAllBookCards() {
        let bookHTML = "";
        this.booksArr.forEach(book => {
            bookHTML = bookHTML + book.getSingleBookCard();
        });
        return bookHTML;
    }

    addToLibrary(bookId) {
        this.booksArr.forEach(book => {
            if (bookId == book.id) {
                if (!this.libraryArr.includes(book)) {
                    this.libraryArr.push(book);
                    this.updateLibraryDisplay();
                }
            }
        });
    }

    removeFromLibrary(bookId) {
        let bookPosition = -1;
        for (let i = 0; i < this.libraryArr.length; i++) {
            const book = this.libraryArr[i];
            if (book.id == bookId) {
                bookPosition = i;
            }
        }
        this.libraryArr.splice(bookPosition, 1);
        this.updateLibraryDisplay();
    }

    updateLibraryDisplay() {
        let libraryHTML = "";
        this.libraryArr.forEach(book => {
            libraryHTML = libraryHTML + book.getSingleLibraryBookCard();
        });
        libraryContainer.innerHTML = libraryHTML;
        libraryBtn.lastElementChild.firstElementChild.innerText = this.libraryArr.length;
        bottomContainer.firstElementChild.innerText = "Total Books: " + this.libraryArr.length;
        document.querySelectorAll(".library-book img:last-of-type").forEach(icon => {
            icon.addEventListener("click", () => {
                let bookId = icon.getAttribute("data-bookId");
                this.removeFromLibrary(bookId);
            });
        });
    }
}

// Dom Actions
const bookList = new BookList();
bookContainer.innerHTML = bookList.getAllBookCards();
libraryBtn.addEventListener("click", () => {
    if (libraryBox.classList.contains("active")) {
        libraryBox.classList.remove("active");
        blurContainer.classList.remove("active");
    } else {
        libraryBox.classList.add("active");
        blurContainer.classList.add("active");
    }
});

document.querySelectorAll(".img-container button").forEach(btn => {
    btn.addEventListener("click", () => {
        let bookId = btn.getAttribute("data-bookId");
        bookList.addToLibrary(bookId);
    });
});