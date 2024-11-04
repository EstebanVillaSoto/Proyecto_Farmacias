import React from 'react';

type ButtonWithImageProps = {
    image_name: string;
    action: () => void;
};

const ButtonWithImage: React.FC<ButtonWithImageProps> = ({ image_name, action }) => {
    return (
        <button onClick={action}>
            <img src={image_name} alt="" style={{ width: '24px', height: '24px' }} />
        </button>
    );
};

export default ButtonWithImage;