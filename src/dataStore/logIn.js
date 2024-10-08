import { action, makeObservable } from 'mobx';
const baseUrl = "https://react-project-server.onrender.com"

class Login
{
    constructor() {
        makeObservable(this, {
            postLogin:action,
        })
    }

   async postLogin(login) {
        try {
            const res = await fetch(baseUrl + '/login', {
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(login)
            });

            const data = await res;
            return data
        } catch (err) { console.log(err) }

      }
}
const singleton = new Login();
export default singleton;