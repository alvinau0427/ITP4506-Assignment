document.write('<section class="navbar main-menu">\<div class="navbar-inner main-menu">\<a href="index.html" class="logo pull-left"><img src="themes/images/logo.png" class="site_logo" alt=""></a>');

if (sessionStorage.getItem("username") != null) {
    document.write('<b><span>　　　　　　　　　　　　　　　　　　Welcome, <strong style="color:red">' + sessionStorage.getItem("username").toUpperCase() + '</strong>　 ( Amount: HK$ ' + sessionStorage.getItem("amount") + ', Bonus Point: ' + sessionStorage.getItem("bonusPoint") + ' )</span></b>');
}

document.write('<nav id="menu" class="pull-right">\<ul>\<li><a href="./products_kindle.html">Kindle</a></li>\<li><a href="./products_accessories.html">Accessories</a></li>\<li><a href="./products_gift.html">Gift</a></li>\</ul>\</nav>');

if (sessionStorage.getItem("username") != null) {        
	document.write('<br />　　　　　　　　　　　　　　　　　　<b>Student Number: ' + sessionStorage.getItem("studNum") + ' @ Campus: ' + sessionStorage.getItem("campus") + '</b>');
}

document.write('</div>\</section>');