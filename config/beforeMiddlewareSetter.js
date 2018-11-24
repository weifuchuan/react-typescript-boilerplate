// @flow
import type {
	$Application,
	$Request,
	$Response
} from 'express'

export default function (app: $Application) {
	app.get("/login", (req: $Request, resp: $Response) => {
		resp.end("login");
	});
}