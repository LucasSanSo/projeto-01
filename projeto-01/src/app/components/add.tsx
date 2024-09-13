import React from "react";
interface Props{
    task : string;
    onSubmit: (e: React.FormEvent) => void;
    onChange:  (e:React.ChangeEvent<HTMLInputElement>) =>void;
    
}

export default function Add({task, onSubmit, onChange}: Props){
return(

    
);
}