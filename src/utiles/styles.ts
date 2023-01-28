const getClassWithPrefix = (s:any, className:string, prefix:string|null):string|null => (prefix ? ` ${s[`${className}_${prefix}`]}` : null);
const styles = { getClassWithPrefix };
export default styles;
