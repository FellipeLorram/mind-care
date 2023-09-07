export function generateTimeSlots(fromTime: string) {
	const timeSlots = [];
	const currentTime = new Date();
	const [fromHours, fromMinutes] = fromTime.split(':').map(Number);

	// Set the current time to the provided fromTime
	currentTime.setHours(fromHours!, fromMinutes, 0, 0);
	const endTime = new Date();
	endTime.setHours(21, 0, 0, 0); 

	while (currentTime <= endTime) {
		const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		timeSlots.push(timeString);

		currentTime.setTime(currentTime.getTime() + 15 * 60 * 1000);
	}

	return timeSlots;
}
