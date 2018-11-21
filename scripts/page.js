$(document).ready(function() {
  fillMessages();
});


function submitForm(event) {
  var myForm = $('#myform');
  if (myForm[0].checkValidity()) {
  
    event.preventDefault();
  
    $.post('/api/messages', myForm.serialize(), function() {
 
      $('#inputMessage').val('');

      getHelloworld();
    
      fillMessages();
    }).fail(function(data) {
      alert('Failed to post form. Please check the logs for more details.')
      console.log(data);
    });
  } else {
    
    $('<input type="submit">').hide().appendTo(myForm).click().remove();
  }
}

function getHelloworld() {
  $.ajax({
    url : '/api/hello/' + $('#inputUsername').val(),
    success : function(result) {
      $('#message').text(result);
      $('#messageBox').removeClass('hidden');
    },
    error : function(request, status, error) {
      alert('Error getting the helloworld message. Please check the logs for more details.');
    },
  });
}


function fillMessages() {
  
  setTimeout(function() {
    $.ajax({
      url : '/api/messages',
      success : function(result) {
        var messages = JSON.parse(result);
       
        $('#mytable tbody').empty();
        for ( var i in messages) {
          $('#mytable tbody').append(
              '<tr><td><b>' + messages[i].username + '</b></td><td>' + messages[i].message + '</td></tr>');
        }
      },
      error : function(request, status, error) {
        alert('Error reading the messages. Please check the logs for more details.');
      },
    });

  }, 200);
}
