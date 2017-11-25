var titre = $('#titre'),
    couches = $('.couche'),
    artistes = $('.artiste'),
    contenu = $('.contenu-affiche .inner');

$( window ).scroll(function() {
    var scrollTop = $(this).scrollTop(),
        opaScroll = (scrollTop/100);
    titre.css("transform", 'translateZ('+(scrollTop+'px')+')');
    //checkIfRemove(titre);

    couches.each(function (index){
        var current = $(this);
        var translateIndex = index*500+1000;
        current.css("transform", 'translateZ('+(scrollTop-translateIndex+'px')+') rotate('+(opaScroll+'deg')+')');
        var nextArtistes = current.next('.artistes').find('.artiste');
        if(nextArtistes){
            nextArtistes.each(function(indexArtiste){
                $(this).css("transform", 'translateZ('+(scrollTop-translateIndex+(indexArtiste*100)-400+'px')+') rotate('+(opaScroll/10+'deg')+')');
            })
        }

    });
    if( hasPassed(couches.last()) ) {
        contenu.addClass('visible');
    }else{
        contenu.removeClass('visible');
    }
    // artistes.each(function (index){
    //     var current = $(this);
    //     var translateIndex = index*500+2000;
    //     current.css("transform", 'translateZ('+(scrollTop-translateIndex+'px')+') rotate('+(opaScroll/10+'deg')+')');
    // });
});

// supprimer la couche une fois qu'elle a dépassée le viewport
function hasPassed (element){
    var matrix = element.css("transform");
    var translate_val = matrix.match(/-?[\d\.]+/g);
    var translateZ_val = translate_val[15];
    return translateZ_val > 1000;
}
