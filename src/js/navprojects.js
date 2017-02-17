$(document).ready(function() {
    var width = $(document).width();
    var main_menu = $("#main-menu");
    var top_search_form = $("#top-search-form");
    var nav_bottom_container = $("#base-navbar .nav-bottom-container");
    var login_container = $("#base-navbar .login-top-container");
    var nav_top_menu = $("#nav-top-menu");
    var nav_bottom_menu = $("#nav-bottom-menu");
    var search_position = 441;

  
   if($('#base-navbar').hasClass('navbar-menu-top')){
        if (document.body.scrollTop >= search_position || document.documentElement.scrollTop >= search_position) {
                navbarBelowSearchPosition();
            }
            else {
                navbarTopPosition();
            }
    }
    else if($('#base-navbar').hasClass('navbar-menu-down')){   
        
                navbarBelowSearchPosition();
    }
    window.onscroll = function() { navbarScroll() };
    function navbarScroll() {
        
        if ((width >= 768) && $('#base-navbar').hasClass('navbar-menu-top'))
            if (document.body.scrollTop >= search_position || document.documentElement.scrollTop >= search_position) {
                navbarBelowSearchPosition();
            }
            else {
                navbarTopPosition();
            }
    }
    function moveNavbarMenuToBottom() {
        nav_bottom_menu.append(main_menu);
        nav_top_menu.find("#main-menu").remove();
    }
    function moveNavbarMenuToTop() {
        nav_top_menu.append(main_menu);
        nav_bottom_menu.find("#main-menu").remove();
    }
    function navbarTopPosition() {

        var isHovered = nav_bottom_container.is(":hover");
        top_search_form.addClass("hidden-in-big");
        //login_container.removeClass("hidden");
        nav_top_menu.removeClass("hidden");
        if (!isHovered)
            nav_bottom_container.addClass("hidden");
        moveNavbarMenuToTop();
    }
    function navbarBelowSearchPosition() {
        top_search_form.removeClass("hidden-in-big");
        //login_container.addClass("hidden");
        nav_top_menu.addClass("hidden");        
        moveNavbarMenuToBottom();
    }
    $("#base-navbar").hover(function() {
        if ((width >= 768))
        {
            if (nav_bottom_menu.find('#main-menu').length) {            
                nav_bottom_container.removeClass('hidden');
            }
        }            
    }, function() {
        if ((width >= 768))
        {            
             nav_bottom_container.addClass('hidden');
        }
        
    });
    function showSubmenu(submenu_element) {
        var menu_id = submenu_element.attr("menu-href");        
        var menu_element = $(menu_id);
        menu_element.addClass('active');
        submenu_element.removeClass('hidden');
    }
    function hiddeSubmenu(submenu_element) {
        var menu_id = submenu_element.attr("menu-href");
        var menu_element = $(menu_id);
        menu_element.removeClass('active');
        submenu_element.addClass('hidden');
    }
    $(".nav-menu-item").hover(function() {
        var submenu_id = $(this).find(">a").attr("submenu-href");
        $(this).addClass('active');
        var submenu_element = $(submenu_id);
        showSubmenu(submenu_element);
    }, function() {
        var submenu_id = $(this).find(">a").attr("submenu-href");
        var submenu_element = $(submenu_id);       
        $(this).removeClass('active');      
        hiddeSubmenu(submenu_element);
    });
    $('.nav-submenu-container').hover(function() {
        showSubmenu($(this));
    }, function() {
        hiddeSubmenu($(this));
    });
    $("#base-navbar .navbar-toggle-search").on('click',function(){      
       $("#nav-top-right-container").collapse("hide");
    });
    $("#base-navbar .navbar-toggle-menu").on('click',function(){      
      $("#top-search-form").collapse("hide");       
    });
    
    $("#search-criteria").on("focus",function(){       
            nav_bottom_container.addClass("negative-index");      
    });
     $("#search-criteria").on("blur",function(){       
            nav_bottom_container.removeClass("negative-index");       
    });
    $("#search-criteria").hover(function() {
    
    }, function() {
       nav_bottom_container.removeClass("negative-index");       
    });
    $("#base-navbar #search-criteria").keyup(function () {
        if ($('#form-search .tt-menu').hasClass("tt-open"))
            nav_bottom_container.addClass("negative-index");
        else
            nav_bottom_container.removeClass("negative-index");
    });
    $("#base-navbar #search-criteria").on("focus", function () {
        if ($(this).val())
            nav_bottom_container.addClass("negative-index");
    });
    $("#base-navbar #search-criteria").on("blur", function () {
        nav_bottom_container.removeClass("negative-index");
    });  
   
})