form = document.getElementById("book-club-choice-form");
const bookAuthor = document.getElementById("author");
const bookTitle = document.getElementById("title");
const bookChooser = document.getElementById("chooser");

function getTodayDate() {
  let today = new Date();
  let dd = today.getDate().toString().padStart(2, "0");
  let mm = (today.getMonth() + 1).toString().padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear().toString();

  return (today = yyyy + "-" + mm + "-" + dd);
}

document.addEventListener("DOMContentLoaded", (event) => {
  const dateInput = document.querySelector("#date-chosen");
  dateInput.value = getTodayDate();
  dateInput.max = getTodayDate();
});

function putDataInStorage() {
  let bookCollection = localStorage.getItem("book-collection");
  if (!bookCollection) {
    bookCollection = [];
  } else {
    bookCollection = JSON.parse(bookCollection);
  }

  const dateChosen = document.getElementById("date-chosen").value;
  localStorage.setItem("date-chosen", dateChosen);
  const chooser = document.getElementById("chooser").value;
  localStorage.setItem("chooser", chooser);
  const bookTitle = document.getElementById("title").value;
  localStorage.setItem("title", bookTitle);
  const bookAuthor = document.getElementById("author").value;
  localStorage.setItem("author", bookAuthor);
  const newBook = {
    dateChosen: dateChosen,
    chooser: chooser,
    bookTitle: bookTitle,
    bookAuthor: bookAuthor,
  };
  bookCollection.push(newBook);
  localStorage.setItem("book-collection", JSON.stringify(bookCollection));
   //localStorage.clear();
}

const checkValidation = (event) => {
    let isValid = true;
 
    if (isValid == false) {
    event.preventDefault();
    };

    if (bookChooser.value === "Who Chose the Book?") {
       // bookChooser.setCustomValidity("Please pick a name");
        bookChooser.reportValidity();
        bookChooser.classList.add("invalid");
    //  isValid = false;
    } else {
        bookChooser.setCustomValidity("");
        bookChooser.classList.remove("invalid");
    }

  if ( bookTitle.value.length < 2 && bookTitle.value) {
      bookTitle.setCustomValidity(
         "Your title must be longer than 1 letter"
      );
      bookTitle.reportValidity();
      bookTitle.classList.add("invalid");
      isValid = false;
    } else {
      bookTitle.setCustomValidity("");
      bookTitle.classList.remove("invalid");
   };

  if (bookAuthor.value.length < 4 && bookAuthor.value) {
       bookAuthor.setCustomValidity(
          "The author must have more than 3 letters"
        );
        bookAuthor.reportValidity();
        bookAuthor.classList.add("invalid");
       isValid = false;       
  } else {
        bookAuthor.setCustomValidity("");
        bookAuthor.classList.remove("invalid");
        
    };

    }; // checkValidation

 form.addEventListener("submit", checkValidation);
 form.addEventListener("change", checkValidation);
 form.addEventListener("submit", putDataInStorage);

