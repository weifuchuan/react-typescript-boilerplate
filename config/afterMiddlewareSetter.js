// @flow
import proxyMiddleware from "./proxyMiddleware"
import type {
	$Application
} from 'express'

export default function (app: $Application) {
	proxyMiddleware && app.use(proxyMiddleware);	
}
 