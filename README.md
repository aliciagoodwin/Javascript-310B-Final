TITLE: Tracking Book Club Reads & Generate Recommendations

Our book club is currently tracking our reading history on one member's notes app. We'd love to track our reads, who picked them, what we thought & when we met. We struggle to pick books so I created a tool to randomly select a book from one of two NYTIMES bestseller lists. The search also returns the book that has spent the most time on the bestseller list.

FINAL PROJECT CRITERIA

-- form validation to make sure all form fields are filled out correctly. I wanted to create one function for the two text fields but could not make them validate in the correct order. I ended up with redundant code as a result.

I used a random timing function so I did not have to write unit tests. It's true. I really don't like to write unit tests. I know I should do it. Yes, I know.

-- local storage to store my books. I learned that I couldn't edit local storage easily. RemoveItem does not do what I thought it would. I had to create a new object and put the revised object back into local storage.

I really enjoyed using the NYTIMES API. It is so easy to use and provides great data. 

My code is in need of a code review. I do not use any functions inside my event listeners. Also, I don't fully understand Classes. I use Rails so I am not sure how I'd use JS Classes when I have Ruby classes. I need to figure that out!