import { OpenAPIV2 } from "openapi-types";

import { initIO } from "../io";

const io = initIO("Api.ts");
const { w, out, copy } = io;

export const generateApi = (spec: OpenAPIV2.Document) => {
    if (!spec.paths) {
        return;
    }

    w("/* eslint-disable */\n");

    w(`
    /**
     * this source code form is subject to the terms of the mozilla public
     * license, v. 2.0. if a copy of the mpl was not distributed with this
     * file, you can obtain one at https://mozilla.org/mpl/2.0/.
     *
     * copyright oxide computer company
     */
  `);

    copy("./static/utils.ts");
    copy("./static/http-client.ts");

    w(`import type { FetchParams } from './http-client'
    import { HttpClient, toQueryString } from './http-client'`);

    w(`export type {
      ApiConfig,
      ApiResult,
      ErrorBody,
      ErrorResult,
    } from './http-client'
    `);

    w(`export class Api extends HttpClient {
       methods = {`);
    w(`}
     }`);

    out.end();
};
