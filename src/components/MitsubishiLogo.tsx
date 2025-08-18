import mitsubishiLogo from "@/assets/mitsubishi-electric-logo.png";
import mitsuLatestLogo from "@/assets/mitsu-latest-logo.png";
const MitsubishiLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={mitsuLatestLogo} 
        alt="Mitsubishi Electric" 
        className="h-8 w-auto"
        style={{width:"7rem", height:"2.5rem"}}
      />
      {/* <div className="flex flex-col">
        <span className="text-lg font-bold text-mitsubishi-gray">MITSUBISHI</span>
        <span className="text-xs font-medium text-mitsubishi-gray/70">ELECTRIC</span>
      </div> */}
    </div>
  );
};

export default MitsubishiLogo;