import mitsubishiLogo from "@/assets/mitsubishi-logo.png";

const MitsubishiLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={mitsubishiLogo} 
        alt="Mitsubishi Motors" 
        className="h-8 w-auto"
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold text-mitsubishi-gray">MITSUBISHI</span>
        <span className="text-xs font-medium text-mitsubishi-gray/70">MOTORS</span>
      </div>
    </div>
  );
};

export default MitsubishiLogo;