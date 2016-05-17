/**
 * This class provides the NameList service with methods to
 * read names and add names.
 */
export class GlobalVarService {

    private _loggedIn: boolean = false;

    /**
     * Returns the boolean of _loggedIn var.
     * @return {boolean[]} of _loggedIn
     */
    get logIn(): boolean {
        return this._loggedIn;
    }

    /**
     * Sets the value to the _loggedIn var.
     * @param {boolean} value to set _loogedIn var
     */
    set logIn(value: boolean) {
        this._loggedIn = value;
    }

}
