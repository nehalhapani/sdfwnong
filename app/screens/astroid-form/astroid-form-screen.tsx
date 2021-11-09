import React,{useState} from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Button, Screen, TextField } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const BUTTONGROUP: ViewStyle = {
  flexDirection:'row',
  paddingVertical:20,
}
const BUTTON : ViewStyle = {
  flex:1,
  justifyContent:'space-around',
  marginHorizontal:20
}
const INDICATOR: ViewStyle = {
  position:'absolute',
  left:0,
  right:0,
  bottom: 0,
  top:0,zIndex:1
}

export const AstroidFormScreen = observer(function AstroidFormScreen() {
  // Pull in one of our MST stores
  const { astroidStore } = useStores()
  const navigation = useNavigation()
  const [isLoading , setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)
    let status = await astroidStore.getAstroidDetail()
    if(status){
      setIsLoading(false) 
      astroidStore.setAstroidID('')
      navigation.navigate('astroidData')
    } else {
      setIsLoading(false)
    }
  }
  const getRandom = async () => {
    setIsLoading(true)
    let status = await astroidStore.getRandomAstroidDetail()
    if(status){
      setIsLoading(false) 
    } else {
      setIsLoading(false)
    }
  }

  return (
    <Screen style={ROOT} preset='fixed'>
      {isLoading && <ActivityIndicator style={INDICATOR} size={'large'}/>}
     <TextField placeholder={'Enter Astroid ID'}
     value={astroidStore.astroidID}
     onChangeText={(text) => astroidStore.setAstroidID(text)}
     />
     <View style={BUTTONGROUP}>
     <Button 
     text='Submit' 
     style={BUTTON} 
     disabled={astroidStore.astroidID == ""}
     onPress={() => {onSubmit()}}
     />
     <Button 
     text='Random Astroid' 
     style={BUTTON}
     onPress={() => {getRandom()}}
     />
       </View>
    </Screen>
  )
})
