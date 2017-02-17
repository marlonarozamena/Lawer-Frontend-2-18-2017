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
   else if ($('#base-navbar').hasClass('navbar-menu-down')) {
       
       if ((width < 768)) {
           moveNavbarMenuToTop();
       }
       else {
        navbarBelowSearchPosition();
       }
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
        $("#nav-top-right-container").addClass("next-to-search-form");        
    }
    function moveNavbarMenuToTop() {
        nav_top_menu.append(main_menu);
        nav_bottom_menu.find("#main-menu").remove();
        $("#nav-top-right-container").removeClass("next-to-search-form");    
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
                function explode(){
                   if($("#base-navbar").is(":hover"))
                   {
                    nav_bottom_container.css("display","none");
                    nav_bottom_container.removeClass('hidden');
                    nav_bottom_container.slideDown( "600", function() { });    
                   }
                }
                setTimeout(explode, 200);
            }
        }
    }, function() {
        if ((width >= 768))
        {            
            nav_bottom_container.slideUp( "1500", function() {                
                nav_bottom_container.addClass("hidden");
           });             
        }        
    });
    function showSubmenu(submenu_element) {
        var menu_id = submenu_element.attr("data-menu-href");        
        var menu_element = $(menu_id);
        menu_element.addClass('active');
        submenu_element.removeClass('hidden');
    }
    function hiddeSubmenu(submenu_element) {
        var menu_id = submenu_element.attr("data-menu-href");
        var menu_element = $(menu_id);
        menu_element.removeClass('active');
        submenu_element.addClass('hidden');
    }
    $(".nav-menu-item").hover(function() {
        var submenu_id = $(this).find(">a").attr("data-submenu-href");
        $(this).addClass('active');
        var submenu_element = $(submenu_id);
        showSubmenu(submenu_element);
    }, function() {
        var submenu_id = $(this).find(">a").attr("data-submenu-href");
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
       $("#login-top").collapse("hide");  
    });
    $("#base-navbar .navbar-toggle-menu").on('click',function(){      
      $("#top-search-form").collapse("hide");   
      $("#login-top").collapse("hide");       
    });
    $("#base-navbar .navbar-toggle-user").on('click',function(){      
        $("#nav-top-right-container").collapse("hide");
        $("#top-search-form").collapse("hide");
    });
    $("#base-navbar .search-criteria").on("focus",function(){       
            nav_bottom_container.addClass("negative-index");      
    });   
     $("#base-navbar .search-criteria").on("blur",function(){       
            nav_bottom_container.removeClass("negative-index");       
     });     
    $("#base-navbar .search-criteria").hover(function() {
    
    }, function () {
        if (!$('#form-search .tt-menu').hasClass("tt-open"))
            nav_bottom_container.removeClass("negative-index");       
    });    
    $("#base-navbar .search-criteria").keyup(function () {
        if ($('#form-search .tt-menu').hasClass("tt-open"))
            nav_bottom_container.addClass("negative-index");
        else
            nav_bottom_container.removeClass("negative-index");
    });
    $("#base-navbar .search-criteria").on("focus", function () {
        if ($(this).val())
            nav_bottom_container.addClass("negative-index");
    });
    $("#base-navbar .search-criteria").on("blur", function () {
        nav_bottom_container.removeClass("negative-index");
    });
    $("#form-search .tt-menu").hover(function () {
        nav_bottom_container.addClass("negative-index");
    }, function () {
        nav_bottom_container.removeClass("negative-index");
    });
    $("#form-search .tt-menu").on("focus", function () {
        nav_bottom_container.addClass("negative-index");
    });
    $("#form-search .tt-menu").on("blur", function () {
         nav_bottom_container.removeClass("negative-index");
     });
     $('.mobile-nav-menu .panel-collapse').on('hide.bs.collapse', function () {
         var heading_element = $(this).attr("aria-labelledby");
         var span_element = $("#"+heading_element+" span.open-or-close-icon");
         span_element.removeClass("glyphicon-minus").addClass("glyphicon-plus");
    });
    $('.mobile-nav-menu .panel-collapse').on('show.bs.collapse', function () {
         var heading_element = $(this).attr("aria-labelledby");
         var span_element = $("#"+heading_element+" span.open-or-close-icon");
         span_element.removeClass("glyphicon-plus").addClass("glyphicon-minus");
    })
   
})