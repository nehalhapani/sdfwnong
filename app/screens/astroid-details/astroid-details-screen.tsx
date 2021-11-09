import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const WRAPPER: ViewStyle ={
  flexDirection:'row',
paddingHorizontal: 20,
paddingVertical:10,
}
const FLEX4: TextStyle = {
  flex:4
}
const FLEX1: TextStyle = {
  flex:1
}
const FLEX8: TextStyle = {
  flex:8
}

export const AstroidDetailsScreen = observer(function AstroidDetailsScreen() {
const {astroidStore} = useStores()
console.tron.log('in',astroidStore.astroidData.name)

  const renderRow = (label, value) => {
return(
  <View style={WRAPPER}>
    <Text text={label} preset='bold' style={FLEX4}/>
    <Text text={':'} preset='bold' style={FLEX1}/>
    <Text text={value} style={FLEX8}/>
  </View>
)
  }
  return (
    <Screen style={ROOT} preset='fixed'>
     <View style={{borderWidth:1,
     marginHorizontal:20,
    borderRadius:4,
    borderColor: color.palette.lightGrey}}>
    {renderRow('Name', astroidStore.astroidData.name)}
    {renderRow('nasa_jpl_url', astroidStore.astroidData.nasa_jpl_url)}
    {renderRow('is_potentially_hazardous_asteroid', astroidStore.astroidData.is_potentially_hazardous_asteroid.toString())}
   </View>
    </Screen>
  )
})
