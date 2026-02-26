import ListLoader from "./components/InfiniteScrolling/ListLoader"
import { ProgressBar } from "./components/ProgressBar/ProgressBar"
import { SSL } from "./components/SSL/SSL"
import { VirtualizedContainer } from "./components/VirtualizedList/VirtualizedContainer"
import { WebRtc } from "./components/WEBRTC/WebRtc"

export const Learn = () => {

  return (
    <>
      <SSL />
      <WebRtc />
      <ProgressBar />
      <ListLoader />
      <VirtualizedContainer />
    </>
  )
}
