(function() {

  window.ruban = new Ruban();

  // Demoing binding with very simple jQuery on purpose ;)
  $('#binding-demo input').keyup(function() {
    $('#binding-demo span').html($(this).val());
  });

})();
