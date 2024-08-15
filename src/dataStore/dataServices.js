import { action, computed, makeObservable, observable, runInAction } from 'mobx';

const baseUrl = "https://react-project-server.onrender.com"
class DataServices {
    list = [{
        name: "Enter A New Service",
        description: "Enter The Description",
        price: 0,
        duration: 0,

    }];
    used;
    constructor() {
        makeObservable(this, {
            list: observable,
            used:observable,
            init: action,
            getAllService: computed,
            getUsed: computed
        }),
             this.used = false;
            this.init();
    }

    async init() {
        try {
            const res = await fetch(baseUrl + "/services");
            const data = await res.json();

            runInAction(() => {
                if (data.length !== 0) {
                    this.list = data;
                    this.used=true;
                }
            });
            if (data.length !== 0) {
                this.used=true;
                localStorage.setItem('exist','true');
            }
        }
        catch (err) {
            console.error(err)
        }

    }

    get getAllService() {
        return this.list
    }

    async addService(service) {
        try {
            const res = await fetch(baseUrl + '/service', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(service)
            });

            const data = await res;
            this.init();
            this.used = true;
            localStorage.setItem('exist','true');
            return data;
        } catch (err) { console.log(err) }


    }

    get getUsed() {
        return this.used == true ? true : false;
    }


}
const singleton = new DataServices();
export default singleton;