class LocalStorage {
    /*
        This flag limits the usage of LocalStorage keys.
        If set to TRUE, it will check key if exists in the allowed list.
        If set to FALSe, it will not check and will ignore the allowed list.
     */
    checkKeys = true

    constructor() {
        this.allowed_keys = ['token','username']
    }

    /**
     * Set specific local storage key's value
     * @param _key {string} | Example: data_departments_list
     * @param _value {object} | Example: [{id: number, name: string}]
     */
    set_item(_key, _value) {
        if (this.checkKeys) {
            // Check if key is valid
            const valid_key = this.is_valid_key(_key)

            if (valid_key) {
                window.localStorage.setItem(_key, _value);
                // window.localStorage.setItem(_key, JSON.stringify(_value));
            }
            else {
                console.error(`[LocalStorage] Can not set item, key [${_key}] is invalid!`)
                return 0
            }
        }
        else {
            window.localStorage.setItem(_key, _value);
            // window.localStorage.setItem(_key, JSON.stringify(_value));
        }
    }

    /**
     * Get specific local storage key's value
     * @param _key {String}
     */
    get_item(_key) {
        if (this.checkKeys) {
            // Check if key is valid
            const valid_key = this.is_valid_key(_key)

            if (valid_key) {
                return window.localStorage.getItem(_key);
                // return JSON.parse(window.localStorage.getItem(_key));
            }
            else {
                console.error(`[LocalStorage] Can not get item, key [${_key}] is invalid!`)
                return 0
            }
        }
        else {
            return window.localStorage.getItem(_key);
            // return JSON.parse(window.localStorage.getItem(_key));
        }
    }
    remove_item(_key){
        return window.localStorage.removeItem(_key);
    }

    /**
     * Check if passed _key is valid
     * @param _key {String}
     */
    is_valid_key(_key) {
        let valid = false
        if (this.allowed_keys.indexOf(_key) !== -1) {
            valid = true
        }
        return valid
    }

}

export default new LocalStorage()
// export default LocalStorage