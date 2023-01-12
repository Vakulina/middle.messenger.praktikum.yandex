const getClassWithPrefix = (s, className, prefix) => prefix ? ` ${s[className + '_' + prefix]}` : null;
export default styles = { getClassWithPrefix }