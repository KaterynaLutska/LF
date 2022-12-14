// /**
//  * Shopify Ajaxify Shop.
//  */

jQuery(document).ready(function() {
  var selectors = {
    TOTAL_ITEMS: '.count-items',
    TOTAL_ITEMS_PRICE: '.total-items-price',
    QUICK_CART_TABLE: '#modal-cart-table',
    QUICK_CART_FORM: '.modal-cart-form',
    QUICK_CART_MENU:'.nav-dialog-inner-cart',
    CART_MENU: '.main-cart-form'
  };

  Shopify.afterCartUpdate = function(cart) {
    // Total Items Update
    var message = cart.item_count;
    var totalPriceConverted = Shopify.formatMoney(cart.total_price, theme.moneyFormat);

    if(cart.item_count > 0){
      $(selectors.TOTAL_ITEMS).text(message).removeClass('hidden');
      $(".nav-cart-dialog-total-amount").html(totalPriceConverted);
      $(selectors.TOTAL_ITEMS_PRICE).html(totalPriceConverted).removeClass('hidden');
    }else{
      $(selectors.TOTAL_ITEMS).text('').addClass('hidden');
      $(selectors.TOTAL_ITEMS_PRICE).text('').addClass('hidden');
    }
  };

  Shopify.showModal = function() {
    $.magnificPopup.open({
      items: {
        src: '#nav-shopping-cart-dialog',
        type: 'inline'
      },
      mainClass: 'mfp-move-from-top',
      removalDelay: 500,
      callbacks: {
        beforeOpen: function() {
          container.addClass('blured');
          $('body').addClass('y-hid');
        },
        open: function() {
          container.addClass('blured')
        },
        beforeClose: function() {
          container.removeClass('blured');
        },
        close: function() {
        },
        afterClose: function() {
          $('body').removeClass('y-hid');
        }
      },
      midClick: true
    });
  };

  Shopify.updateQuickCart = function(cart){
    var formIsExist = $('.modal-cart-form').length;
   	var totalPriceConverted = Shopify.formatMoney(cart.total_price, theme.moneyFormat);

    if(cart.items.length && formIsExist){
      $(selectors.QUICK_CART_TABLE).load('/cart?'+(new Date()).getTime()+' #cart-page-table', function() {
        $(this).find("#cart-page-table").children(':first').unwrap();
      });
    }
    else if(cart.items.length && !formIsExist){

      
      	var cartNoteContent = '<textarea name="note" id="CartSpecialInstructionsModal" class="cart-notes" rows="6" placeholder="Order notes">'+cart.note+'</textarea>';
      

      var title = '<h2 class="nav-cart-dialog-title">My shopping cart</h2>',
      form = '<form action="/cart" method="post" novalidate class="modal-cart-form"></form>',
      //   checkOutRow = '<div class="nav-cart-dialog-total">'+
      //   '<span class="nav-cart-dialog-total-sign">Subtotal</span>'+
      // '<span class="nav-cart-dialog-total-amount money">'+totalPriceConverted+'</span>'+
      //   '</div>'+cartNoteContent+
      //   '<ul class="nav-cart-dialog-actions">'+
      //   '<li><a href="javascript:void(0);" class="btn_close btn btn-white btn-ghost btn-lg">Continue Shopping</a></li>'+
      //   '<li><button type="submit" name="checkout" value="Checkout" class="btn btn-primary btn-lg">Checkout</button></li>'+
      //   '</ul>'+
      //     '<div id="additional-checkout-block"></div>';
      checkOutRow = (
        '<div class="row">' +
          '<div class="col-md-4">' +
            '<p class="cart-total nav-cart-dialog-total"> <span class="nav-cart-dialog-total-sign sign">Subtotal</span>  <span class="nav-cart-dialog-total-amount money">'+ totalPriceConverted +'</span></p>' +
          '</div>' +
          '<div class="col-md-8">' +
            '<button type="submit" name="checkout" class="cart-checkout-btn checkout-btn btn btn-primary btn-lg">Checkout</button>' +
            '<div id="additional-checkout-block"></div>' +
          '</div>' +
        '</div>'
      );


      $(selectors.QUICK_CART_MENU).html("").append(title).append(form);
      $('.modal-cart-form').load('/cart?'+(new Date()).getTime()+' #cart-page-table', function() {
        $(this).find("#cart-page-table").attr("id", "modal-cart-table")
        $(this).append(checkOutRow);
        var modalForm = $(".nav-dialog-inner-cart");
        $additionCheckoutBlock = modalForm.find("#additional-checkout-block");
        $additionCheckoutBlock.load('/cart #addCheckoutBtn', function() {
          if (window.Shopify && Shopify.StorefrontExpressButtons) {
            Shopify.StorefrontExpressButtons.initialize();
          }
        });
      });
    }
    else{
      $(selectors.QUICK_CART_FORM).hide().load('/cart .empty-page-content', function() {
        $(this).children(':first').unwrap();
      }).fadeIn();
    }
  };

  Shopify.loadQuickCart = function(cart){
    Shopify.updateQuickCart(cart);
    Shopify.afterCartUpdate(cart);
    Shopify.showModal();
  };

  Shopify.updateCart = function(cart){
    if(cart.items.length){
      $(selectors.CART_MENU).load('/cart?'+(new Date()).getTime()+' .main-cart-form', function() {
        $(this).children(':first').unwrap();
      });
    }
    else{
      $(selectors.CART_MENU).hide().load('/cart .empty-page-content', function() {
        $(this).children(':first').unwrap();
      }).fadeIn();
    }
    Shopify.afterCartUpdate(cart);
  };

  Shopify.increaseQty = function(el){
    var inputEl = el.closest(".table-shopping-qty").find("input"),
        qty = inputEl.val();
    qty++;
    var quantity = qty,
        id = inputEl.data("id");

    

    Shopify.changeItem(id, quantity, function(cart){
      var updatedItem = cart.items.filter(function(item){ return item.variant_id == id });
      if(updatedItem.length && updatedItem[0].quantity == quantity){
        inputEl.val(quantity);
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
      }
      else{
        jQuery('.ajaxcart__item__' + id + '__errors').show().delay(3000).fadeOut();
      }
    });
  }


  Shopify.changeInputQty = function(el){
    var inputEl = el,
        $itemRow = inputEl.closest("tr"),
        qty = inputEl.val();

    var quantity = qty,
        id = inputEl.data("id");
 if(quantity == 0){
   Shopify.removeItem(id, function(cart){
        $itemRow.fadeOut( "slow", function() {
          Shopify.updateCart(cart);
          Shopify.updateQuickCart(cart);
        });
      });
 }else{
    

    Shopify.changeItem(id, quantity, function(cart){
      var updatedItem = cart.items.filter(function(item){ return item.variant_id == id });
      if(updatedItem.length && updatedItem[0].quantity == quantity){
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
      }
      else{
        jQuery('.ajaxcart__item__' + id + '__errors').show().delay(3000).fadeOut();
      }
    });
 }
  }

  Shopify.decreaseQty = function(el){
    var inputEl = el.closest(".table-shopping-qty").find("input"),
        $itemRow = el.closest("tr"),
        qty = inputEl.val();
    qty--;
    if (qty < 0)
      qty = 0;

    var quantity = qty,
        id = inputEl.data("id");

    

    if(quantity != 0){
      inputEl.val(qty);
      Shopify.changeItem(id, quantity, function(cart){
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
      });
    }
    else{
      Shopify.removeItem(id, function(cart){
        $itemRow.fadeOut( "slow", function() {
          Shopify.updateCart(cart);
          Shopify.updateQuickCart(cart);
        });
      });
    }
  }
  Shopify.removeItemFromCart = function(el){
    var id = el.data('id') || null,
        $itemRow = el.closest("tr");

    Shopify.removeItem(id, function(cart){
      $itemRow.fadeOut( "slow", function() {
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
      });
    });
  }
});

var  bindEventsInModalCart = function(){
  var modalSelectors = {
    CART_PLUS_BTN: ".table-shopping-qty-plus",
    CART_MINUS_BTN: ".table-shopping-qty-minus",
    CART_INPUT_FIELD: ".cart__qty-input",
    CART_MENU: '.main-cart-form',
    CART_PAGE_MENU: '.modal-cart-form',
    TOTAL_ITEMS: '.count-items',
    TOTAL_ITEMS_PRICE: '.total-items-price',
    CART_REMOVE_BTN: '.cart-remove-btn',
    QUICK_CART_MENU:'.nav-dialog-inner-cart'
  };
  var modalForm = $(".nav-dialog-inner-cart");
  $additionCheckoutBlock = modalForm.find("#additional-checkout-block");
  $additionCheckoutBlock.load('/cart #addCheckoutBtn', function() {
    if (window.Shopify && Shopify.StorefrontExpressButtons) {
      Shopify.StorefrontExpressButtons.initialize();
    }
  });
   
  $(modalSelectors.QUICK_CART_MENU).on("change",modalSelectors.CART_INPUT_FIELD, function () {
   Shopify.changeInputQty($(this));
  });
  
  $(modalSelectors.QUICK_CART_MENU).on("click",modalSelectors.CART_PLUS_BTN, function () {
    Shopify.increaseQty($(this));
  })
  $(modalSelectors.QUICK_CART_MENU).on("click", modalSelectors.CART_MINUS_BTN, function () {
    Shopify.decreaseQty($(this));
  });
  $(modalSelectors.QUICK_CART_MENU).on("click",modalSelectors.CART_REMOVE_BTN, function(e){
    e.preventDefault();
    Shopify.removeItemFromCart($(this));
  });
  $(modalSelectors.QUICK_CART_MENU).on("click",".btn_close", function(){
    debugger;
    var magnificPopup = $.magnificPopup.instance;
    if(typeof magnificPopup !== 'undefined'){
      magnificPopup.close();
    }
  });

  $(modalSelectors.QUICK_CART_MENU).on("focusout","textarea", function(){
    var note = $(this).val(),
     textareas = $(".cart-notes");

    Shopify.updateCartNote(note, function(){
      $(textareas).each(function () {
        $(this).val(note);
        $(this).text(note);
      });
    });
  });

};
var  bindEventsInCart = function(){
  var cartSelectors = {
    CART_PLUS_BTN: ".table-shopping-qty-plus",
    CART_MINUS_BTN: ".table-shopping-qty-minus",
    CART_INPUT_FIELD: ".cart__qty-input",
    CART_CONTENT: ".cart-content",
    CART_REMOVE_BTN: '.cart-remove-btn'
  };
   
  $(cartSelectors.CART_CONTENT).on("change",cartSelectors.CART_INPUT_FIELD, function () {
   Shopify.changeInputQty($(this));
  });
  
  $(cartSelectors.CART_CONTENT).on("click",cartSelectors.CART_PLUS_BTN, function () {
    Shopify.increaseQty($(this));
  })
  $(cartSelectors.CART_CONTENT).on("click", cartSelectors.CART_MINUS_BTN, function () {
    Shopify.decreaseQty($(this));
  });
  $(cartSelectors.CART_CONTENT).on("click",cartSelectors.CART_REMOVE_BTN, function(e){
    e.preventDefault();
    Shopify.removeItemFromCart($(this));
  });
  $(cartSelectors.CART_CONTENT).on("focusout","textarea", function(){
    var note = $(this).val(),
     textareas = $(".cart-notes");

    Shopify.updateCartNote(note, function(){
      $(textareas).each(function () {
        $(this).val(note);
        $(this).text(note);
      });
    });
  });
};