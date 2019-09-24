/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
interface JSONUtils {
    serialize(obj: {}): string;
    parse(text: string): any;
}
declare const JSONUtils: JSONUtils;
export default JSONUtils;
