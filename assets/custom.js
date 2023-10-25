/**
 * DEVELOPER DOCUMENTATION
 *
 * Include your custom JavaScript here.
 *
 * The theme Focal has been developed to be easily extensible through the usage of a lot of different JavaScript
 * events, as well as the usage of custom elements (https://developers.google.com/web/fundamentals/web-components/customelements)
 * to easily extend the theme and re-use the theme infrastructure for your own code.
 *
 * The technical documentation is summarized here.
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A VARIANT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a the user has changed the variant in a selector. The target get you the form
 * that triggered this event.
 *
 * Example:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   let variant = event.detail.variant; // Gives you access to the whole variant details
 *   let form = event.target;
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * MANUALLY CHANGE A VARIANT
 * ------------------------------------------------------------------------------------------------------------
 *
 * You may want to manually change the variant, and let the theme automatically adjust all the selectors. To do
 * that, you can get the DOM element of type "<product-variants>", and call the selectVariant method on it with
 * the variant ID.
 *
 * Example:
 *
 * const productVariantElement = document.querySelector('product-variants');
 * productVariantElement.selectVariant(12345);
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A NEW VARIANT IS ADDED TO THE CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a variant is added to the cart through a form selector (product page, quick
 * view...). This event DOES NOT include any change done through the cart on an existing variant. For that,
 * please refer to the "cart:updated" event.
 *
 * Example:
 *
 * document.addEventListener('variant:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN THE CART CONTENT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever the cart content has changed (if the quantity of a variant has changed, if a variant
 * has been removed, if the note has changed...). This event will also be emitted when a new variant has been
 * added (so you will receive both "variant:added" and "cart:updated"). Contrary to the variant:added event,
 * this event will give you the complete details of the cart.
 *
 * Example:
 *
 * document.addEventListener('cart:updated', function(event) {
 *   var cart = event.detail.cart; // Get the updated content of the cart
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * REFRESH THE CART/MINI-CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * If you are adding variants to the cart and would like to instruct the theme to re-render the cart, you cart
 * send the cart:refresh event, as shown below:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 *
 * ------------------------------------------------------------------------------------------------------------
 * USAGE OF CUSTOM ELEMENTS
 * ------------------------------------------------------------------------------------------------------------
 *
 * Our theme makes extensive use of HTML custom elements. Custom elements are an awesome way to extend HTML
 * by creating new elements that carry their own JavaScript for adding new behavior. The theme uses a large
 * number of custom elements, but the two most useful are drawer and popover. Each of those components add
 * a "open" attribute that you can toggle on and off. For instance, let's say you would like to open the cart
 * drawer, whose id is "mini-cart", you simply need to retrieve it and set its "open" attribute to true (or
 * false to close it):
 *
 * document.getElementById('mini-cart').open = true;
 *
 * Thanks to the power of custom elements, the theme will take care automagically of trapping focus, maintaining
 * proper accessibility attributes...
 *
 * If you would like to create your own drawer, you can re-use the <drawer-content> content. Here is a simple
 * example:
 *
 * // Make sure you add "aria-controls", "aria-expanded" and "is" HTML attributes to your button:
 * <button type="button" is="toggle-button" aria-controls="id-of-drawer" aria-expanded="false">Open drawer</button>
 *
 * <drawer-content id="id-of-drawer">
 *   Your content
 * </drawer-content>
 *
 * The nice thing with custom elements is that you do not actually need to instantiate JavaScript yourself: this
 * is done automatically as soon as the element is inserted to the DOM.
 *
 * ------------------------------------------------------------------------------------------------------------
 * THEME DEPENDENCIES
 * ------------------------------------------------------------------------------------------------------------
 *
 * While the theme tries to keep outside dependencies as small as possible, the theme still uses third-party code
 * to power some of its features. Here is the list of all dependencies:
 *
 * "vendor.js":
 *
 * The vendor.js contains required dependencies. This file is loaded in parallel of the theme file.
 *
 * - custom-elements polyfill (used for built-in elements on Safari - v1.0.0): https://github.com/ungap/custom-elements
 * - web-animations-polyfill (used for polyfilling WebAnimations on Safari 12, this polyfill will be removed in 1 year - v2.3.2): https://github.com/web-animations/web-animations-js
 * - instant-page (v5.1.0): https://github.com/instantpage/instant.page
 * - tocca (v2.0.9); https://github.com/GianlucaGuarini/Tocca.js/
 * - seamless-scroll-polyfill (v2.0.0): https://github.com/magic-akari/seamless-scroll-polyfill
 *
 * "flickity.js": v2.2.0 (with the "fade" package). Flickity is only loaded on demand if there is a product image
 * carousel on the page. Otherwise it is not loaded.
 *
 * "photoswipe": v4.1.3. PhotoSwipe is only loaded on demand to power the zoom feature on product page. If the zoom
 * feature is disabled, then this script is never loaded.
 */

 // scroll to

const smoothScroll = () => {
	const targets = document.querySelectorAll('a[href^="#"]');
	if(targets.length === 0) {
		return;
	}
	targets.forEach((target) => {
		target.addEventListener('click', (event) => {
			event.preventDefault();

			const href = target.getAttribute('href');
			const scrollStopTarget = document.querySelector(href == '#' || href == '' ? 'html' : href);

			scrollStopTarget.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});
}
smoothScroll();

// hide shopify chat when innerHeight + pageYOffset >= offsetHeight
window.onscroll = function() {
    if (window.innerHeight + window.pageYOffset + 100 >= document.body.offsetHeight) {
        if (document.getElementById('ShopifyChat')) {
            document.getElementById('ShopifyChat').style.display = 'none'    
        }
        if (document.getElementById('dummy-chat-button-iframe')) {
            document.getElementById('dummy-chat-button-iframe').style.display = 'none'
        }  
    } else {
        if (document.getElementById('ShopifyChat')) {
            document.getElementById('ShopifyChat').style.display = 'block'    
        }
        if (document.getElementById('dummy-chat-button-iframe')) {
            document.getElementById('dummy-chat-button-iframe').style.display = 'block'
        }
    }
}


// Block newsletter input field until user enable checkbox
let newsletterBloker = document.querySelector('.custom_subscribe_bloker')
let checkboxWr = document.querySelector('.checkbox_wr')
let checkboxAgree = document.getElementById('i_agree_newsletter')


newsletterBloker.addEventListener('click', () => {
        checkboxWr.classList.add('remind')
        console.log('remind added: ' + checkboxWr.classList);
        setTimeout(() => {
            checkboxWr.classList.remove('remind')
        }, 3000);
    }
)
checkboxAgree.addEventListener('click', () => {
    if (checkboxAgree.checked) {
        newsletterBloker.style.display = 'none'
    } else {
        newsletterBloker.style.display = 'flex'
    } 
})

// See it on pop-up toggle

// let seeItToggle = document.querySelectorAll('.see_it_on_toggle')
// let seeIt = document.querySelector('.see_it_on')

// seeItToggle.forEach(see => {
//     see.addEventListener('click', ()=> {
//         console.log(seeIt.classList.contains('display_none'));
//         console.log(seeIt);
        
//         if (seeIt.classList.contains('display_none')) {
//             seeIt.classList.remove('display_none')
//         } else {
//             seeIt.classList.add('display_none')
//         }
//     })
// })

// announcement bar close ability

document.querySelector('.close_ability').addEventListener('click', ()=> {
    document.querySelector('.announcement-bar').style.display = 'none'
})

// Blog posts slider

const blogSwiper = new Swiper('.article-list_swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    useTransform: true,
    loop: true,
    navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
    },
    pagination: {
    el: '.swiper-pagination-blog',
    type: 'bullets',
    },
    breakpoints: {
        480: {
            slidesPerView: 2
        },
        600: {
            slidesPerView: 3,
            useTransform: false
        }
    }
});

// Collections cards slider

const cardsSwiper = new Swiper('.collections_cards', {
    slidesPerView: 1,
    spaceBetween: 20,
    useTransform: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
    },
    pagination: {
        el: '.swiper-pagination-cards',
        type: 'bullets',
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            shortSwipes: true,
            longSwipesMs: 300
        },
        768: {
            slidesPerView: 3,
        },
        1000: {
            slidesPerView: 4,
            useTransform: false,
            shortSwipes: false,
            longSwipesMs: 100
        }
    }
});

// You may also like
window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {    
        const featureCollections = new Swiper('.swiper.featured-collections-swiper_init', {
            slidesPerView: 1,
            spaceBetween: 20,
            useTransform: true,
            loop: true,
            navigation: {
                nextEl: '.swiper-btn-next_ymal',
                prevEl: '.swiper-btn-prev_ymal',
            },
            pagination: {
                el: '.swiper-pagination-collections_ymal',
                type: 'bullets',
            },
            breakpoints: {
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3
                },
                800: {
                    slidesPerView: 4,
                    useTransform: false
                }
            }
        })
    }, 1000);
});

// Petterns filtration

