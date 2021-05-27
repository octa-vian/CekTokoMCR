import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { colors } from '../../Utils';


const ListKategoriBarang = ({nama, selected, btnItem}) => {

    var CheckedList = [];

    const [checlist, setCheclist] = useState(false);

    const itemSelected = (checked) => {
        setCheclist(checked);
        CheckedList = nama;
        alert(selected);
    }

    return (
        <View style={{flexDirection:'row', width:'100%', marginBottom:15}}>
            <Text style={{fontSize:14, fontWeight:'bold', color:'balck', flex:1}}>{nama}</Text>
            <View style={{flex:1, alignItems:'flex-end'}}>
            <CheckBox
            disabled={false}
            value={checlist}
            tintColors={{ true: colors.btnActif, false: colors.btnTextGray}}
            onValueChange={(item) => itemSelected(item)}
            />
            </View>
        </View>
    )
}

export default ListKategoriBarang
