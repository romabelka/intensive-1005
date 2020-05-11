import {observable, computed, action, autorun} from 'mobx'


class AuthStore {
    constructor() {
        autorun(() => {
            console.log(this.email, ' ', this.password)
        })
    }

    @observable email = ''
    @observable password = ''

    @computed get isValidPassword() {
        return this.password.length >= 8
    }

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password
}

export default new AuthStore()
