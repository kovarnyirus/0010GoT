document.addEventListener('DOMContentLoaded', function() {
	var div = document.createElement('div');
	div.style = 'pointer-events: none; overflow: hidden; position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%;';
	document.body.appendChild ( div );

	var density = 50,
		speed = 1.5,
		height = div.clientHeight,
		width = div.clientWidth,
		start = {
			yMin: height + 50,
			yMax: height,
			xMin: (width / 2) + 10,
			xMax: (width / 2) + 40,
			scaleMin: 0.1,
			scaleMax: 0.25,
			scaleXMin: 0.1,
			scaleXMax: 2,
			scaleYMin: 1,
			scaleYMax: 3,
			opacityMin: 0.1,
			opacityMax: 0.4
		},
		mid = {
			yMin: height * 0.4,
			yMax: height * 0.9,
			xMin: width * 0.1,
			xMax: width * 0.9,
			scaleMin: 0.2,
			scaleMax: 2,
			opacityMin: 0.1,
			opacityMax: 0.5
		},
		end = {
			yMin: -180,
			yMax: 0,
			xMin: -100,
			xMax: width + 180,
			scaleMin: 0.1,
			scaleMax: 1,
			opacityMin: 0.5,
			opacityMax: 0.9
		};


	window.onresize = function () {
		var height = div.clientHeight,
			width = div.clientWidth;

		start.yMin = height + 50;
		start.yMax = height;
		start.xMin = (width / 2) + 10;
		start.xMax = (width / 2) + 40;

		mid.yMin = height * 0.4;
		mid.yMax = height * 0.9;
		mid.xMin = width * 0.1;
		mid.xMax = width * 0.9;

		end.xMax = width + 180;
	};

	function range(map, prop) {
		var min = map[prop + 'Min'],
			max = map[prop + 'Max'];
		return min + (max - min) * Math.random();
	}

	function randomEase(easeThis, easeThat) {
		if (Math.random() < 0.5) {
			return easeThat;
		}
		return easeThis;
	}

	function spawn(particle) {
		var wholeDuration = (10 / speed) * (0.7 + Math.random() * 0.4),
			delay = wholeDuration * Math.random(),
			partialDuration = (wholeDuration + 1) * (0.2 + Math.random() * 0.3);
		TweenLite.set(particle, {
			y: range(start, 'y'),
			x: range(start, 'x'),
			scaleX: range(start, 'scaleX'),
			scaleY: range(start, 'scaleY'),
			scale: range(start, 'scale'),
			opacity: range(start, 'opacity'),
			visibility: 'hidden'
		});
		// Moving upward
		TweenLite.to(particle, partialDuration, {
			delay: delay,
			y: range(mid, 'y'),
			ease: randomEase(Linear.easeOut, Back.easeInOut)
		});
		TweenLite.to(particle, wholeDuration - partialDuration, {
			delay: partialDuration + delay,
			y: range(end, 'y'),
			ease: Back.easeIn
		});
		//Moving on axis X
		TweenLite.to(particle, partialDuration, {
			delay: delay,
			x: range(mid, 'x'),
			ease: Power1.easeOut
		});
		TweenLite.to(particle, wholeDuration - partialDuration, {
			delay: partialDuration + delay,
			x: range(end, 'x'),
			ease: Power1.easeIn
		});
		//opacity and scale
		partialDuration = wholeDuration * (0.5 + Math.random() * 0.3);
		TweenLite.to(particle, partialDuration, {
			delay: delay,
			scale: range(mid, 'scale'),
			autoAlpha: range(mid, 'opacity'),
			ease: Linear.easeNone
		});
		TweenLite.to(particle, wholeDuration - partialDuration, {
			delay: partialDuration + delay,
			scale: range(end, 'scale'),
			autoAlpha: range(end, 'opacity'),
			ease: Linear.easeNone,
			onComplete: spawn,
			onCompleteParams: [particle]
		});
	}
	window.onload = createParticle;

	function createParticle() {
		var i, particleSpark;
		for (i = 0; i < density; i += 1) {
			particleSpark = document.createElement('div');
			particleSpark.classList.add('spark');
			div.appendChild(particleSpark);
			spawn(particleSpark);
		}
	}
}, false);
