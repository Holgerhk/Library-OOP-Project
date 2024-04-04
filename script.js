// class BookItem handle single item
// class BookList handle list of books
// class Library handle the library
// test
const bookContainer = document.querySelector(".book-container");
class BookItem {
    constructor(author, title, gerne, pageNr, publisher, imgUrl) {
        this.author = author;
        this.title = title;
        this.gerne = gerne.split(",");
        this.pageNr = pageNr;
        this.publisher = publisher;
        this.imgUrl = imgUrl;
    }
    render() {
        let str = ""
        str = `
        <div class="book">
            <h3>${this.author}: ${this.title}</h3>
            <div class="img-container">
                <img src="${this.imgUrl}" style="height: ${this.getImgHeight()};" alt="">
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

    getImgHeight() {
        
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
            "Images/last wish.jpg"
        ),
        new BookItem(
            "Brandon Sanderson",
            "The Final Empire",
            "Fantasy,Fiction,High Fantasy",
            650,
            "Gollancz",
            "Images/final empire.jpg"
        ),
        new BookItem(
            "Robin Hobb",
            "Assassin's Apprentice",
            "Fantasy,Fiction,High Fantasy",
            400,
            "Harper Voyager",
            "Images/assassins apprentice.jpg"
        ),
        new BookItem(
            "Stephen King",
            "The Shining",
            "Horror,Fiction,Classic",
            497,
            "Hodder",
            "Images/shining.jpg"
        ),
        new BookItem(
            "Neil Gaiman",
            "Norse Mythology",
            "Fantasy,Fiction,Mythology",
            279,
            "Bloomsbury",
            "Images/norse.jpg"
        ),
        new BookItem(
            "James Patterson",
            "1st to Die",
            "Mystery,Fiction,Thriller",
            424,
            "Grand Central",
            "Images/1st to die.jpg"
        ),
        new BookItem(
            "Stephen Fry",
            "Heroes",
            "Mytholgy,Nonfiction,History",
            415,
            "Penguin Books",
            "Images/heroes.jpg"
        ),
        new BookItem(
            "James Clear",
            "Atomic Habit",
            "Self Help,Nonfiction,Psychology",
            319,
            "Avery",
            "Images/habits.jpg"
        ),
        new BookItem(
            "Jason Fung",
            "The Obesity Code",
            "Self Help,Nonfiction,Health",
            315,
            "Greystone Books",
            "Images/code.jpg"
        )
    ];

    render() {
        let str = "";
        this.books.forEach(book => {
            str = str + book.render();
        });
        return str;
    }
}


const bookList = new BookList();
bookContainer.innerHTML = bookList.render();