export function store_unit_converter(size,from,to) {
	var converted = size;
	if (from === 'K') {
		if (to === 'M') {
	converted /= 1024;	
		}

	}
	if (from === 'G') {
		if (to === 'M') {
			converted *= 1024;	
		}
	}
	if (from === 'M') {
		
	}

	return converted;
}