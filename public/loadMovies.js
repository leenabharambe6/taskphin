document.addEventListener('DOMContentLoaded', () => {
    console.log('123333')
    var table = document.getElementById("movieTable");
    var movieListBody = table.getElementsByTagName("tbody")[0];
    //const movieListBody = document.getElementById('movieList');
    fetch('/getMoviesFromDB')
        .then(response => response.json())
        .then(movies => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = text;
            input.id = cell.id; // Assign an ID to the input to identify it later
            
            movies.forEach(movie => {
                const newRow = movieListBody.insertRow(-1);
                const movieNameCell = newRow.insertCell(0);
                const ratingCell = newRow.insertCell(1);
                const castCell = newRow.insertCell(2);
                const genreCell = newRow.insertCell(3);
                const releaseDateCell = newRow.insertCell(4);
                const actionsCell = newRow.insertCell(5);
                // Assign ID to the cells
                movieNameCell.id =movie.movie_name+newRow.rowIndex+0;
                ratingCell.id = movie.movie_name+newRow.rowIndex+1;
                castCell.id= movie.movie_name+newRow.rowIndex+2;
                genreCell.id= movie.movie_name+newRow.rowIndex+3;
                releaseDateCell.id=movie.movie_name+newRow.rowIndex+4;
                actionsCell.id= movie.movie_name+newRow.rowIndex+5;
        
                // Add content to the cells
                movieNameCell.innerHTML = `<input type="text" value="${movie.movie_name}" id="${movie.movie_name+newRow.rowIndex+0}"`;
                ratingCell.innerHTML = movie.rating;
                castCell.innerHTML = movie.cast;
                genreCell.innerHTML = movie.genre;
                releaseDateCell.innerHTML = movie.release_date;
                actionsCell.innerHTML = "<button onclick='editRow(this)'>Edit</button> <button onclick='deleteRow(this)'>Delete</button>";
            });
        });
});
  function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');
    
    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      console.log( cell)

      //const span = cell.getElementsByTagName('span')[0];
      const text = cell.textContent;
      
      const input = document.createElement('input');
      input.type = 'text';
      input.value = text;
      input.id = cell.id; // Assign an ID to the input to identify it later
      
      cell.style.display = 'none';
      cell.appendChild(input);
    }
    
    const editButton = row.querySelector('button');
    editButton.textContent = 'Save';
    editButton.onclick = () => saveRow(row);
  }

  function saveRow(row) {
    const cells = row.getElementsByTagName('td');
    const newData = {};

    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const input = cell.querySelector('input');
      const span = cell.getElementsByTagName('span')[0];
      
      span.style.display = 'inline';
      span.textContent = input.value;
      cell.removeChild(input);
    }

    const editButton = row.querySelector('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editRow(editButton);

    // Here, you can send the updated data to the server using an API request (e.g., fetch or XMLHttpRequest).
  }

function deleteRow(button) {
    // Implement delete functionality here
    var row = button.parentNode.parentNode;
    if (confirm("Are you sure you want to delete this row?")) {
        fetch('/deletMoview')
        .then(response => response.json())
        row.remove();
    }
}