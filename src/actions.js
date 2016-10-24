import { colorList } from './colors'

export const hexToRgb = (hex) => {
    	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16),
    } : null;
}

const similarIndex = (target, candidate) => {
  const grayLevelEquivalent = {
    r: 30,
    g: 59,
    b: 11,
  }
	return (
    grayLevelEquivalent.r * Math.pow((candidate.r - target.r), 2) +
    grayLevelEquivalent.g * Math.pow((candidate.g - target.g), 2) +
    grayLevelEquivalent.b * Math.pow((candidate.b - target.b), 2)
  )
}

export const findSimilarColor = (target) => {
	let minDiff = 1000000
	let nearest
	colorList.forEach(function(item) {
		const candidate = hexToRgb(item.rgb)
    	const diff = similarIndex(target, candidate)
    	if (diff < minDiff) {
    		minDiff = diff
    		nearest = item
    		console.log('Boom', nearest) // TODO: add color changer callback
    	}
	})
	return nearest
}
