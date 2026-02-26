
export const ProgressBar = () => {
// DIV WITH FLEXBOX AND CHILDREN FILLED TO CERTAIN PERCENTAGE
// TO SHOW PROGRESS
    
  return (
    <div className="relative pt-1">
      <div className="flex h-2 rounded bg-gray-200">
        <div className="flex-1 rounded bg-blue-600" style={{ width: '50%' }} />
      </div>
    </div>
  )
}
