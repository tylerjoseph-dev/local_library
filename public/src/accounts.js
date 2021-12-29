function findAccountById(accounts, id) {
   const found = accounts.find((account) => account.id === id);
   return found;

}

function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return sorted;
}

 function getTotalNumberOfBorrows(account, books) {
  
  let count = 0; // Initialize Count variable to return

  for(const book in books){ // Iterate through books array
    const currentBook = books[book]; // Assignment of current iteration for readability
    for(const borrowRecord in currentBook.borrows){ // Iterate through current book iteration borrow records
      currentBook.borrows[borrowRecord].id === account.id ? count++ : null; //
    }
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  // empty array for books
  const booksCheckedOut = [];
  // loop through books
  books.forEach((book) => {
    // borrows equal to most recently checked out
    let borrows = book.borrows[0];
    // borrows id is currently checked out by an account id
    if (borrows.returned === false && borrows.id === account.id) {
      // destructure books
      let { id, title, genre, authorId, author, borrows } = book;
      author = authors.find((author) => author.id === book.authorId);
      booksCheckedOut.push({ id, title, genre, authorId, author, borrows });
    }
  });
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
