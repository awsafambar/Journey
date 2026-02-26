import { useEffect } from "react"
import { callVideo } from "../../../../../helper/webrtc"

export const WebRtc = () => {

    useEffect(() => {
        console.log("WebRtc component mounted")
        callVideo()
    },[])

    return (
        <div>WebRtc</div>
    )
}
