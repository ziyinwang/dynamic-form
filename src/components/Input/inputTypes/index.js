import Text from './Text';
import Date from './Date';
import Select from './Select';
import Checkbox from './Checkbox';

const inputTypes = {
    text: Text,
    date: Date,
    select: Select,
    checkbox: Checkbox,
    default: Text,
};

export default inputTypes;
