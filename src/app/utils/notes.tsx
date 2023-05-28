export function getTitle(title: string, content: string) {
	if (title) {
		return trimToNearestWord(title, 25);
	}

	if (content) {
		return trimToNearestWord(content, 25);
	}

	return "Untitled";
}

function trimToNearestWord(str: string, maxLength: number) {
	if (str.length <= maxLength) {
		return str; // No need to trim
	}

	var trimmedStr = str.substring(0, maxLength); // Trim to specified length
	var lastSpaceIndex = trimmedStr.lastIndexOf(' ');

	if (lastSpaceIndex !== -1) {
		trimmedStr = trimmedStr.substring(0, lastSpaceIndex); // Trim to the last space
	}

	return trimmedStr;
}
