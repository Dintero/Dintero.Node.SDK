/* eslint-disable */

/**
 * this source code form is subject to the terms of the mozilla public
 * license, v. 2.0. if a copy of the mpl was not distributed with this
 * file, you can obtain one at https://mozilla.org/mpl/2.0/.
 *
 * copyright oxide computer company
 */
import type { FetchParams } from "./http-client";
import { HttpClient, toQueryString } from "./http-client";

export type {
    ApiConfig,
    ApiResult,
    ErrorBody,
    ErrorResult,
} from "./http-client";

export class Api extends HttpClient {
    methods = {};
}
