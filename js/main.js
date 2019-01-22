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

function injectChartCode() {
    var html = `
    <!-- Injected chartContent -->
    <section id="chartContent" class="content content-1">
        <div class="container">
            <div class="col-sm-8 col-sm-offset-2">
                <canvas id="doughnut-graph" width="600" height="460" style="display: block; height: 230px; width: 300px;"></canvas>
            </div>
        </div>
    </section>

    <section id="socials" class="content content-2">
        <h2 style="text-align: center;">Share your results!</h2>
        <div class="container">
            <div align="center" class="col-sm-6 col-sm-offset-3">
                <!-- twitter -->
                <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank"><img src="https://camo.githubusercontent.com/abf20ddfcad75b2cbcfd82e767dea4f1084a7938/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f706e672f747769747465722e706e67" alt="Twitter" width=10% height=10%/></a>
                <!-- Facebook -->
                <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank"><img src="https://camo.githubusercontent.com/e6d2040c65e8c6f4da10db72436cf9a1196e43ae/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f66616365626f6f6b2e737667" alt="Facebook" width=10% height=10% /></a>
                <a href="https://plus.google.com/share?url=https://simplesharebuttons.com" target="_blank"><img src="https://camo.githubusercontent.com/34c75efe0f75d432933f7c7ffdef3138b9c9bd16/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f676f6f676c655f706c75732e737667" alt="Google" width=10% height=10% /></a>
                <a href="mailto:?Subject=Simple Share Buttons&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20 https://simplesharebuttons.com"><img src="https://camo.githubusercontent.com/be2da4b6935fde94c4062114d0e57b2456f700f8/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f656d61696c2e737667" alt="Email" width=10% height=10% /></a>
            </div>
        </div>
    </section>`;
    $("#contentInjector").html(html);

}

// function to add commas to textboxes
function comma(Num) {
    Num += '';
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}

// Main runner
$(document).ready(function(){
    // Add smooth scrolling to all links
    function drawChart(data) {
        new Chart($("#doughnut-graph")[0].getContext('2d'), {
          type: 'doughnut',
          data: {
            datasets: [{
              data: data,
              backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
              ],
              label: 'Dataset 1'
            }],
            labels: [
              "Red",
              "Green",
              "Yellow",
              "Grey",
              "Dark Grey"
            ]
          },
          options: {
            plugins: {
              labels: {
                // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                render: 'value',

                // precision for percentage, default is 0
                precision: 0,

                // identifies whether or not labels of value 0 are displayed, default is false
                showZero: true,

                // font size, default is defaultFontSize
                fontSize: 12,

                // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
                fontColor: '#fff',

                // font style, default is defaultFontStyle
                fontStyle: 'normal',

                // font family, default is defaultFontFamily
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

                // draw text shadows under labels, default is false
                textShadow: true,

                // text shadow intensity, default is 6
                shadowBlur: 10,

                // text shadow X offset, default is 3
                shadowOffsetX: -5,

                // text shadow Y offset, default is 3
                shadowOffsetY: 5,

                // text shadow color, default is 'rgba(0,0,0,0.3)'
                shadowColor: 'rgba(255,0,0,0.75)',

                // draw label in arc, default is false
                // bar chart ignores this
                arc: true,

                // position to draw label, available value is 'default', 'border' and 'outside'
                // bar chart ignores this
                // default is 'default'
                position: 'default',

                // draw label even it's overlap, default is true
                // bar chart ignores this
                overlap: true,

                // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
                showActualPercentages: true,

                // set images when `render` is 'image'
                images: [
                  {
                    src: 'image.png',
                    width: 16,
                    height: 16
                  }
                ],

                // add padding when position is `outside`
                // default is 2
                outsidePadding: 4,

                // add margin of text when position is `outside` or `border`
                // default is 2
                textMargin: 4
              }
            }
          }
        });
    }


    $('input.number').keyup(function(event) {
        // skip for arrow keys
        if(event.which >= 37 && event.which <= 40) return;

        // format number
        $(this).val(function(index, value) {
            return value
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    });

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
            if (val !== '' && otherVal === '') {
                $("#annualincome").prop('disabled', true);
                $("#annualincome").css({'background-color' : 'rgba(30,30,30,.15)'});
                $("#annualincome").css({'border' : '2px solid rgb(30, 30, 30, .30)'});
            } else if (val === '' && otherVal === '') {
                $("#annualincome").prop('disabled', false);
                $("#annualincome").css({'background-color' : 'rgba(30,30,30,.7)'});
                $("#annualincome").css({'border' : '2px solid rgb(30, 30, 30, .9)'});
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
                $("#taxpayed").css({'background-color' : 'rgba(30,30,30,.15)'});
                $("#taxpayed").css({'border' : '2px solid rgb(30, 30, 30, .30)'});
            } else if (val === '' && otherVal === '') {
                $("#taxpayed").prop('disabled', false);
                $("#taxpayed").css({'background-color' : 'rgba(30,30,30,.7)'});
                $("#taxpayed").css({'border' : '2px solid rgb(30, 30, 30, .9)'});
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
        console.log(taxpayedVal);

        var perc = [0.163, 0.158, 0.156, 0.099, 0.086, 0.077, 0.076, 0.056, 0.031, 0.016, 0.0143, 0.0141, 0.0116, 0.0102, 0.01, 0.0069, 0.0051, 0.0041, 0.0022];
        var data = new Array(perc.length);
        var i;
        for (i=0; i < perc.length; i++) {
          data[i] = [taxpayedVal*perc[i]];
          console.log(taxpayedVal*perc[i]);
        }


        // do this last, scroll to correct place on page
        injectChartCode();
        smoothScrolling("#chartContent", event);
        drawChart(data);

    });



});
