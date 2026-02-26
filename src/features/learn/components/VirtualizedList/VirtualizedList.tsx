import { useMemo, useState } from "react";

interface VirtualizedListProps {
  list: unknown[];
  height: number;
  width: number;
  itemHeight: number;
}

export const VirtualizedList = ({ list, height, width, itemHeight }: VirtualizedListProps) => {
  // todo: create a map list 
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)])
  const Vlist = useMemo(()=>list.slice(indices[0], indices[1] + 1),[list, indices])

  const endPos = useMemo(() => Math.floor(height / itemHeight), [height, itemHeight])

  function handleScroll(event: React.UIEvent<HTMLDivElement>): void {
    const scrollTop = event.currentTarget.scrollTop;
    console.log("scrollTop", scrollTop)
    const startIndex = Math.floor(scrollTop/itemHeight);
    const endIndex = Math.floor(endPos) + startIndex;
    setIndices([startIndex, endIndex])
  }

  // now apply sliding window logic to update the indices on scroll event

  return (
    <div style={{ height, width, overflow: "auto", backgroundColor: "lightgray" }} onScroll={handleScroll}>
      {/* additional div so that the div which is containing list will have height till all the items 
      to give a feel that scrollbar will roll to that position  */}
      <div style={{ height: list.length * itemHeight, position: "relative" }} >
        {Vlist.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                height: itemHeight, backgroundColor: "coral",
                margin: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "3px solid lightgray",
                position: "absolute",
                top: (indices[0]+index) * itemHeight
                // add shifting logic to move the items to the correct position
              }}
            >
              {String(item)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
