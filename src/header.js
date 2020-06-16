document.write('<div id="top-bar" class="container">\<div class="row">\<div class="span7">\<div class="account pull-right">\<ul class="user-menu">\<li><a href="cart.html">Your Cart</a></li><li><a href="contact.html">Contact Us</a></li>');

if (sessionStorage.getItem("username") == null) {
    document.write('<li><a href="register.html">Login</a></li>');
} else {
    document.write('<li><a href="" id="logout">Logout</a></li>');
}

document.write('</ul>\</div>\</div>\</div>\</div>');