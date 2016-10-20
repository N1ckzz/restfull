$(document).ready(function(){
  //console.log("aaaaaa");
  $("#form_search").submit(function(event){
    event.preventDefault();
    var nome = $("#nome").val();
    cercaFilm(nome);
  });


  function cercaFilm(nomeFilm){
      $.ajax({
        url: 'http://www.omdbapi.com/?s='+nomeFilm+'&page=1',
        method: 'GET',
        // success: function(response){
        //     caricaFilm(response)
        // },
        // error: function(response){
        //     console.log(response);
        // }
      }).then(function(data){
        caricaFilm(data);
      }).catch(function(err){
        console.log(err);
      });

  };

    function caricaFilm(oggetto){
        //console.log(Films.Response);
       if(oggetto.Response == "False"){
         $("#no_film").text("Nessun Match con il film richiesto")
       }
       else{
         var films = oggetto.Search;
         console.log(films);
         $("tb_film").html("");
         var testo ="";
         testo+="<tr>"
         testo+='<th>Poster</th>';
         testo+='<th>Titolo</th>';
         testo+='<th>Tipo</th>';
         testo+='<th>Anno</th>';
         testo+="</tr>";
         $("#film_head").html(testo);


         testo="";
         console.log(films.length);
         for(var i=0;i<films.length;i++){
             testo+="<tr>"
             if(films[i].Poster=="N/A"){
              testo+='<td><img src="img/no_poster_200X250"/></td>';
            } else {
              testo+='<td><img src="'+films[i].Poster+'"/></td>';
            }
             testo+='<td>'+films[i].Title+'</td>';
             testo+='<td>'+films[i].Type+'</td>';
             testo+='<td>'+films[i].Year+'</td>';
             testo+="</tr>";
          }
          $("#film_body").html(testo);
       }
    };



});
