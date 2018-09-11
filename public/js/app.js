(function($, document, window){
	
	$(document).ready(function(){
		// reviewsDropdowns
		
		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		$(".search-form button").click(function(){
			$(this).toggleClass("active");
			var $parent = $(this).parent(".search-form");

			$parent.find("input").toggleClass("active").focus();
		});


		$(".slider").flexslider({
			controlNav: false,
			prevText:'<i class="fa fa-chevron-left"></i>',
			nextText:'<i class="fa fa-chevron-right"></i>',
		});
		if( $(".map").length ) {
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14 
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    	
		}
		
	// Reviews refresh by criteria's 

		var $selectorGenre = $('#select-genre');
		var $selectorYear = $('#select-year');
		var $selectorPage = $('.select-page');
		var currentPage =1 ; 
		$selectorPage.on('click', function(e) {console.log(e); })
		console.log($selectorPage);
	var getMovies = function($selectorGenre, $selectorYear, page){
	//2. retrieve selected data
		var genre = $selectorGenre.val();
		var year = $selectorYear.val()
	console.log(year);
	//3. Do AJAX request 
		var url = '/reviews/'+ genre + '/' + year + '/' + page; 

		$.ajax({
			url : url, 
			type : 'GET',
			success : function(response, status) {
				// Méthode 1 : le serveur retourne une vue compilée
				console.log(response);
				// $('.movie-list').html(response)
				//Méthode 2: le server retourne du json
				if(response.length) {
					let output = 'output'
					response.forEach(movie => {
						output +='<div class="movie">'
						output += '<figure class="movie-poster">';
						
						if(movie.fields.image_url)
						{
							output +='<img src="' +  movie.fields.image_url + '" alt=" ' + movie.fields.title + '>'
						}
						else{
							output += '<img src="http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png" >'
						}
						output +='</figure>'
						output +='<div class="movie-title">'
						output +='<a href="/review/'+ movie._id +">"+ movie.fields.title + "</a></div>"
						output +='<p>'+ movie.fields.plot +'</p>'
						output +='</div>'
					});
						$('.movie-list').html(output)
					
				}
				
			}, 
			error: function(error, response, status) {
				
				console.log(error.message);
			}
		})
	}

		if($selectorGenre.length && $selectorYear.length){
			//1 Attach change event listener 
			
			$('.filter-selector').on('change',function(e){
				getMovies($selectorGenre, $selectorYear, currentPage)			
			})
			$selectorPage.on('click', function(e) { 
				console.log(e);
				e.preventDefault();
				currentPage = $ (this).text(); 
				console.log(currentPage);
				$selectorPage.each(($selector)=>{
					$($selector).removeClass('current')
					if($(this).text() === currentPage){
						$(this).addClass('current')
					}
					
				})
				getMovies($selectorGenre, $selectorYear, currentPage)	
			})
		}
	});

	$(window).load(function(){

	});

})(jQuery, document, window);