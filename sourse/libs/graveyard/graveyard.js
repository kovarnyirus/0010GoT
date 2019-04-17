function graveyard ( config ) {

	var containerSelector     = 'containerSelector'     in config ? config.containerSelector     : '#graveyard';
	var resetButtonSelector   = 'resetButtonSelector'   in config ? config.resetButtonSelector   : '#graveyard-reset';
	var zoomInButtonSelector  = 'zoomInButtonSelector'  in config ? config.zoomInButtonSelector  : '#graveyard-zoom-in';
	var zoomOutButtonSelector = 'zoomOutButtonSelector' in config ? config.zoomOutButtonSelector : '#graveyard-zoom-out';
	var mapUrl                = 'mapUrl'                in config ? config.mapUrl                : 'graveyard.jpg';
	var jsonUrl               = 'jsonUrl'               in config ? config.jsonUrl               : 'graveyard.json';
	var minZoom               = 'minZoom'               in config ? config.minZoom               : 1/8;
	var maxZoom               = 'maxZoom'               in config ? config.maxZoom               : 8;
	var initialZoom           = 'initialZoom'           in config ? config.initialZoom           : 1;
	var mapWidth              = 'mapWidth'              in config ? config.mapWidth              : 1600;
	var mapHeight             = 'mapHeight'             in config ? config.mapHeight             : 1200;
	var centerOffsetX         = 'centerOffsetX'         in config ? config.centerOffsetX         : 0;
	var centerOffsetY         = 'centerOffsetY'         in config ? config.centerOffsetY         : 0;
	var onGraveClick          = 'onGraveClick'          in config ? config.onGraveClick          : console.log;

	var mapBounds = [[0, 0], [mapWidth, mapHeight]];
	if ( centerOffsetX < 0 ) mapBounds[0][0] += centerOffsetX *2; else if ( centerOffsetX > 0 ) mapBounds[1][0] += centerOffsetY *2;
	if ( centerOffsetY < 0 ) mapBounds[0][1] += centerOffsetY *2; else if ( centerOffsetY > 0 ) mapBounds[1][1] += centerOffsetY *2;

	var zoom = d3.zoom()
		.scaleExtent([minZoom, maxZoom])
		.translateExtent(mapBounds)
		.on('zoom', zoomed);

	var container = d3.select(containerSelector)
		.style('overflow', 'hidden')
		.call(zoom);

	var resetButton = d3.select(resetButtonSelector).on('click', resetted);
	var zoomInButton = d3.select(zoomInButtonSelector).on('click', zoomedIn);
	var zoomOutButton = d3.select(zoomOutButtonSelector).on('click', zoomedOut);

	var content = container.append('div')
		.style('transform-origin', '0 0');

	var initialX = (container.property('clientWidth') - mapWidth * initialZoom) /2 - centerOffsetX * initialZoom;
	var initialY = (container.property('clientHeight') - mapHeight * initialZoom) /2 - centerOffsetY * initialZoom;
	var initialTransform = d3.zoomIdentity.translate(initialX, initialY).scale(initialZoom);

	container.call(zoom.transform, initialTransform);

	content.append('img')
		.attr('src', mapUrl);

	d3.json(jsonUrl)
		.then(function (json) {
			if ( !json.success || !json.data || !json.data.length ) {
				console.warn('Fetch unsuccessful:', json);
				return;
			}

			content.selectAll('div.grave').data(json.data).enter().append('div')
				.classed('grave', true)
				.style('position', 'absolute')
				.style('left',   function (d) { return d.x+'px' })
				.style('top',    function (d) { return d.y+'px' })
				.style('width',  function (d) { return d.w+'px' })
				.style('height', function (d) { return d.h+'px' })
				.on('click', onGraveClick);

		})
		.catch(function (e) {
			console.warn('Fetch failed:', e);
		});

	function zoomed () {
		var xf = d3.event.transform;

		content.style('transform', 'translate('+xf.x+'px,'+xf.y+'px) scale('+xf.k+')');

		resetButton.attr('disabled', xf.toString() == initialTransform.toString() ? '' : null);
		zoomInButton.attr('disabled', xf.k == maxZoom ? '' : null);
		zoomOutButton.attr('disabled', xf.k == minZoom ? '' : null);
	}

	function resetted () {
		container.transition().duration(500).call(zoom.transform, initialTransform);
	}

	function zoomedIn () {
		zoom.scaleBy(container.transition().duration(300), 2);
	}

	function zoomedOut () {
		zoom.scaleBy(container.transition().duration(300), 1/2);
	}
}
