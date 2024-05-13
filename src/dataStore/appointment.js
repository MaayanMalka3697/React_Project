import { makeObservable, observable, computed, action, runInAction } from 'mobx';
var IDcnt = 0;

function IDcounter() {
    return ++IDcnt;
}
function ExtractDate(dateTimeString) {

    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    
   
    const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

    return formattedDate;
}



function ExtractTime(dateTimeString) {

   const t=dateTimeString.slice(11,18)
    
    console.log("t",t);
    console.log("dateTimeString",dateTimeString);
  return t;

}

function checkDateStatus(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();
    console.log(currentDate);
   
    date.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0, 0, 0, 0);

    if (date.toISOString().slice(0, 10) === currentDate.toISOString().slice(0, 10)) {
        return "Today";
    } else if (date < currentDate) {
        return "Over";
    } else {
        return "Future";
    }

}


const baseUrl = "http://localhost:8787"
class apponitment {
    list = [];

    constructor() {
        makeObservable(this, {
            list: observable,
            initData: action,
            getMeetings: computed,
            CheckTheDate: action
        });
        this.initData();
    }

    async initData() {
        try {
            const res = await fetch(baseUrl + '/appointments');
            const data = await res.json();
            this.list = data;
            runInAction(() => {

                this.list = data;
            });

           
        }
        catch (err) {
            console.log(err);
        }
        

    }


    get getMeetings() {

       
        console.log("id appointment: ", IDcnt)
        
        let data=this.list.slice(0,this.list.length) ;
        console.log("id appointment after: ", IDcnt)

        const compareDates = (a, b) => new Date(a.date) - new Date(b.date);

       
        data.sort((a, b) => {
            const dateA = new Date(a.dateTime).getDate();
            const dateB = new Date(b.dateTime).getDate();
            const today = new Date().getDate();

            if (dateA === today) return -1; 
            if (dateA > today && dateB !== today) return -1; 
            return compareDates(a, b); 
        });
    
        var newArray = [];
        console.log("data array", data);
        for (var i = 0; i < data.length; i++) {
            newArray[i] = {
                id: i,
                serviceType: data[i].serviceType,
                date: ExtractDate((data[i].dateTime)),
                time: ExtractTime((''+data[i].dateTime)),
                clientName: data[i].clientName,
                clientPhone: data[i].clientPhone,
                clientEmail: data[i].clientEmail,
                IsOver: checkDateStatus(data[i].dateTime)

            }
            console.log("service type", data[i].serviceType);
            



        }


       
        return newArray;
    }

    async CheckTheDate(appointment) {

        try {
            const res = await fetch(baseUrl + '/appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              
                body: JSON.stringify(appointment)
            });

          
            const data = await res;
            // console.log(data);
            this.list.push(appointment);//
            this.initData();
            // console.log(appointment);
            return data.status;
        } catch (err) { console.log(err) }


    }

}

// Expects a JSON body with an `dateTime` field. It checks if the time is available and if so,
//  adds a new appointment to the appointments array and returns a success message.
//  If the time is not available, it returns a failure message.


const singleton = new apponitment();
export default singleton;








