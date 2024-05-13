import '../App.css';
import BussinessData from "../clientScreen/bussinessdata";

export default function AdminScreen() {

     return (<>
          <BussinessData isAdmin={false}></BussinessData>
     </>
     );
}
