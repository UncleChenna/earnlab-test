export const Capitalize = (value: string) => {
	const lower = value.toLowerCase();

	return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export const CapitalizeAll = (value: string) => {
	return value.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
		letter.toUpperCase(),
	);
};
