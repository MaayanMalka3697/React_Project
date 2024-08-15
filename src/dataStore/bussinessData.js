import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { useState } from 'react';
const baseUrl = "https://react-project-server.onrender.com"

class BussinesData {
   data = { id: "1",
   name: "Enter your Business Name",
   address: "Enter Your Business Address",
   phone: "Enter Your Business Phone",
   owner: "Enter the Name of the Business Owner",
   logo: `https://netfree.link/block/paint_block/2k/myset.avif`,
   description: "Enter the Best Description of Your Business"};
   used;
    constructor() {
        makeObservable(this, {

            init: action,
            data: observable,
            addData: action,
            getData: computed,
            getUsed: computed
        }),
            this.used = false;
      
        this.init();
    }

    async init() {
        try {

            const { ...temp } = { ...this.data }
            const res = await fetch(baseUrl + "/businessData");
            let Data = await res.json();

            const proxyObject = Data;
            Data = this.extractRawData(proxyObject);
            console.log("Data", Data);
            runInAction(() => {

                this.data.name = Data.name != "" ? Data.name : temp.name;
                this.data.address = Data.address != "" ? Data.address : temp.address;
                this.data.phone = Data.phone == "" ? temp.phone : Data.phone;
                this.data.owner = Data.owner == "" ? temp.owner : Data.owner;
                this.data.logo = Data.logo == "" ? temp.logo : Data.logo;
                this.data.description = Data.description == "" ? temp.description : Data.description;

            });

        }
        catch (err) {
            console.log(err)
        }

    }
    extractRawData(proxyObject) {

        if (proxyObject != undefined && proxyObject.data != null) {
            return proxyObject.data;
        } else {
            //console.error("Invalid proxy object structure");
            return proxyObject;
        }
    }


    get getData() {
        return this.data //dfghjk
    }

    async addData(newData) {
        {
            try {

                const res = await fetch(baseUrl + '/businessData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newData)
                })
                const data = await res.json();
                this.data = { ...data }
                this.init();
                this.used = true;
            }
            catch (err) { console.log(err) }
        }


    }

    get getUsed() {

        return this.used==true?true:false;
    }
}
const singleton = new BussinesData();
export default singleton;