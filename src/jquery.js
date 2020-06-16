// jquery file GUI Project
$(document).ready(function() {
    
    // log out function
    $("#logout").on("click", function() {
        sessionStorage.clear();
        window.location.href = "index.html";
	});
    
    // load cart function
    cartFunction = { 
        load : function() {
            $("address span:last").hide();
            $("#cart").html("");
            if (sessionStorage.getItem("cart") == null) {
                sessionStorage.setItem("cart", JSON.stringify([]));
            }

            var cart = JSON.parse(sessionStorage.getItem("cart"));
            if (cart.length != 0) {
                $("#cart").removeAttr("style");
                $("#cart").html("");
                for (i = 0; i < cart.length; i++) {
                    if ($("#action").val() != "1") {
                        $("#cart").append("<img src='../" + cart[i].image + "' style='width:50px;height:50px;float:left;' />");
                    } else {
                        $("#cart").append("<img src='" + cart[i].image + "' style='width:50px;height:50px;float:left;' />");
                    }
                    $("#cart").append("<span style='font-size:9px;'>" + cart[i].name + "</span><br />");
                    $("#cart").append("<span style='font-size:9px;'>Color: " + cart[i].color + "</span>");
                    $("#cart").append("<span style='font-size:9px;float:right'>Qty: " + cart[i].qty + "</span>");
                    $("#cart").append("<br /><br />");
                }
            } else {
                $("#cart").attr("style", "text-align:center;");
                $("#cart").html("No Item");
            }
        }
    }
    
    // show cart
    shoppingCart = { 
        show : function() {
            var cart = JSON.parse(sessionStorage.getItem("cart"));
            var total = 0;
            $("tbody").html("");
            for (i = 0; i < cart.length; i++) {
                $("tbody").append("<tr>");
                $("tr:last").append("<td>" + (i + 1) + "</td>");
                $("tr:last").append("<td>" + cart[i].name + "</td>");
                $("tr:last").append("<td><a><img style='width:100px;height:100px;' alt='' src='" + cart[i].image + "'></a></td>");
                $("tr:last").append("<td>" + cart[i].color + "</td>");
                $("tr:last").append("<td><input type='number' class='input-mini' id='quantity' value='" + cart[i].qty + "' min='1' /></td>");
                $("tr:last").append("<td>HK$" + cart[i].price + "</td>");
                $("tr:last").append("<td style='width:100px'>HK$" + (parseInt(cart[i].qty) * parseFloat(cart[i].price)) + "</td>");
                $("tr:last").append("<td><input type='checkbox' ></td>");
                if ($("tr td input[type=checkbox]:last").checked) {
                    total += parseInt(cart[i].qty) * parseFloat(cart[i].price);
                }
            }
            $("p.cart-total").html("<strong>Total</strong>:　HK$" + total + "<br />");
        }
    }
    
    // get cart items
    cartFunction.load();
    
    // set case contains
    $.expr[':'].casecontains = function(a, i, m) { 
      return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
    };
    
    // password range
    $("#psd").on("keyup", function() {
        $("#passwordRange").animate({
            value: $("#psd").val().length * 13
        },300);
    });
    
    // search function
    $("#search").keyup(function(){
        $("ul li.span3").hide().filter(":casecontains('"+( $(this).val() )+"')").show();
    });
    
    // sort function
    $("#sort").on("change", function(){
        var arr = [];
        var index = [];
        for ( var i = 0; i < $("ul li.span3").length; i++ ) {
            if ($(this).val() == ".hidden" || $(this).val() == ".size") {
                arr.push($("ul li div").find($(this).val()).eq(i).val());
            } else {
                arr.push($("ul li div").find($(this).val())[i].innerHTML);
            }
            index.push(i);
        }
        if ($(this).val() == ".hidden" || $(this).val() == ".size") {
            bubbleSort(arr, index, 0);
        } else {
            bubbleSort(arr, index, 1);
        }
        var innerhtml = "";
        for ( var i = 0; i < arr.length; i++ ) {
            innerhtml += '<li class="span3" style="width:270px;height:351px">' + $("ul li.span3")[index[i]].innerHTML + '</li>';
        }

        $("ul.listing-products").html(innerhtml);
        
    });
    
    // add items to cart
	$("#addToCart").on("click", function() {
        var item = {"image" : $("body").find("section div div div div a").attr("href").substr(3),
                    "name" : $("body").find("address span:first").text(),
                    "qty" : $("#qty").val() != "" ? $("#qty").val() : 1,
                    "price" : $("body").find("div h4 strong span").text().substr(5),
                    "color" : $("#color").val()};
        
        leftLocation = $("address span").position().left;
        topLocation = $("address span").position().top;
        $("address span:last").show();
        if ($("#cart").has("img").length > 0) {
			$("address span").attr("style", "position:absolute; margin-left:1em; left:" + leftLocation + "px;top:" + topLocation + "px");
            $("address span:first").animate({left:$("#cart img:last").position().left, top: $("#cart img:last").position().top + 50}, 1500, function() {
                $("body").find("address span:first").attr("style", "position:absolute; margin-left:1em; left:" + leftLocation + "px;top:" + topLocation + "px");
                var cart = JSON.parse(sessionStorage.getItem("cart"));
                for (i = 0; i < cart.length; i++) {
                    if (item.name == cart[i].name) {
                        cart[i].qty = parseInt(item.qty) + parseInt(cart[i].qty);
                        sessionStorage.setItem("cart", JSON.stringify(cart));
                        cartFunction.load();
                        return;
                    }
                }
                cart.push(item);
                sessionStorage.setItem("cart", JSON.stringify(cart));

                cartFunction.load();
            });
        } else {
			$("address span").attr("style", "position:absolute; margin-left:1em; left:" + leftLocation + "px;top:" + topLocation + "px");
            $("address span:first").animate({left:$("#cart").position().left, top: $("#cart").position().top}, 2000, function() {
                $("body").find("address span:first").attr("style", "position:absolute; margin-left:1em; left:" + leftLocation + "px;top:" + topLocation + "px");
                var cart = JSON.parse(sessionStorage.getItem("cart"));
                for (i = 0; i < cart.length; i++) {
                    if (item.name == cart[i].name) {
                        cart[i].qty = parseInt(item.qty) + parseInt(cart[i].qty);
                        sessionStorage.setItem("cart", JSON.stringify(cart));
                        cartFunction.load();
                        return;
                    }
                }
                cart.push(item);
                sessionStorage.setItem("cart", JSON.stringify(cart));

                cartFunction.load();
            });
        }
        // $("body").find("address span").append($("body").find("address span").text());
	});
    
    // clear the cart
    $("#empty").on("click", function() {
        sessionStorage.removeItem("cart");
        cartFunction.load();
	});
    
    // confirm the cart
    $("#confirm").on("click", function() {
        var cart = JSON.parse(sessionStorage.getItem("cart"));
        var orderedItem = JSON.parse(sessionStorage.getItem("orderedItem"));
        if (orderedItem.length > 0 && $("#studNum").val() != "" && $("#name").val() != "") {
                var deleteItem = [];
                for (i = 0; i < cart.length; i++) {
                    for(j = 0; j < orderedItem.length; j++) {
                        if (cart[i].name == orderedItem[j].name) {
                            deleteItem.push(i);
                        }
                    }
                }
                for (i = deleteItem.length - 1; i >= 0; i--) {
                    cart.splice(deleteItem[i], 1);
                }
                
                swal({title:"Your order has been submitted!<br />Order no: (N000122)", text:"<h6><div style='float:left;'>Our bank account details:</div><br /><ul><div style='float:left;margin-right:1em'>Bank of China: 012-353-2-3456786</div><br /><div style='float:left'>Standard Chartered Bank: 14335234654534</div><br /><div style='float:left;margin-right:1em'>HSBC: 234-346286-001</div></h6></ul>", timer:100000000, type:"success", html:true}, function() {
                sessionStorage.removeItem("orderedItem");
                sessionStorage.setItem("cart", JSON.stringify(cart));
                if (sessionStorage.getItem("method") == "amount") {
                    sessionStorage.setItem("amount", parseFloat(sessionStorage.getItem("amount")) - parseFloat(sessionStorage.getItem("total")));
                    if (sessionStorage.getItem("usePoint") != null) {
                        sessionStorage.setItem("bonusPoint", parseFloat(sessionStorage.getItem("bonusPoint")) - parseFloat(sessionStorage.getItem("usePoint")) + parseFloat(sessionStorage.getItem("hasPoint")));
                    } else {
                        sessionStorage.setItem("bonusPoint", parseFloat(sessionStorage.getItem("bonusPoint")) + parseFloat(sessionStorage.getItem("hasPoint"))); 
                    }
                }
                sessionStorage.removeItem("usePoint");
                sessionStorage.removeItem("hasPoint");
                window.location.href = "index.html";
            });
        } else if ($("#studNum").val() == "") {
            swal({title:"Please input your student number.", timer:1000000, type:"warning"});
        } else if ($("#name").val() == "") {
            swal({title:"Please input your name.", timer:1000000, type:"warning"});
        }
	});
    
    // register function
	$("#register").on("click", function() {
        if (!IsNumeric($("#studNum").val())) {
			swal("Please input a valid student number.\ne.g. 150xxxxxx", "", "warning");
		} else if ($("#username").val().length == 0) {
			swal("Please input your username.", "", "warning");
		} else if ($("#psd").val().length == 0) {
			swal("Please input your password.", "", "warning");
		} else if ($("#psd").val().length < 8) {
			swal("Password must be more than 8 digits (letter and number).\nPlease input again!", "","warning");
		} else if (IsNum($("#psd").val())) {
			swal("Password must consist of letters and numbers.\nPlease input again!", "", "warning");
		} else if ($("#psd").val() != $("#cpsd").val()) {
			swal("Please check your password whether they are the same.", "","warning");
		} else {
			swal("Register Successfully!", "", "success");
            sessionStorage.setItem("campus", $("#campus option:selected" ).text());
            sessionStorage.setItem("studNum", $("#studNum").val());
			sessionStorage.setItem("username", $("#username").val());
			sessionStorage.setItem("password", $("#psd").val());
            sessionStorage.setItem("amount", 0);
            sessionStorage.setItem("bonusPoint", 0);
            $("#campus").val("0");
			$("#studNum").val("");
			$("#username").val("");
			$("#psd").val("");
			$("#cpsd").val("");
		}
	});
    
    // login function
	$("#login").on("click", function() {
        if ($("#lusername").val().length == 0) {
			swal("Please input your username.", "","warning");
		} else if ($("#lpassword").val().length == 0) {
			swal("Please input your password.", "","warning");
		} else if ($("#lusername").val() == "thomas") {
            sessionStorage.setItem("campus", "Tsing Yi");
            sessionStorage.setItem("studNum", "150123456");
			sessionStorage.setItem("username", "thomas");
			sessionStorage.setItem("password", "thomas123");
            sessionStorage.setItem("amount", 10000);
            sessionStorage.setItem("bonusPoint", 10000);
            $("#lusername").val("");
			$("#lpassword").val("");
			swal({title:"Login Successfully!", timer:5000, type:"success"}, function() {
                window.location.href = "index.html";
            });
        }else if (sessionStorage.getItem("username") == ($("#lusername").val()) && sessionStorage.getItem("password") == ($("#lpassword").val())){
            $("#lusername").val("");
			$("#lpassword").val("");
			swal({title:"Login Successfully!", timer:5000, type:"success"}, function() {
                window.location.href = "index.html";
            });
		} else {
            swal("Login Failed\nPlease check again!", "", "warning");
        }
	});
});

// other function
function IsNumeric(num) {
	 return (num >= 150000000 && num <= 999999999);
}

function IsNum(num) {
	 return (num >= 0 || num <= 0);
}

function bubbleSort(arr, index, check) {
    for (pass = 0; pass < arr.length-1; pass++) {
        for (i = 0; i < arr.length-pass-1; i++) {
            if (check == 0) {
                if (parseFloat(arr[i]) > parseFloat(arr[i+1])) {
                    swap(arr, i, i+1);
                    swap(index, i, i+1);
                }
            } else {
                if (arr[i] > arr[i+1]) {
                    swap(arr, i, i+1);
                    swap(index, i, i+1);
                }
            }
        }
    }
}

function swap(arr, x, y) {
    var temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}