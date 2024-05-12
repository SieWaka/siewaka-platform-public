import Image from 'next/image';
import React from 'react';
import Text from '../../Text';

const MobileHeaderDescent: React.FC = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="flex-col">
        <Image
          src="/favicon.ico"
          height={26}
          width={26}
          alt="Sie Waka ícono"
          className="ml-5"
        />
        <Text as="p2">Sie Waka</Text>
      </div>
    </div>
  );
};

export default MobileHeaderDescent;
