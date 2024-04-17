// Dom Elements
const libraryBtn = document.querySelector(".library-btn");
const blurContainer = document.querySelector(".blur");
const libraryBox = document.querySelector(".library-container");
const libraryContainer = document.querySelector(".library-books");
const bookContainer = document.querySelector(".book-container");
const bottomContainer = document.querySelector(".bottom-container");
const detailContaienr = document.querySelector(".detail-container");

class Review {
    constructor(storyRating, charRating, toneRating, user, mainText, header, date) {
        this.storyRating = storyRating;
        this.charRating = charRating;
        this.toneRating = toneRating;
        this.user = user;
        this.mainText = mainText;
        this.header = header;
        this.date = date;
    }

    getReviewBox() {
        let HTML = `
            <div class="review-box">
                <h2>${this.user}</h2>
                <div>
                    <div></div>
                    <img src="/Images/medium star.png" alt="">
                </div>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
                <p>Nulla id egestas neque, vel aliquet enim. Fusce egestas, elit at venenatis scelerisque, ex velit fermentum lectus, malesuada tincidunt ligula diam ac mi. Fusce pellentesque iaculis arcu, quis eleifend justo luctus nec. Sed feugiat ac ligula a sodales. Quisque dapibus vehicula aliquet. Sed quam dui, porttitor vel sapien ac, suscipit sollicitudin nunc</p>
                <textarea name="comment" id="comment" placeholder="comment..."></textarea>
            </div>
        `;
        return HTML;
    }
}

class ReviewList {
    reviewArr = [];

    populateList() {
        this.reviewArr = getReviewData();
        console.log(this.reviewArr);
    }

    loopRatings(rating) {
        let sum = 0;
        for (let i = 0; i < this.reviewArr.length; i++) {
          sum += this.reviewArr[i][rating];
        }
        return sum / this.reviewArr.length;
    }

    getAverageUserRating() {
       let story = Math.round(this.loopRatings("storyRating") * 10) / 10;
       let char = Math.round(this.loopRatings("charRating") * 10) / 10;
       let tone = Math.round(this.loopRatings("toneRating") * 10) / 10;

       let total = Math.round(((story + char + tone) / 3) * 10) / 10;
       return [story, char, tone, total];
    }

    getOverallRatingBox() {
        let average = this.getAverageUserRating();
        let numberOf = this.reviewArr.length;
        let box = `
             <div class="overall-review-box">
                <h4>Reveiws and ratings</h4>
                <div class="score-container">
                    <h1>${Math.round(average[3] * 10) / 10}</h1>
                    <div>
                        <div>
                            <div class="star-slider-bg"></div>
                            <div class="star-slider" style="width: ${(average[3] + average[3]) * 10}%;"></div>
                            <img src="/Images/medium star.png" alt="">
                        </div>
                        <small>Based on ${numberOf} ratings</small>
                    </div>
                </div>
                <div class="slider-container">
                    <div class="slider-box">
                        <div>
                            <p>Story</p>
                            <p>${average[0]}</p>
                        </div>
                        <div class="slider-grey">
                            <div class="slider story" style="width: ${(average[0] + average[0]) * 10}%;"></div>
                        </div>
                    </div>

                    <div class="slider-box">
                        <div>
                            <p>Character</p>
                            <p>${average[1]}</p>
                        </div>
                        <div class="slider-grey">
                            <div class="slider char" style="width: ${(average[1] + average[1]) * 10}%;"></div>
                        </div>
                    </div>

                    <div class="slider-box">
                        <div>
                            <p>Tone</p>
                            <p>${average[2]}</p>
                        </div>
                        <div class="slider-grey">
                            <div class="slider tone" style="width: ${(average[2] + average[2]) * 10}%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return box;
    }

    getMiniOverallRatings() {
        let average = this.getAverageUserRating();
        let numberOf = this.reviewArr.length;
        let HTML = `
            <div class="star-container">
                <img src="/Images/star systen.png" alt="">
                <div></div>
            </div>
            <div class="based-container">
                <p>${average[3]}</p>
                <p>Based on <br> ${numberOf} ratings</p>
            </div>
        `;
        return HTML;
    }

    getAllReviewBoxes() {
        let str = "";
        this.reviewArr.forEach(review => {
            let singleStr = review.getReviewBox();
            str = str + singleStr;
        });
        return str;
    }
}

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

    getSingleExploreBookCard() {
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

    getDetailBookCard() {
        const reviewList = new ReviewList();
        reviewList.populateList();
        console.log(reviewList.getAverageUserRating());
        let innerHTML = "";
        innerHTML = `
            <div class="top-container">
            <div class="left-side-container">
                <img src="${this.imgUrl}" alt="">
            </div>
    
            <div class="middle-container">
                <h2>${this.title}</h2>
                <h4>${this.author}</h4>
    
                <div class="rating-container">
                    ${reviewList.getMiniOverallRatings()}
                </div>
    
                <div class="resume">
                    <p>In a faraway land where members of the royal family are named for the virtues they embody, one young boy will become a walking enigma.
                        <br>
                        <br>
                    Born on the wrong side of the sheets, Fitz, son of Chivalry Farseer, is a royal bastard, cast out into the world, friendless and lonely. Only his magical link with animals - the old art known as the Wit - gives him solace and companionship. But the Wit, if used too often, is a perilous magic, and one abhorred by the nobility.
                        <br>
                        <br>
                    So when Fitz is finally adopted into the royal household, he must give up his old ways and embrace a new life of weaponry, scribing, courtly manners; and how to kill a man secretly, as he trains to become a royal assassin.</p>
                </div>
                <div class="buy-container">
                    <button class="buy-btn">Buy: ${this.title}</button>
                    <div>
                        <p>Saxo.com | Paperback</p>
                    </div>
                </div>
            </div>
    
            <div class="right-side-container">
                <p>Pages: ${this.pageNr}</p>
                <p style="margin-top: 30px;">Publisher: ${this.publisher}</p>
                <p style="margin-top: 30px;">Gernes:</p>
                <div>
                    <span>${this.gerne[0]}</span>
                    <span style="margin-top: 10px;">${this.gerne[1]}</span>
                    <span style="margin-top: 10px;">${this.gerne[2]}</span>
                </div>
            </div>
        </div>
        
        <div class="review-container">
           ${reviewList.getOverallRatingBox()}
           ${reviewList.getAllReviewBoxes()}
        </div>
        `;
        
        return innerHTML;
    }
}

// BookList Class
class BookList {
    constructor(libraryContainer, libraryBtn, bottomContainer, detailContaienr, bookContainer) {
        this.library = libraryContainer;
        this.btn = libraryBtn;
        this.bottom = bottomContainer;
        this.detCon = detailContaienr;
        this.bookCon = bookContainer;
    }
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
            bookHTML = bookHTML + book.getSingleExploreBookCard();
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
        this.library.innerHTML = libraryHTML;
        this.btn.lastElementChild.firstElementChild.innerText = this.libraryArr.length;
        this.bottom.firstElementChild.innerText = "Total Books: " + this.libraryArr.length;
        document.querySelectorAll(".library-book img:last-of-type").forEach(icon => {
            icon.addEventListener("click", () => {
                let bookId = icon.getAttribute("data-bookId");
                this.removeFromLibrary(bookId);
            });
        });
    }

    controlDetailBookCard(bookId) {
        this.booksArr.forEach(book => {
            if (book.id == bookId) {
                this.detCon.innerHTML = book.getDetailBookCard();
            }
        });
    }
}

// Dom Actions
const bookList = new BookList(libraryContainer, libraryBtn, bottomContainer, detailContaienr, bookContainer);
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

bookContainer.querySelectorAll(".book img").forEach(book => {
    let imgId = book.nextElementSibling.getAttribute("data-bookId");
    book.addEventListener("click", () => {
        bookList.controlDetailBookCard(imgId);
        if (detailContaienr.style.display = "none") {
            detailContaienr.style.display = "block";
            bookContainer.style.display = "none";
        }
    });
});

function getReviewData() {
    const minCeiled = Math.ceil(30);
    const maxFloored = Math.floor(50);
    let randomNr = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    let arr = [];

    for (let i = 0; i < randomNr; i++) {
        let storyRating = getRating();
        let charRating = getRating();
        let toneRating = getRating();
        let user = getUser();
        let main = getMainText();
        let header = getHeader();
        let date = getDate();

        let obj = new Review(
            storyRating,
            charRating,
            toneRating,
            user,
            main,
            header,
            date
        );
        // console.log(obj);
        arr.push(obj);
    }
    return arr;
}

function getRating() {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(5);
    let randomNr = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    return randomNr;
}

async function getUser() {
    const response = await fetch("https://randomuser.me/api");
    const movies = await response.json();
    return movies.results[0].name.first + " " + movies.results[0].name.last;
}

async function getMainText() {
    const response = await fetch("https://loripsum.net/api/1/short/plaintext");
    const movies = await response.text();
    return movies;
}

function getHeader() {
    return "ogahoig ajga0jgajg ga+jkg+o gajgiag";
}

function getDate() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];
    let min = 1;
    let max = 31;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let randomNr = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    let randomMonth = Math.floor(Math.random() * months.length);
    return randomNr + " " + months[randomMonth];
}

// async function Test() {
//     const response = await fetch("https://randomuser.me/api");
//     const movies = await response.json();
//     console.log(movies);
//     return movies;
//   }
// console.log(Test());

// fetch("https://loripsum.net/api/1")
//     .then(res => res.text())
//    .then(data => console.log(data))