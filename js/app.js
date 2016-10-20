$(document).ready(function(){
  //console.log("aaaaaa");
  $("#form_search").submit(function(event){
    event.preventDefault();
    var nome = $("#nome").val();
    cercaFilms(nome);
  });


  function cercaFilms(nomeFilm){
      $.ajax({
        url: 'http://www.omdbapi.com/?s='+nomeFilm,
        method: 'GET',
      }).then(function(data){
        caricaFilms(data);
      }).catch(function(err){
        console.log(err);
      });

  };

    function caricaFilms(oggetto){
        //console.log(Films.Response);
       if(oggetto.Response == "False"){
         $("#no_film").text("Nessun Match con il film richiesto");
       }
       else{
         $("#no_film").text("");
         var films = oggetto.Search;
         //console.log(films);
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
         //console.log(films);
         for(var i=0;i<films.length;i++){
             testo+='<tr class="riga_film" data-id="'+films[i].imdbID+'">';
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


      $(document).on("click", ".riga_film", function(){
        var id_film = $(this).attr("data-id");
        //console.log(titolo_film);
        $.ajax({
          url: 'http://www.omdbapi.com/?i='+id_film+'',
          method: 'GET',
        }).then(function(data){
          dettagliFilm(data);
        }).catch(function(err){
          console.log(err);
        });
      });

      function dettagliFilm(oggetto){
    //titolo,poster, raiting, attori e altre info a piacimento
        //console.log(oggetto);
        $("#film_head").html("");
        $("#film_body").html("");

        var testo_1="";
        var testo_2="";
        var testo_3="";
        var testo_plot='<h1>Plot:</h1><br/>';
        var testo_award='<h1>Award:</h1><br/>';
        var testo_cast='<h1>Cast:</h1><br/>';

//testo_1 = titolo e foto
        testo_1='<ul>';
        testo_1+='<li><h3>'+oggetto.Title+'</h3></li>';
        if(oggetto.Poster == 'N/A'){
          testo_1+='<li><img src="img/no_poster_200X250"/></li>';
        } else {
          testo_1+='<li><img src="'+oggetto.Poster+'"/></li>';
        }
        testo_1+='</ul>';
//testo_2 = rating, year, director, writer
        testo_2='<br/><br/><br/><br/><ul>';
        testo_2+='<li><h5>Rating: '+oggetto.imdbRating+'</h5></li>';
        testo_2+='<li><h5>Year: '+oggetto.Released+'</h5></li>';
        if(oggetto.Director == "N/A"){
          testo_2+='<li><h5>Director: N/A</h5></li>';
        } else {
        testo_2+='<li><h5>Director: '+oggetto.Director+'</h5></li>';
        }
        testo_2+='<li><h5>Writer: '+oggetto.Writer+'</h5></li>';
        testo_2+='</ul>';
//testo_3 = country, genere, language, released
        testo_3='<br/><br/><br/><br/><ul>';
        testo_3+='<li><h5>Country: '+oggetto.Country+'</h5></li>';
        testo_3+='<li><h5>Genre: '+oggetto.Genre+'</h5></li>';
        testo_3+='<li><h5>Language: '+oggetto.Language+'</h5></li>';
        testo_3+='<li><h5>Released: '+oggetto.Released+'</h5></li>';
        testo_3+='</ul>';



        $("#dettaglio_film_1").html(testo_1);
        $("#dettaglio_film_2").html(testo_2);
        $("#dettaglio_film_3").html(testo_3);
        if(oggetto.Plot == "N/A"){
          $("#plot").html(testo_plot+'<h4>Nessuna trama presente nel database</h4>');
        } else {
          $("#plot").html(testo_plot+'<h4>'+oggetto.Plot+'</h4>');
        }
        if(oggetto.Awards == "N/A"){
          $("#award").html(testo_award+'<h4>Nessun premio presente nel database</h4>');
        } else {
          $("#award").html(testo_award+'<h4>'+oggetto.Awards+'</h4>');
        }
        if (oggetto.Actors == "N/A"){
          $("#cast").html(testo_cast+"Nessun cast presente nel database");
        } else {
          $("#cast").html(testo_cast+'<h4>'+oggetto.Actors+'</h4>');
        }


      };

});
