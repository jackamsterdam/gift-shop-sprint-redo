import { SyntheticEvent, useEffect, useState } from "react";
import TargetModel from "../../../Models/TargetModel";
import giftsService from "../../../Services/giftsService";
import "./GiftList.css";
import notify from "../../../Services/NotifyService";
import GiftModel from "../../../Models/GiftModel";

function GiftList(): JSX.Element {

    const [targets, setTargets] = useState<TargetModel[]>([])
    const [gifts, setGifts] = useState<GiftModel[]>([])
    // the useefect needs to update something right --- it updates state so we need state 

    // useEffect(() => {

    //     (async function () {

    //         try {
    //             const targets = await giftsService.getAllTargets()
    //             setTargets(targets)
    //         } catch (err: any) {
    //             notify.error(err)
    //         }

    //     })()

    // }, [])

    useEffect(() => {
        giftsService.getAllTargets()
            .then(targets => setTargets(targets))
            .catch((err: any) => notify.error(err))
        //  יש גישה לבקאנד והחזרת כל התנותנים 
    }, [])

    // גולשים פה לשרת   //! : Promise<void>   ???????
    async function handleChange(e: SyntheticEvent) {
        // i want to know what targetid was chosen 
        // e has a target but has no value cause sythetic event is general to all events and event can be event of a paragaraph and paragraph doesnt have a value only inputs have value אז תמיר לי את הטרגט אז htmlselectelemetn and for suer htmlelement has a value 
        try {
            const targetId = +(e.target as HTMLSelectElement).value
            console.log('targetId in select ', targetId)
            const gifts = await giftsService.getGiftsByTargetId(targetId)  //איפה אתה מאחסן את המתנות ??? בסטייט אז תעשה סטייט למתנות
            setGifts(gifts)
            //we wantt to send value to server not the name cause server deals with targetId
        }
        catch (err: any) {
            notify.error(err)
        }

    }

    async function deleteGift(id: number):Promise<void> {
         try {
             await giftsService.deleteGift(id)   //you can do more things here!! 
         } catch (err:any) {
             notify.error(err)
         }
    }

    return (
        <div className="GiftList">
            <select onChange={handleChange} defaultValue=''>
                <option disabled value="">Select Target Audience</option>
                {targets.map(t => <option key={t.targetId} value={t.targetId}>{t.name}</option>)}
            </select>


            <table>
                <thead>
                     <tr>
                         <th>Target Audience</th>

                         <th>Gift Name</th>
                         <th>Description</th>
                         <th>Price</th>
                         <th>Discount</th>
                     </tr>
                </thead>
                <tbody>
                    {gifts.map(g => <tr key={g.giftId}>
                        {/* פה מתחיל השדות עצמם  */}
{/* we added JOIN targetName: !~~ / */}
                        <td>{g.targetName}</td>
                            <td>{g.giftName}</td>
                            <td>{g.description}</td>
                            <td>{g.price}</td>
                            <td>{g.discount}</td>

                            <td><button onClick={() => deleteGift(g.giftId)}>DELETE</button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default GiftList;






// useEffect(() => {
//     try {

//         (async function(){

//           const targets = await giftService.getAllTargets()
//           setTargets(targets)


//         })()


//     } catch (err:any) {
//         notify.error(err)
//     }
// }, [])














// function handleChange(e:SyntheticEvent) {
//     const value = (e.target as HTMLSelectElement).value 
//     giftService.getGiftsByTargetId(value)
// }

{/* <select onChange={handleChange}>
<option disabled selected>Select target </option>
{targets.map(t => <option key={t.targetId} value={t.targetId}>{t.name}</option>)}
</select>

<table>
<thead>
 <tr>
     <th>name </th>
     <th>description </th>
     <th>proce</th>
     <th>discount</th>
     <th></th>
 </tr>
</thead>
<tbody>
 {gifts.map(g => <tr key={g.giftId}><td>{g.giftId}</td></tr>)}

</tbody>
</table> */}