import { VirtualizedList } from "./VirtualizedList";

const arr = Array.from ({length: 1000}, (_, i) => `Item ${i + 1}`);

export const VirtualizedContainer = () => {
  return (
    <div><VirtualizedList list={arr} height={400} width={300} itemHeight={30} /></div>
  )
}
