export class InvalidTokenError extends Error {}

InvalidTokenError.prototype.name = 'InvalidTokenError';

const b64DecodeUnicode = (str: string) => {
    return decodeURIComponent(
        atob(str).replace(/(.)/g, (m, p) => {
            let code = p.charCodeAt(0).toString(16).toUpperCase();

            if (code.length < 2) {
                code = '0' + code;
            }

            return '%' + code;
        }),
    );
};

const base64UrlDecode = (str: string) => {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');

    switch (output.length % 4) {
        case 0:
            break;

        case 2:
            output += '==';

            break;

        case 3:
            output += '=';

            break;

        default:
            throw new Error('base64 string is not of the correct length');
    }

    try {
        return b64DecodeUnicode(output);
    } catch (err) {
        return atob(output);
    }
};

const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

const jwtDecode = (token: string, options: { header: boolean } = { header: false }) => {
    if (typeof token !== 'string') {
        throw new InvalidTokenError('Invalid token specified: must be a string');
    }

    const pos = options.header === true ? 0 : 1;

    const part = token.split('.')[pos];

    if (typeof part !== 'string') {
        throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
    }

    let decoded;

    try {
        decoded = base64UrlDecode(part);
    } catch (e) {
        throw new InvalidTokenError(
            `Invalid token specified: invalid base64 for part #${pos + 1} (${getErrorMessage(e)})`,
        );
    }

    let objContent;

    try {
        objContent = JSON.parse(decoded);
    } catch (e) {
        throw new InvalidTokenError(
            `Invalid token specified: invalid json for part #${pos + 1} (${getErrorMessage(e)})`,
        );
    }

    let tokenExpireTimestamp = null;
    try {
        tokenExpireTimestamp = JSON.parse(atob(token.split('.')[1])).exp;
    } catch {
        console.warn('Could not extract timestamp from token.');
    }

    return { objContent, tokenExpireTimestamp };
};

export default jwtDecode;
