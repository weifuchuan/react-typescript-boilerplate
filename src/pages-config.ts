export interface Page {
	name: string; // 页面名，需与目录名相同
	template?: string; // .html模板文件名，如有，应为相对于该页面目录的html文件路径；否则为 public/index.html
	filename?: string; // 输出文件名，默认 <name>.html
	title?: string; // html的title, 默认 name
}

export default [
	{
		name: 'index'
	},
	{
		name: 'todo-app-with-redux',
		template: 'index.html'
	}, 
	{
		name:"with-redux-saga"
	}
] as Page[];
