// Offset for Site Navigation
$('#siteNav').affix({
    offset: {
        top: 700
    }
})

var US_FEDERAL_TAX_RATIOS = {
    "Medicare": 0.163,
    "Social Security": 0.158,
    "Millitary": 0.156,
    "Health": 0.099,
    "Debt": 0.086,
    "Income Security": 0.077,
    "General Government": 0.076,
    "Unreported": 0.056,
    "Veterans": 0.031,
    "International Affairs": 0.016,
    "Education": 0.0143,
    "Transportation": 0.0141,
    "Regional Development": 0.0116,
    "Justice": 0.0102,
    "Environment": 0.01,
    "Housing Credit": 0.0069,
    "Science and Space": 0.0051,
    "Agriculture": 0.0041,
    "Energy": 0.0022
}

var US_FEDERAL_TAX_BRACKETS = {
    0 : 0,
    9525 : 0.1,
    38700 : 0.12,
    82500 : 0.22,
    157500 : 0.24,
    200000 : 0.32,
    500000 : 0.35,
    9007199254740991 : 0.37
}

function sortKeys(m) {
    var sarr = [];

    for (let k in m) {
        sarr.push([k, m[k]]);
    }
    sarr.sort(function(a,b){
        return a[1] - b[1];
    }).reverse();

    return sarr.map(function(value,index) { return value[0]; });

}

function smoothScrolling(hash, event) {
    // Store hash
    $('html, body').animate({
        scrollTop: $(hash).offset().top - 45
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
            <div class="col-sm-10 col-sm-offset-1">
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

function generateData(taxpayedVal) {
    var perc = Object.keys(US_FEDERAL_TAX_RATIOS).map(function(key){
        return US_FEDERAL_TAX_RATIOS[key];
    });
    var data = new Array(perc.length);
    for (var i = 0 ; i < perc.length; i++) {
      data[i] = (taxpayedVal * perc[i]).toFixed(2);
      console.log(data[i]);
    }
    return data;
}

function convertIncomeToTaxPayed(annualincomeVal) {
    var tax = Object.keys(US_FEDERAL_TAX_BRACKETS).map(function(key){
        return US_FEDERAL_TAX_BRACKETS[key];
    });
    var amount = Object.keys(US_FEDERAL_TAX_BRACKETS);
    var taxpayedVal = 0;
    var data = new Array(tax.length);
    for (var i = 1 ; i < tax.length; i++) {
      if (amount[i] < annualincomeVal) {
        taxpayedVal += amount[i] * tax[i];
      }
      else {
        taxpayedVal += (annualincomeVal - amount[i - 1]) * tax[i];
        break;
      }
    }
  return taxpayedVal;
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
              "#02160A",
              "#064620",
              "#0A7434",
              "#0FA34A",
              "#13D15F",
              "#2CEC79",
              "#44EE88",
              "#72F2A5",
              "#A1F7C3",
              "#CFFBE1",
              ],
              label: 'Dataset 1'
            }],
            labels: sortKeys(US_FEDERAL_TAX_RATIOS)
          },
          options: {
            maintainAspectRatio: true,
            responsive: true,
            legend: {
              position: 'right',
            },
            elements: {
              arc:{
                //borderColor: '#FFF'
              }
            },
            plugins: {
              labels: {
                // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                render: 'label',
                // position to draw label, available value is 'default', 'border' and 'outside'
                // bar chart ignores this
                // default is 'default'
                position: 'outside',

                // precision for percentage, default is 0
                precision: 1,


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
                shadowBlur: 4,

                // text shadow X offset, default is 3
                shadowOffsetX: -3,

                // text shadow Y offset, default is 3
                shadowOffsetY: -3,

                // text shadow color, default is 'rgba(0,0,0,0.3)'
                shadowColor: 'rgba(0,0,0,0.4)',

                // draw label in arc, default is false
                // bar chart ignores this
                arc: false,

                // draw label even it's overlap, default is true
                // bar chart ignores this
                overlap: false,

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

                position: 'right',

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
            $("#gobutton").click();
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

    // annual income handlers
    $("#annualincome").on("keypress", function (e) {
        if (e.which == 13) {
            $("#gobutton").click();
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

    $("#gobutton").on("click", function (e) {
        event.preventDefault();
        console.log("button was pressed");

        // check which textbox has content
        var taxpayedVal = parseInt($("#taxpayed").val().replace(/,/g, ''), 10);
        var annualincomeVal = parseInt($("#annualincome").val().replace(/,/g, ''), 10);

        console.log("taxpayedVal: " + !isNaN(taxpayedVal));
        console.log("annualincomeVal: " + !isNaN(annualincomeVal));

        var data;
        if (!isNaN(taxpayedVal)) {
            data = generateData(taxpayedVal);
        } else if (!isNaN(annualincomeVal)) {
            taxpayedVal = convertIncomeToTaxPayed(annualincomeVal);
            data = generateData(taxpayedVal);
        } else {
            // Empty input case
            return;
        }

        // do this last, scroll to correct place on page
        injectChartCode();
        smoothScrolling("#chartContent", event);
        drawChart(data);

    });
});
