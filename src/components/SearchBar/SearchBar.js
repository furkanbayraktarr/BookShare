import colors from '../../styles/colors'
import Input from '../Input'

const SearchBar =({onSearch})=>{

return(
    <Input
    placeholder='Search in BookShare'
    placeholderTextColor={colors.darkgray}
    onType={onSearch}
    theme="alternative"
    autoFocus
    multiline
    clear={true}
    />
)

}

export default SearchBar
