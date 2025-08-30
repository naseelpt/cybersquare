import React, { useState, useEffect } from "react";


function Home() {
  const [query, setQuery] = useState(""); 
  const [books, setBooks] = useState([]);       
  const [filtered, setFiltered] = useState([]); 

  
  const fetchBooks = () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=react") 
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.items );
        setFiltered(data.items); 
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

 
  const handleSearch = () => {
    if (query === "") {
      setFiltered(books); 
    } else {
      const result = books.filter((book) =>
        book.volumeInfo.title.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(result);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-center mt-6 mb-6">
      
        <input type="text" placeholder="search" className="w-80 px-3 py-3" value={query}
          onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 ">  Search </button>
      </div>

      <div className="md:px-24 pb-24 md:grid md:gap-5 md:grid-cols-3 pt-5">
        {filtered.map((book) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="flex flex-col items-center p-5 rounded-2xl shadow bg-yellow-50"
            >
              <img
                src={info.imageLinks?.thumbnail}
                alt=""
                className="w-[200px] h-[250px] object-cover rounded-lg"
              />
              <h1 className="font-bold text-lg mt-3 text-center">
                {info.title}
              </h1>
              <h1 className="text-center font-medium">{info.authors}</h1>
            
                <button className="bg-blue-700 text-white px-4 py-2 mt-3 rounded">Add to Favourite</button>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
