import { toast } from "react-toastify";

export enum MessageType
{
    NOT_FOUND,
    SERVER_ERROR,
    FORM_ERROR,
    SUCCESS
}

interface IUseNotify
{
    text?: string;
    messageType: MessageType;
    type: "success" | "error";
}

const messages =
{
    [MessageType.NOT_FOUND] : "No resources found",
    [MessageType.SERVER_ERROR] : "Some error occured on server",
    [MessageType.FORM_ERROR] : "Form has ivalid values",
    [MessageType.SUCCESS] : "Action is successfull!"

}


export const useNotify = () =>
{
    const notify = ({text,messageType,type}:IUseNotify) => () => {

        switch(messageType)
        {
            case MessageType.SUCCESS,  MessageType.FORM_ERROR:
            {
                toast(text, { hideProgressBar: true, autoClose: 5000, type: 'success' })
            }
            default:
            {
                toast(messages[messageType], { hideProgressBar: true, autoClose: 10000, type: "error" })
            }
        }
    };

    return {notify};
}