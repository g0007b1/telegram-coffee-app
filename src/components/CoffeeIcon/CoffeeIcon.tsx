import { type FC } from 'react';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded';

type CoffeeIconPropsType = {
    isFilled: boolean;
    fontSize?: string;
};

const CoffeeIcon: FC<CoffeeIconPropsType> = ({
    isFilled,
    fontSize = '3rem',
}) => {
    return (
        <>
            {isFilled ? (
                <FreeBreakfastRoundedIcon sx={{ fontSize }} fontSize="large" />
            ) : (
                <FreeBreakfastOutlinedIcon sx={{ fontSize }} fontSize="large" />
            )}
        </>
    );
};

export default CoffeeIcon;
