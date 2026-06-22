
type ProgressBarProps = {
  mainColor: string;
  progressBarColor: string;
};

export const ProgressBar = ({ mainColor, progressBarColor }: ProgressBarProps) => {
// DIV WITH FLEXBOX AND CHILDREN FILLED TO CERTAIN PERCENTAGE
// TO SHOW PROGRESS
    
  return (
    <div className="relative pt-1">
      <div className="flex h-2 rounded" style={{ backgroundColor: mainColor }}>
        <div className="flex-1 rounded" style={{ backgroundColor: progressBarColor, width: '50%' }} />
      </div>
    </div>
  )
}
