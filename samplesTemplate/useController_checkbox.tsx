import { useForm,Controller,SubmitHandler } from "react-hook-form";
import {Checkbox} from "@mui/material"

type MyFormData = {
    //true or false
    isChecked:boolean
}

export default function CheckBoxApp(){
    //handleSubmit ------ フォームの制御とバリデーションを管理するために使用
    //control ----------- フォーム内の各フィールドを制御するためのオブジェクト
    //Controllerコンポーネントで使用される
    //errors　------------- フォームバリデーションエラーメッセージを格納するオブジェクト
    //MyFormdata --------- フォームデータの型を表す
    const {handleSubmit,control,formState:{errors}} = useForm<MyFormData>()
    const onSubmit:SubmitHandler<MyFormData> = (data) =>{
        console.log(data)
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller name="isChecked" control={control} defaultValue={false} rules={{required:true}} render={({field:{onChange,value}})=><Checkbox onChange={onChange} value={value}/>} />
            {errors.isChecked && <label>チェックしてください</label>}
            <input type="submit" />
        </form>
    )
}