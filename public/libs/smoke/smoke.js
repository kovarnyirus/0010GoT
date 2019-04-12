function initSmoke ( config ) {
	var requestAnimationFrame = window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame;

	var canvasEl = config.canvasElement,
		ctx = canvasEl.getContext("2d");

	var particlesBuffer = [],
		before = new Date().getTime(),
		emitter = config.emitter,
		particle = config.particle;

	var maxTick = 'maxTick' in emitter ? emitter.maxTick : 250,
		startSize = particle.startSize,
		addSize = particle.endSize - startSize,
		maxAge = particle.maxAge * 1000,
		maxAlpha = particle.maxAlpha,
		vxFactor = particle.xVelocityAmp / 500,
		vyFactor = particle.yVelocityAmp / 500,
		vxOffset = particle.xVelocityMean / 1000 - vxFactor/2,
		vyOffset = particle.yVelocityMean / 1000 - vyFactor/2,
		vaFactor = particle.angularVelocityAmp / 500;

	for ( var pi = 0; pi < emitter.maxCount; ++pi ) {
		particlesBuffer[pi] = initParticle();
		particlesBuffer[pi].age = Math.round(maxAge * pi / emitter.maxCount);
	}

	var particleImage = new Image();
	particleImage.onload = render;
	particleImage.src = particle.imageUrl;

	return {
		moveEmitterTo: moveEmitterTo,
	};

	function render () {
		requestAnimationFrame(render);
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

		var now = new Date().getTime(), tick = now - before;
		before = now;
		if ( tick > maxTick ) tick = maxTick;

		for ( var pi = 0; pi < particlesBuffer.length; ++pi ) {
			var p = particlesBuffer[pi];
			var ageFactor = p.age / maxAge;

			if ( ageFactor > 1 ) {
				particlesBuffer.splice(pi, 1);
				particlesBuffer.unshift(initParticle());

			} else {
				var size = startSize + addSize * ageFactor;
				var alpha = maxAlpha - maxAlpha * ageFactor;
				p.age += tick;
				p.x += p.vx * tick;
				p.y += p.vy * tick;
				p.angle += (Math.random() * vaFactor - vaFactor/2) * tick;

				ctx.save();
				ctx.translate(p.x + emitter.x, p.y + emitter.y);
				ctx.rotate(p.angle);
				ctx.globalAlpha = alpha;
				ctx.drawImage(particleImage, -size/2, -size/2, size, size);
				ctx.restore();
			}
		}
	}

	function initParticle () {
		return {
			x: 0,
			y: 0,
			age: 0,
			vx: Math.random() * vxFactor + vxOffset,
			vy: Math.random() * vyFactor + vyOffset,
			angle: Math.random() * 2 * Math.PI,
		};
	}

	function moveEmitterTo ( x, y ) {
		emitter.x = x;
		emitter.y = y;
	}

}
