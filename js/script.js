window.addEventListener('load', function(){
	let s1 = new otherSlider('.gallery-1');
	s1.initControls();

	let s2 = new autoSlider('.gallery-2');
	s2.initControls();
		s2.start(500);
	});

class Slider{
	onBtnPrev = () => this.prev();
	onBtnNext = () => this.next();
	
	constructor(selector){
		let rootElem = document.querySelector(selector);
		this.btnPrev = rootElem.querySelector('.buttons .prev');
		this.btnNext = rootElem.querySelector('.buttons .next');
	
		this.images = rootElem.querySelectorAll('.photos img');
		this.i = 0;
		this.animatedNow = false;
	
		this.animMoveToLeft = [
			{ transform: 'translateX(0)' },
			{ transform: 'translateX(-100%)' }
		];
	
		this.animMoveToRight = [
			{ transform: 'translateX(0)' },
			{ transform: 'translateX(100%)' }
		];
	
	}
	
	initControls(){
		this.btnPrev.addEventListener('click', this.onBtnPrev);
		this.btnNext.addEventListener('click', this.onBtnNext);
	}
	
	prev(){
		if(this.animatedNow){
			return;
		}

		let imgHide = this.images[this.i];
		this.i = ( this.i > 0 ) ? this.i - 1 : this.images.length - 1;
		this.toggleSlides(imgHide, this.images[this.i], false);
	}

	next(){
		if(this.animatedNow){
			return;
		}

		let imgHide = this.images[this.i];
		this.i = ( this.i < this.images.length - 1 ) ? this.i + 1 : 0;
		this.toggleSlides(imgHide, this.images[this.i], true);
	}

	toggleSlides(imgHide, imgShow, isNext){
		this.animatedNow = true;

		imgHide.classList.remove('showed');
		imgHide.animate(isNext ? this.animMoveToLeft : this.animMoveToRight, { duration: 500 });

		imgShow.classList.add('showed');
		let anim = imgShow.animate(isNext ? this.animMoveToRight : this.animMoveToLeft, { duration: 500, direction: 'reverse' });
	
		anim.addEventListener('finish', () => {
			this.animatedNow = false;
		});
	}
}
	class autoSlider extends Slider{
		interval = null;
		
		onBtnPrev = () => {
			this.stop();
			this.prev();
		}
		 
		 onBtnNext = () => {
		 	this.stop();
		 	this.next();
		 }


		start(rate){
			this.stop();
			this.interval = setInterval(() => this.next(), rate);
		}


		stop(){
			clearInterval(this.interval);
			
		}
	}

class otherSlider extends autoSlider{
	toggleSlides(imgHide, imgShow, isNext){
		this.animatedNow = true;

		imgHide.classList.remove('showed');
		let animHide = imgHide.animate(isNext ? this.animMoveToLeft : this.animMoveToRight, { duration: 500 });

		animHide.addEventListener('finish', () =>{
		imgShow.classList.add('showed');
		let anim = imgShow.animate(isNext ? this.animMoveToRight : this.animMoveToLeft, { duration: 500, direction: 'reverse' });
	
		anim.addEventListener('finish', () => {
			this.animatedNow = false;
		});
	});
}
}