// Offset for Site Navigation
$('#siteNav').affix({
    offset: {
        top: 700
    }
})

function smoothScrolling(hash, event) {
    // Store hash
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 1000, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
    });
}

// Main runner
$(document).ready(function(){
    // Add smooth scrolling to all links
    // $("a:not(#gobutton)").on('click', function(event) {
    //     event.preventDefault();
    //     smoothScrolling(this.hash, event);
    // });


    // *** tax payed
    // handle enter being pressed
    $("#taxpayed").on("keypress", function (e) {
        if (e.which == 13) {
            handleTaxPayed();
        }
    });
    // disable other entrybox
    $("#taxpayed").on("change paste keyup", function (e) {
        if (e.which != 13) {
            var val = $("#taxpayed").val();
            var otherVal = $("#annualincome").val();
            console.log(val);
            if (val !== '' && otherVal === '') {
                $("#annualincome").prop('disabled', true);
                $("#annualincome").css({'background-color' : 'rgba(255,255,255,.05)'});
                $("#annualincome").css({'border' : '2px solid rgb(154, 205, 50, .15)'});
            } else if (val === '' && otherVal === '') {
                $("#annualincome").prop('disabled', false);
                $("#annualincome").css({'background-color' : 'rgba(255,255,255,.15)'});
                $("#annualincome").css({'border' : '2px solid rgb(154, 205, 50, .6)'});
            }
        }
    })
    function handleTaxPayed() {
        console.log("IN handleTaxPayed");
    }

    // annual income handlers
    $("#annualincome").on("keypress", function (e) {
        if (e.which == 13) {
            handleAnnualIncome();
        }
    });
    // disable other entrybox
    $("#annualincome").on("change paste keyup", function (e) {
        if (e.which != 13) {
            var val = $("#annualincome").val();
            var otherVal = $("#taxpayed").val();
            console.log(val);
            if (val !== '' && otherVal === '') {
                $("#taxpayed").prop('disabled', true);
                $("#taxpayed").css({'background-color' : 'rgba(255,255,255,.05)'});
                $("#taxpayed").css({'border' : '2px solid rgb(154, 205, 50, .15)'});
            } else if (val === '' && otherVal === '') {
                $("#taxpayed").prop('disabled', false);
                $("#taxpayed").css({'background-color' : 'rgba(255,255,255,.15)'});
                $("#taxpayed").css({'border' : '2px solid rgb(154, 205, 50, .6)'});
            }
        }
    })
    function handleAnnualIncome() {
        console.log("IN handleAnnualIncome");
    }

    $("#gobutton").on("click", function (e) {
        event.preventDefault();
        console.log("button was pressed");

        // check which textbox has content
        var taxpayedVal = $("#taxpayed").val();
        var annualincomeVal = $("#annualincome").val();

        console.log("taxpayedVal: " + taxpayedVal === '');
        console.log("annualincomeVal: " + annualincomeVal === '');


        // do this last, scroll to correct place on page
        smoothScrolling("#intro", event);
    });



});
