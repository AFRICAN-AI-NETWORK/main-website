import React from 'react';

interface PartnerChipProps {
  name: string;
  logo: string;
}

const PartnerChip: React.FC<PartnerChipProps> = ({ name, logo }) => {
  return (
    <div className="border border-primary rounded-lg px-5 py-2">
      <img src={logo} alt={name} className="w-28 h-28 object-contain" />
    </div>
  );
};

export default PartnerChip;
