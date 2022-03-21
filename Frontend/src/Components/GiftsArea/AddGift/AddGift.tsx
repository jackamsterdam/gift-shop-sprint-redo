import "./AddGift.css";
import {useForm} from 'react-hook-form'
import GiftModel from "../../../Models/GiftModel";
import { useEffect, useState } from "react";
import notify from "../../../Services/NotifyService";
import giftsService from "../../../Services/giftsService";
import { useNavigate } from "react-router-dom";
import TargetModel from "../../../Models/TargetModel";

function AddGift(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<GiftModel>()
    // const { register, handleSubmit, errors } = useForm<GiftModel>()
    const navigate = useNavigate()
//    !dont forget traetmodel not fiftmodel 
    const [targets, setTargets] = useState<TargetModel[]>([])

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
        .catch(err => notify.error(err))
    }, [])


    async function submit(gift: GiftModel) {
        console.log(gift)
        try {

            await giftsService.addGift(gift)


            notify.success('Gift added')
            navigate('/gift-list')  //not home 
        } catch (err: any) {
            notify.error(err)
        }
    }




// btw min="0" they can still write -3 physically so that validation sucks!!n 

    return (
        <div className="AddGift Box">
            <form onSubmit={handleSubmit(submit)} noValidate>

                <label>Target Audience:</label>
                <select defaultValue='' {...register('targetId', {
                    required: {value:true, message:"Missing target audience"}
                })} >
                    <option value=""  disabled>Select Target Audience</option>
                  {targets.map(t => <option key={t.targetId} value={t.targetId}>{t.name}</option>)}
                </select>
                <span>{formState.errors.targetId?.message}</span>

                <label>Gift Name:</label>
                <input type="text" {...register('giftName', {
                    required: {value: true, message: 'Missing gift name'}
                })} />
                <span>{formState.errors.giftName?.message}</span>

                <label>Description:</label>
                <input type="text" {...register('description', {
                    required: {value: true , message: 'Missing description'}
                })} />
                  <span>{formState.errors.description?.message}</span>

                <label>Price:</label>
                <input type="number" step="0.01" min="0" {...register('price', {
                    required: {value: true, message: 'Missing price' },
                    min: {value: 0, message: "Price can't be negative"},
                  

                })} />
                <span>{formState.errors.price?.message}</span>

                <label>Discount:</label>
                <input type="number" step="0.01" {...register('discount', {
                    required: {value: true , message: 'Missing discount'},
                    min: {value: 0, message: "Discount can't be negative"},
                    max: {value: 100, message: "Discount can't exceed 100"}
                })} />
                <span>{formState.errors.discount?.message}</span>

                <button>Add</button>
            </form>
        </div>
    );
}

export default AddGift;
