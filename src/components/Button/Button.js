import { Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import styles from './Button.style'

function Button ({text, onPress, theme="primary",loading}){
    return(
        <TouchableOpacity style={styles[theme].container} disabled={loading} 
        onPress={onPress} >
            {loading ? (<ActivityIndicator color='white' />) : 
            (<Text style={styles[theme].title} >{text}</Text>)}
            
        </TouchableOpacity>
    )
}
export default Button