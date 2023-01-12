const getClassWithPrefix = (s, className, prefix) => prefix ? ` ${s[className + '_' + prefix]}` : null;
const styles = { getClassWithPrefix };
export default styles;