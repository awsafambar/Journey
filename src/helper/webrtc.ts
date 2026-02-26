export const openMediaDevices = async (constraints: MediaStreamConstraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
}

export const callVideo = async () => {
    try {
        const stream = await openMediaDevices({ 'video': true, 'audio': true });
        console.log('Got MediaStream:', {stream});
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}