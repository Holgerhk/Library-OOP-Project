let libraryIdx = 0;
const libraryBtn = document.querySelector(".library-btn");
libraryBtn.lastElementChild.firstElementChild.innerText = libraryIdx;
const blurContainer = document.querySelector(".blur");
const libraryContainer = document.querySelector(".library-container");

const bookContainer = document.querySelector(".book-container");
class BookItem {
    constructor(author, title, gerne, pageNr, publisher, imgUrl, backColor, id) {
        this.author = author;
        this.title = title;
        this.gerne = gerne.split(",");
        this.pageNr = pageNr;
        this.publisher = publisher;
        this.imgUrl = imgUrl;
        this.backColor = backColor;
        this.id = id;
    }
    render() {
        let str = ""
        str = `
        <div id="book${this.id}" class="book" style="background-color: #${this.backColor}; box-shadow: 10px 10px 30px 5px #${this.backColor};">
            <h3>${this.author}: ${this.title}</h3>
            <div class="img-container">
                <img src="${this.imgUrl}" alt="">
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
        return str;
    }

    addToLibrary() {
        libraryIdx = libraryIdx + 1;
        libraryBtn.lastElementChild.firstElementChild.innerText = libraryIdx;
        bookList.loanBooks.push(this.id)
    }
}

class BookList {
    books = [
        new BookItem(
            "Andrzej Sapkowski",
            "The Last Wish",
            "Fantasy,Fiction,High Fantasy",
            400,
            "Gollancz",
            "Images/last wish.jpg",
            "882322",
            1
        ),
        new BookItem(
            "Brandon Sanderson",
            "The Final Empire",
            "Fantasy,Fiction,High Fantasy",
            650,
            "Gollancz",
            "Images/final empire.jpg",
            "564E87",
            2
        ),
        new BookItem(
            "Robin Hobb",
            "Assassin's Apprentice",
            "Fantasy,Fiction,High Fantasy",
            400,
            "Harper Voyager",
            "Images/assassins apprentice.jpg",
            "3E5DA0",
            3
        ),
        new BookItem(
            "Stephen King",
            "The Shining",
            "Horror,Fiction,Classic",
            497,
            "Hodder",
            "Images/shining.jpg",
            "32984E",
            4
        ),
        new BookItem(
            "Neil Gaiman",
            "Norse Mythology",
            "Fantasy,Fiction,Mythology",
            279,
            "Bloomsbury",
            "Images/norse.jpg",
            "8E6F33",
            5
        ),
        new BookItem(
            "James Patterson",
            "1st to Die",
            "Mystery,Fiction,Thriller",
            424,
            "Grand Central",
            "Images/1st to die.jpg",
            "F4483A",
            6
        ),
        new BookItem(
            "Stephen Fry",
            "Heroes",
            "Mytholgy,Nonfiction,History",
            415,
            "Penguin Books",
            "Images/heroes.jpg",
            "7A7A7A",
            7
        ),
        new BookItem(
            "James Clear",
            "Atomic Habit",
            "Self Help,Nonfiction,Psychology",
            319,
            "Avery",
            "Images/habits.jpg",
            "DDAD86",
            8
        ),
        new BookItem(
            "Jason Fung",
            "The Obesity Code",
            "Self Help,Nonfiction,Health",
            315,
            "Greystone Books",
            "Images/code.jpg",
            "C71C2E",
            9
        )
    ];

    render() {
        let str = "";
        this.books.forEach(book => {
            str = str + book.render();
        });
        return str;
    }

    loanBooks = [];

    openLibrary() {
        console.log(bookList.loanBooks);
        if (!blurContainer.classList.contains("active")) {
            blurContainer.classList.add("active");
        }
        libraryContainer.style.display = "flex";
    }
}


const bookList = new BookList();
bookContainer.innerHTML = bookList.render();
document.querySelectorAll(".book").forEach(book => {
    if (book.firstElementChild.clientHeight === 27) {
        book.firstElementChild.nextElementSibling.style.maxHeight = "410px";
    }
});

bookList.books.forEach(book => {
    document.querySelector("#book" + book.id).addEventListener("click", book.addToLibrary.bind(book), { once: true });

});

libraryBtn.addEventListener("click", bookList.openLibrary);
// onload="this.style.height = (400 - this.parentElement.previousElementSibling.getBoundingClientRect().height) + 'px'"