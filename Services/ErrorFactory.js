import { ERROR_LABELS } from '../utills/enums';

class ErrorFactory {

    constructor (label) {

        let errorResponse = { success: false }

        switch (label) {
            case ERROR_LABELS.MISSING_INPUTS:
                errorResponse = {
                    ...errorResponse,
                    status: 400,
                    message: "All inputs are required!"
                }
                break;
            case ERROR_LABELS.INVALID_CREDS:
                errorResponse = {
                    ...errorResponse,
                    status: 400,
                    message: "Invalid values/credentions provided!"
                }
                break;
            default:
                errorResponse = {
                    ...errorResponse,
                    status: 500,
                    message: label
                }
        }

        this.errorResponse = errorResponse;
    }

    getResponse () {
        return this.errorResponse;
    }
}

export default ErrorFactory;
