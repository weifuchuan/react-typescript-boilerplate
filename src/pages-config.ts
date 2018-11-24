export interface Page {
	name: string; // 页面名，需与目录名相同
	template?: string; // .html模板文件名，置于 public/ 中，默认index.html
	filename?: string; // 输出文件名，默认 <name>.html
	title?: string; // html的title, 默认 name
}

export default [
	{
		name: 'index'
	},
	{
		name: 'admin'
	},
	{
		name: 'about'
	}
] as Page[];
