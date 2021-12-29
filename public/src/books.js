function findAuthorById(authors, id) {
  // find to compare iteration against supplied ID
  const found = authors.find((author) => author.id == id);
  return found;
}

function findBookById(books, id) {
  // find to compare iterations against supplied ID
  const found = books.find((book) => book.id == id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  // used this filter to target all books that have been returned
  let returnedBooks = books.filter((book) => book.borrows.every((borrow) => borrow.returned === true))
  // used this filter to target all books that haven't been returned yet
  let borrowedBooks = books.filter((book) => book.borrows.some((borrow) => borrow.returned === false))
  return [[...borrowedBooks], [...returnedBooks]]
}

function getBorrowersForBook(book, accounts) {
  
  const result = [];

  for (const account in accounts) {
    
    //assign current iteration to variable
    const currentAccount = accounts[account];
    
    // destructure current account to access all keys
    const { id, picture, age, name, company, email, registered } = currentAccount;
   
    // Iterate through borrows in the book
    for (const borrow in book.borrows) {
      
      // assign current iteration of borrow to variable
      const currentBorrow = book.borrows[borrow];
      
      // logic gate 
      if (currentBorrow.id == id && result.length < 10) {
        result.push({
          id,
          returned: currentBorrow.returned,
          picture,
          age,
          name,
          company,
          email,
          registered,
        });
      }
    }
  }

  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
