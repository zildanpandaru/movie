const btn = document.querySelector('.home .homeContent .btn a');
const inputSearch = document.querySelector('.home .homeContent .input');

btn.addEventListener('click', function (e) {
  this.style.display = 'none';
  e.preventDefault();
  inputSearch.style.display = 'block';
});
