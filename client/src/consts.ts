// import toast from "react-hot-toast";

export const SOCKET_URL: string = "http://localhost:5001"

export const errMsgHandler = (context: string, err: unknown) => {
    const msg = err instanceof Error ? err.message : "Unknown Error";
    console.error(`${context}`, msg);
}

// const errMsgHandlerToast = (err: unknown, context?: string) => {
//     const msg = err instanceof Error ? err.message : "Unknown Error";
//     console.error(`${context}`, msg);
//     toast.error(context + msg);
// }
