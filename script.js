function movie() {
  $('.movie').html('');
  $.ajax({
    url: 'http://www.omdbapi.com',
    type: 'get',
    dataType: 'JSON',
    data: {
      apikey: '7e6663f5',
      s: $('.input input').val(),
    },
    success: function (result) {
      if (result.Response == 'True') {
        let hasil = result.Search;
        console.log(hasil);
        let card = '';

        hasil.forEach((e) => {
          card += cardBox(e);
        });
        $('.movie').append(card);
        $('.input input').val('');
      } else {
        console.log('eror');
      }
    },
  });
}

$('#search').on('click', function () {
  movie();
});

$('.input input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    movie();
  }
});

$('.movie').on('click', '.btn', function (e) {
  e.preventDefault();
  $.ajax({
    url: 'http://www.omdbapi.com',
    type: 'get',
    dataType: 'JSON',
    data: {
      apikey: '7e6663f5',
      i: $(this).data('id'),
    },
    success: function (hsl) {
      if (hsl.Response === 'True') {
        console.log(hsl);
        const modal = modalBox(hsl);
        $('#modal').html(modal);
        $('#modal .close').on('click', function () {
          $('#modal').html('');
        });
      }
    },
  });
});

function cardBox(e) {
  return `<div class="card">
        <h1>${e.Title}</h1>
        <img src="${e.Poster}" alt="" />
        <p>${e.Year}</p>
        <a href="" class="btn" data-id="${e.imdbID}">See Detail</a>
      </div>`;
}

function modalBox(hsl) {
  return `<div class="layer">
  <div class="modal">
    <div class="modalContent">
      <img src="${hsl.Poster}" alt="" />
      <table class="modalDeskripsi">
        <tr>
          <td><h1>${hsl.Title}</h1></td>
        </tr>
        <tr>
          <td><p><span>Tahun Terbit : </span>${hsl.Year}</p></td>
        </tr>
        <tr>
          <td><p><span>Genre : </span>${hsl.Genre}</p></td>
        </tr>
        <tr>
          <td><p><span>Director : </span>${hsl.Director}</p></td>
        </tr>
        <tr>
          <td><p><span>Actors : </span>${hsl.Actors}</p></td>
        </tr>
      </table>
    </div>
    <button type="button" class="close">Close</button>
  </div>
</div>`;
}
