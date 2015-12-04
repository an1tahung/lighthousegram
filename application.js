  $(function() {
    var publickey = 'bfcb54cde0a24cafed1d2860f48e38c5';
    var privatekey = 'f5e9aa2696a5be03c7d6244f12e1f47d8027874e';
    var ts = Date.now();
    var hash= md5(ts + privatekey + publickey);

    $.ajax({
      url: 'http://gateway.marvel.com:80/v1/public/characters?limit=20&offset=900&apikey=' + publickey + "&ts=" + ts + "&hash=" + hash,
      method: 'get',
      success: function(res){
        var heroes = res.data.results;
        var index = 0; 
        
        changeImage();

        function changeImage(){
          if(index>=heroes.length){
            index = 0;
            return 
          } 
          setTimeout(changeImage, 7000);
          var hero = heroes[index];
          var $img = $('<img>');
          var $p = $('<p>')
          var thumb = hero.thumbnail;
          var url = thumb.path + '.' + thumb.extension
          $img.attr('src', url);
          // $p.attr(hero.name)
          $('#comics').html($img);
          index++;
        }
      }
    })
  });