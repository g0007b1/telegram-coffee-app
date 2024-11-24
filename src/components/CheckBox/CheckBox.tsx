import { type FC } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
type CheckBoxPropsType = {
    checked: boolean;
};

const CheckBox: FC<CheckBoxPropsType> = ({ checked }) => {
    return checked ? (
        <CheckBoxIcon sx={{ fontSize: '1.8rem' }} />
    ) : (
        <CheckBoxOutlineBlankIcon sx={{ fontSize: '1.8rem' }} />
    );
};

export default CheckBox;
