const formRecs = document.getElementById("get-book-recs");
const bookHistoryTable = document.getElementById("book-history-table");


const loading = document.getElementById("loading");

//remove books

setTimeout(() => {
    loading.style.display = 'none';

 }, 2000);

document.addEventListener("DOMContentLoaded", (event) => {

let bookHistory = window.localStorage.getItem("book-collection");
  bookHistory = JSON.parse(bookHistory);
  
const bookPropertyKeys = ["dateChosen", "bookTitle", "bookAuthor", "chooser"];
  //add date for sorting
  bookHistory = bookHistory.map((book) => {
    book.dateInEpoch = Date.parse(book.dateChosen);
    return book;
  });

const sortedBookHistory = bookHistory.sort((b, a) => a.dateInEpoch - b.dateInEpoch);

//debugger;
   
  const table = document.getElementById("book-history-table");

  sortedBookHistory.forEach((bookProps) => {
    //  console.log('book', bookProps);
    const tableRow = document.createElement("tr");
    table.appendChild(tableRow);

    bookPropertyKeys.forEach((key) => {
      const property = bookProps[key];

      const tableData = document.createElement("td");
      tableData.innerText = property;
      tableRow.appendChild(tableData);
        if (key === "chooser") {
            const deleteTableData = document.createElement('td');
            const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("btn-secondary");
                deleteBtn.setAttribute("id", "delete");
                deleteBtn.innerText = "Delete";
            deleteTableData.appendChild(deleteBtn);
            tableRow.appendChild(deleteTableData);    
        }
    }); // iterate over keys of bookPropertyKeys array

  }); // iterate over each book object in BookHistory array
}); // end of event listener

       
    bookHistoryTable.addEventListener("click", function(e) {
      const deleteItem = e.target.parentNode.parentNode;
          // get current collection from local storage
      let bookCollection = window.localStorage.getItem("book-collection");
        bookCollection = JSON.parse(bookCollection);
      
        bookCollection.forEach((bookProps) => {
           let index = 0;             
        if (deleteItem.innerText.includes(bookProps.bookTitle)) {
            bookCollection.splice(index,1);
            } // test if delete item contains title
           index++;         
        }); //iterate over collection
        // put new collection back into strorage
         window.localStorage.setItem("book-collection", JSON.stringify(bookCollection));
        //remove from the DOM
         bookHistoryTable.removeChild(deleteItem);
        });

let minYear = "2009";
const yearArray = [];

while (minYear < "2023") {
  yearArray.push(minYear);
  minYear++;
}

const selectYear = document.getElementById("recommendation-year");
const selectItem = document.createElement("option");
selectItem.selected = true;
selectItem.innerText = "Which year?";
selectYear.appendChild(selectItem);

for (let index = 0; index < yearArray.length; index++) {
  const year = yearArray[index];

  const selectNextItem = document.createElement("option");
  selectNextItem.value = year;
  selectNextItem.innerText = year;
  selectYear.appendChild(selectNextItem);
}

formRecs.addEventListener("submit", function (e) {
  e.preventDefault();

  const randomNum = Math.floor(Math.random() * 9);
  // pick a number between 0 and 10
  const yearChosen = document.getElementById("recommendation-year").value;
  const genreChosen = document.getElementById("recommendation-genre").value;

  const BASE_URL = `https://api.nytimes.com/svc/books/v3/lists/${yearChosen}-01-15/${genreChosen}.json`;
  const url = `${BASE_URL}?&api-key=${API_KEY}`;

  const bookRecContainer = document.getElementById("book-recommendation");

  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (responseJson) {
      const bookList = responseJson.results.books;
      const randBook = bookList[randomNum];
     
      const mostTimeOnListBook = bookList.sort((b, a) => a.weeks_on_list - b.weeks_on_list);
          const topBook = mostTimeOnListBook[0];
      console.log(`top book ${topBook.title}`);

      const twoBooks = [randBook, topBook];

        twoBooks.forEach(book => {
       
              const mainDiv = document.createElement("div");
              mainDiv.className = "row col-12 pb-3";

              const imageDiv = document.createElement("div");
              imageDiv.className = "col-6";
            
              const img = new Image(200, 200);
              img.src = book.book_image;
              imageDiv.appendChild(img);
              mainDiv.appendChild(imageDiv);

              const bookDiv = document.createElement("div");
              bookDiv.className = "col-6 p-3";

              const bookSpan = document.createElement("div");
              bookSpan.className = "h4 font-italic";
              title = book.title;
              bookSpan.innerHTML = title;

              const authorSpan = document.createElement("span");
              authorSpan.className = "h6";
              authorSpan.innerHTML = `by ${book.author}`;

              const descDiv = document.createElement("div");
              descDiv.innerHTML = book.description;

              bookDiv.appendChild(bookSpan);
              bookDiv.appendChild(authorSpan);
              bookDiv.appendChild(descDiv);

              //   showBooks.appendChild(imageDiv);
              bookRecContainer.appendChild(mainDiv);
              mainDiv.appendChild(imageDiv);
              mainDiv.append(bookDiv);
            });
            });
}); // end of add event listener
