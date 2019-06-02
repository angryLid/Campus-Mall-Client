async function test() {
	console.log('Hello');
	await sleep(500);
	console.log('world!');
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export default test;
