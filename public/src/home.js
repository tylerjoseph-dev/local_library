

function getTotalBooksCount(books) {
  return books.length;
}



function getTotalAccountsCount(accounts) {
  return accounts.length;
}



function getBooksBorrowedCount(books) {
  
  const borrowedCount = books.reduce((count, book) =>{
    if(book.borrows[0].returned == false){
      count++
    }
    return count;
  }, 0)
  return borrowedCount;
}



function getMostCommonGenres(books) {

  const getCommonGenres = books.reduce((acc, book) => {
    let { genre } = book;
    !acc[genre] ? acc[genre] = { name: `${genre}`, count: 1 } : acc[genre].count++;
    return acc;
  }, {});
  // Object.values() returns array w object values so that the count is accessible
  const allTotalGenres = Object.values(getCommonGenres);
  allTotalGenres.sort((a, b) => (a.count > b.count ? -1 : 1));
  // use slice to return 0-5 indexed genres
  return sliceResult(allTotalGenres);
}



function getMostPopularBooks(books) {
  // use map to count how many borrows of object w title
  const borrows = books.map((book) => {
    // each object returned has 2 keys
    return (mostPopular = {
      name: book.title,
      count: book.borrows.length,
    });
  });

  borrows.sort((a, b) => (a.count < b.count ? 1 : -1));
  // returns an array containing five objects or fewer even if tie
  return borrows.slice(0, 5);
}



function getMostPopularAuthors(books, authors) {
  let result = [];
  for(const book of books){
    for(const author of authors){
      const {borrows, authorId} = book;

      const fullName = `${author.name.first} ${author.name.last}`;

      if(authorId === author.id){
        result.push({name: `${fullName}`, count: borrows.length})
      }
    }
  }

  result.sort((a,b) => a.count > b.count ? -1:1);
  result = sliceResult(result);
  return result;
}


// Helper to slice results without calling .slice every single function.
function sliceResult(input, cap =5){
  const slicedResult = input.slice(0,cap);
  return slicedResult;
}



module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
