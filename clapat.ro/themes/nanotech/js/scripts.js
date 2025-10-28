jQuery(function ($) {

	$(document).ready(function() {
		
		"use strict";
		
		PageLoad();		
		ScrollEffects();		
		Sliders();	 
		FirstLoad(); 
		PageLoadActions();
		ShowcasePortfolio();
		ShowcaseCarousel();
		ShowcaseGallery();
		ShowcaseLists();
		FitThumbScreenWEBGL();
		Shortcodes();		
		Core();
		MouseCursor();
		JustifiedGrid();
		Lightbox();
		ContactForm();	
		PlayVideo();
		ContactMap();
		CustomFunction();
		ShuffleElementsFunction();
		InitShuffleElements();
	});
	
	
/*--------------------------------------------------
Function CustomFunction
---------------------------------------------------*/

	function CustomFunction() {
		
		//Add here your custom js code
		
	}// End CustomFunction
	
	
/*--------------------------------------------------
Function Shuffle Elements Function
---------------------------------------------------*/			
	
	function ShuffleElementsFunction() {
		
		function shuffle(o) {
			for (var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}
	
		function shuffleText(element, originalText, settings) {
			var elementTextArray = Array.from(originalText);
			var shuffleTimeouts = [];
	
			var repeatShuffle = function(times, index) {
				if (index === times) {
					element.innerText = originalText;
					return;
				}
	
				var timeout = setTimeout(function() {
					var randomTextArray = shuffle(elementTextArray.slice());
					element.innerText = randomTextArray.join('');
					index++;
					repeatShuffle(times, index);
				}, settings.velocity);
				shuffleTimeouts.push(timeout);
			}
	
			return {
				start: function() {
					shuffleTimeouts.forEach(function(timeout) {
						clearTimeout(timeout);
					});
					shuffleTimeouts = [];
	
					repeatShuffle(settings.shuffleIterations, 1);
				},
				stop: function() {
					shuffleTimeouts.forEach(function(timeout) {
						clearTimeout(timeout);
					});
					shuffleTimeouts = [];
					element.innerText = originalText;
				}
			};
		}
	
		function startShuffle(selector, options) {
			$(selector).each(function() {
				var shuffleElement = this;
				var originalText = shuffleElement.getAttribute('data-text') || shuffleElement.innerText;
				shuffleElement.setAttribute('data-text', originalText);
				var shuffleActions = shuffleText(shuffleElement, originalText, options);
				shuffleActions.start();
			});
		}
	
		function stopShuffle(selector, options) {
			$(selector).each(function() {
				var shuffleElement = this;
				var originalText = shuffleElement.getAttribute('data-text');
				var shuffleActions = shuffleText(shuffleElement, originalText, options);
				shuffleActions.stop();
			});
		}
	
		function applyShuffleEffect(selector, options) {
			var defaults = {
				velocity: 40,
				shuffleIterations: 6,
				childSelector: 'span'
			};
	
			var settings = Object.assign({}, defaults, options);
	
			$(selector).each(function() {
				var parentHover = $(this);
				var shuffleElements = parentHover.find(settings.childSelector).toArray();
	
				shuffleElements.forEach(function(shuffleElement) {
					shuffleElement.setAttribute('data-text', shuffleElement.innerText);
					var originalText = shuffleElement.getAttribute('data-text');
	
					var shuffleActions = shuffleText(shuffleElement, originalText, settings);
	
					parentHover.on('mouseenter', function() {
						shuffleActions.start();
					});
	
					parentHover.on('mouseleave', function() {
						shuffleActions.stop();
					});
				});
			});
		}
		
		return {
			startShuffle: startShuffle,
			stopShuffle: stopShuffle,
			applyShuffleEffect: applyShuffleEffect
		};
		
	}
	
	
	function shuffleSubtitle(customDelay = 1) {
		if (!document.body.classList.contains('load-next-page')) {			
			var onloadShuffle = gsap.utils.toArray('.onload-shuffle');
			onloadShuffle.forEach(function(shuffleTitleLoad, index) {
				var spans = shuffleTitleLoad.querySelectorAll('span');			
				gsap.set(spans, { opacity: 0 });			
				gsap.to(spans, {
					opacity: 1,
					duration: 0.4,
					stagger: 0.1,
					delay: customDelay,
					onStart: function() {
						if (!shuffleTitleLoad.classList.contains('animated')) {
							spans.forEach(function(span, spanIndex) {
								var spanDelay = spanIndex * 0.1;
								setTimeout(function() {
									shuffleFunctions.startShuffle(span, {
										velocity: 60,
										shuffleIterations: 8,
										childSelector: 'span'
									});
									gsap.to(span, { opacity: 1, duration: 0.4 });
								}, spanDelay * 1000);
							});
							shuffleTitleLoad.classList.add('animated');
						}
					}
				});
			});
		
		} else {
			gsap.set('.onload-shuffle span', { opacity: 1 });
		}
	}
	

	function InitShuffleElements() {
		
		shuffleFunctions.applyShuffleEffect(".classic-menu .before-span", {
			velocity: 50,
			shuffleIterations: 5,
			childSelector: 'span'
		});
		
		shuffleFunctions.applyShuffleEffect(".fullscreen-menu .menu-timeline", {
			velocity: 50,
			shuffleIterations: 5,
			childSelector: 'span'
		});
		
		shuffleFunctions.applyShuffleEffect(".projects-list-captions li", {
			velocity: 50,
			shuffleIterations: 5,
			childSelector: 'span'
		});
		
		shuffleFunctions.applyShuffleEffect(".showcase-portfolio .clapat-item .slide-inner", {
			velocity: 30,
			shuffleIterations: 8,
			childSelector: '.slide-title span, .slide-cat span'
		});
		
		shuffleFunctions.applyShuffleEffect(".clapat-slide .slide-inner-height", {
			velocity: 30,
			shuffleIterations: 8,
			childSelector: '.slide-title span, .slide-cat span'
		});
		
		shuffleFunctions.applyShuffleEffect("#page-nav .next-hero-title", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span' 
		});
		
		shuffleFunctions.applyShuffleEffect(".filters-text", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span' 
		});
		
		shuffleFunctions.applyShuffleEffect(".team-member-inner", {
			velocity: 60,
			shuffleIterations: 6,
			childSelector: 'span' 
		});
		
		
		var hasShuffle = gsap.utils.toArray('.has-shuffle');
		hasShuffle.forEach(function(shuffleTitle, index) {
			
			var words = shuffleTitle.innerText.split(' '); 
			shuffleTitle.innerHTML = '';        
			
			words.forEach(function(word, wordIndex) {
				var span = document.createElement('span');
				span.classList.add('shuffle-word');
				span.setAttribute('data-text', word);
				span.innerText = word;
				shuffleTitle.appendChild(span);
				
				gsap.set(span, { opacity: 0 });
		
				if (wordIndex < words.length - 1) {
					shuffleTitle.appendChild(document.createTextNode(' '));
				}               
				
			});
			
			var delayValue = parseInt(shuffleTitle.getAttribute("data-delay")) || 0;
			gsap.to(shuffleTitle, {
				scrollTrigger: {
					trigger: shuffleTitle,
					start: "top 85%",
					onEnter: function() {
						if (!shuffleTitle.classList.contains('animated')) {
							var spans = shuffleTitle.querySelectorAll('span');
							spans.forEach(function(span, spanIndex) {
								var spanDelay = spanIndex * 0.1; 
								setTimeout(function() {
									shuffleFunctions.startShuffle(span, {
										velocity: 60,
										shuffleIterations: 8,
										childSelector: 'span'
									});
									gsap.to(span, { opacity: 1, duration: 0.4 });
								}, spanDelay * 1000); 
							});
							shuffleTitle.classList.add('animated');
						}
					}
				},
				delay: delayValue / 1000
			});
			
		});
		
		
		var projectTitleShuffle = gsap.utils.toArray('#project-nav .has-shuffle-title');
		projectTitleShuffle.forEach(function(shuffleNextTitle, index) {
			
			var spans = shuffleNextTitle.querySelectorAll('span');
		
			spans.forEach(function(span) {
				
				if (!span.classList.contains('shuffle-word')) {
					span.classList.add('shuffle-word');
					span.setAttribute('data-text', span.innerText.trim()); 
				}
			});
		
			var delayValue = parseInt(shuffleNextTitle.getAttribute("data-delay")) || 0;
			gsap.to(shuffleNextTitle, {
				scrollTrigger: {
					trigger: shuffleNextTitle,
					start: "top 30%",
					scrub: true,
					onEnter: function() {
						spans.forEach(function(span, spanIndex) {
							var spanDelay = spanIndex * 0;
							setTimeout(function() {
								shuffleFunctions.startShuffle(span, {
									velocity: 60,
									shuffleIterations: 10,
									childSelector: 'span'
								});								
							}, spanDelay * 1000); 
						});
					}
				},
				delay: delayValue / 1000
			});
		});
		
		
		var hasShuffleOnScroll = gsap.utils.toArray('.has-shuffle-onscroll');
		hasShuffleOnScroll.forEach(function(shuffleTitle, index) {
			
			var words = shuffleTitle.innerText.split(' '); 
			shuffleTitle.innerHTML = '';        
		
			words.forEach(function(word, wordIndex) {
				var span = document.createElement('span');
				span.classList.add('shuffle-word');
				span.setAttribute('data-text', word);
				span.innerText = word;
				shuffleTitle.appendChild(span);
				
				gsap.set(span, { opacity: 0 });
		
				if (wordIndex < words.length - 1) {
					shuffleTitle.appendChild(document.createTextNode(' '));
				}               
			});
			
			var spans = shuffleTitle.querySelectorAll('span');
			var totalDuration = 2; 
			var individualDelay = 0.075; 
			var opacityDuration = 0.1; 
			
			gsap.to(shuffleTitle, {
				scrollTrigger: {
					trigger: shuffleTitle,
					start: "top 90%", 		
					scrub: true, 
					onUpdate: function(self) {
						var progress = self.progress;
						
						spans.forEach(function(span, spanIndex) {
							var spanStart = spanIndex * individualDelay; 
							var spanEnd = spanStart + opacityDuration; 							
							
							var opacity = gsap.utils.clamp(0, 1, gsap.utils.mapRange(spanStart, spanEnd, 0, 1, progress));							
							
							gsap.set(span, { opacity: opacity });							
							
							if (progress >= spanStart && progress <= spanEnd && !span.classList.contains('shuffled')) {
								shuffleFunctions.startShuffle(span, {
									velocity: 40,
									shuffleIterations: 4,
									duration: opacityDuration , 
									childSelector: 'span'
								});								
							}
						});
					},
				},
				duration: totalDuration
			});
		});



	
	}
	
	var shuffleFunctions = ShuffleElementsFunction();
	
	
/*--------------------------------------------------
	Function Cleanup Before Ajax
---------------------------------------------------*/	
	
	function CleanupBeforeAjax(){		
		// reset all scroll triggers
		let triggers = ScrollTrigger.getAll();
		triggers.forEach( trigger => {			
		  	trigger.kill();
		});
		
		ClapatSlider.instances.forEach(slider => slider.off());
		ClapatSlider.instances = [];
	}
				

/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {		
		
		gsap.set($(".menu-timeline .before-span"), {y:"100%", opacity:0});
		gsap.set($(".clapat-header"), {yPercent:-50, opacity:0});
		
		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {	
			var $this = $(this);			
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$("#ball").addClass("with-blur");
			$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );				
		});
							
		$(".preloader-wrap").on('mouseleave', function() {					
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-blur");
			$('#ball p').remove();			
		});		
		
		$('body').removeClass('hidden').removeClass('hidden-ball');	
		
		
		function initOnFirstLoad() {
			
			
			imagesLoaded('body', function() {
				
				//Animate Preloader
				
				gsap.to($(".percentage-wrapper"), {duration: 0.7, delay:0.3, ease:Power4.easeOut});
				gsap.to($(".percentage"), {duration: 0.7, opacity:0, xPercent: 101,  delay:0.3, ease:Power4.easeOut});
				gsap.to($(".percentage-intro"), {duration: 0.5, opacity:0, delay:0, ease:Power4.easeInOut});
				gsap.to($(".preloader-intro span"), {duration: 0.7, opacity:0, xPercent: -101, delay:0.3, ease:Power4.easeOut});
				gsap.to($(".preloader-wrap .spinning-plus"), {duration: 0.7, opacity:0, delay:0.3, ease:Power4.easeOut});
				gsap.to($(".trackbar"), {duration: 0.7, clipPath: 'inset(0% 0%)', delay:0.3, ease:Power3.easeOut});										
				gsap.to($(".preloader-wrap"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
				gsap.set($(".preloader-wrap"), {visibility:'hidden', delay:0.3, yPercent: -101});
				
				
				gsap.set($(".hero-title.caption-timeline span"), {yPercent:100, opacity:0});
				
				gsap.to($(".hero-title.caption-timeline span"), {duration: 0.5, yPercent:0, opacity:1, stagger:0.05, delay:0.6, ease:Power3.easeOut, onComplete: function() {												
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, ease:Power2.easeOut});					
					gsap.set($(".page-nav-caption .caption-timeline span"), { yPercent:0, opacity:1});
				}});
				
				shuffleSubtitle();
				
				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = gsap.getProperty("#hero.has-image", "height");
					
				}
				
				if( $('.hero-video-wrapper').length > 0 ){
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					}); 
				}
				
				gsap.set($("#hero-bg-image"), {scale:1.1 , opacity:0});
				gsap.to($("#hero-bg-image"), {duration: 1, force3D:true, scale:1 , opacity:1, delay:0.8, ease:Power2.easeOut});
				
				gsap.utils.toArray('.hero-pixels-cover').forEach((pixelWrapper, index) => {
				const pixelAnimation = pixelWrapper.querySelectorAll(".pixel");
			
				gsap.to(pixelAnimation, {
					duration: 0.2,
					opacity: 0,
					delay: function() {						
						return gsap.utils.random(1, 1.5);
					},
					ease: Power4.easeOut,
					onComplete: function() {
						pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
							pixels.remove();
						});
					}
				});
			});	
				
				
				gsap.to($(".clapat-header"), { duration: 0.45, opacity:1, yPercent:0, delay:0.25, ease: Power2.easeOut, });
				
				gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.45, y:0, opacity:1, delay:0.25, ease:Power2.easeOut, onComplete: function() {
					$("#hero-footer.has-border").addClass("visible");																			
				}});
				
				gsap.set($("#main-page-content"), {opacity:0});
				
																										
				gsap.to($("#main-page-content, #page-nav"), {duration: 0.7, y: 0, opacity:1, delay:0.5, ease:Power3.easeOut, onComplete: function() {
					gsap.set($("#main-page-content"), { clearProps: "y" });
					gsap.set($(".page-nav-caption .caption-timeline span"), { yPercent:0, opacity:1});
				}});
				
			});
				
		}
		
		
		if (!$('body').hasClass("disable-ajaxload")) {
			
			
			var hasShuffle = gsap.utils.toArray('.word');
			var spanAnimationDuration = 0.15; 
			var spanDelay = 0.15; 
			var divOpacityOutDuration = 0.15; 
			var divDelay = 1.5;
			
			function animateDiv(div, delay) {
				var words = div.innerText.split(' ');
				div.innerHTML = '';
			
				words.forEach(function(word, wordIndex) {
					var span = document.createElement('span');
					span.classList.add('shuffle-word');
					span.setAttribute('data-text', word);
					span.innerText = word;
					div.appendChild(span);
			
					gsap.set(span, { opacity: 0 });
			
					if (wordIndex < words.length - 1) {
						div.appendChild(document.createTextNode(' '));
					}
				});
			
				gsap.to(div, {
					opacity: 1,
					duration: spanAnimationDuration,
					stagger: spanDelay,
					delay: 0,
					onStart: function() {
						if (!div.classList.contains('animated')) {
							var spans = div.querySelectorAll('span');
							spans.forEach(function(span, spanIndex) {
								var spanDelayTime = spanIndex * spanDelay;
								setTimeout(function() {
									shuffleFunctions.startShuffle(span, {
										velocity: 50,
										shuffleIterations: 8,
										childSelector: 'span'
									});
									gsap.to(span, { opacity: 1, duration: spanAnimationDuration });
								}, spanDelayTime * 1000);
							});
							div.classList.add('animated');
						}
					},
					onComplete: function() {
						gsap.to(div, {
							opacity: 0,
							duration: divOpacityOutDuration,
							delay: divDelay,
							onComplete: function() {
								var nextIndex = hasShuffle.indexOf(div) + 1;
								if (nextIndex < hasShuffle.length) {
									animateDiv(hasShuffle[nextIndex], 0);
								} else {
									console.log('Total animation time:', totalAnimationTime);
								}
							}
						});
					}
				});
			}
			
			var totalAnimationTime = 0;
			hasShuffle.forEach(function(div) {
				var words = div.innerText.split(' ').length;
				var divAnimationTime =  words * (spanAnimationDuration + spanDelay + divOpacityOutDuration );
				totalAnimationTime += divAnimationTime;
			});
			
			console.log('Total animation time:', totalAnimationTime);
			
			animateDiv(hasShuffle[0], 0);

			
			
			var width = 100,
				perfData = window.performance.timing, 
				EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
				calculatedTime = (((EstimatedTime / 100) % 500) * 10);
				let time = (totalAnimationTime) * 1000;
				window.preloaderTimeout = time;
				
			// Loadbar Animation
			$(".loadbar").animate({	width: width + "%"}, time  );
			
			gsap.to(".preloader-wrap .spinning-plus", {rotation: 1800, duration: time / 1000, ease:Power2.easeOut });	
			
			// Percentage Increment Animation
			var PercentageID = $("#precent"),
					start = 000,
					end = 100,
					durataion = time + 0;
					animateValue(PercentageID, start, end, durataion);
					
			function animateValue(id, start, end, duration) {
			  
				var range = end - start,
				  current = start,
				  increment = end > start? 1 : -1,
				  stepTime = Math.abs(Math.floor(duration / range)),
				  obj = $(id);
				
				var timer = setInterval(function() {
					current += increment;
					$(obj).text(current);
				  //obj.innerHTML = current;
					if (current == end) {
						clearInterval(timer);
					}
				}, stepTime);
			}
			
			// Fading Out Loadbar on Finised
			setTimeout(function(){				
				initOnFirstLoad();						  
			}, time);
		
		} else {			
			initOnFirstLoad();
		}
		
		
	}// End Page Load

	
	
/*--------------------------------------------------
Page Load Actions
---------------------------------------------------*/	
	
	function PageLoadActions() {
		
		
		// Default Page Navigation Load Events
		
		if (!isMobile()) {
			
			$("#page-nav .next-ajax-link-page").on('mouseenter', function() {
				var modifyMouseColor = $('#clapat-page-content').attr("data-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', {color:modifyMouseColor });
				}
				var $this = $(this);			
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"#ffba00"});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#ball").addClass("with-blur");
				$( "#ball" ).append( '<p class="center-first" style="color:#000">' + $this.data("centerline") + '</p>' );				
			});
								
			$("#page-nav .next-ajax-link-page").on('mouseleave', function() {				
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();			
			});			
					
		}		
		
		if (!$("body").hasClass("disable-ajaxload")) {
			
			$('#page-nav .next-ajax-link-page').on('click', function() {	
				$("body").addClass("show-loader");
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon with-blur color-cursor");
				$('#ball p').remove();
				$('#ball i').remove();				
				
				gsap.to($("#main-page-content, #hero, .clapat-footer, .clapat-footer-nav"), {duration: 0.3, opacity:0, ease:Power4.easeOut});
				
				if ($("#page-nav").hasClass("move-nav-onload")) {
					$("body").addClass("load-next-page");
					if ($("body").hasClass("smooth-scroll")) {
						var moveNav = $("#content-scroll").height() - ( $("#hero").height() / 2 )  - ( $("#page-nav").height()  ) / 2 - $(".clapat-footer").height() / 2	
					} else {
						var moveNav = window.innerHeight - ( $("#hero").height() / 2 )  - ( $("#page-nav").height()  ) / 2 - $(".clapat-footer").height() / 2	   
					}
					gsap.to($("#page-nav"), {duration: 0.7, y: - moveNav, delay:0, ease:Power4.easeOut});
				} else {
					gsap.to('.page-nav-caption .caption-timeline span', {duration: 0.3, y:-100, opacity:0, delay:0, stagger:0.05, ease:Power2.easeInOut});
				}
			});
			
		} else if ($("body").hasClass("disable-ajaxload")) {
			
			$('#page-nav .next-ajax-link-page').on('click', function() {					
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();
				
					
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon with-blur color-cursor");
				$('#ball p').remove();
				$('#ball i').remove();
				
				gsap.to($("#main-page-content, #hero, #page-nav"), {duration: 0.3, opacity:0});
				gsap.to($(".clapat-footer, .clapat-footer-nav"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
			});
			
		}
		
		
		// Project Page Navigation Load Events
		if (!isMobile()) {
			
			$("#project-nav .next-ajax-link-project").mouseenter(function(e) {				
				var modifyMouseColor = $('#project-nav').attr("data-next-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', {color:modifyMouseColor });
				}
				var $this = $(this);		
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#ball").addClass("with-blur");
				$("#project-nav .next-hero-title").addClass('hover-title');
			});
							
			$("#project-nav .next-ajax-link-project").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
				$("#ball").removeClass("with-blur color-cursor");
			});
			
			$("#project-nav:not(.auto-trigger) .next-hero-title").mouseenter(function(e) {
				var modifyMouseColor = $('#project-nav').attr("data-next-modify-color");
				if (modifyMouseColor) {
					$("#ball").addClass("color-cursor");
					gsap.set('#ball.color-cursor', {color:modifyMouseColor });
				}	
				var $this = $(this);		
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(255,255,255,0)", backgroundColor:"rgba(255,255,255,0.1)"});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$("#ball").addClass("with-blur");
				$("#project-nav .next-hero-title").addClass('hover-title');				 				
			});
							
			$("#project-nav:not(.auto-trigger) .next-hero-title").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});				
				$('#ball p').remove();
				$("#project-nav .next-hero-title").removeClass('hover-title');
				$("#ball").removeClass("with-blur color-cursor");
			});
		}
		
		if (!$("body").hasClass("disable-ajaxload")) {
			
			if ($("#project-nav").hasClass("auto-trigger")) {
				
				if ( !(typeof window.ReachBottomArr === 'undefined' || window.ReachBottomArr === null) && Array.isArray( window.ReachBottomArr ) ) {					
					window.ReachBottomArr.forEach( element => {						
						element.kill();
					});
				}
				
				var startValue;

				if ($('#project-nav').hasClass('pinned-nav-caption')) {
					startValue = `top+=${window.innerHeight - 10}px`;
				} else {
					startValue = `top+=${ - 10}px`;
				}
				
				window.ReachBottomArr = new Array();
				
				setTimeout(function() {	
					$('#project-nav').each(function(){
						var $this = $(this);
						const ReachBottom = ScrollTrigger.create({
							id: Math.floor(Math.random() * 100),
							trigger: $("#project-nav"),							
							start: () => startValue,
							onEnter: function( st ) { 
								$("body").addClass("show-loader");						
								$this.delay(500).queue(function() {
									
									gsap.set($("#project-nav.change-header, .next-hero-progress"), {backgroundColor:"transparent"});
									gsap.to($(".next-hero-progress"), {duration: 0.4, width:"0%", ease:Power4.easeOut,onComplete: function() {
										gsap.set($(".next-hero-progress"), {opacity:0});
									}});
									
									var link = $this.find('.next-ajax-link-project');
									link.trigger('click');
									
								});												
							},
							onLeaveBack: function() { 
								$("body").removeClass("show-loader");						
								$this.clearQueue();											
							}
						});				
						window.ReachBottomArr.push(ReachBottom);				
						imagesLoaded('body', function() {
							setTimeout( function(){
								ReachBottom.refresh()	
							} , 1200 );
						});						
					});
				}, 100);
							
			} else {
				
				var startValue;

				if ($('#project-nav').hasClass('pinned-nav-caption')) {
					startValue = `top+=${window.innerHeight - 10}px`;
				} else {
					startValue = `top+=${ - 10}px`;
				}
				
				gsap.to($("#project-nav"), {
					scrollTrigger: {
						trigger: $("#project-nav"), // Elementul care declanșează efectul
						start: () => startValue,
						toggleClass: "active-link", // Clasa pe care o adaugă și o șterge
					}
				});
				
			}//End Auto Trigger
			
			if( $('#hero-image-wrapper').hasClass("change-header-color")) {
				//$('#hero-footer').addClass("white-header");	
			}	
			
			$('.next-ajax-link-project').on('click', function() {
				
				if (!$("#project-nav").hasClass("auto-trigger")) {
					$("body").addClass("show-loader");
				}
				
				if ($(".clapat-header").hasClass("swapped-logo")) {
					var imgLogoWhite = document.querySelector('.white-logo');
					var originalSrcWhite = 'images/logo-white.png';
					var updatedSrcWhite = 'images/logo-white-symbol.png';
					
					var imgLogoBlack = document.querySelector('.black-logo');
					var originalSrcBlack = 'images/logo.png';
					var updatedSrcBlack = 'images/logo-symbol.png';
					gsap.to($("#clapat-logo"), {duration: 0.2, opacity:0, onComplete: function() {
						imgLogoWhite.src = originalSrcWhite;
						imgLogoBlack.src = originalSrcBlack;
						gsap.to($("#clapat-logo"), {duration: 0.2, opacity:1});
					}});
				
				}
				
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();
				
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent'});
				gsap.to('#ball-loader', {duration: 0.3, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon").find('p, i').remove();
				
				$('.next-project-image-wrapper').addClass("temporary").appendTo('body');
				
				if ($("#project-nav").hasClass("move-title-onload")) {					
					$("body").addClass("load-project-thumb-from-slider").append('<div class="temporary-hero"><div class="outer ' + $('#next-project-caption').attr('class') + '"><div class="inner"></div></div></div>')
					$("body").find('.next-caption').appendTo('.temporary-hero .inner');
				
				} else {					
					$("body").addClass("load-project-thumb");
					gsap.to('#next-project-caption .caption-timeline span', {duration: 0.6, yPercent:-100, opacity:0, delay:0, stagger:0.05, ease:Power2.easeInOut});
					
				}			
				
				gsap.set($("#project-nav.change-header, next-hero-progress"), {backgroundColor:"transparent"});
				gsap.to($(".next-hero-counter span"), {duration: 0.3, y:-20, opacity:0, ease:Power2.easeInOut});
				gsap.to($(".clapat-footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper"), {duration: 0.3, opacity:0});			
				
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1.02, clipPath: 'inset(0 0%)', opacity:1, ease:Power2.easeInOut,onComplete: function() {
				  $('.temporary .next-project-image').addClass("visible")
				}});
				
				gsap.to($(".next-hero-progress span"), {duration: 0.4, width:"100%", ease:Power2.easeInOut,onComplete: function() {
					gsap.to($(".next-hero-progress"), {duration: 0.4, width:"0%", ease:Power2.easeInOut});
				}});
				
				
				
			});
			
		} else if ($("body").hasClass("disable-ajaxload")) {
			
			$('.next-ajax-link-project').on('click', function() {					
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");							
				$('.clapat-header').removeClass('white-header');
				$("#app").remove();									
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon with-blur");
				$('#ball p').remove();
				$('#ball i').remove();				
				gsap.to($("#main-page-content, #hero, #hero-image-wrapper, #project-nav"), {duration: 0.3, opacity:0});			
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1, opacity: 0, ease:Power2.easeOut});
				gsap.to($(".clapat-footer, .all-works"), {duration: 0.3, opacity:0, ease:Power2.easeInOut});							
			});
			
		}
		
		
		if( $('#project-nav').length > 0 ){		
		
			const pageContent = document.getElementById("clapat-page-content");
			const projectNav = document.getElementById("project-nav");
			
			var startColorValue;

			if ($('#project-nav').hasClass('pinned-nav-caption')) {
				startColorValue = `top 0%`;
			} else {
				startColorValue = `top 100%`;
			}
			
			ScrollTrigger.create({
				trigger: '#project-nav',
				start: startColorValue,
				end: '+=100%',
				onEnter: function( st ) {								
					if (projectNav.hasAttribute("data-next-bgcolor")) {					
						gsap.to('main', {
							duration: 1, 
							backgroundColor: document.getElementById('project-nav').getAttribute('data-next-bgcolor'),
							ease: Linear.easeNone,
							scrollTrigger: {
								trigger: '#project-nav',
								start: startColorValue,
								end: '+=100%',
								scrub: true,
							}
						});
					}
					gsap.set($(".header-gradient"), {opacity:0});											
				},
				onLeaveBack: function() {
					gsap.set($(".header-gradient"), {opacity:1});
					gsap.set("#clapat-logo img, .classic-menu .flexnav li a, .button-wrap.menu, .button-icon-link", { clearProps: "all" });
				},			
				scrub: true,
			});	
			
			
			
			if ($("#project-nav").hasClass("change-header")) {
				
				var changeMainColor = document.querySelector('#project-nav.change-header');
	
				if (changeMainColor) {
			
					imagesLoaded('body', function() {
						
						if (pageContent.classList.contains('light-content')) {
													
							startLinkColor = "#fff";
							endLinkColor = "#000";						
							startButtonColor = "#fff";
							endButtonColor = "#000";
							startButtonShadow = "inset 0 0 15px rgba(255,255,255,0.5)";
							endButtonShadow = "inset 0 0 15px rgba(0,0,0,0.3)";
							
						} else if (pageContent.classList.contains('dark-content')) {
							
							startLinkColor = "#000";
							endLinkColor = "#fff";
							
							startButtonColor = "#000";
							endButtonColor = "#fff";						
							startButtonShadow = "inset 0 0 15px rgba(0,0,0,0.3)";
							endButtonShadow = "inset 0 0 15px rgba(255,255,255,0.5)";
						}
						
						const blackLogoOpacity = gsap.getProperty('#clapat-logo img.black-logo', 'opacity');
						const whiteLogoOpacity = gsap.getProperty('#clapat-logo img.white-logo', 'opacity');
					
						const scrollTriggerEnter = {
							trigger: changeMainColor,
							start: startColorValue,
							end: '+=100%',
							scrub: true,
						};
						
						
						ScrollTrigger.create({
							trigger: changeMainColor,
							start: startColorValue,
							end: '+=70%',
							onEnter: function( st ) {
								
								gsap.fromTo('#clapat-logo img.black-logo', {
									opacity: blackLogoOpacity
								}, {
									duration: 1, 
									opacity: whiteLogoOpacity, 
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});
								
								gsap.fromTo('#clapat-logo img.white-logo', {
									opacity: whiteLogoOpacity
								}, {
									duration: 1, 
									opacity: blackLogoOpacity,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});
								
								if (!isMobile()) {
								
									gsap.fromTo('.classic-menu .flexnav li a', {
										color: startLinkColor
									}, {
										duration: 1, 
										color: endLinkColor,
										ease: Linear.easeNone,
										scrollTrigger: scrollTriggerEnter
									});
								
								}
								
								gsap.fromTo('.button-wrap.menu', {
									color: startButtonColor,
								}, {
									duration: 1, 
									color: endButtonColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});
								
								gsap.fromTo('.button-icon-link', {
									color: startButtonColor,
									boxShadow: startButtonShadow
								}, {
									duration: 1, 
									color: endButtonColor,
									boxShadow: endButtonShadow,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});
								
								gsap.fromTo('.next-hero-title', {
									color: startLinkColor
								}, {
									duration: 1, 
									color: endLinkColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});
								
							},
							scrub: true,
						});	
					
					});
				
				}		
			
			
			}
			
			// Add Temporary Styles
			$(document).on('click', '.next-ajax-link-project', function() {				
				var temporaryBgColorElements = "main";
				var temporaryColorElements = ".next-hero-title";
				var modifyBgColor = document.getElementById('project-nav').getAttribute('data-next-bgcolor');
				var modifyColor = gsap.getProperty(".next-hero-title", "color");	
				var styleElement = document.createElement('style');
				
				styleElement.setAttribute('data-js-added', 'true');			
				styleElement.innerHTML = `
					${temporaryBgColorElements} {
						background-color: ${modifyBgColor} !important;
					}
					${temporaryColorElements} {
						color: ${modifyColor} !important;
					}
					.header-gradient {
						opacity: 0!important;
					}
				`;			
				document.head.appendChild(styleElement);
					
			});
			
			//Clean Temporary Color Styles	
			setTimeout( function(){
				imagesLoaded('body', function() {
					var styleElements = document.querySelectorAll('style[data-js-added]');
					styleElements.forEach(function(styleElement) {
						styleElement.parentNode.removeChild(styleElement);
					});
				});		
			} , 1300 );
		
		}		
		
	}// Page Load Actions
	
	

	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {
		
		imagesLoaded('body', function() {
			$('body').removeClass('loading hidden scale-up scale-none');
		});
		
		gsap.to($("#main"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});		
		
		// Animate Hero Section			
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb")) {
				
				if ($('body').hasClass('hero-below-caption')) {
					var heroTranslate = gsap.getProperty("#hero.has-image", "height");
					gsap.to('#app canvas', {duration: 1, y:heroTranslate, scale:1, ease: Power3.easeInOut});					
				}				
				
				gsap.set($("#hero-bg-image"), { scale:1.02, opacity:1, delay:1 });				
				gsap.set($("#hero-caption .hero-title.caption-timeline span"), {yPercent:100, opacity:0});
				
				gsap.to($("#hero-caption .hero-title.caption-timeline span"), {duration: 0.7, yPercent:0, opacity:1, stagger:0.1, delay:0.6, ease:Power3.easeOut, onComplete: function() {
					gsap.to($("#hero-description"), {duration: 0.6, y:0, opacity:1, ease:Power3.easeOut});										
					gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.3, y:0, opacity:1, ease:Power2.easeOut});
					gsap.to($("#main-page-content, #page-nav"), {duration: 0.7, y: 0, opacity:1, ease:Power3.easeOut});
					gsap.set($(".next-caption .caption-timeline span"), { yPercent:0});
				}});
				
				shuffleSubtitle();
				
			} else if( $('body').hasClass("load-project-thumb-from-slider")) {
				
				gsap.set($("#hero-bg-image"), {scale:1.02, opacity:1});
				gsap.set($("#hero-caption .caption-timeline.hero-title span"), {yPercent:0, opacity:1});				
				
				gsap.to($("#hero-caption .caption-timeline.hero-title span"), {duration: 0.3, opacity:1, yPercent:0, ease:Power2.easeOut, onComplete: function() {									
					gsap.to($(".temporary-hero"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeIn, onComplete: function() {									
						$(".temporary-hero").remove();
					}});
					gsap.to($("#hero-description"), {duration: 0.6, y:0, opacity:1, ease:Power3.easeOut});															
					gsap.to($("#main-page-content, #page-nav"), {duration: 0.7, y: 0, opacity:1, ease:Power3.easeOut});
					gsap.set($(".next-caption .caption-timeline span"), { yPercent:0});
				}});
				
				shuffleSubtitle(0.2);
				
				gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 0.7, y:0, opacity:1, stagger:0.2, delay:0.5, ease:Power2.easeOut});
				
			} //End Hero Image and Caption Animations

		} else {
			
			gsap.set($("#main-page-content"), {opacity:0});
			
			gsap.set($(".hero-title.caption-timeline span"), {yPercent:100, opacity:0});
			gsap.set($(".hero-subtitle.caption-timeline span"), {yPercent:0});
				
			gsap.to($("#hero-caption .caption-timeline.hero-title span"), {duration: 0.5, yPercent: 0, opacity:1, stagger:0.05, delay:0.1, ease:Power3.easeOut, onComplete: function() {
				gsap.to($(".post-article-wrap"), {duration: 0.3, y: 0, opacity:1, ease:Power2.easeOut});
				gsap.to($(".error-button"), {duration: 0.3, y: 0, opacity:1, rotation:0, delay:0, ease:Power2.easeOut});
			}});
			
			shuffleSubtitle(0.5);
			
			gsap.to($(".hero-footer-left, .hero-footer-right"), {duration: 1, y:0, opacity:1, delay:0.3, ease:Power3.easeOut, onComplete: function() {
				$("#hero-footer.has-border").addClass("visible");																			
			}});
																							
			gsap.to($("#main-page-content, #page-nav"), {duration: 1, y: 0, opacity:1, delay:0.4, ease:Power3.easeOut, onComplete: function() {
				gsap.set($("#main-page-content"), { clearProps: "y" });
				gsap.set($(".page-nav-caption .caption-timeline span"), { yPercent:0});
			}});
			
		} //End Hero Caption Animations
		
		
		if( $('.load-project-thumb').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}					
				setTimeout( function(){					
					setTimeout( function(){
						$("#app.active").remove();
					} ,550 );					
					$('.thumb-wrapper').remove();
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}
				} , 450 );
			});
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}				
				setTimeout( function(){					
					$("#app.active").remove();
					$('.thumb-wrapper').remove();
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}					
					$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");	
				} , 200 );
			});			
		} else if( $('.load-project-thumb-from-slider').length > 0 ){
			imagesLoaded('#hero-image-wrapper', function() {
				if (isMobile()) {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});											
				}				
				setTimeout( function(){					
					$("#app.active").remove();
					$('.thumb-wrapper').remove();
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
					}});
					if (!isMobile()) {
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});	
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.1, ease:Power2.easeOut});										
					} else if (isMobile()) {				
						gsap.to($(".hero-video-wrapper"), {duration: 0.2, opacity:1, delay:0.5, ease:Power2.easeOut});					
					}					
					$('body').removeClass("load-project-thumb-from-slider").removeClass("show-loader");	
				} , 200 );
			});			
		}else {
			imagesLoaded('#hero-image-wrapper', function() {
				$('#hero-image-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				setTimeout( function(){					
					$("#app.active").remove();	
					$("#canvas-slider.active").remove();					
					gsap.to($(".next-project-image-wrapper.temporary"), {duration: 0.1, opacity: 0, ease:Power2.easeOut,onComplete: function() {
						$(".next-project-image-wrapper.temporary").remove();
						$(".temporary-hero").remove();
					}});
				} , 500 );
			});
		}
		
		setTimeout( function(){	
			$('.clapat-header').removeClass('white-header');
			$('body').removeClass("load-project-thumb load-project-thumb-with-title load-project-thumb-from-slider load-next-page grid-open")
			setTimeout( function(){
				imagesLoaded('body', function() {	
					$('body').removeClass("show-loader disable-scroll");					
				});
			} , 300 );			
		} , 1000 );
		
	
	}// End Lazy Load
	
	
	
	
/*--------------------------------------------------
Function Showcase Portfolio
---------------------------------------------------*/	
		
	function ShowcasePortfolio() {
			
		gsap.utils.toArray('.clapat-item .pixels-cover').forEach((pixelWrapper, index) => {
			const pixelAnimation = pixelWrapper.querySelectorAll(".pixel");
			
			gsap.to(pixelAnimation, {				
				scrollTrigger: {
					trigger: pixelWrapper,
					start: "top 90%",
					onEnter: function() {
						pixelWrapper.classList.add('animated');				
					},
				},
				duration: 0.2,
				opacity: 0, 
				delay: function() {
					// Generăm un delay random între 0 și 0.5 secunde
					return gsap.utils.random(0, 0.4);
				},
				ease: Power4.easeOut, 
				onComplete: function() {												
					pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
						pixels.remove(); 
					});
				}
			});
		});
			
			
		if( $('.showcase-portfolio').length > 0 ){
			
			
			function filter() {				
				
				var state = Flip.getState('.clapat-item');
				var projects = document.querySelectorAll('.clapat-item');
				var startHeight = gsap.getProperty(".showcase-portfolio", "height");
				
				var filters = document.querySelectorAll('.filter-option.is_active');
				var parallaxItems = document.querySelectorAll('.showcase-portfolio .clapat-item.vertical-parallax .slide-inner');
			
			  	var hasFilteredItems = false; 
			
				if (filters.length) {
					projects.forEach(function(project) {
						  gsap.set(project, { display: 'block' });
						  project.classList.remove('filtered');
						  project.classList.remove('not-filtered');
					});
					filters.forEach(function(filter) {
				  		var colorClass = filter.dataset.filter;
				
						if (colorClass !== '') {
							projects.forEach(function(project) {
								if (!project.classList.contains(colorClass)) {
									gsap.set(project, { display: 'none' });
									project.classList.remove('filtered');
									project.classList.add('not-filtered');
								} else {
									gsap.set(project, { display: 'block' });
									
									project.classList.add('filtered');
									project.classList.remove('not-filtered');
									hasFilteredItems = true; // Elemente filtrate găsite
								}
							});
						} else {
							projects.forEach(function(project) {
								gsap.set(project, { display: 'block' });
								project.classList.remove('filtered');
								project.classList.remove('not-filtered');
							});
						}
					});
				} else {
					projects.forEach(function(project) {
						gsap.set(project, { display: 'block' });
						project.classList.remove('filtered');
					});
				}
				
			
			  	var showcasePortfolio = document.querySelector('.showcase-portfolio');
				
				if (hasFilteredItems) {
					showcasePortfolio.classList.add('items-filtered');
				} else {
					showcasePortfolio.classList.remove('items-filtered');
				}
				
				showcasePortfolio.classList.add('ease-transform');				
			
				var endHeight = gsap.getProperty(".showcase-portfolio", "height");
				
				
				
				var flip = Flip.from(state, {
					duration: 0.6,
					ease: "power3.inOut",
					absolute: true,
					stagger:0,
					onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0}, {opacity: 1, scale: 1, duration: .5 }),
					onLeave: elements => gsap.fromTo(elements, {opacity: 1, scale: 1}, {opacity: 0, scale: 0, duration: .5 }),					
					onComplete: function() {												
					  	ScrollTrigger.refresh();						
						showcasePortfolio.classList.remove('ease-transform');
					}
				})				
				
				flip.fromTo(".showcase-portfolio", { height: startHeight }, { height: endHeight, clearProps: "height", ease: "power3.inOut", duration: flip.duration() }, 0);
			}
			
			const filtersOptionDiv = document.querySelector('.filters-options-wrapper');
			
			if (filtersOptionDiv) {
				document.querySelectorAll('.filter-option').forEach(function(option) {
					option.addEventListener('click', function(event) {
						event.preventDefault();
						document.querySelector('.filter-option.is_active').classList.remove('is_active');
						event.currentTarget.classList.add('is_active');
						filter();
					});
				});
			}
			
			
			
			ScrollTrigger.create({
				trigger: '#itemsWrapper',
				start: function() {
					const startPin = (window.innerHeight - $('.view-filters').outerHeight());
					return "top +=" + startPin;
				},
				end: function() {
					const showcaseHeight = $('.showcase-portfolio').outerHeight();
					const viewFiltersHeight = $('.view-filters').outerHeight();
			
					if (showcaseHeight > window.innerHeight) {
						return "+=" + (showcaseHeight - viewFiltersHeight * 2);
					} else {
						return "+=" + showcaseHeight;
					}
				},
				pin: '.view-filters',
				pinSpacing: false,
				onEnter: () => {					
					gsap.to('#filters-wrapper', { scale: 1, opacity:1, borderRadius: '20px', duration: 0.3, delay:0.1 });
					gsap.to('#filters li', { scale: 1, opacity:1, duration: 0.3, delay:0.4 });
				},
				onLeave: () => {
					gsap.to('#filters-wrapper', { scale: 0.1, opacity:0, borderRadius: '0px', duration: 0.2, delay:0.2 });
					gsap.to('#filters li', { scale: 0.7, opacity:0, duration: 0.2, delay:0 });
					$("#close-filters").trigger('click');
				},
				onEnterBack: () => {
					gsap.to('#filters-wrapper', { scale: 1, opacity:1, borderRadius: '20px', duration: 0.3, delay:0.1 });
					gsap.to('#filters li', { scale: 1, opacity:1, duration: 0.3, delay:0.4 });
				},
				onLeaveBack: () => {
					gsap.to('#filters-wrapper', { scale: 0.1, opacity:0, borderRadius: '0px', duration: 0.2, delay:0.2 });
					gsap.to('#filters li', { scale: 0.7, opacity:0, duration: 0.2, delay:0 });
					$("#close-filters").trigger('click');
				}
			});
			
			
			
			
			if( $('#filters-wrapper').length > 0 ){
				
				$('#itemsWrapper').on('click', '.toggle-filters, #close-filters', function() {
					var closeFiltersDiv = document.getElementById("close-filters");
					
					if (!closeFiltersDiv) {
						closeFiltersDiv = document.createElement("div");
						closeFiltersDiv.id = "close-filters";
						document.getElementById("itemsWrapper").appendChild(closeFiltersDiv);
					} else {
						closeFiltersDiv.parentNode.removeChild(closeFiltersDiv);
					}
					
					var filtersWrapper = $("#filters-wrapper");
					filtersWrapper.toggleClass("on open active");
					$(".toggle-filters").text(filtersWrapper.hasClass("on") ? "Close" : "Filters");
					
					var filters = $('#filters');
					var filtersLi = filters.find('li');
					var filtersHeight = 4 + filtersLi.toArray().reduce((acc, li) => acc + $(li).outerHeight(true), 0);
					
					gsap.to(filters, { duration: 0.3, opacity: filtersWrapper.hasClass("on") ? 1 : 0, height: filtersWrapper.hasClass("on") ? filtersHeight : 0, delay: 0 });
					gsap.to('.active-filter-bg', { duration: 0.3, opacity: filtersWrapper.hasClass("on") ? 1 : 0, delay: 0.1 });
				});
			
			
				$("#filters-wrapper").on('click', function () {
					if ($(window).width() > 1024) {
						var filtersWrapper = $(this);
						filtersWrapper.addClass("open");
						setTimeout(() => filtersWrapper.addClass("active"), 200);
					}
				});
				
				$("#filters").on('mouseleave', function() {
					if ($(window).width() > 1024) {
						var filtersWrapper = $("#filters-wrapper");
						filtersWrapper.removeClass("open active on");
						gsap.to('#filters', { duration: 0.3, opacity: 0, height: 0, delay: 0.1 });
					}
				});
				
				
				var filtersTimeline = $(".filters-timeline");
				var firstChild = filtersTimeline.find(":first-child");
				var firstOffsetLeft = firstChild.position().left;
				var firstOffsetTop = firstChild.position().top;
				
				filtersTimeline.on('mouseenter', function() {
					var $this = $(this);
					var offsetLeft = $this.position().left;
					var offsetTop = $this.position().top;								
					gsap.to('.active-filter-bg', { duration: 0.3, width: $this.outerWidth(), x: offsetLeft, y: offsetTop });
					
				}).on('mouseleave', function() {
					gsap.to('.active-filter-bg', { duration: 0.3, width: firstChild.outerWidth(), x: firstOffsetLeft, y: firstOffsetTop });
					
				});
				
			}
			
			
			
			
			function resetItems() {
				$('.expand-grid .clapat-item').removeClass('expanded not-expanded').addClass('default');
			}
		
			function expandItem($item) {
				const index = $item.index();
				const start = Math.floor(index / 3) * 3;
				const end = start + 3;
		
				resetItems();
				$item.addClass('expanded').removeClass('default');
				
				$('.expand-grid .clapat-item').slice(start, end).not($item).addClass('not-expanded').removeClass('default');
			}		
		
			expandItem($('.expand-grid .clapat-item').eq(1));
		
			$('.expand-grid .clapat-item').on('mouseenter', function() {
				if (!$('.showcase-portfolio').hasClass('items-filtered')) {
        			expandItem($(this));
    			}
			}).on('mouseleave', function() {	
				if (!$('.showcase-portfolio').hasClass('items-filtered')) {
        			expandItem($(this));
    			}
			});
			
			
			//Flip Portfolio Thumbs	
			
			if( $('.filp-grid').length > 0 ) {
				
				if (!isMobile()) {
					
					const heroStyles = document.getElementById('hero-styles');
					
					const flipThumbsWrapper = document.createElement('div');
					flipThumbsWrapper.classList.add('flip-thumbs-wrapper');
					
					
					const clapatItems = document.querySelectorAll('.showcase-portfolio .clapat-item');
					
					
					clapatItems.forEach(item => {
						const sectionImage = item.querySelector('.section-image.trigger-item-link');
					
						if (sectionImage) {
							const flipMoveThumb = document.createElement('div');
							flipMoveThumb.classList.add('flip-move-thumb');
					
							const flipThumbInner = document.createElement('div');
							flipThumbInner.classList.add('flip-thumb-inner');
							
							const flipThumbEffects = document.createElement('div');
							flipThumbEffects.classList.add('flip-thumb-effects');
							
							flipThumbEffects.appendChild(sectionImage);
							flipThumbInner.appendChild(flipThumbEffects);
							flipMoveThumb.appendChild(flipThumbInner);
							flipThumbsWrapper.appendChild(flipMoveThumb);
						}
					});
					
					heroStyles.appendChild(flipThumbsWrapper);
					
					const showcasePortfolio = document.querySelector('.showcase-portfolio');

					
					if (showcasePortfolio.classList.contains('filp-grid')) {
						
						const clapatItems = showcasePortfolio.querySelectorAll('.clapat-item');						
						clapatItems.forEach(item => {
							
							const pixelsWrapper = item.querySelector('.pixels-wrapper');
							if (pixelsWrapper) {
								pixelsWrapper.remove();
							}
							
						});
					}
					
					
					gsap.set('.flip-thumb-effects', { opacity: 0, yPercent: 50 });

					if (!$('body').hasClass("show-loader")) {
						let preloaderTimeout = 3000;
						if (typeof window.preloaderTimeout !== 'undefined') {
							preloaderTimeout = window.preloaderTimeout + 300; // Ajustare preloader timeout
						}
					
						setTimeout(animateFlipThumbEffects, preloaderTimeout);
					} else {
						animateFlipThumbEffects();
					}
					
					function animateFlipThumbEffects() {
						gsap.to('.flip-thumb-effects', { 
							duration: 0.4,
							delay: 0.7, 
							opacity: 1, 
							yPercent: 0, 
							stagger: 0.1, 
							ease: "power3.out"
						});
					
						gsap.utils.toArray('.flip-thumb-effects').forEach((_, index) => {
							gsap.delayedCall(0.8 + index * 0.1, () => {
								$('.flip-move-thumb').eq(index).addClass("show-counter"); 
							});
						});
					}


					
					
					const moveThumbsWrapper = document.querySelector('#hero');
					const moveThumbsParent = document.querySelectorAll('.flip-thumbs-wrapper .flip-move-thumb');
					const moveThumbs = document.querySelectorAll('.flip-thumbs-wrapper .flip-thumb-inner');
					const endThumbsWrapper = document.querySelector('.showcase-portfolio');
					const overlappingThumbs = document.querySelectorAll('.showcase-portfolio .clapat-item .img-mask');
					
					let completedAnimations = 0; // Variabilă pentru a număra animațiile completate
					const moveAnimations = []; // Array pentru a stoca animațiile
					
					function animateElements(moveThumbs, overlappingThumbs, moveThumbsParent) {
						moveThumbs.forEach((moveThumb, index) => {
							const state = Flip.getState(moveThumb, {props: "transform"});
							overlappingThumbs[index].appendChild(moveThumb);
					
							const moveAnimation = Flip.from(state, {
								duration: 1,
								ease: 'power2.inOut',
								absolute: true,
								onComplete: function() {
									completedAnimations++; // Incrementăm numărul de animații completate
					
									// Opriți animația de flip doar dacă toate animațiile sunt complete
									if (completedAnimations === moveThumbs.length) {
										setTimeout(function() {
											moveAnimations.forEach(anim => anim.kill()); // Opriți toate animațiile
										},200);
										
										$(".flip-move-thumb").addClass("disabled");
										$(".showcase-portfolio").addClass("flip-completed");
										gsap.set('.flip-thumb-inner', { width: "", height: "" });
									}
								}
							});
					
							moveAnimations.push(moveAnimation); // Salvează animația pentru a o putea opri mai târziu
					
							const startOffset = `top ${90 - (index * 5)}%`;
							
							ScrollTrigger.create({
								trigger: moveThumbsParent[index],
								start: startOffset,
								end: '+=85%',
								scrub: true,
								animation: moveAnimation
							});
							
							gsap.to(moveThumbsParent[index], {
								scrollTrigger: {
									trigger:moveThumbsParent[index],
									scrub: true,
									start: `top ${80 - (index * 10)}%`,
									end: '+=10%',
								},
								opacity:0,
							});
							
							
						});                
					}
					
					animateElements(Array.from(moveThumbs), Array.from(overlappingThumbs), Array.from(moveThumbsParent));
				
				}
				
			}
			
			
			if (!isMobile()) {	
							
				$(".showcase-portfolio .clapat-item .slide-inner").on('mouseenter', function() {
					$('#ball p').remove();
					var $this = $(this);			
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(0,0,0,0)", backgroundColor:"rgba(0,0,0,0.3)"});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$("#ball").addClass("with-blur");
					$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});								
				}).on('mouseleave', function() {	
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();		
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});
				
			}			

			

			$('.trigger-item').on('click', function() {
				if (!$('.showcase-portfolio').hasClass('list-grid')) {
					$("body").addClass("load-project-thumb");
				}
				$('.showcase-portfolio .trigger-item').each(function(){
					if (!$(this).hasClass("above")) {
						gsap.to($(this), {duration: 0.5, delay:0, opacity:0, ease:Power4.easeInOut});
					} else  {
						gsap.to($(this), {duration: 0.5, delay:0.4, opacity:0, ease:Power4.easeInOut});	
					}
				});
				setTimeout(function() {
					$("body").addClass("show-loader");
				}, 300);
				gsap.to(".showcase-portfolio .slide-caption", { duration: 0.2, opacity:0, ease:Power2.easeIn});
				gsap.to('footer, .carousel-nav-wrapper, .showcase-portfolio.list-grid', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
				gsap.to('#filters-wrapper', { scale: 0.1, opacity:0, borderRadius: '0px', duration: 0.2, delay:0.2 });
				gsap.to('#filters li', { scale: 0.7, opacity:0, duration: 0.2, delay:0 });			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur");
				$('#ball p').remove();
			});
			
		}
	
	}//End Showcase Portfolio	
	
	
	
/*--------------------------------------------------
Function Showcase Carousel
---------------------------------------------------*/
	
	function ShowcaseCarousel() {
		
		if( $('.showcase-carousel').length > 0 ){
			
			$("footer").addClass("showcase-footer");	
 			
			gsap.set($(".showcase-carousel .clapat-slider .slide-inner-height"), { scale: 0.8 });
			
			if (!$('body').hasClass("show-loader")) {
				
				let preloaderTimeout = 3000;
				if (window.preloaderTimeout !== 'undefined') {
					preloaderTimeout = window.preloaderTimeout + 300;
				}
				
				setTimeout(function() {	
					
					function animatePixels(selector, minDelay, maxDelay) {
						gsap.utils.toArray(selector).forEach((pixelWrapper) => {
							const pixelAnimation = pixelWrapper.querySelectorAll(".clapat-slider .pixel");
							
							gsap.to(pixelAnimation, {
								duration: 0.2,
								opacity: 0,
								delay: function() {
									return gsap.utils.random(minDelay, maxDelay);
								},
								ease: Power4.easeOut,
								onComplete: function() {
									pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
										pixels.remove();
									});
								}
							});
						});
					}					
					
					animatePixels('.clapat-slide-active .pixels-cover', 0, 0.3);
					animatePixels('.clapat-slide:not(.clapat-slide-active) .pixels-cover', 0.3, 0.6);
					
					gsap.to($(".showcase-carousel .clapat-slider .slide-inner-height"), { duration: 0.6, scale: 1, ease: Power2.easeOut });
					
					gsap.set($(".fade-slide-element"), {y: 10, opacity:0});
					gsap.to($(".fade-slide-element"), {duration: 0.7, y: 0, opacity:1, delay:0.3, stagger:0.02, ease:Power4.easeOut});					
					
				}, preloaderTimeout);
				
			}
			
			
			slider = new ClapatSlider('.showcase-carousel', { 
				direction: 'horizontal',
				ease: 0.065, 
				snap:false,
				outer: '.clapat-slider',
				inner: '.clapat-slider-viewport',
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				on: {	
					init : function(slide) {
						
						if ($('body').hasClass("show-loader")) {
							
							imagesLoaded('body', function() {
								
								function animatePixels(selector, minDelay, maxDelay) {
									gsap.utils.toArray(selector).forEach((pixelWrapper) => {
										const pixelAnimation = pixelWrapper.querySelectorAll(".clapat-slider .pixel");
										
										gsap.to(pixelAnimation, {
											duration: 0.2,
											opacity: 0,
											delay: function() {
												return gsap.utils.random(minDelay, maxDelay);
											},
											ease: Power4.easeOut,
											onComplete: function() {
												pixelWrapper.querySelectorAll(".pixels-wrapper").forEach(pixels => {
													pixels.remove();
												});
											}
										});
									});
								}
								
								animatePixels('.clapat-slide-active .pixels-cover', 0, 0.3);
								animatePixels('.clapat-slide:not(.clapat-slide-active) .pixels-cover', 0.3, 0.6);
								
								gsap.to($(".showcase-carousel .clapat-slider .slide-inner-height"), { duration: 0.6, scale: 1, ease: Power2.easeOut });
								
								gsap.set($(".fade-slide-element"), {y: 10, opacity:0});
								gsap.to($(".fade-slide-element"), {duration: 0.7, y: 0, opacity:1, delay:0.3, stagger:0.02, ease:Power4.easeOut});
							
							});
						
						}
						
					},
					slideLeaveViewport : function( slide ) {
						gsap.set($('.clapat-slider div:not(.clapat-slide-visible) .slide-effects'), { y: "" });		
					},
				},
			});
			
			 slider.tl					
			 	.fromTo('.progress-info-fill', {backgroundSize:"0% 100%" }, {backgroundSize:"100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', {backgroundSize:"100% 100%" }, {backgroundSize:"0% 100%", duration: 0.3, ease: 'power3' }, 0);
			
			
			
			
			
			if (!isMobile()) {
				
			
				$('.clapat-slider').on('mousedown', function (evt) {
					$('.clapat-slider').on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							$("body").removeClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1.2, borderColor:'#fff', backgroundColor:'#fff'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1.2, borderColor:'#000', backgroundColor:'#000'});
							}
							$("body" ).addClass("scale-drag-x");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
						}
						$('.clapat-slider').off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-x");					
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-x");								
				});
				
				
				$(".showcase-carousel .clapat-slide .slide-inner-height").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-x')) {
						$('#ball p').remove();
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(0,0,0,0)", backgroundColor:"rgba(0,0,0,0.3)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
						$('.clapat-slide').addClass('disable');						
						$(this).closest(".clapat-slide").removeClass("disable");
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-x')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
						$(this).closest(".clapat-slide").addClass("disable");
						$('.clapat-slide').removeClass('disable');	
					}
				});
			
			}
			
			
			$('.trigger-item').on('click', function() {	
				$("body").addClass("load-project-thumb");
				$("body").addClass("show-loader");	
				gsap.to(".showcase-carousel .slide-caption", { duration: 0.2, opacity:0, ease:Power2.easeIn});		
				gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });			
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();
			});
			
			
		}
	
	}//End Showcase Carousel	
	


/*--------------------------------------------------
Function Showcase Gallery
---------------------------------------------------*/
	
	function ShowcaseGallery() {
		
		if( $('.showcase-gallery').length > 0 ){
			
			$("footer").addClass("showcase-footer");			
 			
			if (isMobile()) {
				$(".clapat-slider-wrapper").removeClass("preview-mode-enabled");
			}
			
			var slideElements = $(".clapat-slide");
			var externalCaptionElement = $(".external-caption");
			
			slideElements.each(function(i) {
				$(this).attr("data-slide", i + 1);
				var slideTitleElement = $(this).find(".slide-title").eq(0);
				if (slideTitleElement.length) {
					slideTitleElement.attr("data-caption", i + 1);
					var cloneSlideTitle = slideTitleElement.clone(true);
					externalCaptionElement.append(cloneSlideTitle);
					var triggerItem = $(this).find('.trigger-item');
					if (triggerItem.length && triggerItem.data('projectcolor')) {
						var projectColor = triggerItem.data('projectcolor');
						slideTitleElement.css({ color: projectColor });
						var slideCat = $(this).find('.slide-cat').eq(0);
						if (slideCat.length) {
							slideCat.css({ color: projectColor });
						}
						var slideDate = $(this).find('.slide-date').eq(0);
						if (slideDate.length) {                    
							slideDate.css({ color: projectColor });
						}
					}
				}
			});
			
			
			const bgPixels = $('<div id="bg-pixels"></div>');
            
            $('#clapat-page-content').append(bgPixels);
			
            function randomizePosition() {
                let randomX = Math.floor(Math.random() * 50); 
                let randomY = Math.floor(Math.random() * 50); 
				
                $('#bg-pixels').css('background-position', `${randomX}% ${randomY}%`);
				
                setTimeout(randomizePosition, Math.random() * 50 + 50);
            }
			
            randomizePosition();
			

			gsap.set($(".showcase-gallery .clapat-slider .slide-inner-height"), { opacity: 0 });
			
			if (!$('body').hasClass("show-loader")) {
				let preloaderTimeout = 3000;
				if (window.preloaderTimeout !== 'undefined') {
					preloaderTimeout = window.preloaderTimeout + 300;
				}
				setTimeout(function() {
					gsap.to($(".showcase-gallery .clapat-slider .clapat-slide .slide-inner-height"), { duration: 0.5, opacity: 1, delay: 0.2, ease: Power2.easeInOut });
					var gallerySlideClasses = [".clapat-slide-prev-two", ".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next", ".clapat-slide-next-two"];
					gallerySlideClasses.forEach(function(gallerySlideClass, index) {
						var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-inner-height");
						var delay = 0 + index * 0.1;
						gsap.set(gallerySlide, { yPercent: 250 });
						gsap.to(gallerySlide, { duration: 1.5, yPercent: 0, delay: delay, ease: Power2.easeOut, onComplete: function() {
								gsap.set(gallerySlide, { clearProps: "x,y" });
								$(".showcase-gallery").addClass("active");	
							}
						});
					});
					gsap.set($(".fade-slide-element, .header-middle span"), { y: 20, opacity: 0 });
					gsap.to($(".fade-slide-element, .header-middle span"), { duration: 1, y: 0, opacity: 1, delay: 0.6, stagger: 0.05, ease: Power2.easeOut });
					gsap.set($(".showcase-gallery .spinning-plus-wrapper"), { scale: 0, opacity: 0 });
					gsap.to($("#bg-pixels"), { duration: 1, opacity: 0.75, delay: 0, ease: Power2.easeOut });
				}, preloaderTimeout);
			}
			
			
			slider = new ClapatSlider('.clapat-slider-wrapper', { 
				direction: 'vertical',
				ease: 0.065, 
				outer: '.clapat-slider',
				inner: '.clapat-slider-viewport',
				navigation: {
					nextEl: '.cp-button-next',
					prevEl: '.cp-button-prev'
				},
				parallax : [{
					element: '.speed-50',
					margin: -50
				}],
				on: {	
					init : function(slide) {
						
						if ($('body').hasClass("show-loader")) {
							
							imagesLoaded('body', function() {
								
								gsap.to($(".showcase-gallery .clapat-slider .clapat-slide .slide-inner-height"), { duration: 0.5, opacity: 1, delay: 0.4, ease: Power2.easeInOut });
								
								var gallerySlideClasses = [".clapat-slide-prev-two", ".clapat-slide-prev", ".clapat-slide-active", ".clapat-slide-next", ".clapat-slide-next-two"];
								
								gallerySlideClasses.forEach(function(gallerySlideClass, index) {
									var gallerySlide = $(".showcase-gallery .clapat-slider " + gallerySlideClass + " .slide-inner-height");
									var delay = 0.2 + index * 0.1;						
									gsap.set(gallerySlide, { yPercent: 250 });
									gsap.to(gallerySlide, { duration: 1.5, yPercent: 0, delay: delay, ease: Power2.easeOut , onComplete: function() {
											gsap.set(gallerySlide, { clearProps: "x,y" });
											$(".showcase-gallery").addClass("active");	
										}
									});
								});
								
								gsap.set($(".fade-slide-element, .header-middle span"), {y: 20, opacity:0});
								gsap.to($(".fade-slide-element, .header-middle span"), {duration: 0.7, y: 0, opacity:1, delay:0.6, stagger:0.05, ease:Power4.easeOut});
								
								gsap.set($(".showcase-gallery .spinning-plus-wrapper"), {scale: 0, opacity:0});
								gsap.to($("#bg-pixels"), { duration: 1, opacity: 0.75, delay: 0, ease: Power2.easeOut });
							
							});
						
						}
						
					},
					slideLeaveViewport : function( slide ) {
						gsap.set($('.clapat-slider div:not(.clapat-slide-visible) .slide-effects'), { y: "" });		
					},
				},
			});			
			
			
			slider.tl
				.fromTo('.progress-info-fill', { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%" }, 0)
				.fromTo('.progress-info-fill-2', { backgroundSize: "100% 100%" }, { backgroundSize: "0% 100%", duration: 0.3, ease: 'power3' }, 0)
    

				
			
			
				
					
			class Item {
								
				constructor(DOM_el) {
					
					// DOM elements
					this.DOM = {
						// main element (.item)
						el: null,
						// imageWrap (.item__image-wrap)
						imageWrap: null,
						// imageCaption
						imageCaption: null,
						// image (.item__image)
						image: null,
						// imageInner (.item__image > .item__image-inner)
						imageInner: null,
					}; 
					
					this.DOM.el = DOM_el;
					this.DOM.imageWrap = this.DOM.el.querySelector('.slide-moving');
					if( this.DOM.imageWrap != null ){						
						this.DOM.imageCaption = this.DOM.imageWrap.querySelector('.slide-caption');
					}
					this.DOM.image = this.DOM.el.querySelector('.trigger-item');
					if( this.DOM.image != null ){						
						this.DOM.imageInner = this.DOM.image.querySelector('.section-image');
					}
				}
			}
			
			
			// Placeholder for the grid items (.item__image). We'll use the gsap FLIP plugin to move the "".item .item__image" inside the grid element
			const grid = document.querySelector('.slider-thumbs-wrapper');
			const triggeredImage = document.querySelector('.slider-zoom-wrapper');
			
			let animateTitle = gsap.timeline();		
						
			
			const showGrid = () => {
				
				document.body.classList.add('grid-open', 'disable-scroll');				
				document.getElementById("clapat-page-content").classList.add('no-css-animation');
				
				slider.enabled = false;
				
				gsap.set(".progress-info", {opacity:0});
				gsap.to($(".fade-slide-element:not(.progress-info)"), {duration: 0.2, y: -10, opacity:0, ease:Power2.easeIn});				
				
				gsap.to($(".external-caption"), {duration: 0.3, y:"-30%", opacity:0, ease:Power3.easeIn});
				
				// get the DOM elements that we'll work with
				const DOM = getDOMElements();
				const allImages = DOM.grid.map(element => {
					
					element.item.DOM.image.setAttribute('data-slide-index', element.item_index);
					return element.item.DOM.image;
				});
				const allImagesInner = DOM.grid.map(element => element.item.DOM.imageInner);
				const currentImage = DOM.currentItem.DOM.image;
				const currentImageInner = DOM.currentItem.DOM.imageInner;
				const currentImageCaption = DOM.currentItem.DOM.imageCaption;
				const projectColor = currentImage.dataset.projectcolor;
				const projectBgColor = currentImage.dataset.projectbgcolor;
							
				// Use gsap flip for the animation
				const flipstate = Flip.getState([allImages]);				
				const flipstate1 = Flip.getState([currentImage]);
								
				gsap.set(currentImage.closest(".clapat-slide"), {zIndex: 0});
								
				gsap.to('.header-gradient', { duration: 0.5, delay:0.15, backgroundColor: projectBgColor, ease:Power2.easeInOut });
				gsap.to("main", { duration: 0.5, delay:0.15, backgroundColor: projectBgColor, ease:Power2.easeInOut });
				gsap.to("#bg-pixels", { duration: 0.5, delay:0.15, opacity:0, ease: Power2.easeInOut });
				
				if (document.getElementById('clapat-page-content').classList.contains('dark-content')) {
					if (currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.5, delay:0.15, opacity: 0, ease:Power2.easeInOut });	
						gsap.to('#clapat-logo img.white-logo', { duration: 0.5, delay:0.15, opacity: 1, ease:Power2.easeInOut });						
						gsap.to('.classic-menu .flexnav li a', { duration: 0.5, delay:0.15, color: "#fff", ease:Power2.easeInOut });
						gsap.to('.button-wrap.menu', { duration: 0.5, delay:0.15, color: "#fff", ease:Power2.easeInOut });
						gsap.to('.button-icon-link', { duration: 0.5, delay:0.15, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease:Power2.easeInOut });					
					}
				} else if (document.getElementById('clapat-page-content').classList.contains('light-content')) {
					if (currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.5, delay:0.15, opacity: 1, ease:Power2.easeInOut });	
						gsap.to('#clapat-logo img.white-logo', { duration: 0.5, delay:0.15, opacity: 0, ease:Power2.easeInOut });						
						gsap.to('.classic-menu .flexnav li a', { duration: 0.5, delay:0.15, color: "#000", ease:Power2.easeInOut });
						gsap.to('.button-wrap.menu', { duration: 0.5, delay:0.15, color: "#000", ease:Power2.easeInOut });	
						gsap.to('.button-icon-link', { duration: 0.5, delay:0.15, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease:Power2.easeInOut });					
					}
				}
				
				// put them inside the .grid element
				grid.append(...allImages);
				
				currentImage.setAttribute('data-slide-index', DOM.currentIndex);
				triggeredImage.append(currentImage);
				triggeredImage.append(currentImageCaption);
				
				gsap.to(".clapat-slider .clapat-slide .trigger-item", { duration: 1, opacity:0, scale:0.7, ease:Power2.easeOut });
				
				// Flip it
				Flip.from(flipstate, {
					duration: 0.7 ,
					ease: Power2.easeInOut,
					stagger:0.03,
					absolute: true,					 
				})
				.to(currentImageInner, {
					duration: 0.7 ,
					ease: Power2.easeInOut,
					scale:1,
					onComplete: () => {
						document.body.classList.add('enable-trigger');
				  	}
				}, 0)
				.to(allImagesInner, {
					duration: 0.7 ,
					ease: Power2.easeInOut,
					scale:1,
				}, 0)
				.to(".img-mask", {
					duration: 0.7 ,
					ease: Power2.easeOut,
					opacity:1
				}, 0)
				
				Flip.from(flipstate1, {
					duration: 0.7 ,
					ease: Power2.easeInOut,
					absolute: true       
				});	
				
				
			};
			
			const hideGrid = () => {
				
				gsap.to(".clapat-slider .clapat-slide .trigger-item", { duration: 0.5, opacity:1, scale:1, delay:0.2, ease: 'power3.inOut' });
				gsap.set(".fade-slide-element", { y: 10 });
				gsap.to(".fade-slide-element:not(.progress-info)", { duration: 0.4, y: 0, delay:0.6, opacity:1, stagger:0.1, ease:Power2.easeOut });
				gsap.to(".progress-info", {duration: 0.4, opacity:1, y: 0, delay:1, opacity:1, });
				
				gsap.set($(".external-caption"), {y: 60 });				
				gsap.to($(".external-caption"), {
					duration: 0.5,
					y: 0,
					opacity: 1,
					delay: 0.3,
					ease: Power3.easeOut,
					onComplete: function() {
						gsap.set($(".external-caption"), { clearProps: "all" });
					}
				});
						
				
				$(".slider-zoom-wrapper").find('video').each(function() {
					$(this).get(0).pause();
				});
				
				document.body.classList.remove('grid-open');
				
				slider.enabled = true;
				
				// get the DOM elements that we'll work with
				const DOM = getDOMElements();
				const allImages = document.querySelectorAll('.slider-thumbs-wrapper .trigger-item');
				const currentImage = document.querySelector('.slider-zoom-wrapper .trigger-item');
				const currentImageCaption = document.querySelector('.slider-zoom-wrapper .slide-caption');
				const currentImageInner = document.querySelector('.slider-zoom-wrapper .trigger-item .section-image');
			
				const flipstate = Flip.getState([allImages]);				
				const flipstate1 = Flip.getState([currentImage]);
				
				gsap.set(currentImage, { y:""});
							
				allImages.forEach((image) => {					
					let index = image.getAttribute('data-slide-index');
					let element = DOM.items[index];
					image.removeAttribute('data-slide-index');
					element.DOM.imageWrap.appendChild( image );
				});
				
				currentImage.removeAttribute('data-slide-index');
				DOM.currentItem.DOM.imageWrap.appendChild(currentImage);
								
				// Remove all the elements from the grid and current triggered image divs
				const liveGrid = document.querySelector('.slider-thumbs-wrapper');
				const liveTriggeredImage = document.querySelector('.slider-zoom-wrapper');
				
				while (liveGrid.firstChild) {
					liveGrid.removeChild(liveGrid.firstChild);
				}
				
				
				
				Flip.from(flipstate, {
					duration: 0.8,
					ease: "power2.inOut",
					stagger:0.04,
				});				
				
				Flip.from(flipstate1, {
					duration: 0.8,
					ease: "power2.inOut",
					stagger:0,			
					onComplete: function() {
						
						DOM.currentItem.DOM.imageWrap.appendChild(currentImageCaption);	
						
						const triggeredItem = document.querySelector('.clapat-slide.triggered-item');
						if( triggeredItem != null ){							
							triggeredItem.classList.remove('triggered-item');
						}
						
						const clapatSlides = document.querySelectorAll('.clapat-slide');
						clapatSlides.forEach(slide => {
						  	slide.style.zIndex = '';
							slideInner = slide.querySelector('.slide-inner-height');
							slideInner.classList.remove('disabled');

						});			
						
						document.body.classList.remove('disable-scroll','enable-trigger');
						document.getElementById("clapat-page-content").classList.remove('no-css-animation');
						gsap.set($(".showcase-gallery .slide-caption"), {clearProps: "opacity"});
						
					}
				})								
				
				gsap.to('.header-gradient', { duration: 0.4, backgroundColor: $("#clapat-page-content").data("bgcolor"), ease:Power2.easeInOut });
				gsap.to("main", { duration: 0.4, backgroundColor: $("#clapat-page-content").data("bgcolor"), ease: Power2.easeInOut });
				gsap.to("#bg-pixels", { duration: 0.4, delay:0.15, opacity:0.75, ease: Power2.easeInOut });			
				
				
				if (document.getElementById('clapat-page-content').classList.contains('dark-content')) {
					if (currentImage.classList.contains('change-header')) {
						gsap.to('#clapat-logo img.black-logo', { duration: 0.4, opacity: 1, ease:Power2.easeInOut });	
						gsap.to('#clapat-logo img.white-logo', { duration: 0.4, opacity: 0, ease:Power2.easeInOut });						
						gsap.to('.classic-menu .flexnav li a', { duration: 0.4, color: "#000", ease:Power2.easeInOut });
						gsap.to('.button-wrap.menu', { duration: 0.4, color: "#000", ease:Power2.easeInOut });							
						gsap.to('.button-icon-link', { duration: 0.3, color: "#000", boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)", ease:Power2.easeInOut });					
					}
				} else if (document.getElementById('clapat-page-content').classList.contains('light-content')) {
					if (currentImage.classList.contains('change-header')) {						
						gsap.to('#clapat-logo img.black-logo', { duration: 0.4, opacity: 0, ease:Power2.easeInOut });	
						gsap.to('#clapat-logo img.white-logo', { duration: 0.4, opacity: 1, ease:Power2.easeInOut });						
						gsap.to('.classic-menu .flexnav li a', { duration: 0.5, color: "#fff", ease:Power2.easeInOut });	
						gsap.to('.button-wrap.menu', { duration: 0.4, color: "#fff", ease:Power2.easeInOut });							
						gsap.to('.button-icon-link', { duration: 0.3, color: "#fff", boxShadow: "inset 0 0 15px rgba(255,255,255,0.3)", ease:Power2.easeInOut });					
					}
				}
				
				gsap.to($("footer .link-text, .clapat-pagination, #filters-wrapper"), {duration: 0.3, opacity:1, y:0, stagger:0.05, delay:0.4, ease:Power2.easeInOut});
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();
				
			
			}
			
			// Returns some DOM elements that are needed for showing/hiding the grid
			const getDOMElements = () => {
			
				// Item instances (slides)
				const items = [];
				[...document.querySelectorAll('.clapat-slide')].forEach(item => {
					items.push(new Item(item));
				});
						
				// Cloned items
				const itemsCloned = [];
				[...document.querySelectorAll('.clapat-slide-clone')].forEach(item => {
					itemsCloned.push(new Item(item));
				});
			
				let firstVisibleIndex = -1;
				let direction = slider.opts.direction;
								
				for( let i = 0; i < items.length; i++ ){
					
					let item = items[i];
					let bounding = item.DOM.el.getBoundingClientRect();
					if( direction == "vertical" ){
					
						start = bounding.top;
						end = bounding.bottom;
					}
					else {
						
						start = bounding.left;
						end = bounding.right;
					}
					if( (start <= 0) && (end > 0) ){
							
						firstVisibleIndex = i;						
						break;
					}
										
				}
				
				const gridItems = [];
				let currentIndex = -1;
				if( direction == "vertical" ){
					
					let selectedItems = 0;
					// in case of the vertical direction cloned items are reverted, last one becomes first
					if( firstVisibleIndex >= itemsCloned.length ){
							
						// the first visible index is a clone, therefore iterate back to the first clone
						for( index = firstVisibleIndex; (index >= itemsCloned.length); index-- ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
						// and then from the beginning the rest of the clones
						for( index = 0; (selectedItems < itemsCloned.length); index++ ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
							
					}
					else{
						
						// the first visible index is not a clone, therefore iterate from the beginning of the items
						for( index = firstVisibleIndex; (index < itemsCloned.length); index++ ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
						// and then from the end of the clones
						for( index = items.length-1; (selectedItems < itemsCloned.length); index-- ){
								
							let item = items[index];
							if( !item.DOM.el.classList.contains('triggered-item') ){
									
								gridItems.push( {item_index: index, item: item} );
							}
							else{
									
								currentIndex = index;
							}
							
							selectedItems++;
						}
					}
					
				}
				else {
					
					let iterator = 0;
					while ( iterator < itemsCloned.length ){
						
						let index = gsap.utils.wrap( 0, items.length, firstVisibleIndex + iterator);
						let item = items[index];
						if( !item.DOM.el.classList.contains('triggered-item') ){
							
							gridItems.push( {item_index: index, item: item  } );
						}
						else{
							
							currentIndex = index;
						}
						iterator++;
					}
				}

				
				return {					
					items: items,					
					grid: gridItems,					
					currentItem: new Item( document.querySelector('.clapat-slide.triggered-item') ),
					currentIndex: currentIndex
				};
				
			}
			
			let bGridSwiped = false;
			// Initialize the events
			const initEvents = () => {
				
				const items = document.querySelectorAll('.slide-inner-height');
				items.forEach((triggerItem) => {
					
					triggerItem.addEventListener('click', (event) => {
						
						if( $('.showcase-gallery').length > 0 ){
							
							event.currentTarget.closest('.clapat-slide').classList.add('triggered-item');
							showGrid();
						}
					});
					
				});
				
				window.addEventListener("wheel", event => {
					
					if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
						hideGrid();
					}
				});
				
				window.addEventListener("touchmove", event => {
					
					if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
						bGridSwiped = true;
					}
				});
				
				window.addEventListener("touchcancel", event => {
					
					if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
						bGridSwiped = false;
					}
				});
				
				window.addEventListener("touchend", event => {
					
					if(document.body.classList.contains("grid-open") && bGridSwiped && ( $('.showcase-gallery').length > 0 ) ) {
						bGridSwiped = false;
						hideGrid();
					}
				});
				
				const closeGrid = document.querySelector('.slider-close-preview');
				
				if( closeGrid != null ){
					
					closeGrid.addEventListener("click", event => {
						
						if(document.body.classList.contains("grid-open") && ( $('.showcase-gallery').length > 0 ) ) {
							hideGrid();
						}
					});
				}
				
			};
			
			
			const previewModeEnabled = document.querySelector('.preview-mode-enabled');
			
			if (previewModeEnabled) {			
				initEvents();		
			}
			
			
			if (!isMobile()) {
				
			
				$('.clapat-slider').on('mousedown', function (evt) {
					$('.clapat-slider').on('mouseup mousemove', function handler(evt) {
						if (evt.type === 'mouseup') {					  
							// click
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							$("body").removeClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
							
						} else {
							// drag
							if ($('#magic-cursor').hasClass("light-content")) {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff', backgroundColor:'#fff'});
							} else {
								gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000', backgroundColor:'#000'});
							}
							$("body" ).addClass("scale-drag-y");
							$("#ball").removeClass("with-icon");
							$('#ball i').remove();
							$("#ball").removeClass("with-blur");
							$('#ball p').remove();
						}
						$('.clapat-slider').off('mouseup mousemove', handler);
					});
				});
				
					
				$('.clapat-slider').on('mouseup touchend', function() {
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");					
				});
				
				$("body").on('mouseleave', function() {					
					gsap.to('#ball', {duration: 1, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', ease:Elastic.easeOut});
					$("body").removeClass("scale-drag-y");								
				});
					
				
				$(".showcase-gallery.preview-mode-enabled .clapat-slide .slide-inner-height").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-y')) {
						$('#ball p').remove();
						var $this = $(this);			
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(170,170,170,0)", backgroundColor:"rgba(170,170,170,0.3)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-y')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					}
				});
				
				$(".trigger-item").on('mouseenter', function() {	
					if (!$('body').hasClass('scale-drag-y')) {
						var $this = $(this);
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(170,170,170,0)", backgroundColor:"rgba(170,170,170,0.3)"});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$("#ball").addClass("with-blur");
						$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );
						$(this).find('video').each(function() {
							$(this).get(0).play();
						});
					}			
				}).on('mouseleave', function() {					
					if (!$('body').hasClass('scale-drag-y')) {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-blur color-cursor");
						$('#ball p').remove();		
						$(this).find('video').each(function() {
							$(this).get(0).pause();
						});
					}
				});
			
			}
			
			
			var currentSlide = null;
				var firstEnter = true; 
				
				$('.clapat-slide .slide-inner-height').on('mouseenter', function() {
					
					var slide = $(this).closest(".clapat-slide").data('slide');
					
					if (currentSlide === slide) {
						return; 
					}
					currentSlide = slide;
					
					$('.external-caption').find('.slide-title').removeClass('hover');
					var caption = $('.external-caption .slide-title[data-caption="' + slide + '"]');
					
					var onLeaveShuffle = gsap.utils.toArray('.fixed-hero .inner');
					
					function onLeave(liElement, onCompleteCallback) {
						var spans = liElement.querySelectorAll('span');
					
						spans.forEach(function(span) {
							shuffleFunctions.startShuffle(span, {
								velocity: 40,
								shuffleIterations: 6,
								childSelector: 'span'
							});
							
							gsap.to(span, {
								opacity: 0,
								duration: 0.4,
								delay: 0,
								onComplete: function() {
									
									if (firstEnter) {
										caption.addClass('hover');
										if (onCompleteCallback) {
											onCompleteCallback(); 
										}
										firstEnter = false; 
									}
								}
							});
						});
					}
					
					var liElementOnLeave = onLeaveShuffle[0]; 
					
					if (liElementOnLeave && firstEnter) {
						
						onLeave(liElementOnLeave, function() {
							
							var onEnterShuffle = gsap.utils.toArray('.external-caption .slide-title[data-caption="' + slide + '"]');
						
							function onEnter(liElement) {
								var spans = liElement.querySelectorAll('span');
						
								spans.forEach(function(span) {
									shuffleFunctions.startShuffle(span, {
										velocity: 40,
										shuffleIterations: 6,
										childSelector: 'span'
									});
									
									gsap.to(span, {
										opacity: 1,
										duration: 0.4,
										delay: 0 
									});
								});
								
								caption.addClass('hover');
							}
							
							var liElementOnEnter = onEnterShuffle[0]; 
						
							if (liElementOnEnter) {
								onEnter(liElementOnEnter); 
							}
						});
						
					} else {
						
						var onEnterShuffle = gsap.utils.toArray('.external-caption .slide-title[data-caption="' + slide + '"]');
					
						function onEnter(liElement) {
							var spans = liElement.querySelectorAll('span');
					
							spans.forEach(function(span) {
								shuffleFunctions.startShuffle(span, {
									velocity: 40,
									shuffleIterations: 6,
									childSelector: 'span'
								});
								
								gsap.to(span, {
									opacity: 1,
									duration: 0.4,
									delay: 0 
								});
							});
							
							caption.addClass('hover');
						}
						
						var liElementOnEnter = onEnterShuffle[0]; 
					
						if (liElementOnEnter) {
							onEnter(liElementOnEnter); 
						}
					}
				});
			
				
			
			
			$('.trigger-item').on('click', function() {
				
				$("body").addClass("load-project-thumb");
				$("body").removeClass("enable-trigger");				
				$("body").append('<div class="temporary-hero"><div class="outer content-full-width text-align-center"><div class="inner"></div></div></div>');
				
				gsap.to(".slider-zoom-wrapper .slide-cat span, .slider-zoom-wrapper .slide-date span", { duration: 0.3, y:30, opacity:0, delay:0, stagger:0, ease:Power2.easeIn});
				gsap.to(".showcase-gallery a.slide-link", { duration: 0.3, opacity:0, scale:0.8, delay:0, ease:Power2.easeIn });
				gsap.to($(".slider-thumbs-wrapper .trigger-item"), {duration: 0.3, y: 160, x:0,  opacity:1, stagger:0.05,  delay:0, ease:Power2.easeIn});
				
				setTimeout( function(){
					$("body").addClass("show-loader");
										
				} , 300 );
				
				gsap.to("#bg-pixels", { duration: 0.3, delay:0, opacity:0, ease: Power2.easeInOut });
				gsap.to('footer, .carousel-nav-wrapper', { duration: 0.5, opacity: 0, ease: Power4.easeInOut });
				gsap.to(".showcase-gallery .slide-caption", { duration: 0.2, opacity:0, ease:Power2.easeIn});		
				gsap.to('#ball', { duration: 0.3, borderWidth: '4px', scale: 0.5, borderColor: '#999999', backgroundColor: 'transparent' });
				gsap.to('#ball-loader', { duration: 0.3, borderWidth: '4px', top: 0, left: 0 });
				$("#ball").removeClass("with-blur color-cursor");
				$('#ball p').remove();
			});
			
			
		}
	
	}//End Showcase Gallery

	
	
	
/*--------------------------------------------------
Function Showcase Lists
---------------------------------------------------*/
	
	function ShowcaseLists() {
	
		if( $('.projects-list-wrapper').length > 0 ){
			
			function setProjectLists() {								
				gsap.set(".projects-list-images", { height: window.innerHeight});	
				gsap.set(".projects-list-images > li", { height: window.innerHeight});	
			}
			
			setProjectLists();
			
			window.addEventListener('resize', setProjectLists);
			
			$('#main-page-content').addClass('no-overflow');
			$('.projects-list-captions li').first().addClass('active');
   			$('.projects-list-images li').first().addClass('visible');
			
			$('.projects-list-captions li').each(function(index) {
				$(this).on('mouseenter', function() {
					if (!$(this).hasClass('active')) {
						$('.projects-list-captions li').removeClass('active');
						$(this).addClass('active');							
						$('.projects-list-images li').removeClass('visible');
						$('.projects-list-images li').eq(index).addClass('visible');
					}
				})
			});
			
			ScrollTrigger.create({
				trigger: '.projects-list-wrapper',
				start: 'top 0%',
				end: function() {
					return "+=" + ($('.projects-list-wrapper').height());
				},
				pin: '.projects-list-images',
				pinSpacing: false,
			});
			
			ScrollTrigger.create({
				trigger: '.projects-list-wrapper',
				start: 'top 0%',
				end: "bottom 80%",			
				onEnter: function() {
					$('.projects-list-wrapper').addClass('active');
				},
				onEnterBack: function() {
					$('.projects-list-wrapper').addClass('active');
				},
				onLeave: function() {
					$('.projects-list-wrapper').removeClass('active');
				},
				onLeaveBack: function() {
					$('.projects-list-wrapper').removeClass('active');
				}
			});
			
			gsap.utils.toArray('.projects-list-wrapper').forEach((projectsListsWrapper, index) => {
				const pixelAnimation = projectsListsWrapper.querySelectorAll(".pixel");
				
				gsap.to(pixelAnimation, {				
					scrollTrigger: {
						trigger: projectsListsWrapper,
						start: "top 50%",
						end: '+=50%',
						scrub:true,
					},
					duration: 0.2,
					opacity: 0, 
					delay: function() {
						return gsap.utils.random(0, 1);
					},
					ease: Linear.easeNone,									
				});
				
				
				gsap.to(pixelAnimation, {				
					scrollTrigger: {
						trigger: projectsListsWrapper,
						start: "bottom 80%",
						end: '+=50%',
						scrub:true,
					},
					duration: 0.2,
					opacity: 1,
					delay: function() {
						return gsap.utils.random(0, 1);
					},
					ease: Linear.easeNone,
				});
				
			});
			
			if (!isMobile()) {
				
				$(".projects-list-captions li").mouseenter(function(e) {
					$('#ball p').remove();
					var $this = $(this);
					var index = $this.index();	
					var videoElement = $('.projects-list-images li').eq(index).find('video').get(0);
					if (videoElement) {
						videoElement.play(); 
					}						
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.4, borderColor:"rgba(0,0,0,0)", backgroundColor:"rgba(0,0,0,0.3)"});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$("#ball").addClass("with-blur");
					$( "#ball" ).append( '<p class="center-first">' + $this.data("centerline") + '</p>' );					
				});
								
				$(".projects-list-captions li").mouseleave(function(e) {					
					var $this = $(this);
					var index = $this.index(); 
					var videoElement = $('.projects-list-images li').eq(index).find('video').get(0);
					if (videoElement) {
						videoElement.pause(); 
					}
					
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-blur");
					$('#ball p').remove();	
				});
			}
			
			
			if (!$("body").hasClass("disable-ajaxload")) {
				$('.projects-list-captions li span').on('click', function() {
					
					$("body").addClass("load-project-thumb").addClass("show-loader");
    
					var clickedIndex = $(this).closest('li').index(); 
										
					$('.projects-list-captions li').eq(clickedIndex).addClass('above');
					
					$('.projects-list-images li').eq(clickedIndex).find('.trigger-item-link').click();					
					
					gsap.to('.projects-list-images', {duration: 0.3, backgroundColor:"transparent", ease:Power2.easeInOut});	
					
					var onLeaveShuffle = gsap.utils.toArray('.projects-list-captions li');
					
					function animateShuffleForLi(liIndex) {
						var shuffleTitleLeave = onLeaveShuffle[liIndex];
						var spans = shuffleTitleLeave.querySelectorAll('span');
						var liDelay = Math.abs(clickedIndex - liIndex) * 0.4; 
						
						spans.forEach(function(span) {
							// Aplică shuffle
							shuffleFunctions.startShuffle(span, {
								velocity: 40,
								shuffleIterations: 6,
								childSelector: 'span'
							});
				
							// Animația de opacitate
							gsap.to(span, {
								opacity: 0,
								duration: 0.4,
								delay: liDelay
							});
						});
					}
					
					// Animația pentru 'li'-ul click-uit
					animateShuffleForLi(clickedIndex);
					
					// Animația pentru 'li'-urile din stânga și dreapta
					for (var i = 1; i < onLeaveShuffle.length; i++) {
						if (clickedIndex - i >= 0) {
							animateShuffleForLi(clickedIndex - i); // Elemente spre stânga
						}
						if (clickedIndex + i < onLeaveShuffle.length) {
							animateShuffleForLi(clickedIndex + i); // Elemente spre dreapta
						}
					}
					
					$('.projects-list-images li.trigger-item').each(function(){
						if (!$(this).hasClass("above")) {
							gsap.to($(this), {duration: 0.5, delay:0, opacity:0, ease:Power4.easeInOut});
						} else  {
							gsap.to($(this), {duration: 0.5, delay:0.4, opacity:0, ease:Power4.easeInOut});	
						}
					});
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();				
				});
				
			}  else {				
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
			}
			
		}
		
		
		if ($(".projects-list-wrapper").hasClass("invert-header-color")) {
			
			var changeMainColor = gsap.utils.toArray('.invert-header-color');	
			changeMainColor.forEach(function(changeHeaderColor) {
			
				imagesLoaded('body', function() {
					
					const bgPageContent = document.getElementById("clapat-page-content");
					
					let startBackgroundColor;
					let endBackgroundColor;
					let startHeaderGradient;
					let endHeaderGradient;
					let startLinkColor;
					let endLinkColor;
					let startButtonColor;
					let endButtonColor;
					
					
					if (bgPageContent.classList.contains('light-content')) {
						
						startBackgroundColor = "#000";
						endBackgroundColor = "#ebebeb";
						
						startHeaderGradient = "rgba(0,0,0,1)";
						endHeaderGradient = "rgba(235,235,235,1)";
						
						startLinkColor = "#fff";
						endLinkColor = "#000";
						
						startButtonColor = "#fff";
						endButtonColor = "#000";
						startButtonShadow = "inset 0 0 15px rgba(255,255,255,0.5)";
						endButtonShadow = "inset 0 0 15px rgba(0,0,0,0.3)";
						
					} else if (bgPageContent.classList.contains('dark-content')) {
						
						startBackgroundColor = "#ebebeb";
						endBackgroundColor = "#000";
						
						startHeaderGradient = "rgba(235,235,235,1)";
						endHeaderGradient = "rgba(0,0,0,1)";
						
						startLinkColor = "#000";
						endLinkColor = "#fff";
						
						startButtonColor = "#000";
						endButtonColor = "#fff";						
						startButtonShadow = "inset 0 0 15px rgba(0,0,0,0.3)";
						endButtonShadow = "inset 0 0 15px rgba(255,255,255,0.5)";
					}
					
					const blackLogoOpacity = gsap.getProperty('#clapat-logo img.black-logo', 'opacity');
					const whiteLogoOpacity = gsap.getProperty('#clapat-logo img.white-logo', 'opacity');
					
					
								
					
					const buttonColor = gsap.getProperty('.button-icon-link', 'color');
					const buttonShadowColor = gsap.getProperty('.button-icon-link', 'boxShadow');
				
					const scrollTriggerEnter = {
						trigger: changeHeaderColor,
						start: 'top 25%',
						end: '+=25%',
						scrub: true,
						onEnter: function() {
							bgPageContent.classList.add('no-css-animation');
						},
						onEnterBack: function() {
							bgPageContent.classList.add('no-css-animation');
						},
						onLeave: function() {
							bgPageContent.classList.remove('no-css-animation');
						},
						onLeaveBack: function() {
							bgPageContent.classList.remove('no-css-animation');
							gsap.set('#clapat-logo img.black-logo, #clapat-logo img.white-logo', {opacity: "" });
						}
					};
					
					
					ScrollTrigger.create({
						trigger: changeHeaderColor,
						start: 'top 25%',
						end: '+=25%',
						onEnter: function( st ) {
							
							gsap.fromTo('.header-gradient', {
								backgroundColor: startHeaderGradient
							}, {
								duration: 1, 
								backgroundColor: endHeaderGradient,
								opacity:0,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerEnter								
							});
							
							gsap.fromTo('#clapat-logo img.black-logo', {
								opacity: blackLogoOpacity
							}, {
								duration: 1, 
								opacity: whiteLogoOpacity, 
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerEnter
							});
							
							gsap.fromTo('#clapat-logo img.white-logo', {
								opacity: whiteLogoOpacity
							}, {
								duration: 1, 
								opacity: blackLogoOpacity,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerEnter
							});
							
							if (!isMobile()) {
							
								gsap.fromTo('.classic-menu .flexnav li a', {
									color: startLinkColor
								}, {
									duration: 1, 
									color: endLinkColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerEnter
								});
							
							}
							
							gsap.fromTo('.button-wrap.menu', {
								color: startButtonColor
							}, {
								duration: 1, 
								color: endButtonColor,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerEnter
							});
							
							gsap.fromTo('.button-icon-link', {
								color: startButtonColor,
								boxShadow: startButtonShadow
							}, {
								duration: 1, 
								color: endButtonColor,
								boxShadow: endButtonShadow,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerEnter
							});
							
						},
						scrub: true,
					});
					
					
					
					const scrollTriggerLeave = {
						trigger: changeHeaderColor,
						start: 'bottom 100%',
						end: '+=50%',
						scrub: true,
						onEnter: function( st ) { 
							bgPageContent.classList.add('no-css-animation');
						},
						onEnterBack: function() {
							bgPageContent.classList.add('no-css-animation');
						},
						onLeave: function() {
							bgPageContent.classList.remove('no-css-animation');
							document.body.classList.remove('bg-animation');							
						},
						onLeaveBack: function() {
							bgPageContent.classList.remove('no-css-animation');
						}
					};
					
					
					ScrollTrigger.create({
						trigger: changeHeaderColor,
						start: 'bottom 100%',
						end: '+=50%',
						onEnter: function( st ) {
							
							gsap.fromTo('.header-gradient', {
								backgroundColor: endHeaderGradient
							}, {
								duration: 1, 
								backgroundColor:  startHeaderGradient,
								opacity:1,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerLeave
							});
							
							gsap.fromTo('#clapat-logo img.black-logo', {
								opacity: whiteLogoOpacity
							}, {
								duration: 1, 
								opacity: blackLogoOpacity, 
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerLeave
							});
							
							gsap.fromTo('#clapat-logo img.white-logo', {
								opacity: blackLogoOpacity
							}, {
								duration: 1, 
								opacity: whiteLogoOpacity, 
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerLeave
							});
							
							if (!isMobile()) {
							
								gsap.fromTo('.classic-menu .flexnav li a', {
									color: endLinkColor
								}, {
									duration: 1, 
									color: startLinkColor,
									ease: Linear.easeNone,
									scrollTrigger: scrollTriggerLeave
								});
							
							}
							
							gsap.fromTo('.button-wrap.menu', {
								color: endButtonColor
							}, {
								duration: 1, 
								color: startButtonColor,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerLeave
							});
							
							gsap.fromTo('.button-icon-link', {
								color: endButtonColor,
								boxShadow: endButtonShadow,								
							}, {
								duration: 1, 
								color: startButtonColor,
								boxShadow: startButtonShadow,
								ease: Linear.easeNone,
								scrollTrigger: scrollTriggerLeave
							});
							
						},
						scrub: true,
					});
					
					$('.trigger-item').on('click', function() {
						gsap.to('.header-gradient', { duration: 0.3, delay:0, opacity: 0, ease: Linear.easeNone, });
						gsap.to('#clapat-logo img.white-logo, #clapat-logo img.black-logo', { duration: 0.5, delay:1, opacity: "",  ease: Linear.easeNone, });
						gsap.to('.classic-menu .flexnav li a', { duration: 0.5, delay:1, color: "", ease: Linear.easeNone, });			
						gsap.to('.button-icon-link', { duration: 0.5, delay:1.1, color: "", boxShadow: "", ease: Linear.easeNone, });
					});
				
				});
			
			});	
			
		}
			
	}//End Showcase Lists	
	
	
	

	window.LoadViaAjax = function() {			
		CleanupBeforeAjax();	
		FirstLoad();
		ScrollEffects();
		Sliders();
		PageLoadActions();
		ShowcasePortfolio();
		ShowcaseCarousel();
		ShowcaseGallery();
		ShowcaseLists();
		FitThumbScreenWEBGL();		
		LazyLoad();	
		Shortcodes();		
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		ContactForm();
		ContactMap();
		CustomFunction();
		ShuffleElementsFunction();
		InitShuffleElements();
		
	}//End Load Via Ajax
	
});	


var LoadViaAjax = window.LoadViaAjax;	
	
	
